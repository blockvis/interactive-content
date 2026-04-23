#!/usr/bin/env node
/**
 * Run compile, start `next dev`, and re-run compile when presentation files change.
 * Optional content dir: npm run dev -- path/to/presentation
 */

import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirArg = process.argv[2];
const CONTENT_DIR = path.resolve(ROOT, contentDirArg || "example");
const NEXT_CLI = path.join(ROOT, "node_modules/next/dist/bin/next");

function runCompile() {
  const args = [path.join(ROOT, "scripts/compile.mjs")];
  if (contentDirArg) args.push(contentDirArg);
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

runCompile();

const next = spawn(process.execPath, [NEXT_CLI, "dev"], {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});

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
      n.endsWith(".languages") ||
      n.startsWith("images/")
    ) {
      scheduleCompile();
    }
  });
  console.log("[dev] Watching", CONTENT_DIR, "for .md / images changes");
} else {
  console.warn("[dev] Content dir missing, no watch:", CONTENT_DIR);
}

function shutdown(signal) {
  if (watcher) watcher.close();
  clearTimeout(debounce);
  next.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

next.on("exit", (code, signal) => {
  if (watcher) watcher.close();
  clearTimeout(debounce);
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
