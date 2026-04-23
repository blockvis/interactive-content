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
  const slideNumber = `${platform.slideNumber} / ${platform.total}`;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          {classMeta?.name ?? presentation?.title ?? ""}
        </div>
        {platform.languageSwitcher}
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-8 sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible">
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
          <div data-qr className="shrink-0">
            {platform.titleQr}
          </div>
        )}
      </main>

      <footer
        className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-center border-t border-zinc-100 pt-4 sm:border-0 sm:pt-0 dark:border-zinc-800"
        style={{ minHeight: "var(--class-nav-height, 56px)" }}
      >
        {platform.nav}
      </footer>

      <BrandStripe
        position="bottom"
        left={[eventDate(classMeta), authorsLabel(presentation)]}
        right={[eventLabel(classMeta), slideNumber]}
      />
    </div>
  );
}
