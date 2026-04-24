#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(import.meta.dirname, "..");
const PRESENTATIONS_ROOT = path.resolve(ROOT, "presentations");
const CLASSES_ROOT = path.resolve(ROOT, "presentation-classes");

const OUT_JSON = path.resolve(ROOT, "src/generated/slides.json");
const OUT_CLASS_TSX = path.resolve(ROOT, "src/generated/class.tsx");
const OUT_COMPONENTS_TSX = path.resolve(ROOT, "src/generated/components.tsx");
const OUT_PUBLIC_ROOT = path.resolve(ROOT, "public/content");
const DEFAULT_CLASS_SLUG = "example";

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

function readPresentationMeta(presentationDir) {
  const file = path.join(presentationDir, "presentation.md");
  const parsed = readMatterFile(file);
  if (!parsed) {
    console.error(`Missing presentation.md in ${presentationDir}`);
    return null;
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

function rewriteMediaPaths(body, lang, presentationSlug) {
  return body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/g,
    (_m, alt, rel) => {
      const fromPresentationRoot = path.posix.normalize(
        path.posix.join(lang, rel),
      );
      return `![${alt}](/content/${presentationSlug}/${fromPresentationRoot})`;
    },
  );
}

const BACKSTAGE_MARKER_RE = /^<!--\s*backstage\s*-->\s*$/m;

function splitBackstage(body) {
  const match = body.match(BACKSTAGE_MARKER_RE);
  if (!match) return { content: body, backstage: undefined };
  const idx = match.index;
  const content = body.slice(0, idx);
  const backstage = body.slice(idx + match[0].length);
  return { content, backstage };
}

function collectSlides(presentationDir, presentationSlug, languages) {
  const result = Object.fromEntries(languages.map((l) => [l, []]));

  for (const lang of languages) {
    const langDir = path.join(presentationDir, lang);
    if (!fs.existsSync(langDir) || !fs.statSync(langDir).isDirectory()) {
      console.warn(`  ⚠ missing language directory: ${lang}/ — skipping`);
      continue;
    }

    const files = fs.readdirSync(langDir).filter((f) => SLIDE_RE.test(f)).sort();

    for (const file of files) {
      const match = file.match(SLIDE_RE);
      if (!match) continue;
      const slideNum = parseInt(match[1], 10);
      const fileLang = match[2];
      if (fileLang !== lang) {
        console.warn(
          `  ⚠ ${lang}/${file}: language suffix (.${fileLang}) does not match directory — skipping`,
        );
        continue;
      }

      const raw = fs.readFileSync(path.join(langDir, file), "utf-8");
      const { data, content } = matter(raw);

      const parts = splitBackstage(content);
      const slideContent = rewriteMediaPaths(parts.content.trim(), lang, presentationSlug);
      const slideBackstage =
        parts.backstage !== undefined
          ? rewriteMediaPaths(parts.backstage.trim(), lang, presentationSlug)
          : undefined;

      result[lang].push({
        id: slideNum,
        title: data.title || `Slide ${slideNum}`,
        subtitle: data.subtitle || undefined,
        layout: data.layout || "content",
        section: data.section || undefined,
        qr: data.qr !== false,
        content: slideContent,
        backstage:
          slideBackstage && slideBackstage.length > 0 ? slideBackstage : undefined,
        translatedBy:
          typeof data.translatedBy === "string" && data.translatedBy.length > 0
            ? data.translatedBy
            : undefined,
      });
    }
  }

  for (const lang of languages) {
    result[lang].sort((a, b) => a.id - b.id);
  }
  return result;
}

function copyMediaDir(presentationDir, presentationSlug, name) {
  const srcDir = path.join(presentationDir, name);
  if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) return false;

  const destDir = path.join(OUT_PUBLIC_ROOT, presentationSlug, name);
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log(`  Copied ${name}/ → public/content/${presentationSlug}/${name}/`);
  return true;
}

function copyAssets(presentationDir, presentationSlug) {
  if (!copyMediaDir(presentationDir, presentationSlug, "assets")) {
    console.log("  No assets/ directory; skipping copy.");
  }
}

