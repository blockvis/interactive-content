#!/usr/bin/env node

/**
 * Prebuild script. Reads one presentation directory and its class directory,
 * compiles slides + metadata into a single JSON blob consumed by Next.js.
 *
 * Inputs:
 *   presentations/<slug>/
 *     presentation.md             — meta (class, languages, title, authors, ...)
 *     slide*.{lang}.md            — slide content
 *     assets/                     — optional media (copied to public/content/<slug>/assets/)
 *
 *   presentation-classes/<class-slug>/
 *     class.md                    — design tokens, chrome, event metadata
 *
 * Output:
 *   src/generated/slides.json     — { presentation, class, languages, defaultLanguage, slides }
 *   public/content/<slug>/...     — copied assets
 *
 * Usage: node scripts/compile.mjs [presentation-dir]
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(import.meta.dirname, "..");
const PRESENTATION_DIR = path.resolve(
  ROOT,
  process.argv[2] || "presentations/gq128-beauty-presentation"
);
const PRESENTATION_SLUG = path.basename(PRESENTATION_DIR);
const CLASSES_ROOT = path.resolve(ROOT, "presentation-classes");

const OUT_JSON = path.resolve(ROOT, "src/generated/slides.json");
const OUT_CLASS_TSX = path.resolve(ROOT, "src/generated/class.tsx");
const OUT_PUBLIC = path.resolve(ROOT, "public/content", PRESENTATION_SLUG);
const DEFAULT_CLASS_SLUG = "example";

/** Avoid Turbopack reading a truncated file mid-write. */
function writeFileAtomicSync(filePath, data) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const tmp = path.join(dir, `.${base}.${process.pid}.${Date.now()}.tmp`);
  fs.writeFileSync(tmp, data, "utf-8");
  fs.renameSync(tmp, filePath);
}

function readMatterFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}

function readPresentationMeta() {
  const file = path.join(PRESENTATION_DIR, "presentation.md");
  const parsed = readMatterFile(file);
  if (!parsed) {
    console.error(`Missing presentation.md in ${PRESENTATION_DIR}`);
    process.exit(1);
  }
  return {
    data: parsed.data,
    description: parsed.content.trim(),
  };
}

function readClassMeta(classSlug) {
  if (!classSlug) return null;
  const file = path.join(CLASSES_ROOT, classSlug, "class.md");
  const parsed = readMatterFile(file);
  if (!parsed) {
    console.warn(`  ⚠ class '${classSlug}' not found at ${file}`);
    return null;
  }
  return {
    slug: classSlug,
    data: parsed.data,
    description: parsed.content.trim(),
  };
}

const SLIDE_RE = /^slide(\d+)\.(\w+)\.md$/;

/** Rewrite relative media paths to `/content/<slug>/...` (works for any subdir). */
function rewriteMediaPaths(body) {
  return body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/g,
    `![$1](/content/${PRESENTATION_SLUG}/$2)`
  );
}

function collectSlides(languages) {
  const result = Object.fromEntries(languages.map((l) => [l, []]));

  const files = fs
    .readdirSync(PRESENTATION_DIR)
    .filter((f) => SLIDE_RE.test(f))
    .sort();

  for (const file of files) {
    const match = file.match(SLIDE_RE);
    if (!match) continue;
    const slideNum = parseInt(match[1], 10);
    const lang = match[2];
    if (!languages.includes(lang)) continue;

    const raw = fs.readFileSync(path.join(PRESENTATION_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    result[lang].push({
      id: slideNum,
      title: data.title || `Slide ${slideNum}`,
      subtitle: data.subtitle || undefined,
      layout: data.layout || "content",
      section: data.section || undefined,
      qr: data.qr !== false, // default true; author can opt-out via `qr: false`
      body: rewriteMediaPaths(content.trim()),
    });
  }

  for (const lang of languages) {
    result[lang].sort((a, b) => a.id - b.id);
  }
  return result;
}

/**
 * Copy a content subdirectory (images/ or assets/) into public/content/<slug>/.
 * The directory name is preserved, so relative MD links to `assets/foo.png`
 * keep resolving after rewrite to `/content/<slug>/assets/foo.png`.
 */
function copyMediaDir(name) {
  const srcDir = path.join(PRESENTATION_DIR, name);
  if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) return false;

  const destDir = path.join(OUT_PUBLIC, name);
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`  Copied ${name}/ → public/content/${PRESENTATION_SLUG}/${name}/`);
  return true;
}

