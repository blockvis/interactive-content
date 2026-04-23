#!/usr/bin/env node
/**
 * Run compile, start `next dev`, and re-run compile when presentation files change.
 * If `next dev` dies unexpectedly (crash, Turbopack panic, OOM during a long refactor),
 * we free port 3000 and restart it with a short exponential backoff so localhost
 * comes back on its own. Ctrl+C still stops everything cleanly.
 *
 * Optional content dir: npm run dev -- path/to/presentation
 */

import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirArg = process.argv[2];
const CONTENT_DIR = path.resolve(
  ROOT,
  contentDirArg || "presentations/gq128-beauty-presentation"
);
const NEXT_CLI = path.join(ROOT, "node_modules/next/dist/bin/next");
const PORT = Number(process.env.PORT || 3000);

function runCompile({ fatal }) {
  const args = [path.join(ROOT, "scripts/compile.mjs")];
  if (contentDirArg) args.push(contentDirArg);
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    if (fatal) process.exit(r.status ?? 1);
    // Non-fatal: keep dev server alive so it recovers as soon as the
    // presentation files become valid again.
    console.warn(
      `[dev] compile failed with code ${r.status ?? "?"} — keeping dev server running`
    );
  }
}

runCompile({ fatal: false });

// --- next dev supervisor ---------------------------------------------------

let next = null;
let restartAttempt = 0;
let shuttingDown = false;
let restartTimer = null;

function freePort(port) {
  try {
    const out = spawnSync("lsof", ["-tiTCP:" + port, "-sTCP:LISTEN"], {
      encoding: "utf-8",
    });
    const pids = (out.stdout || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const pid of pids) {
      try {
        process.kill(Number(pid), "SIGKILL");
      } catch {}
    }
  } catch {}
}

function waitForPortFree(port, timeoutMs = 3000) {
  const start = Date.now();
  return new Promise((resolve) => {
    const tryOnce = () => {
      const srv = net.createServer();
      srv.once("error", () => {
        if (Date.now() - start > timeoutMs) return resolve();
        setTimeout(tryOnce, 100);
      });
      srv.once("listening", () => srv.close(() => resolve()));
      srv.listen(port, "127.0.0.1");
    };
    tryOnce();
  });
}

async function startNext() {
  await waitForPortFree(PORT, 3000);
  next = spawn(process.execPath, [NEXT_CLI, "dev"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });

  next.on("exit", (code, signal) => {
    next = null;
    if (shuttingDown) return;
    // User-initiated signals propagate up and stop the supervisor.
    if (signal === "SIGINT" || signal === "SIGTERM") {
      process.exit(0);
    }
    const backoff = Math.min(5000, 300 * 2 ** restartAttempt);
    restartAttempt++;
    console.warn(
      `\n[dev] next dev exited (code=${code}, signal=${signal}). Restarting in ${backoff}ms…`
    );
    freePort(PORT);
    restartTimer = setTimeout(() => {
      startNext().catch((err) => {
        console.error("[dev] failed to restart next dev:", err);
      });
    }, backoff);
  });

  // Reset backoff once Next has stayed up for a bit.
  setTimeout(() => {
    if (next) restartAttempt = 0;
  }, 10_000);
}

startNext();

// --- watcher ---------------------------------------------------------------

let debounce = null;
function scheduleCompile() {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log("\n[dev] Recompiling slides…");
    const args = [path.join(ROOT, "scripts/compile.mjs")];
    if (contentDirArg) args.push(contentDirArg);
    const child = spawn(process.execPath, args, {
      cwd: ROOT,
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code !== 0) {
        console.error("[dev] compile failed with code", code);
      }
    });
  }, 300);
}

let watcher = null;
if (fs.existsSync(CONTENT_DIR)) {
  watcher = fs.watch(CONTENT_DIR, { recursive: true }, (_event, name) => {
    if (!name) return;
    const n = String(name).replace(/\\/g, "/").toLowerCase();
    if (
      n.endsWith(".md") ||
      n.startsWith("assets/") ||
      n.startsWith("components/")
    ) {
      scheduleCompile();
    }
  });
  console.log("[dev] Watching", CONTENT_DIR, "for .md / assets / components changes");
} else {
  console.warn("[dev] Content dir missing, no watch:", CONTENT_DIR);
}

// --- shutdown --------------------------------------------------------------

function shutdown(signal) {
  shuttingDown = true;
  if (watcher) watcher.close();
  clearTimeout(debounce);
  clearTimeout(restartTimer);
  if (next) next.kill(signal);
  else process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
