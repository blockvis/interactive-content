import type { ComponentType, ReactNode } from "react";
import type { Slide, PresentationMeta, ClassMeta } from "./slides";

/**
 * Contract between platform and a presentation class.
 *
 * A **class module** (`presentation-classes/<slug>/index.tsx`) exports
 * a `ClassModule` object: layouts (React components per slide role) plus
 * optional directive-level components merged into the markdown pipeline.
 *
 * The platform (route page.tsx) resolves the active class via the
 * generated `src/generated/class.tsx`, picks a layout by `slide.layout`,
 * pre-builds the platform-invariant slots (sticky nav, language switcher,
 * QR targets), and hands them all to the layout to place.
 */

export type LayoutName = "title" | "section" | "content";

export interface PlatformSlots {
  lang: string;
  slideNumber: number;
  total: number;

  /**
   * Horizontal prev / # / next nav with text labels. Intended for the
   * mobile sticky footer and as a default for classes that don't hoist
   * nav into chrome. Mandatory: every layout must render at least one
   * nav slot.
   */
  nav: ReactNode;

  /**
   * Triangle-icon pills in a single row with a centred number input
   * (user can type a slide number to jump). Intended for side columns
   * in presentation mode on content slides.
   */
  navPills: ReactNode;

  /**
   * A single large Next pill. Intended for title slides under the big QR.
   * Null when there is no next slide.
   */
  navNextOnly: ReactNode;

  /** Language switcher. Null if the class disabled it via chrome.nav. */
  languageSwitcher: ReactNode;

  /**
   * Large QR for the title slide (URL = presentation root).
   * Non-null only when `slide.layout === "title"` AND in presentation mode.
   */
  titleQr: ReactNode;

  /**
   * Corner QR for the current non-title slide (URL = slide URL).
   * Non-null only when the class activated `chrome.qrPerSlide` AND the
   * slide didn't opt out via `qr: false`.
   */
  cornerQr: ReactNode;
}

export interface LayoutProps {
  slide: Slide;
  presentation: PresentationMeta;
  classMeta: ClassMeta | null;
  platform: PlatformSlots;
}

export type LayoutComponent = ComponentType<LayoutProps>;

export interface ClassModule {
  /** React layouts keyed by `slide.layout` role. */
  layouts: Partial<Record<LayoutName, LayoutComponent>>;

  /**
   * Directive-registry (name → component) for remark-directive inside
   * slide markdown. Resolution chain in `markdown-slide.tsx`:
   *   presentation.components → classModule.components → platform defaults.
   */
  components?: Record<string, ComponentType<Record<string, unknown>>>;
}
