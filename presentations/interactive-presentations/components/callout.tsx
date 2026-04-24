import type { ReactNode } from "react";

/**
 * Inline sidenote / highlight block. Usage in markdown:
 *
 *     :::callout{tone=accent}
 *     Ключевая мысль или важная деталь.
 *     :::
 */
export function Callout({
  tone = "primary",
  children,
}: {
  tone?: "primary" | "accent";
  children?: ReactNode;
}) {
  const borderColor =
    tone === "accent" ? "var(--class-accent)" : "var(--class-primary)";
  return (
    <aside
      className="my-6 rounded-xl border-l-4 bg-zinc-50 px-4 py-3 text-sm dark:bg-zinc-900/40"
      style={{ borderColor }}
    >
      {children}
    </aside>
  );
}
