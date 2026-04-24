"use client";

import { useRouter } from "next/navigation";
import { languages } from "@/lib/slides";

/**
 * Full language names for the dropdown. Short codes (ru, en, lv, …)
 * are mapped to their native autonyms so a reader spots their language
 * without translating the list in their head. If a code is not in the
 * map, the code itself is shown uppercased as a fallback.
 */
const LANG_LABELS: Record<string, string> = {
  ru: "Русский",
  en: "English",
  uk: "Українська",
  lv: "Latviešu",
  lt: "Lietuvių",
  et: "Eesti",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  pl: "Polski",
  tr: "Türkçe",
  zh: "中文",
  ja: "日本語",
};

export function LanguageSwitcher({
  currentLang,
  currentSlide,
  routePrefix = "",
}: {
  currentLang: string;
  currentSlide: number;
  routePrefix?: string;
}) {
  const router = useRouter();
  if (languages.length <= 1) return null;

  return (
    <select
      value={currentLang}
      onChange={(e) => {
        router.push(`${routePrefix}/slides/${e.target.value}/${currentSlide}`);
      }}
      aria-label="Presentation language"
      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 outline-none transition-colors hover:border-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {LANG_LABELS[lang] ?? lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
