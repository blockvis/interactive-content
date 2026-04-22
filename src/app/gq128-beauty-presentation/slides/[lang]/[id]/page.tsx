import { notFound } from "next/navigation";
import {
  getSlide,
  getSlidesForLang,
  languages,
  totalSlides,
} from "@/lib/slides";
import { SlideNav } from "@/components/slide-nav";
import { SlideQRCode } from "@/components/qr-code";
import { MarkdownSlide } from "@/components/markdown-slide";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Metadata } from "next";

const SLUG = "gq128-beauty-presentation";

export function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of languages) {
    for (const slide of getSlidesForLang(lang)) {
      params.push({ lang, id: String(slide.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const slide = getSlide(lang, Number(id));
  if (!slide) return {};
  return {
    title: `${slide.title} — Complex Presentation`,
    description: slide.body.slice(0, 160),
  };
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const slideId = Number(id);
  const slide = getSlide(lang, slideId);

  if (!slide) notFound();

  const slidePath = `/${SLUG}/slides/${lang}/${slide.id}`;
  const total = totalSlides(lang);
  const routePrefix = `/${SLUG}`;

  return (
    <div className="flex h-dvh flex-col overflow-hidden px-6 py-10 sm:py-16">
      <header className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-between">
        <div className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Complex Presentation
        </div>
        <LanguageSwitcher
          currentLang={lang}
          currentSlide={slideId}
          routePrefix={routePrefix}
        />
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

        <div className="hidden shrink-0 sm:block">
          <SlideQRCode path={slidePath} />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-3xl shrink-0 border-t border-zinc-100 pt-4 sm:border-0 sm:pt-0 dark:border-zinc-800">
        <div className="flex justify-center">
          <SlideNav
            currentSlide={slideId}
            totalSlides={total}
            lang={lang}
            routePrefix={routePrefix}
          />
        </div>
      </footer>
    </div>
  );
}
