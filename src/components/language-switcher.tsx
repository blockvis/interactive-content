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
  routePrefix = "",
}: {
  currentLang: string;
  currentSlide: number;
  routePrefix?: string;
}) {
  if (languages.length <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => {
        const active = lang === currentLang;
        return (
          <Link
            key={lang}
            href={`${routePrefix}/slides/${lang}/${currentSlide}`}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              active
                ? ""
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
            style={
              active
                ? {
                    backgroundColor: "var(--class-primary, #0f172a)",
                    color: "var(--class-background, white)",
                  }
                : undefined
            }
          >
            {LANG_LABELS[lang] ?? lang.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
