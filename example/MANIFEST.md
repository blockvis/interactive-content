# Complex Presentation — Manifest

## What is this?

This project is both a **working presentation** and a **reference implementation** for building modern, web-native slide decks. It demonstrates how to create multilingual, interactive presentations powered by Next.js and deployed on Vercel.

The presentation content itself covers the historical beauty of complex numbers in mathematics — a topic chosen deliberately to showcase rich formula rendering (KaTeX) alongside narrative text and images.

## How it works

### Content authoring

All slide content lives in this `example/` directory as plain Markdown files:

```
slide001.ru.md   ← Slide 1, Russian (original language)
slide002.ru.md   ← Slide 2, Russian
slide001.en.md   ← Slide 1, English (translated)
...
```

**Naming convention:** `slide{NNN}.{lang}.md` where `NNN` is a zero-padded slide number and `lang` is an ISO 639-1 language code.

Each file uses YAML frontmatter for metadata and standard Markdown for the body:

```markdown
---
title: "Slide Title"
subtitle: "Optional Subtitle"
---

Body text with **formatting**, inline math $e^{i\pi}+1=0$, and block formulas:

$$
\sum_{n=0}^{\infty} \frac{z^n}{n!} = e^z
$$

![Diagram](images/my-diagram.png)
```

### Features supported in Markdown

- Standard Markdown (headings, bold, italic, lists, links, code blocks)
- Inline math: `$...$`
- Block math: `$$...$$` (rendered via KaTeX)
- Images: relative paths to `images/` subdirectory

### Languages

The `.languages` file in this directory lists all target languages, one per line. The first language listed is the **default** (the author's original language). Subsequent languages are translation targets.

```
ru
en
```

### Compilation pipeline

A prebuild script (`scripts/compile.mjs`) processes this directory:

1. Reads `.languages` to discover target languages
2. Collects `slide*.{lang}.md` files for each language
3. Parses YAML frontmatter (title, subtitle)
4. Rewrites image paths for web serving
5. Copies images to `public/content/images/`
6. Outputs `src/generated/slides.json` consumed by Next.js at build time

The build command (`npm run build`) runs this script automatically before the Next.js build.

### Translation workflow

The author writes slides in their native language (the first language in `.languages`). Translations can be produced:

- **Manually** — write `slide001.en.md` by hand
- **AI-assisted** (future) — a `scripts/translate.mjs` script will call an LLM API to generate translations automatically

Missing translations are expected — the system gracefully handles languages that don't have all slides translated yet.

## How to create your own presentation

1. **Clone** this repository
2. **Clear** the example slides (or keep them as reference)
3. **Create** your own `my-deck/` directory following the same structure
4. **Edit** the build script to point to your content directory
5. **Write** your slides as `.md` files
6. **Deploy** to Vercel with `npm run build`

## Philosophy

- **Content is king.** Slides are plain text files, version-controlled and diffable.
- **Language is fluid.** The author thinks in their native language; AI handles the rest.
- **The web is the platform.** No PowerPoint, no PDF — every slide has a URL, works on any device.
- **Show, don't tell.** This presentation is its own documentation.