function main() {
  const presentations = {};
  const usedClasses = new Set();
  const presentationComponents = [];
  
  const presentationDirs = fs.readdirSync(PRESENTATIONS_ROOT).filter(d => {
    return fs.statSync(path.join(PRESENTATIONS_ROOT, d)).isDirectory() && !d.startsWith('.');
  });

  for (const presentationSlug of presentationDirs) {
    console.log(`Compiling presentation: ${presentationSlug}`);
    const presentationDir = path.join(PRESENTATIONS_ROOT, presentationSlug);
    
    const presentation = readPresentationMeta(presentationDir);
    if (!presentation) continue;

    const rawLangs = presentation.data.languages;
    if (!Array.isArray(rawLangs) || rawLangs.length === 0) {
      console.error(
        `  ⚠ presentation meta is missing a non-empty \`languages\` list. Skipping.`
      );
      continue;
    }
    const languages = rawLangs.map(String);
    const defaultLanguage = languages[0];

    console.log(`  Languages:   ${languages.join(", ")} (default: ${defaultLanguage})`);

    const classSlug = presentation.data.class;
    const cls = readClassMeta(classSlug);
    if (cls) {
      console.log(`  Class:       ${cls.slug}`);
      usedClasses.add(cls.slug);
    } else if (classSlug) {
      console.log(`  Class:       ${classSlug} (meta not loaded)`);
      usedClasses.add(classSlug);
    } else {
      console.log("  Class:       <none declared>");
    }

    const slides = collectSlides(presentationDir, presentationSlug, languages);
    for (const lang of languages) {
      console.log(`    ${lang}: ${slides[lang].length} slide(s)`);
    }

    presentations[presentationSlug] = {
      presentation: {
        slug: presentationSlug,
        title: presentation.data.title ?? null,
        subtitle: presentation.data.subtitle ?? null,
        shortTitle: presentation.data.shortTitle ?? null,
        authors: presentation.data.authors ?? [],
        class: classSlug ?? null,
        description: presentation.description,
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

    copyAssets(presentationDir, presentationSlug);

    // Check if presentation has components
    const componentsPath = path.join(presentationDir, "components", "index.tsx");
    if (fs.existsSync(componentsPath)) {
      presentationComponents.push(presentationSlug);
    }
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  writeFileAtomicSync(OUT_JSON, JSON.stringify(presentations, null, 2));
  console.log(`\nOutput → src/generated/slides.json`);

  writeClassRegistry(Array.from(usedClasses));
  writeComponentsRegistry(presentationComponents);
  console.log("Done.");
}

function writeClassRegistry(declaredSlugs) {
  const imports = [];
  const exports = [];
  
  for (const declaredSlug of declaredSlugs) {
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

    const varName = `class_${resolvedSlug.replace(/[^a-zA-Z0-9]/g, '_')}`;
    imports.push(`import ${varName} from "${importPath}";`);
    exports.push(`  "${declaredSlug}": ${varName},`);
  }

  const contents = `// AUTOGENERATED by scripts/compile.mjs — do not edit.
${imports.join('\n')}

const classes: Record<string, any> = {
${exports.join('\n')}
};

export default function getClassModule(slug: string | null) {
  if (!slug) return null;
  return classes[slug] || null;
}
`;

  fs.mkdirSync(path.dirname(OUT_CLASS_TSX), { recursive: true });
  writeFileAtomicSync(OUT_CLASS_TSX, contents);
  console.log(`Output → src/generated/class.tsx`);
}

function writeComponentsRegistry(presentationSlugs) {
  const imports = [];
  const exports = [];
  
  for (const slug of presentationSlugs) {
    const relativeFromGenerated = path
      .relative(
        path.dirname(OUT_COMPONENTS_TSX),
        path.join(PRESENTATIONS_ROOT, slug, "components", "index")
      )
      .replace(/\\/g, "/");

    const importPath = relativeFromGenerated.startsWith(".")
      ? relativeFromGenerated
      : `./${relativeFromGenerated}`;

    const varName = `comp_${slug.replace(/[^a-zA-Z0-9]/g, '_')}`;
    imports.push(`import { components as ${varName} } from "${importPath}";`);
    exports.push(`  "${slug}": ${varName},`);
  }

  const contents = `// AUTOGENERATED by scripts/compile.mjs — do not edit.
${imports.join('\n')}

const presentationComponents: Record<string, Record<string, any>> = {
${exports.join('\n')}
};

export function getPresentationComponents(slug: string | null) {
  if (!slug) return {};
  return presentationComponents[slug] || {};
}
`;

  fs.mkdirSync(path.dirname(OUT_COMPONENTS_TSX), { recursive: true });
  writeFileAtomicSync(OUT_COMPONENTS_TSX, contents);
  console.log(`Output → src/generated/components.tsx`);
}

main();
