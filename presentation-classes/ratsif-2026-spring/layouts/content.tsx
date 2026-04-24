import type { LayoutProps } from "@/lib/class-module";
import { MarkdownSlide } from "@/components/markdown-slide";
import { BrandStripe } from "../chrome/brand-stripe";
import { SideRail } from "../chrome/side-rail";
import {
  authorsLabel,
  eventDate,
  eventLabel,
  shortPaperTitle,
} from "../lib/stripe-slots";

/**
 * Content / section layout for RaTSiF-2026 Spring.
 *
 * Structure (presentation mode):
 *
 *   ┌ top stripe ──────────────────────────────────────┐
 *   │ header (class name · lang on mobile)             │
 *   │ main                                             │ side rail
 *   │                                                  │ (QR + contacts)
 *   └ bottom stripe · ◀ 2/3 ▶ pinned right ────────────┘
 *
 * The slide nav sits inside the right half of the bottom brand stripe,
 * pinned to its outer edge — so it inherits the stripe's white-on-blue
 * style and participates visually as part of the brand band. On mobile
 * the stripes hide (`data-presentation-only`) and a fallback sticky nav
 * appears at the bottom of the content column (`data-reader-only`).
 */
export default function RatsifContentLayout({
  slide,
  presentation,
  classMeta,
  platform,
}: LayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <BrandStripe
        left={[slide.section ?? ""]}
        right={[shortPaperTitle(presentation)]}
      />

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col px-6 py-6 sm:py-10">
          <header className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-between">
            <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              {classMeta?.name ?? presentation?.title ?? ""}
            </div>
            <div data-reader-only>{platform.languageSwitcher}</div>
          </header>

          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 overflow-y-auto py-8">
            {slide.subtitle && (
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {slide.subtitle}
              </p>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {slide.title}
            </h1>
            <div className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              <MarkdownSlide content={slide.body} />
            </div>
          </main>

          <div
            data-reader-only
            className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-center border-t border-zinc-100 pt-4 text-base text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
          >
            {platform.nav}
          </div>
        </div>

        <SideRail
          languageSwitcher={platform.languageSwitcher}
          qr={platform.cornerQr}
          authors={presentation?.authors ?? []}
        />
      </div>

      <BrandStripe
        left={[eventDate(classMeta), authorsLabel(presentation)]}
        right={[eventLabel(classMeta), platform.nav]}
      />
    </div>
  );
}
