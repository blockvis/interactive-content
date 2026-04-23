---
name: Slide content pipeline
overview: Migrate slide content from TypeScript data to Markdown files in an `example/` directory, with frontmatter, KaTeX formulas, relative images, and a multilingual compilation pipeline compatible with Vercel static builds.
todos:
  - id: manifest
    content: Create example/MANIFEST.md explaining the project concept and methodology
    status: pending
  - id: example-content
    content: Create example/ directory with .languages, and migrate 3 existing slides to slide001.ru.md, slide002.ru.md, slide003.ru.md with frontmatter
    status: pending
  - id: compile-script
    content: Create scripts/compile.mjs -- reads .languages, parses MD with gray-matter, rewrites image paths, outputs src/generated/slides.json, copies images
    status: pending
  - id: deps
    content: "Install dependencies: gray-matter, react-markdown, remark-math, rehype-katex, katex"
    status: pending
  - id: slides-lib
    content: Rewrite src/lib/slides.ts to import from src/generated/slides.json with language support
    status: pending
  - id: markdown-component
    content: Create src/components/markdown-slide.tsx with react-markdown + remark-math + rehype-katex
    status: pending
  - id: routing
    content: "Restructure routing: /slides/[lang]/[id] with generateStaticParams over languages x slides"
    status: pending
  - id: update-nav
    content: Update SlideNav, page redirect, and metadata for multilingual routes
    status: pending
  - id: build-script
    content: Update package.json build command to run compile before next build; gitignore src/generated/
    status: pending
  - id: verify
    content: Run build to verify the full pipeline works end-to-end
    status: pending
isProject: false
---

# Slide Content Pipeline: MD-first Multilingual Presentations

## Architecture Overview

The `example/` directory becomes the single source of truth for presentation content. A prebuild script compiles `.md` files into JSON that Next.js consumes at build time. Images are copied to `public/content/`, and routes are extended to `[lang]/[id]`.

## File Structure

```
example/
  MANIFEST.md          # Meta-document explaining the concept
  .languages           # One language code per line: ru\nen\n...
  slide001.ru.md       # Original slide (frontmatter + markdown + KaTeX)
  slide001.en.md       # Translation (generated or manual)
  slide002.ru.md
  slide002.en.md
  images/
    euler-formula.png  # Referenced from MD as ![](images/euler-formula.png)
```

## Markdown File Format

Each `.md` file uses YAML frontmatter for metadata and standard markdown body with KaTeX support:

```markdown
---
title: "Презентации нового поколения"
subtitle: "Complex Presentation"
---

Забудьте о статичных слайдах. Формула Эйлера: $e^{i\pi} + 1 = 0$

Блочная формула:

$$
\sum_{n=0}^{\infty} \frac{z^n}{n!} = e^z
$$

![Диаграмма](images/euler-formula.png)
```

## Compilation Pipeline (prebuild)

A single script `scripts/compile.mjs` runs before `next build`:

1. **Read** `example/.languages` to get the list of target languages
2. **Glob** `example/slide*.{lang}.md` for each language
3. **Parse** frontmatter (via `gray-matter`) to extract `title`, `subtitle`
4. **Rewrite** image paths: `![](images/foo.png)` becomes `![](/content/images/foo.png)`
5. **Copy** `example/images/` to `public/content/images/`
6. **Output** `src/generated/slides.json` structured as:

```json
{
  "languages": ["ru", "en"],
  "defaultLanguage": "ru",
  "slides": {
    "ru": [
      { "id": 1, "title": "...", "subtitle": "...", "body": "..." }
    ],
    "en": [
      { "id": 1, "title": "...", "subtitle": "...", "body": "..." }
    ]
  }
}
```

The `body` field contains **raw markdown** (not HTML) -- rendering happens at runtime via React.

## Build Command

In `package.json`:
```
"build": "node scripts/compile.mjs && next build"
```

This ensures Vercel runs the compile step automatically.

## Runtime Rendering

A new `<MarkdownSlide>` client component renders the markdown body using:
- **`react-markdown`** -- renders MD to React elements
- **`remark-math`** -- parses `$...$` and `$$...$$` blocks
- **`rehype-katex`** -- renders math to KaTeX HTML
- **`katex/dist/katex.min.css`** -- KaTeX styles

## Routing Changes

Current: `/slides/[id]` (e.g., `/slides/1`)

Proposed: `/slides/[lang]/[id]` (e.g., `/slides/ru/1`, `/slides/en/1`)

- `/` redirects to `/slides/{defaultLanguage}/1`
- `/slides/[lang]/[id]/page.tsx` reads from the generated JSON
- `generateStaticParams` iterates all languages x all slides
- A language switcher link appears in the slide header

## New Dependencies

- `gray-matter` -- YAML frontmatter parsing (compile time)
- `react-markdown` -- MD rendering (runtime)
- `remark-math` -- math syntax plugin (runtime)
- `rehype-katex` -- KaTeX rendering plugin (runtime)
- `katex` -- KaTeX CSS (runtime)
- `glob` -- file globbing in compile script (compile time, or use Node built-in)

## Key Files to Modify

- [`src/lib/slides.ts`](src/lib/slides.ts) -- replace hardcoded array with JSON import from `src/generated/slides.json`
- [`src/app/slides/[id]/page.tsx`](src/app/slides/[id]/page.tsx) -- move to `[lang]/[id]`, add markdown rendering
- [`src/app/page.tsx`](src/app/page.tsx) -- update redirect to include default language
- [`next.config.ts`](next.config.ts) -- no changes needed (static generation works as-is)
- [`package.json`](package.json) -- add deps, update build script

## Key Files to Create

- `example/MANIFEST.md` -- explains the meta-concept for people cloning the repo
- `example/.languages` -- language list
- `example/slide001.ru.md`, `slide002.ru.md`, `slide003.ru.md` -- migrated content
- `scripts/compile.mjs` -- the prebuild pipeline
- `src/generated/slides.json` -- auto-generated (gitignored)
- `src/components/markdown-slide.tsx` -- React component for MD + KaTeX rendering

## What Is NOT in Scope (MVP)

- Automatic AI translation (future: `scripts/translate.mjs` calling an LLM API)
- Runtime language switching via API
- MDX (interactive components inside slides) -- plain MD + KaTeX is sufficient
- Slide transitions / animations