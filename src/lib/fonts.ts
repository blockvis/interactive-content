import { Inter, Open_Sans } from "next/font/google";

/**
 * Curated catalog of fonts available to presentation classes.
 * `class.md` picks fonts by family name; next/font/google requires static
 * imports, so extending support to a new family is a code change here.
 */

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export interface LoadedFont {
  className: string;
  cssVar: string;
}

const CATALOG: Record<string, LoadedFont> = {
  Inter: { className: inter.className, cssVar: "--font-inter" },
  "Open Sans": { className: openSans.className, cssVar: "--font-open-sans" },
};

export function resolveFont(family: string | undefined | null): LoadedFont | null {
  if (!family) return null;
  return CATALOG[family] ?? null;
}
