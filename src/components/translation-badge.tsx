/**
 * Small, visually-unobtrusive indicator that the current slide is a
 * translation from the canonical language, not the author's original.
 * The badge appears on every non-canonical language; the distinction
 * between hand-authored and AI-assisted translations lives in the
 * tooltip (via the native `title` attribute) and is reflected in the
 * aria-label for screen readers — the visible text itself stays
 * consistent across all non-canonical slides.
 *
 * Colour is inherited from the container (`currentColor`), so the badge
 * blends into brand stripes, white sidebars, or dark headers without
 * bespoke variants. Intended placement — right next to the language
 * switcher, so the signal sits with the language context.
 */
export function TranslationBadge({
  sourceLang,
  model,
}: {
  sourceLang: string;
  model?: string | null;
}) {
  const codeLabel = sourceLang.toUpperCase();
  const aria = model
    ? `AI-translated from ${codeLabel} via ${model}`
    : `Translated from ${codeLabel}`;
  return (
    <span
      role="img"
      aria-label={aria}
      title={aria}
      className="inline-flex shrink-0 items-center gap-1 text-xs opacity-80 hover:opacity-100"
    >
      {/*
        U+2139 U+FE0F — the blue circled "i" info emoji. The variation
        selector forces emoji presentation so the glyph renders in colour
        on every modern OS (otherwise falls back to monochrome in some
        browsers). aria-hidden because `role="img"` on the wrapper already
        carries the accessible name.
      */}
      <span aria-hidden="true">ℹ️</span>
      {model && (
        <span aria-hidden="true" className="font-semibold tracking-wide">
          AI
        </span>
      )}
    </span>
  );
}
