"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Unified slide navigation.
 *
 * Visual:    ◀  2 / 3  ▶
 *
 * Click on the "2 / 3" badge to enter edit mode: the number becomes an
 * input (type a new slide number, Enter to jump) and a dropdown pops up
 * *above* it listing every slide with its title so the user can jump
 * by clicking.
 *
 * Styling is intentionally inherited from the container — triangle icons
 * use `currentColor` and are sized in `em`, the number is `font-inherit`.
 * This lets the same component look right in a dark brand stripe, a
 * sticky footer on white, a sidebar, etc., without variant props.
 *
 * Keyboard: ArrowLeft / ArrowRight / Space navigate prev/next. Bindings
 * are suppressed while an input is focused so users can type a number.
 */
export function SlideNav({
  currentSlide,
  slides,
  lang,
  routePrefix = "",
}: {
  currentSlide: number;
  slides: { id: number; title: string | null }[];
  lang: string;
  routePrefix?: string;
}) {
  const router = useRouter();
  const total = slides.length;
  const hasPrev = currentSlide > 1;
  const hasNext = currentSlide < total;
  const hrefFor = (n: number) => `${routePrefix}/slides/${lang}/${n}`;
  const prevHref = hrefFor(currentSlide - 1);
  const nextHref = hrefFor(currentSlide + 1);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(currentSlide));
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editing) return;
    function onPointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [editing]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
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

  function commit() {
    const n = Number(value);
    if (Number.isFinite(n)) {
      const clamped = Math.min(Math.max(Math.round(n), 1), total);
      if (clamped !== currentSlide) {
        router.push(hrefFor(clamped));
      }
    }
    setEditing(false);
  }

  function openEdit() {
    setValue(String(currentSlide));
    setEditing(true);
  }

  return (
    <nav className="inline-flex items-center gap-[0.9em]" aria-label="Slide navigation">
      {hasPrev ? (
        <Link
          href={prevHref}
          aria-label="Previous slide"
          className="inline-flex cursor-pointer opacity-80 transition-opacity hover:opacity-100"
        >
          <TriangleIcon direction="left" />
        </Link>
      ) : (
        <span aria-hidden className="inline-flex opacity-20">
          <TriangleIcon direction="left" />
        </span>
      )}

      <div ref={panelRef} className="relative">
        {!editing ? (
          <button
            type="button"
            onClick={openEdit}
            aria-label={`Slide ${currentSlide} of ${total} — click to jump`}
            className="cursor-pointer rounded px-1 font-semibold tabular-nums underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
          >
            {currentSlide} / {total}
          </button>
        ) : (
          <>
            <ul
              aria-label="Jump to slide"
              className="absolute bottom-full left-1/2 mb-3 max-h-[min(60vh,22rem)] min-w-[16rem] -translate-x-1/2 overflow-y-auto rounded-lg border border-zinc-200 bg-white py-1 text-sm text-zinc-700 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {slides.map((s) => {
                const current = s.id === currentSlide;
                return (
                  <li key={s.id}>
                    <Link
                      href={hrefFor(s.id)}
                      onClick={() => setEditing(false)}
                      aria-current={current ? "true" : undefined}
                      className={`flex items-baseline gap-3 px-4 py-2 leading-snug transition-colors ${
                        current
                          ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <span className="w-5 shrink-0 text-right tabular-nums text-zinc-400 dark:text-zinc-500">
                        {s.id}
                      </span>
                      <span className="truncate">
                        {s.title ?? `Slide ${s.id}`}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={total}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commit();
                } else if (e.key === "Escape") {
                  setEditing(false);
                }
              }}
              autoFocus
              aria-label={`Slide number (1–${total})`}
              className="w-[4ch] rounded border border-zinc-300 bg-white px-1 text-center font-semibold tabular-nums text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </>
        )}
      </div>

      {hasNext ? (
        <Link
          href={nextHref}
          aria-label="Next slide"
          className="inline-flex cursor-pointer opacity-80 transition-opacity hover:opacity-100"
        >
          <TriangleIcon direction="right" />
        </Link>
      ) : (
        <span aria-hidden className="inline-flex opacity-20">
          <TriangleIcon direction="right" />
        </span>
      )}
    </nav>
  );
}

/** Filled triangle, sized in `em`, coloured via currentColor. */
function TriangleIcon({
  direction,
  size = "1.1em",
}: {
  direction: "left" | "right";
  size?: string;
}) {
  const points =
    direction === "right" ? "8,5 19,12 8,19" : "16,5 5,12 16,19";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ width: size, height: size }}
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}

/**
 * Reader-mode slide navigation.
 *
 *   [ ◀ ]       2 / 3                [ ▶ ]
 *               Slide title
 *
 * Full-width by design — meant to occupy the entire sticky bottom
 * strip on mobile. Big touch targets at the edges, current slide
 * number plus title centred between them. No popover, no input,
 * no keyboard affordances: on mobile the unified desktop nav
 * (`SlideNav`) still owns the keyboard contract for the rare
 * tablet-with-keyboard case, and that component also sits in the
 * DOM (hidden by `data-presentation-only`).
 */
export function ReaderSlideNav({
  currentSlide,
  slides,
  lang,
  routePrefix = "",
}: {
  currentSlide: number;
  slides: { id: number; title: string | null }[];
  lang: string;
  routePrefix?: string;
}) {
  const total = slides.length;
  const hasPrev = currentSlide > 1;
  const hasNext = currentSlide < total;
  const hrefFor = (n: number) => `${routePrefix}/slides/${lang}/${n}`;
  const current = slides.find((s) => s.id === currentSlide);
  const title = current?.title ?? `Slide ${currentSlide}`;

  const buttonBase =
    "flex shrink-0 items-center justify-center rounded-full px-4 py-3 transition-colors";
  const buttonEnabled =
    "text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700";
  const buttonDisabled = "text-zinc-300 dark:text-zinc-700";

  return (
    <nav
      className="flex w-full items-center gap-2"
      aria-label="Slide navigation"
    >
      {hasPrev ? (
        <Link
          href={hrefFor(currentSlide - 1)}
          aria-label="Previous slide"
          className={`${buttonBase} ${buttonEnabled}`}
        >
          <TriangleIcon direction="left" size="1.75em" />
        </Link>
      ) : (
        <span aria-hidden className={`${buttonBase} ${buttonDisabled}`}>
          <TriangleIcon direction="left" size="1.75em" />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col items-center text-center leading-tight">
        <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
          {currentSlide} / {total}
        </span>
        <span className="max-w-full truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {title}
        </span>
      </div>

      {hasNext ? (
        <Link
          href={hrefFor(currentSlide + 1)}
          aria-label="Next slide"
          className={`${buttonBase} ${buttonEnabled}`}
        >
          <TriangleIcon direction="right" size="1.75em" />
        </Link>
      ) : (
        <span aria-hidden className={`${buttonBase} ${buttonDisabled}`}>
          <TriangleIcon direction="right" size="1.75em" />
        </span>
      )}
    </nav>
  );
}
