"use client";

import { useRouter } from "next/navigation";

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
  ko: "한국어",
  hi: "हिन्दी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  ar: "العربية",
  fa: "فارسی",
  he: "עברית",
  vi: "Tiếng Việt",
  th: "ไทย",
  id: "Bahasa Indonesia",
  nl: "Nederlands",
  sv: "Svenska",
  no: "Norsk",
  fi: "Suomi",
  da: "Dansk",
  cs: "Čeština",
  sk: "Slovenčina",
  hu: "Magyar",
  ro: "Română",
  bg: "Български",
  el: "Ελληνικά",
  sr: "Српски",
  hr: "Hrvatski",
  sl: "Slovenščina",
  ka: "ქართული",
  hy: "Հայերեն",
  az: "Azərbaycanca",
  kk: "Қазақша",
  uz: "Oʻzbekcha",
  be: "Беларуская",
};

export function LanguageSwitcher({
  currentLang,
  currentSlide,
  routePrefix = "",
  languages,
}: {
  currentLang: string;
  currentSlide: number;
  routePrefix?: string;
  languages: string[];
}) {
  const router = useRouter();
  if (languages.length <= 1) return null;

  return (
    <select
      key={currentLang}
      defaultValue={currentLang}
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
