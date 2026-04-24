"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function SlideQRCode({
  path,
  size = 120,
  caption,
}: {
  path: string;
  size?: number;
  /** Explicit caption from class tokens. If omitted, the URL is shown instead. */
  caption?: string | null;
}) {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}${path}` : "";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div style={{ width: size, height: size }}>
          {origin && <QRCodeSVG value={url} size={size} level="M" />}
        </div>
      </div>
      {caption ? (
        <span
          className="text-balance text-center font-semibold tracking-wider text-zinc-700 dark:text-zinc-300"
          style={{
            maxWidth: size,
            // Scale caption with QR size: ~25px at size 320, ~14px at size 180.
            fontSize: `clamp(14px, ${Math.round(size * 0.08)}px, 28px)`,
          }}
        >
          {caption}
        </span>
      ) : (
        <span className="max-w-[180px] truncate text-xs text-zinc-400 dark:text-zinc-500">
          {origin ? url.replace(/^https?:\/\//, "") : "\u00a0"}
        </span>
      )}
    </div>
  );
}
