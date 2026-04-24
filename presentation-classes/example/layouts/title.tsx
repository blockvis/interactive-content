import type { LayoutProps } from "@/lib/class-module";

export default function ExampleTitleLayout({
  slide,
  presentation,
  platform,
}: LayoutProps) {
  const authors = presentation?.authors ?? [];
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-end gap-2">
        {platform.translationBadge}
        {platform.languageSwitcher}
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-8 sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible">
        <div className="flex flex-1 flex-col gap-6 text-center sm:text-left">
          {slide.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-widest opacity-60">
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
            <div className="mt-2 flex flex-col gap-2 text-lg opacity-80">
              {authors.map((a, i) => (
                <div key={i}>
                  <span className="font-semibold">{a.name}</span>
                  {a.affiliation && (
                    <span className="opacity-70">
                      {" "}
                      · {a.affiliation}
                    </span>
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

      <footer className="mx-auto flex w-full max-w-5xl shrink-0 items-center justify-center">
        {platform.nav}
      </footer>
    </div>
  );
}
