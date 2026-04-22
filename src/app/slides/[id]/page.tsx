import { notFound } from "next/navigation";
import { getSlide, slides, SITE_URL } from "@/lib/slides";
import { SlideNav } from "@/components/slide-nav";
import { SlideQRCode } from "@/components/qr-code";
import type { Metadata } from "next";

export function generateStaticParams() {
  return slides.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const slide = getSlide(Number(id));
  if (!slide) return {};
  return {
    title: `${slide.title} — Complex Presentation`,
    description: slide.body,
  };
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slideId = Number(id);
  const slide = getSlide(slideId);

  if (!slide) notFound();

  const slideUrl = `${SITE_URL}/slides/${slide.id}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-10 sm:py-16">
      <header className="w-full max-w-3xl">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Complex Presentation
        </div>
      </header>

      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 py-12 sm:flex-row sm:items-center sm:gap-16">
        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
          {slide.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {slide.subtitle}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            {slide.title}
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {slide.body}
          </p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <SlideQRCode url={slideUrl} />
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 flex w-full justify-center border-t border-zinc-100 bg-white/80 py-4 backdrop-blur-sm sm:static sm:w-full sm:max-w-3xl sm:border-0 sm:bg-transparent sm:py-0 sm:backdrop-blur-none dark:border-zinc-800 dark:bg-zinc-950/80 sm:dark:bg-transparent">
        <SlideNav currentSlide={slide.id} />
      </footer>
    </div>
  );
}
