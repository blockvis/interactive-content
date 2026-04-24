import type { LayoutProps } from "@/lib/class-module";

/**
 * Reference content layout. Placement of `platform.tabSwitcher` above
 * `main` is intentional — when the slide has a backstage the pair of
 * pills stays pinned at the top of the column while the body scrolls
 * underneath; when it is absent the bar collapses. The body is always
 * `platform.slideBody` (the platform handles content-vs-backstage
 * switching internally).
 */
export default function ExampleContentLayout({ slide, platform }: LayoutProps) {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-end gap-2">
        {platform.translationBadge}
        {platform.languageSwitcher}
      </header>

      {platform.tabSwitcher && (
        <div className="mx-auto mt-4 flex w-full max-w-3xl shrink-0 justify-center opacity-80">
          {platform.tabSwitcher}
        </div>
      )}

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-8 sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible sm:pb-12">
        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
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
        </div>

        {platform.cornerQr && (
          <div data-qr className="shrink-0">
            {platform.cornerQr}
          </div>
        )}
      </main>

      <footer className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-center">
        {platform.nav}
      </footer>
    </div>
  );
}
