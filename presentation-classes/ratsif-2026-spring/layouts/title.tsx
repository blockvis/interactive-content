import type { LayoutProps } from "@/lib/class-module";
import { BrandStripe } from "../chrome/brand-stripe";
import {
  authorsLabel,
  eventDate,
  eventLabel,
} from "../lib/stripe-slots";

/**
 * Title layout for RaTSiF-2026 Spring.
 * Per pptx master 1: bottom brand stripe only (no top stripe).
 */
export default function RatsifTitleLayout({
  slide,
  presentation,
  classMeta,
  platform,
}: LayoutProps) {
  const authors = presentation?.authors ?? [];
  const slideNumber = (
    <span className="text-[1.25em] font-extrabold tracking-wider">
      {platform.slideNumber} / {platform.total}
    </span>
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between px-6 pt-6 sm:pt-10">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          {classMeta?.name ?? presentation?.title ?? ""}
        </div>
        <div data-reader-only>{platform.languageSwitcher}</div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-8 sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible">
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
            <div className="flex justify-center pt-2">
              {platform.navNextOnly}
            </div>
          </div>
        )}
      </main>

      <div data-reader-only className="shrink-0">
        <footer
          className="mx-auto flex w-full max-w-5xl items-center justify-center border-t border-zinc-100 px-6 pb-6 pt-4 dark:border-zinc-800"
          style={{ minHeight: "var(--class-nav-height, 56px)" }}
        >
          {platform.nav}
        </footer>
      </div>

      <BrandStripe
        left={[eventDate(classMeta), authorsLabel(presentation)]}
        right={[eventLabel(classMeta), slideNumber]}
      />
    </div>
  );
}
