"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function SlideQRCode({ path }: { path: string }) {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}${path}` : "";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="h-[120px] w-[120px]">
          {origin && <QRCodeSVG value={url} size={120} level="M" />}
        </div>
      </div>
      <span className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[160px] truncate">
        {origin ? url.replace(/^https?:\/\//, "") : "\u00a0"}
      </span>
    </div>
  );
}
