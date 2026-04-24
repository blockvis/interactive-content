import data from "@/generated/slides.json";

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  layout: "title" | "section" | "content";
  section?: string;
  qr: boolean;
  content: string;
  backstage?: string;
  translatedBy?: string;
}

export interface Author {
  name: string;
  affiliation?: string;
  role?: string;
  email?: string;
  url?: string;
}

export interface PresentationMeta {
  slug: string;
  title: string | null;
  subtitle: string | null;
  shortTitle: string | null;
  authors: Author[];
  class: string | null;
  description: string;
  meta: Record<string, unknown>;
}

export interface ClassMeta {
  slug: string;
  name: string;
  event: Record<string, unknown> | null;
  colors: Record<string, string> | null;
  fonts: Record<string, unknown> | null;
  typography: Record<string, unknown> | null;
  chrome: Record<string, unknown> | null;
  description: string;
  meta: Record<string, unknown>;
}

interface PresentationData {
  presentation: PresentationMeta;
  class: ClassMeta | null;
  languages: string[];
  defaultLanguage: string;
  slides: Record<string, Slide[]>;
}

const allPresentations = data as unknown as Record<string, PresentationData>;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://interactive.blockvis.com";

export function getPresentationData(slug: string): PresentationData | undefined {
  return allPresentations[slug];
}

export function getSlidesForLang(slug: string, lang: string): Slide[] {
  const p = getPresentationData(slug);
  if (!p) return [];
  return p.slides[lang] ?? [];
}

export function getSlide(slug: string, lang: string, id: number): Slide | undefined {
  return getSlidesForLang(slug, lang).find((s) => s.id === id);
}

export function totalSlides(slug: string, lang: string): number {
  return getSlidesForLang(slug, lang).length;
}

export function getAllPresentationSlugs(): string[] {
  return Object.keys(allPresentations);
}
