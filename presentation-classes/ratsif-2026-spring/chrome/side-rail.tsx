import type { ReactNode } from "react";
import type { Author } from "@/lib/slides";

/**
 * Right column used by the content layout in presentation mode.
 *
 *   ┌ lang select ┐  ← dropdown pinned to the top
 *   │ QR          │
 *   │             │
 *   │ contacts    │  ← slightly-greyer tech panel, pinned to bottom
 *   └─────────────┘
 *
 * Navigation is NOT here — the platform places it once in the sticky
 * footer and expects it to be visible on all viewports.
 *
 * The outer wrapper is `data-presentation-only` so the rail is hidden
 * on mobile / reader mode; the inner aside always lays out as a flex
 * column, independent of the gate's display revert semantics. Width
 * and background come from --class-sidebar-* CSS vars emitted by
 * src/app/<slug>/layout.tsx.
 */
export function SideRail({
  languageSwitcher,
  translationBadge,
  qr,
  authors,
}: {
  languageSwitcher: ReactNode;
  translationBadge?: ReactNode;
  qr: ReactNode;
  authors: Author[];
}) {
  return (
    <div
      data-presentation-only
      className="shrink-0"
      style={{ width: "var(--class-sidebar-width, 280px)" }}
    >
      <aside
        className="flex h-full flex-col gap-6 overflow-y-auto border-l p-5"
        style={{ 
          backgroundColor: "var(--class-sidebar-bg, transparent)",
          borderColor: "color-mix(in srgb, var(--class-foreground) 15%, transparent)"
        }}
      >
        {(languageSwitcher || translationBadge) && (
          <div className="flex items-center gap-2">
            {languageSwitcher}
            {translationBadge}
          </div>
        )}

        {qr && <div className="flex justify-center">{qr}</div>}

        {authors.length > 0 && (
          <div className="mt-auto space-y-4 text-sm opacity-80">
            {authors.map((author, i) => (
              <AuthorCard key={i} author={author} />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="space-y-1">
      <div className="font-semibold">
        {author.name}
      </div>
      {author.role && (
        <div className="text-xs opacity-70">
          {author.role}
        </div>
      )}
      {author.affiliation && (
        <div className="text-xs opacity-70">
          {author.affiliation}
        </div>
      )}
      {author.email && (
        <a
          href={`mailto:${author.email}`}
          className="block text-xs opacity-80 underline decoration-current/50 underline-offset-2 hover:opacity-100"
        >
          {author.email}
        </a>
      )}
      {author.url && (
        <a
          href={author.url}
          target="_blank"
          rel="noreferrer"
          className="block text-xs opacity-80 underline decoration-current/50 underline-offset-2 hover:opacity-100"
        >
          {author.url.replace(/^https?:\/\//, "")}
        </a>
      )}
    </div>
  );
}
