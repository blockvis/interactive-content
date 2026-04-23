"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Reads the `?mode=presentation|reader` query param on mount and emits a
 * `data-mode-override` attribute on a wrapper div. CSS rules in globals.css
 * use this attribute to force-show or force-hide chrome (currently: QR).
 *
 * Without the param, the default viewport-based behaviour kicks in
 * (see the `[data-qr]` media query in globals.css).
 */
export function ModeGate({ children }: { children: ReactNode }) {
  const [override, setOverride] = useState<"presentation" | "reader" | null>(
    null,
  );

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("mode");
    if (value === "presentation" || value === "reader") {
      setOverride(value);
    }
  }, []);

  return <div data-mode-override={override ?? undefined}>{children}</div>;
}
