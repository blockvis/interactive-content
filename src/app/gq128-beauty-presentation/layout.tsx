import type { CSSProperties, ReactNode } from "react";
import { presentationClass } from "@/lib/slides";
import { resolveFont } from "@/lib/fonts";
import { ModeGate } from "@/components/mode-gate";

type StyleVars = Record<string, string | number>;

/** Build `--class-*` CSS custom properties from the class token tree. */
function classTokensToCssVars(): StyleVars {
  const cls = presentationClass;
  if (!cls) return {};
  const vars: StyleVars = {};

  if (cls.colors) {
    for (const [k, v] of Object.entries(cls.colors)) {
      vars[`--class-${k}`] = v;
    }
  }

  const typo = cls.typography as
    | { baseSize?: string; headingScale?: number; leading?: number }
    | null;
  if (typo?.baseSize) vars["--class-base-size"] = typo.baseSize;
  if (typo?.headingScale !== undefined)
    vars["--class-heading-scale"] = typo.headingScale;
  if (typo?.leading !== undefined) vars["--class-leading"] = typo.leading;

  const chrome = cls.chrome as {
    nav?: { height?: string };
    brandStripe?: { height?: string; dark?: string; light?: string };
  } | null;
  if (chrome?.nav?.height) vars["--class-nav-height"] = chrome.nav.height;
  if (chrome?.brandStripe) {
    const bs = chrome.brandStripe;
    if (bs.height) vars["--class-stripe-height"] = bs.height;
    if (bs.dark) vars["--class-stripe-dark"] = bs.dark;
    if (bs.light) vars["--class-stripe-light"] = bs.light;
  }

  const heading = resolveFont(
    (cls.fonts as { heading?: { family?: string } } | null)?.heading?.family,
  );
  const body = resolveFont(
    (cls.fonts as { body?: { family?: string } } | null)?.body?.family,
  );
  if (heading) {
    vars["--class-font-heading"] =
      `var(${heading.cssVar}), system-ui, sans-serif`;
  }
  if (body) {
    vars["--class-font-body"] = `var(${body.cssVar}), system-ui, sans-serif`;
  }

  return vars;
}

/** next/font classNames inject their `--font-*` variables at the scope they're applied to. */
function classFontClassNames(): string {
  const cls = presentationClass;
  if (!cls) return "";
  const h = resolveFont(
    (cls.fonts as { heading?: { family?: string } } | null)?.heading?.family,
  );
  const b = resolveFont(
    (cls.fonts as { body?: { family?: string } } | null)?.body?.family,
  );
  return Array.from(new Set([h?.className, b?.className].filter(Boolean))).join(
    " ",
  );
}

export default function PresentationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      data-presentation-class={presentationClass?.slug ?? undefined}
      className={classFontClassNames()}
      style={classTokensToCssVars() as CSSProperties}
    >
      <ModeGate>{children}</ModeGate>
    </div>
  );
}
