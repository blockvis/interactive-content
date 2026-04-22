import data from "@/generated/slides.json";

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  body: string;
}

interface SlidesData {
  languages: string[];
  defaultLanguage: string;
  slides: Record<string, Slide[]>;
}

const slidesData = data as SlidesData;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://complex-presentation.vercel.app";

export const { languages, defaultLanguage } = slidesData;

export function getSlidesForLang(lang: string): Slide[] {
  return slidesData.slides[lang] ?? [];
}

export function getSlide(lang: string, id: number): Slide | undefined {
  return getSlidesForLang(lang).find((s) => s.id === id);
}

export function totalSlides(lang: string): number {
  return getSlidesForLang(lang).length;
}
