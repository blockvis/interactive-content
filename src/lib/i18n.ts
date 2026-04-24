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
