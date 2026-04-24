"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type SlideNavOrientation = "horizontal" | "pills" | "next-only";

/**
 * Platform-provided navigation slot.
 *
 * - `horizontal` (default): pill row with Prev / slide # / Next and text
 *   labels. Disabled state is rendered as a ghost button. Used for the
 *   mobile sticky footer and as a default for classes that don't customize.
 * - `pills`: triangle-icon pills in a single row with a centred number
 *   input — user can type a slide number to jump. Disabled buttons are
 *   hidden. Used by classes that hoist nav into a side column.
 * - `next-only`: a single large Next pill with a triangle icon. Used
 *   under the title QR where Prev does not apply.
 *
 * All variants wire up ArrowLeft / ArrowRight / Space keybindings.
 */
export function SlideNav({
  currentSlide,
  totalSlides,
  lang,
  routePrefix = "",
  showSlideNumber = true,
  orientation = "horizontal",
}: {
  currentSlide: number;
  totalSlides: number;
  lang: string;
  routePrefix?: string;
  showSlideNumber?: boolean;
  orientation?: SlideNavOrientation;
}) {
  const router = useRouter();
  const hasPrev = currentSlide > 1;
  const hasNext = currentSlide < totalSlides;
  const hrefFor = (n: number) => `${routePrefix}/slides/${lang}/${n}`;
  const prevHref = hrefFor(currentSlide - 1);
  const nextHref = hrefFor(currentSlide + 1);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Ignore keybindings while the number input is focused — user is typing.
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if ((e.key === "ArrowRight" || e.key === " ") && hasNext) {
        e.preventDefault();
        router.push(nextHref);
      } else if (e.key === "ArrowLeft" && hasPrev) {
        router.push(prevHref);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasNext, hasPrev, nextHref, prevHref, router]);

  if (orientation === "next-only") {
    if (!hasNext) return null;
    return (
      <nav aria-label="Slide navigation">
        <Link
          href={nextHref}
          aria-label="Next slide"
          className="flex h-20 w-20 items-center justify-center rounded-full transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--class-muted, #e4e4e7)",
            color: "var(--class-accent, #0f172a)",
          }}
        >
          <TriangleIcon direction="right" size={32} />
        </Link>
      </nav>
    );
  }

  if (orientation === "pills") {
    return (
      <nav
        className="flex items-center gap-2"
        aria-label="Slide navigation"
      >
        {hasPrev ? (
          <Link
            href={prevHref}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <TriangleIcon direction="left" />
          </Link>
        ) : (
          <span className="h-11 w-11" aria-hidden />
        )}

        <SlideNumberInput
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onJump={(n) => router.push(hrefFor(n))}
        />

        {hasNext ? (
          <Link
            href={nextHref}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--class-primary, #0f172a)",
              color: "var(--class-background, white)",
            }}
          >
            <TriangleIcon direction="right" />
          </Link>
        ) : (
          <span className="h-11 w-11" aria-hidden />
        )}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-4" aria-label="Slide navigation">
      {hasPrev ? (
        <Link
          href={prevHref}
          className="flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <span aria-hidden>←</span> Prev
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-2 rounded-full border border-zinc-100 px-5 text-sm font-medium text-zinc-300 dark:border-zinc-800 dark:text-zinc-600">
          <span aria-hidden>←</span> Prev
        </span>
      )}

      {showSlideNumber && (
        <span className="text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
          {currentSlide}/{totalSlides}
        </span>
      )}

      {hasNext ? (
        <Link
          href={nextHref}
          className="flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--class-primary, #0f172a)",
            color: "var(--class-background, white)",
          }}
        >
          Next <span aria-hidden>→</span>
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-2 rounded-full bg-zinc-200 px-5 text-sm font-medium text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
          Next <span aria-hidden>→</span>
        </span>
      )}
    </nav>
  );
}

function SlideNumberInput({
  currentSlide,
  totalSlides,
  onJump,
}: {
  currentSlide: number;
  totalSlides: number;
  onJump: (n: number) => void;
}) {
  const [value, setValue] = useState(String(currentSlide));

  useEffect(() => {
    setValue(String(currentSlide));
  }, [currentSlide]);

  function commit() {
    const n = Number(value);
    if (!Number.isFinite(n)) {
      setValue(String(currentSlide));
      return;
    }
    const clamped = Math.min(Math.max(Math.round(n), 1), totalSlides);
    if (clamped !== currentSlide) onJump(clamped);
    setValue(String(clamped));
  }

  return (
    <input
      type="number"
      inputMode="numeric"
      min={1}
      max={totalSlides}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
      aria-label={`Slide number (1–${totalSlides})`}
      className="w-12 rounded-md border border-zinc-200 bg-white px-1 py-0.5 text-center text-sm font-semibold tabular-nums text-zinc-900 outline-none focus:border-zinc-400 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}

function TriangleIcon({
  direction,
  size = 20,
}: {
  direction: "left" | "right";
  size?: number;
}) {
  // 24×24 viewBox; filled equilateral triangle centred in the box.
  const points =
    direction === "right" ? "8,5 19,12 8,19" : "16,5 5,12 16,19";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}
