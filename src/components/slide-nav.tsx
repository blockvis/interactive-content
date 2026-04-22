"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { totalSlides } from "@/lib/slides";

export function SlideNav({ currentSlide }: { currentSlide: number }) {
  const router = useRouter();
  const hasPrev = currentSlide > 1;
  const hasNext = currentSlide < totalSlides;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.key === "ArrowRight" || e.key === " ") && hasNext) {
        e.preventDefault();
        router.push(`/slides/${currentSlide + 1}`);
      } else if (e.key === "ArrowLeft" && hasPrev) {
        router.push(`/slides/${currentSlide - 1}`);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, hasNext, hasPrev, router]);

  return (
    <nav className="flex items-center gap-4">
      {hasPrev ? (
        <Link
          href={`/slides/${currentSlide - 1}`}
          className="flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <span aria-hidden>←</span> Prev
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-2 rounded-full border border-zinc-100 px-5 text-sm font-medium text-zinc-300 dark:border-zinc-800 dark:text-zinc-600">
          <span aria-hidden>←</span> Prev
        </span>
      )}

      <span className="text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
        {currentSlide}/{totalSlides}
      </span>

      {hasNext ? (
        <Link
          href={`/slides/${currentSlide + 1}`}
          className="flex h-10 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Next <span aria-hidden>→</span>
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-2 rounded-full bg-zinc-200 px-5 text-sm font-medium text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
          Next <span aria-hidden>→</span>
        </span>
      )}
    </nav>
  );
}
