#!/usr/bin/env node

/**
 * AI-assisted slide translation.
 *
 * Reads slides in the presentation's canonical language and generates
 * translations into the other declared languages via the Anthropic API.
 * Incremental: a translated file carries the SHA-256 hash of its source
 * file in its frontmatter (`sourceHash`); on re-run, untouched sources
 * are skipped. Files authored by hand (no `sourceHash`) are left alone
 * unless `--force` is passed.
 *
 *   Inputs:
 *     presentations/<slug>/presentation.md     — `languages[0]` = canonical
 *     presentations/<slug>/<canon>/slide*.md   — source slides
 *     ANTHROPIC_API_KEY                         — env, via .env.local
 *     ANTHROPIC_MODEL                           — env, optional
 *
 *   Output:
 *     presentations/<slug>/<lang>/slide*.<lang>.md
 *
 * Usage:
 *   npm run translate                   — all non-canonical langs, stale slides
 *   npm run translate -- en             — only `en`
 *   npm run translate -- en 42          — only `en`, only slide 42
 *   npm run translate -- --force        — ignore sourceHash (retranslate all)
 *   npm run translate -- --dry          — show plan, write nothing
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = path.resolve(import.meta.dirname, "..");

const DEFAULT_MODEL = "claude-opus-4-7";
const MAX_CONCURRENCY = 3;
const SLIDE_RE = /^slide(\d+)\.(\w+)\.md$/;

// --- CLI -----------------------------------------------------------------

function parseArgs(argv) {
  const args = { lang: null, slideNum: null, force: false, dry: false, presentationDir: null };
  for (const a of argv) {
    if (a === "--force") args.force = true;
    else if (a === "--dry" || a === "--dry-run") args.dry = true;
    else if (a.startsWith("--presentation=")) args.presentationDir = a.slice("--presentation=".length);
    else if (!a.startsWith("--")) {
      if (/^\d+$/.test(a)) args.slideNum = parseInt(a, 10);
      else if (!args.lang) args.lang = a;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const PRESENTATION_DIR = path.resolve(
  ROOT,
  args.presentationDir || "presentations/gq128-beauty-presentation",
);
const PRESENTATION_SLUG = path.basename(PRESENTATION_DIR);

// --- Helpers -------------------------------------------------------------

function writeFileAtomicSync(filePath, data) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const tmp = path.join(dir, `.${base}.${process.pid}.${Date.now()}.tmp`);
  fs.writeFileSync(tmp, data, "utf-8");
  fs.renameSync(tmp, filePath);
}

function sha256(buf) {
  return "sha256-" + crypto.createHash("sha256").update(buf).digest("hex");
}

function readPresentationMeta() {
  const file = path.join(PRESENTATION_DIR, "presentation.md");
  if (!fs.existsSync(file)) {
    console.error(`Missing presentation.md in ${PRESENTATION_DIR}`);
    process.exit(1);
  }
  const parsed = matter(fs.readFileSync(file, "utf-8"));
  const langs = parsed.data.languages;
  if (!Array.isArray(langs) || langs.length < 2) {
    console.error(
      "presentation.md must declare at least two languages in `languages` (canonical + translations)",
    );
    process.exit(1);
  }
  return {
    data: parsed.data,
    description: parsed.content.trim(),
    languages: langs.map(String),
  };
}

function readClassMeta(classSlug) {
  if (!classSlug) return null;
  const file = path.resolve(
    ROOT,
    "presentation-classes",
    classSlug,
    "class.md",
  );
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf-8"));
  return { data: parsed.data, description: parsed.content.trim() };
}

function listSourceSlides(canonLang) {
  const dir = path.join(PRESENTATION_DIR, canonLang);
  if (!fs.existsSync(dir)) {
    console.error(`Canonical language directory missing: ${dir}`);
    process.exit(1);
  }
  const entries = [];
  for (const file of fs.readdirSync(dir).sort()) {
    const m = file.match(SLIDE_RE);
    if (!m) continue;
    if (m[2] !== canonLang) continue;
    entries.push({
      slideNum: parseInt(m[1], 10),
      file,
      fullPath: path.join(dir, file),
    });
  }
  return entries;
}

function targetPath(lang, slideNum) {
  const padded = String(slideNum).padStart(3, "0");
  return path.join(PRESENTATION_DIR, lang, `slide${padded}.${lang}.md`);
}

/**
 * Decide whether to (re)translate one slide into one language.
 * Returns `{ action, reason }` where action ∈ "translate" | "skip".
 */
function planOne({ sourceHash, targetFile, force }) {
  if (force) return { action: "translate", reason: "--force" };
  if (!fs.existsSync(targetFile))
    return { action: "translate", reason: "missing target" };
  const parsed = matter(fs.readFileSync(targetFile, "utf-8"));
  const existingHash = parsed.data.sourceHash;
  if (!existingHash)
    return {
      action: "skip",
      reason: "manual translation (no sourceHash) — use --force to overwrite",
    };
  if (existingHash === sourceHash)
    return { action: "skip", reason: "up to date" };
  return { action: "translate", reason: "source changed" };
}

