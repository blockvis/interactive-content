import type { LayoutProps } from "@/lib/class-module";
import { MarkdownSlide } from "@/components/markdown-slide";

export default function ExampleContentLayout({ slide, platform }: LayoutProps) {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-end">
        {platform.languageSwitcher}
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-8 sm:flex-row sm:items-center sm:gap-16 sm:overflow-visible sm:pb-12">
        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
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
