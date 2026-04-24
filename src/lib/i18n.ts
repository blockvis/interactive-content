/**
 * Localization helper for class-level strings.
 *
 * Any user-facing chrome string authored in `class.md` can be either:
 *   - a plain string (used as-is, language-agnostic), or
 *   - a locale map `{ ru: "…", en: "…", lv: "…" }`.
 *
 * The platform resolves a locale map via this cascade:
 *   1. exact match on the current slide's language;
 *   2. the presentation's canonical language (first entry in `languages`);
 *   3. the first defined key in the map.
 *
 * Returning `null` is fine — consumers treat null as "no caption / label".
 */
export type Localized = string | Record<string, string> | null | undefined;

export function resolveI18n(
  value: Localized,
  lang: string,
  fallbackLang?: string,
): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return null;
  const map = value as Record<string, string>;
  if (map[lang]) return map[lang];
  if (fallbackLang && map[fallbackLang]) return map[fallbackLang];
  const first = Object.keys(map)[0];
  return first ? map[first] : null;
}

/**
 * Platform-default labels for the two canonical slide tabs. Classes may
 * override these per presentation via `chrome.tabs` in `class.md`; the
 * resolver then picks the override over the default following the normal
 * localization cascade (current language → canonical language → first key).
 *
 * Keep the default list small and visually neutral — the label has to fit
 * in a sticky top pill on mobile.
 */
export const TAB_LABELS: { content: Localized; backstage: Localized } = {
  content: { ru: "Слайд", en: "Slide", lv: "Slaids" },
  backstage: { ru: "За кадром", en: "Backstage", lv: "Aizkulises" },
};
