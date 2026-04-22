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
    <div className="flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto w-full max-w-3xl shrink-0">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Complex Presentation
        </div>
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
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {slide.body}
          </p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <SlideQRCode url={slideUrl} />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-3xl shrink-0 border-t border-zinc-100 pt-4 sm:border-0 sm:pt-0 dark:border-zinc-800">
        <div className="flex justify-center">
          <SlideNav currentSlide={slide.id} />
        </div>
      </footer>
    </div>
  );
}
