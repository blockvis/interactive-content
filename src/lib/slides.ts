import data from "@/generated/slides.json";

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  /** Role of the slide; drives chrome decisions (QR, layout choice). */
  layout: "title" | "section" | "content";
  /** Optional section label shown in the top brand stripe (empty → blank). */
  section?: string;
  /** Whether the per-slide corner QR is allowed on this slide (default true). */
  qr: boolean;
  body: string;
}

export interface Author {
  name: string;
  affiliation?: string;
  role?: string;
  /** Optional contact lines, rendered by class layouts in side panels. */
  email?: string;
  url?: string;
}

export interface PresentationMeta {
  slug: string;
  title: string | null;
  subtitle: string | null;
  /** Compact variant of `title` for chrome / stripes. Fallback: `title`. */
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

interface SlidesData {
  presentation: PresentationMeta;
  class: ClassMeta | null;
  languages: string[];
  defaultLanguage: string;
  slides: Record<string, Slide[]>;
}

const slidesData = data as unknown as SlidesData;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://interactive.blockvis.com";

export const { languages, defaultLanguage } = slidesData;
export const presentation: PresentationMeta = slidesData.presentation;
export const presentationClass: ClassMeta | null = slidesData.class;

export function getSlidesForLang(lang: string): Slide[] {
  return slidesData.slides[lang] ?? [];
}

export function getSlide(lang: string, id: number): Slide | undefined {
  return getSlidesForLang(lang).find((s) => s.id === id);
}

export function totalSlides(lang: string): number {
  return getSlidesForLang(lang).length;
}
