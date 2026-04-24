"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import { visit } from "unist-util-visit";
import "katex/dist/katex.min.css";
import { components as presentationComponents } from "@presentation/components";
import classModule from "@/generated/class";

/**
 * Resolution chain for directive components, specificity high → low:
 *   presentation-level (per-deck) overrides
 *   class-level        (shared by one conference / series)
 *   platform-level     (future: default primitives like <Aside/>)
 */
const PLATFORM_COMPONENTS: Record<string, unknown> = {};
const CLASS_COMPONENTS = classModule.components ?? {};

/**
 * Rewrites remark-directive nodes into hast-compatible elements. The
 * directive's name becomes the tag name, and attributes become props,
 * so react-markdown's `components` map can render them as React.
 *
 * `remark-directive` accepts any non-punctuation, non-whitespace run as a
 * directive name — including purely numeric runs such as `:10` inside
 * `DOI:10.1145/...`. Since HTML tag names must start with a letter, we
 * only rewrite directives whose names are valid custom-element-ish
 * identifiers; everything else is turned back into plain text so that
 * accidental sequences like `DOI:10` render verbatim.
 */
const VALID_DIRECTIVE_NAME = /^[A-Za-z][A-Za-z0-9-]*$/;

function remarkDirectiveToHast() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const n = node as unknown as {
          type: string;
          name: string;
          attributes?: Record<string, string>;
          data?: { hName?: string; hProperties?: Record<string, string> };
          children?: unknown[];
          value?: string;
        };

        if (!VALID_DIRECTIVE_NAME.test(n.name)) {
          const prefix =
            node.type === "textDirective"
              ? ":"
              : node.type === "leafDirective"
                ? "::"
                : ":::";
          (n as unknown as { type: string }).type = "text";
          n.value = `${prefix}${n.name}`;
          n.children = undefined;
          n.data = undefined;
          return;
        }

        const data = n.data ?? (n.data = {});
        data.hName = n.name;
        data.hProperties = n.attributes ?? {};
      }
    });
  };
}

const slideComponents = {
  ...PLATFORM_COMPONENTS,
  ...CLASS_COMPONENTS,
  ...presentationComponents,
} as unknown as Components;

export function MarkdownSlide({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkDirective, remarkDirectiveToHast]}
        rehypePlugins={[rehypeKatex]}
        components={slideComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
