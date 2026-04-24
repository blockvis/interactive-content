import type { ReactNode } from "react";

/**
 * Side-by-side container for visual comparison of two (or more) items —
 * typically a pair of images that should be read *together*. Usage:
 *
 *     :::compare
 *     ![Argand: ...](../assets/abstract/axes-argand.jpg)
 *
 *     ![Wessel: ...](../assets/abstract/axes-wessel.jpg)
 *     :::
 *
 * The blank line between images keeps them in separate paragraphs, so
 * CSS grid can lay them out as two independent tiles. On narrow
 * viewports the tiles stack vertically without losing caption order.
 *
 * `alt` text stays on the `<img>` for accessibility; we intentionally
 * do not render visible captions — the surrounding prose already carries
 * the comparative gloss.
 */
export function Compare({ children }: { children?: ReactNode }) {
  return (
    <div
      className={[
        "not-prose my-6 grid gap-4 sm:grid-cols-2",
        "[&_p]:m-0",
        "[&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:rounded-lg",
        "[&_img]:border [&_img]:border-zinc-200 dark:[&_img]:border-zinc-800",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