function copyAssets() {
  if (!copyMediaDir("assets")) {
    console.log("  No assets/ directory; skipping copy.");
  }
}

function main() {
  console.log(`Compiling presentation: ${PRESENTATION_SLUG}`);

  const presentation = readPresentationMeta();
  const rawLangs = presentation.data.languages;
  if (!Array.isArray(rawLangs) || rawLangs.length === 0) {
    console.error(
      "presentation meta is missing a non-empty `languages` list (frontmatter or .languages)"
    );
    process.exit(1);
  }
  const languages = rawLangs.map(String);
  const defaultLanguage = languages[0];

  console.log(`  Languages:   ${languages.join(", ")} (default: ${defaultLanguage})`);

  const classSlug = presentation.data.class;
  const cls = readClassMeta(classSlug);
  if (cls) {
    console.log(`  Class:       ${cls.slug}`);
  } else if (classSlug) {
    console.log(`  Class:       ${classSlug} (meta not loaded)`);
  } else {
    console.log("  Class:       <none declared>");
  }

  const slides = collectSlides(languages);
  for (const lang of languages) {
    console.log(`    ${lang}: ${slides[lang].length} slide(s)`);
  }

  const output = {
    presentation: {
      slug: PRESENTATION_SLUG,
      title: presentation.data.title ?? null,
      subtitle: presentation.data.subtitle ?? null,
      shortTitle: presentation.data.shortTitle ?? null,
      authors: presentation.data.authors ?? [],
      class: classSlug ?? null,
      description: presentation.description,
      // Raw frontmatter kept for forward-compat; downstream code can pick fields freely.
      meta: presentation.data,
    },
    class: cls
      ? {
          slug: cls.slug,
          name: cls.data.name ?? cls.slug,
          event: cls.data.event ?? null,
          colors: cls.data.colors ?? null,
          fonts: cls.data.fonts ?? null,
          typography: cls.data.typography ?? null,
          chrome: cls.data.chrome ?? null,
          description: cls.description,
          meta: cls.data,
        }
      : null,
    languages,
    defaultLanguage,
    slides,
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  writeFileAtomicSync(OUT_JSON, JSON.stringify(output, null, 2));
  console.log(`  Output → src/generated/slides.json`);

  writeClassRegistry(classSlug);
  copyAssets();
  console.log("Done.");
}

/**
 * Emit `src/generated/class.tsx` that re-exports the active class module.
 * Falls back to the `example` class if the declared one is missing an
 * index.tsx, so the build never hard-fails on a misnamed class.
 */
function writeClassRegistry(declaredSlug) {
  const candidate = declaredSlug
    ? path.join(CLASSES_ROOT, declaredSlug, "index.tsx")
    : null;
  const resolvedSlug =
    candidate && fs.existsSync(candidate) ? declaredSlug : DEFAULT_CLASS_SLUG;

  if (resolvedSlug !== declaredSlug) {
    console.warn(
      `  ⚠ class '${declaredSlug ?? "<none>"}' has no index.tsx; using '${resolvedSlug}' as fallback`
    );
  }

  const relativeFromGenerated = path
    .relative(
      path.dirname(OUT_CLASS_TSX),
      path.join(CLASSES_ROOT, resolvedSlug, "index")
    )
    .replace(/\\/g, "/");

  const importPath = relativeFromGenerated.startsWith(".")
    ? relativeFromGenerated
    : `./${relativeFromGenerated}`;

  const contents = `// AUTOGENERATED by scripts/compile.mjs — do not edit.
// Active presentation class: ${resolvedSlug}
import module_ from "${importPath}";
export default module_;
`;

  fs.mkdirSync(path.dirname(OUT_CLASS_TSX), { recursive: true });
  writeFileAtomicSync(OUT_CLASS_TSX, contents);
  console.log(`  Output → src/generated/class.tsx (→ ${resolvedSlug})`);
}

main();
