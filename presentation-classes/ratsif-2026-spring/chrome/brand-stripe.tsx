import type { ReactNode } from "react";

/**
 * Class-specific chrome element for RaTSiF-2026 Spring.
 * Ports the two-colour brand stripe from the pptx master: a horizontal
 * bar split 50/50 by colour (`--class-stripe-dark` left,
 * `--class-stripe-light` right).
 *
 * Each half holds one or more text slots (date / authors / section /
 * short title / slide number). Empty-slot halves render as pure colour.
 *
 * The stripe sits in the flex-column flow of the layout (no absolute
 * positioning) and is tagged `data-presentation-only` so it is hidden
 * in reader / mobile mode (see src/app/globals.css).
 */
export function BrandStripe({
  left = [],
  right = [],
}: {
  left?: ReactNode[];
  right?: ReactNode[];
}) {
  return (
    <div
      data-presentation-only
      className="w-full shrink-0 font-medium text-white"
      style={{
        height: "var(--class-stripe-height, 0)",
        fontSize: "var(--class-stripe-font-size, 16px)",
      }}
    >
      <div className="flex h-full">
        <StripeHalf slots={left} bg="var(--class-stripe-dark)" />
        <StripeHalf slots={right} bg="var(--class-stripe-light)" />
      </div>
    </div>
  );
}

function StripeHalf({ slots, bg }: { slots: ReactNode[]; bg: string }) {
  // Slots may contain interactive chrome (nav with a popover dropdown),
  // so we deliberately do NOT set overflow: hidden / truncate here —
  // that would clip popovers rising above the stripe. Slots with plain
  // text should come pre-shortened; we only guard against line breaks
  // with whitespace-nowrap.
  if (slots.length === 0) {
    return <div className="flex-1" style={{ backgroundColor: bg }} />;
  }
  if (slots.length === 1) {
    return (
      <div
        className="flex flex-1 items-center justify-center px-6"
        style={{ backgroundColor: bg }}
      >
        <div className="whitespace-nowrap">{slots[0]}</div>
      </div>
    );
  }
  // Two or more slots: pin first to the inner edge, last to the outer edge.
  return (
    <div
      className="flex flex-1 items-center justify-between gap-4 px-6"
      style={{ backgroundColor: bg }}
    >
      {slots.map((slot, i) => (
        <div key={i} className="whitespace-nowrap">
          {slot}
        </div>
      ))}
    </div>
  );
}
