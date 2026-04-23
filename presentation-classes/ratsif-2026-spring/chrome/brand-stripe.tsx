import type { ReactNode } from "react";

/**
 * Class-specific chrome element for RaTSiF-2026 Spring.
 * Ports the two-colour brand stripe from the pptx master: a horizontal
 * bar at the top or bottom edge, split 50/50 by colour
 * (`--class-stripe-dark` left, `--class-stripe-light` right).
 *
 * Each half holds one or more text slots (date / authors / section /
 * short title / slide number). Empty-slot halves render as pure colour.
 *
 * The host layout must provide `position: relative` on an outer container
 * so this absolute bar anchors to the slide, not to the document.
 */
export function BrandStripe({
  position,
  left = [],
  right = [],
}: {
  position: "top" | "bottom";
  left?: ReactNode[];
  right?: ReactNode[];
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-20 flex text-[11px] font-medium text-white ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
      style={{ height: "var(--class-stripe-height, 0)" }}
    >
      <StripeHalf slots={left} bg="var(--class-stripe-dark)" />
      <StripeHalf slots={right} bg="var(--class-stripe-light)" />
    </div>
  );
}

function StripeHalf({ slots, bg }: { slots: ReactNode[]; bg: string }) {
  return (
    <div
      className="flex flex-1 items-center"
      style={{ backgroundColor: bg }}
    >
      {slots.map((slot, i) => (
        <div
          key={i}
          className="flex-1 truncate whitespace-nowrap px-3 text-center"
        >
          {slot}
        </div>
      ))}
    </div>
  );
}
