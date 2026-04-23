#!/usr/bin/env node

/**
 * Prebuild script: compiles Markdown slides from example/ into
 * src/generated/slides.json and copies images to public/content/.
 *
 * Usage: node scripts/compile.mjs [content-dir]
 *   content-dir defaults to "example"
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.resolve(ROOT, process.argv[2] || "example");
const OUT_JSON = path.resolve(ROOT, "src/generated/slides.json");
const OUT_IMAGES = path.resolve(ROOT, "public/content/images");

/** Avoid Turbopack reading a truncated file mid-write. */
function writeFileAtomicSync(filePath, data) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const tmp = path.join(dir, `.${base}.${process.pid}.${Date.now()}.tmp`);
  fs.writeFileSync(tmp, data, "utf-8");
  fs.renameSync(tmp, filePath);
}

function readLanguages() {
  const file = path.join(CONTENT_DIR, ".languages");
  if (!fs.existsSync(file)) {
    console.error("Missing .languages file in", CONTENT_DIR);
    process.exit(1);
  }
  return fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

const SLIDE_RE = /^slide(\d+)\.(\w+)\.md$/;

function collectSlides(languages) {
  const result = {};
  for (const lang of languages) {
    result[lang] = [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => SLIDE_RE.test(f));
  files.sort();

  for (const file of files) {
    const match = file.match(SLIDE_RE);
    if (!match) continue;

    const slideNum = parseInt(match[1], 10);
    const lang = match[2];

    if (!languages.includes(lang)) continue;

    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    const body = content
      .trim()
      .replace(
        /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
        "![$1](/content/$2)"
      );

    result[lang].push({
      id: slideNum,
      title: data.title || `Slide ${slideNum}`,
      subtitle: data.subtitle || undefined,
      body,
    });
  }

  for (const lang of languages) {
    result[lang].sort((a, b) => a.id - b.id);
  }

  return result;
}

function copyImages() {
  const srcDir = path.join(CONTENT_DIR, "images");
  if (!fs.existsSync(srcDir)) return;

  fs.mkdirSync(OUT_IMAGES, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const src = path.join(srcDir, file);
    const dest = path.join(OUT_IMAGES, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`  Copied images → public/content/images/`);
}

function main() {
  console.log(`Compiling slides from ${CONTENT_DIR}`);

  const languages = readLanguages();
  console.log(`  Languages: ${languages.join(", ")}`);

  const slides = collectSlides(languages);

  for (const lang of languages) {
    console.log(`  ${lang}: ${slides[lang].length} slide(s)`);
  }

  const output = {
    languages,
    defaultLanguage: languages[0],
    slides,
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  writeFileAtomicSync(OUT_JSON, JSON.stringify(output, null, 2));
  console.log(`  Output → src/generated/slides.json`);

  copyImages();
  console.log("Done.");
}

main();
