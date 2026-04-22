import Link from "next/link";
import { languages } from "@/lib/slides";

const LANG_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  uk: "UK",
  de: "DE",
  fr: "FR",
  es: "ES",
  zh: "ZH",
  ja: "JA",
};

export function LanguageSwitcher({
  currentLang,
  currentSlide,
}: {
  currentLang: string;
  currentSlide: number;
}) {
  if (languages.length <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Link
          key={lang}
          href={`/slides/${lang}/${currentSlide}`}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            lang === currentLang
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          {LANG_LABELS[lang] ?? lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
