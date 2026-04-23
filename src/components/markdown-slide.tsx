"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import type { Root } from "mdast";
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
 */
function remarkDirectiveToHast() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        // The directive API is not in @types/mdast; cast once here.
        const n = node as unknown as {
          name: string;
          attributes?: Record<string, string>;
          data?: { hName?: string; hProperties?: Record<string, string> };
        };
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
        remarkPlugins={[remarkMath, remarkDirective, remarkDirectiveToHast]}
        rehypePlugins={[rehypeKatex]}
        components={slideComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