// --- Prompt --------------------------------------------------------------

/**
 * Build a short "Presentation context" block to prepend to the system prompt.
 * The goal is to give the model enough background to pick the right register
 * and terminology without overloading it with unrelated information. We keep
 * it compact: title/subtitle, a trimmed description, authors, and event
 * coordinates from the class. All fields are optional — missing ones are
 * silently dropped.
 */
function buildContextBlock({ presentation, classMeta }) {
  const lines = ["PRESENTATION CONTEXT"];
  const p = presentation.data;
  if (p.title) lines.push(`Title: ${p.title}`);
  if (p.subtitle) lines.push(`Subtitle: ${p.subtitle}`);
  if (p.shortTitle) lines.push(`Short title: ${p.shortTitle}`);

  const authors = Array.isArray(p.authors) ? p.authors : [];
  if (authors.length > 0) {
    const parts = authors
      .map((a) => {
        const bits = [a.name, a.affiliation, a.role].filter(Boolean);
        return bits.join(" — ");
      })
      .filter(Boolean);
    if (parts.length > 0) lines.push(`Authors: ${parts.join("; ")}`);
  }

  if (classMeta) {
    const c = classMeta.data;
    if (c.name) lines.push(`Class: ${c.name}`);
    const ev = c.event || {};
    const isoDate =
      ev.date instanceof Date
        ? ev.date.toISOString().slice(0, 10)
        : ev.date
          ? String(ev.date).slice(0, 10)
          : null;
    const evBits = [
      ev.name,
      ev.edition,
      isoDate,
      ev.location || ev.host,
    ].filter(Boolean);
    if (evBits.length > 0) lines.push(`Event: ${evBits.join(", ")}`);
  }

  if (presentation.description) {
    // Keep the body concise — enough for register/terminology, not a whole essay.
    const trimmed = presentation.description.replace(/\s+/g, " ").slice(0, 800);
    lines.push(`Description: ${trimmed}`);
  }

  return lines.join("\n");
}

function buildSystemPrompt(sourceLang, targetLang, contextBlock) {
  return [
    `You are a translation assistant for technical presentation slides.`,
    `Translate from ${sourceLang} to ${targetLang}.`,
    `Return ONLY the final markdown file content — no code fences, no explanations, no preamble.`,
    ``,
    contextBlock,
    ``,
    `Use this context to choose register and preserve the author's terminology across slides. Do not copy the context into the output; it is background only.`,
    ``,
    `STRICTLY PRESERVE the following unchanged:`,
    `- YAML frontmatter keys and all non-string values (layout, qr, id, etc.).`,
    `- KaTeX math: "$...$" (inline) and "$$...$$" (block).`,
    `- remark-directive syntax: "::name{attrs}" (inline), ":::name{attrs}...:::" (block).`,
    `  Directive name and attribute keys MUST remain identical. Attribute values must remain identical unless they are obviously human-readable text (translate only that).`,
    `- Code blocks (fenced and indented) — content and language tag unchanged.`,
    `- HTML comments, including "<!-- backstage -->" (canonical marker separating slide content from backstage materials).`,
    `- Image paths, URLs, file references, filenames, identifiers.`,
    `- Markdown structure (headings, lists, emphasis, link targets).`,
    ``,
    `TRANSLATE the following:`,
    `- Frontmatter string values for keys: title, subtitle, section.`,
    `- Body prose (the human-readable text between structural markup).`,
    `- Link display text (the "[text]" part of "[text](url)"), never the URL.`,
    `- Image alt text (the "alt" part of "![alt](path)"), never the path.`,
    ``,
    `Produce idiomatic ${targetLang} suitable for a technical talk. Preserve terminology used by the author (mathematical, computer science).`,
  ].join("\n");
}

function buildUserPrompt(sourceText) {
  return `Translate this slide file. Return only the translated markdown:\n\n${sourceText}`;
}

// --- Anthropic call ------------------------------------------------------

let client = null;
function getClient() {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "ANTHROPIC_API_KEY is not set. Put it in .env.local (the npm script loads it via --env-file).",
    );
    process.exit(1);
  }
  client = new Anthropic({ apiKey });
  return client;
}

async function callAnthropic({ sourceLang, targetLang, sourceText, contextBlock }) {
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
  const resp = await getClient().messages.create({
    model,
    max_tokens: 8192,
    system: buildSystemPrompt(sourceLang, targetLang, contextBlock),
    messages: [{ role: "user", content: buildUserPrompt(sourceText) }],
  });
  const chunks = (resp.content || [])
    .filter((c) => c.type === "text")
    .map((c) => c.text);
  if (chunks.length === 0) {
    throw new Error(`Empty response from model ${model}`);
  }
  return { text: chunks.join(""), model };
}

// --- Post-processing -----------------------------------------------------

