import type { LayoutProps } from "@/lib/class-module";
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
 *   │ tab header (sticky) · [ Slide │ Backstage ]      │
 *   │ header (class name · lang on mobile)             │
 *   │ main                                             │ side rail
 *   │                                                  │ (QR + contacts)
 *   └ bottom stripe · ◀ 2/3 ▶ pinned right ────────────┘
 *
 * In presentation mode the compact nav (`platform.nav`) sits inside the
 * right half of the bottom brand stripe, pinned to its outer edge, and
 * inherits the stripe's white-on-blue style. On mobile the stripes hide
 * (`data-presentation-only`) and the full-bleed reader nav
 * (`platform.readerNav`) is `position: fixed` at the viewport bottom
 * with a translucent blurred backdrop, so body text scrolls underneath
 * it; `main` reserves ~6rem + safe-area of padding-bottom so the last
 * lines clear the bar.
 *
 * The optional tab switcher (`platform.tabSwitcher`) sits in a pinned
 * bar above the scrollable main — same on desktop and mobile — so the
 * user can flip between the slide proper and its backstage materials
 * without losing orientation while scrolling. When the slide has no
 * backstage, `tabSwitcher` is null and the bar collapses.
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
            <div className="text-sm font-medium opacity-60">
              {classMeta?.name ?? presentation?.title ?? ""}
            </div>
            <div
              data-reader-only
              className="flex items-center gap-2 opacity-70"
            >
              {platform.translationBadge}
              {platform.languageSwitcher}
            </div>
          </header>

          {platform.tabSwitcher && (
            <div className="mx-auto mt-4 flex w-full max-w-3xl shrink-0 justify-center opacity-80">
              {platform.tabSwitcher}
            </div>
          )}

          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-start gap-4 overflow-y-auto py-8 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-8">
            {slide.subtitle && (
              <p className="text-sm font-semibold uppercase tracking-widest opacity-60">
                {slide.subtitle}
              </p>
            )}
            <h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: "var(--class-primary, inherit)" }}
            >
              {slide.title}
            </h1>
            <div className="text-lg leading-relaxed opacity-90">
              {platform.slideBody}
            </div>
          </main>

          <div
            data-reader-only
            className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-zinc-200 bg-white/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95"
          >
            {platform.readerNav}
          </div>
        </div>

        <SideRail
          languageSwitcher={platform.languageSwitcher}
          translationBadge={platform.translationBadge}
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
