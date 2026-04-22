import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-12 text-center">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Interactive Presentations
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Web-native slide decks with live formulas, multilingual support, and
            QR codes for every slide.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Featured
          </h2>

          <Link
            href="/gq128-beauty-presentation/slides/en/1"
            className="group block rounded-2xl border border-zinc-200 p-6 text-left transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  The Beauty of Complex Numbers
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  A journey through the elegance of complex numbers in
                  mathematics — from Euler&apos;s identity to the Riemann
                  sphere.
                </p>
              </div>
              <span className="shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
                →
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                EN
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                RU
              </span>
            </div>
          </Link>
        </section>

        <footer className="text-xs text-zinc-400 dark:text-zinc-600">
          More presentations coming soon.
        </footer>
      </div>
    </div>
  );
}
