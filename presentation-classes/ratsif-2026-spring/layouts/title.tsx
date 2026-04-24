import type { LayoutProps } from "@/lib/class-module";
import { BrandStripe } from "../chrome/brand-stripe";
import {
  authorsLabel,
  eventDate,
  eventLabel,
} from "../lib/stripe-slots";

/**
 * Title layout for RaTSiF-2026 Spring.
 *
 * Per pptx master 1: bottom brand stripe only (no top stripe).
 * In presentation mode the compact nav (`platform.nav`) sits inside
 * the right half of the stripe, pinned to its outer edge. On mobile
 * the stripe hides and the full-bleed reader nav (`platform.readerNav`)
 * is `position: fixed` at the viewport bottom with a blurred backdrop;
 * `main` adds padding-bottom to keep the big title clear of the bar.
 */
export default function RatsifTitleLayout({
  slide,
  presentation,
  classMeta,
  platform,
}: LayoutProps) {
  const authors = presentation?.authors ?? [];

  return (
    <div className="flex h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between px-6 pt-6 sm:pt-10">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          {classMeta?.name ?? presentation?.title ?? ""}
        </div>
        <div data-reader-only>{platform.languageSwitcher}</div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-8 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible md:pb-8">
        <div className="flex flex-1 flex-col gap-6 text-center sm:text-left">
          {slide.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {slide.subtitle}
            </p>
          )}
          <h1
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "var(--class-primary, inherit)" }}
          >
            {slide.title}
          </h1>

          {authors.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {authors.map((a, i) => (
                <div key={i} className="leading-snug">
                  <span className="text-lg font-semibold">{a.name}</span>
                  {a.affiliation && (
                    <span className="text-lg text-zinc-500 dark:text-zinc-400">
                      {" "}
                      · {a.affiliation}
                    </span>
                  )}
                  {a.role && (
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {a.role}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {platform.titleQr && (
          <div data-qr className="flex shrink-0 flex-col items-stretch gap-6">
            {platform.languageSwitcher && (
              <div>{platform.languageSwitcher}</div>
            )}
            {platform.titleQr}
          </div>
        )}
      </main>

      <div
        data-reader-only
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-zinc-200 bg-white/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95"
      >
        {platform.readerNav}
      </div>

      <BrandStripe
        left={[eventDate(classMeta), authorsLabel(presentation)]}
        right={[eventLabel(classMeta), platform.nav]}
      />
    </div>
  );
}
