import type { ComponentType } from "react";
import { Callout } from "./callout";

/**
 * Registry of directive name → React component for this presentation.
 *
 * In a markdown slide, a directive `:::callout{tone=accent}` / `::callout`
 * resolves to the component keyed here by its lowercase name.
 *
 * Resolution chain (manifest → «Встраивание компонентов»):
 *   presentations/<slug>/components/   ← this file
 *   presentation-classes/<class>/components/
 *   platform components
 */
export const components: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  callout: Callout as ComponentType<Record<string, unknown>>,
};