/**
 * Merge the model output with known-good fields from the source.
 * - Re-parses the translated markdown.
 * - Overrides `layout`, `qr`, `id`, `class`, `spec`, etc. with source
 *   values (defensive against hallucinated edits).
 * - Drops any managed fields the model might have echoed.
 * - Injects our own provenance metadata (`sourceHash`, `translatedBy`).
 */
function mergeTranslation({ translated, sourceData, sourceHash, model }) {
  const parsed = matter(translated);
  const out = { ...parsed.data };

  // Preserve structural/invariant fields from source 1:1.
  const pinned = ["layout", "qr", "id", "class", "spec"];
  for (const k of pinned) {
    if (sourceData[k] !== undefined) out[k] = sourceData[k];
    else delete out[k];
  }

  delete out.sourceHash;
  delete out.translatedBy;
  out.sourceHash = sourceHash;
  out.translatedBy = model;

  return matter.stringify(parsed.content, out);
}

// --- Main ----------------------------------------------------------------

async function runOne({ sourceLang, targetLang, slide, force, dry, contextBlock }) {
  const targetFile = targetPath(targetLang, slide.slideNum);
  const sourceRaw = fs.readFileSync(slide.fullPath, "utf-8");
  const sourceHash = sha256(sourceRaw);

  const decision = planOne({ sourceHash, targetFile, force });

  const rel = path.relative(ROOT, targetFile);
  if (decision.action === "skip") {
    console.log(`  skip   ${rel}  (${decision.reason})`);
    return { action: "skip", reason: decision.reason };
  }

  if (dry) {
    console.log(`  plan   ${rel}  (${decision.reason})`);
    return { action: "planned", reason: decision.reason };
  }

  console.log(`  call   ${rel}  (${decision.reason})`);

  const { text: translated, model } = await callAnthropic({
    sourceLang,
    targetLang,
    sourceText: sourceRaw,
    contextBlock,
  });

  const { data: sourceData } = matter(sourceRaw);
  const merged = mergeTranslation({ translated, sourceData, sourceHash, model });

  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  writeFileAtomicSync(targetFile, merged);

  console.log(`  wrote  ${rel}`);
  return { action: "translated" };
}

async function runBatch(tasks, concurrency) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < tasks.length) {
      const idx = i++;
      const task = tasks[idx];
      try {
        const r = await runOne(task);
        results.push({ ok: true, task, result: r });
      } catch (err) {
        console.error(
          `  fail   ${path.relative(ROOT, targetPath(task.targetLang, task.slide.slideNum))}: ${err.message}`,
        );
        results.push({ ok: false, task, error: err });
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const presentation = readPresentationMeta();
  const { languages } = presentation;
  const classMeta = readClassMeta(presentation.data.class);
  const contextBlock = buildContextBlock({ presentation, classMeta });
  const [canonLang, ...others] = languages;

  const targetLangs = args.lang
    ? [args.lang]
    : others;

  if (args.lang && !languages.includes(args.lang)) {
    console.error(
      `Language '${args.lang}' is not declared in presentation.md (languages: ${languages.join(", ")})`,
    );
    process.exit(1);
  }
  if (args.lang === canonLang) {
    console.error(
      `'${canonLang}' is the canonical language — nothing to translate into itself.`,
    );
    process.exit(1);
  }

  const slides = listSourceSlides(canonLang);
  const selected = args.slideNum != null
    ? slides.filter((s) => s.slideNum === args.slideNum)
    : slides;

  if (selected.length === 0) {
    console.error(
      args.slideNum != null
        ? `Slide ${args.slideNum} not found in ${canonLang}/`
        : `No slides found in ${canonLang}/`,
    );
    process.exit(1);
  }

  console.log(
    `Presentation: ${PRESENTATION_SLUG}` +
      `\nCanonical:    ${canonLang}` +
      `\nTargets:      ${targetLangs.join(", ") || "<none>"}` +
      `\nSlides:       ${selected.map((s) => s.slideNum).join(", ")}` +
      `\nModel:        ${process.env.ANTHROPIC_MODEL || DEFAULT_MODEL}` +
      `\nMode:         ${args.dry ? "dry-run" : "write"}${args.force ? " (force)" : ""}\n`,
  );

  if (args.dry) {
    console.log("--- system prompt context block ---");
    console.log(contextBlock);
    console.log("--- end context ---\n");
  }

  const tasks = [];
  for (const targetLang of targetLangs) {
    for (const slide of selected) {
      tasks.push({
        sourceLang: canonLang,
        targetLang,
        slide,
        force: args.force,
        dry: args.dry,
        contextBlock,
      });
    }
  }

  const results = await runBatch(tasks, MAX_CONCURRENCY);

  let translated = 0;
  let planned = 0;
  let skipped = 0;
  let failed = 0;
  for (const r of results) {
    if (!r.ok) failed++;
    else if (r.result.action === "translated") translated++;
    else if (r.result.action === "planned") planned++;
    else skipped++;
  }

  console.log(
    `\nSummary: translated=${translated}, planned=${planned}, skipped=${skipped}, failed=${failed}`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
