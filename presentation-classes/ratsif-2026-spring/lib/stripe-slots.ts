import type { PresentationMeta, ClassMeta } from "@/lib/slides";

/**
 * Slot values shown inside the RaTSiF brand stripes. Shared between
 * title and content layouts, so they live here rather than being
 * duplicated.
 */

/** "DD-Mon-YY" like the pptx bottom stripe uses (e.g. 24-Apr-26). */
export function formatShortDate(input: unknown): string {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(String(input));
  if (Number.isNaN(d.valueOf())) return "";
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = String(d.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export function authorsLabel(presentation: PresentationMeta): string {
  return (presentation.authors ?? []).map((a) => a.name).join(", ");
}

export function eventLabel(classMeta: ClassMeta | null): string {
  const event = classMeta?.event as { shortLabel?: string } | null;
  return event?.shortLabel ?? classMeta?.name ?? "";
}

export function eventDate(classMeta: ClassMeta | null): string {
  const event = classMeta?.event as { date?: unknown } | null;
  return formatShortDate(event?.date);
}

export function shortPaperTitle(presentation: PresentationMeta): string {
  return presentation.shortTitle ?? presentation.title ?? "";
}
