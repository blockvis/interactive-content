"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Two canonical slide tabs:
 *   - `content`   — what the audience sees on the projector.
 *   - `backstage` — extended materials (links, demos, references), the
 *                   "talk page" to the slide's "article".
 *
 * Authors opt into a backstage tab by placing a line containing only
 * `<!-- backstage -->` somewhere in the slide's markdown body (the
 * compiler splits on it). Platforms and classes never refer to other
 * tab ids.
 *
 * The switcher (SlideTabsSwitcher) and the body (SlideTabsBody) are
 * placed independently by the class layout — the switcher typically
 * lives in a sticky top header, while the body flows in the main
 * column. They share state via React context.
 *
 * State syncs with `location.hash` so that a user can deep-link to a
 * specific tab (`…/3#backstage`) and so that the browser back button
 * moves between tabs within a slide. We use `history.replaceState`
 * when *changing* the tab ourselves so we do not pollute history with
 * every click; we still respond to external hash changes.
 */

export type SlideTab = "content" | "backstage";

interface TabLabels {
  content: string;
  backstage: string;
}

interface TabsContextValue {
  active: SlideTab;
  setActive: (t: SlideTab) => void;
  hasBackstage: boolean;
  labels: TabLabels;
  content: ReactNode;
  backstage: ReactNode;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Our own synthetic event lets `history.replaceState` — which does *not*
 * fire `hashchange` — still notify subscribers. This keeps the active
 * tab, hash and UI in lock-step without us hand-rolling a state mirror.
 */
const HASH_CHANGE_EVENT = "slide-tabs:hash-change";

function readHashTab(): SlideTab {
  if (typeof window === "undefined") return "content";
  return window.location.hash === "#backstage" ? "backstage" : "content";
}

function subscribeHashTab(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener(HASH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener(HASH_CHANGE_EVENT, callback);
  };
}

function serverSnapshot(): SlideTab {
  return "content";
}

export function SlideTabsProvider({
  content,
  backstage,
  hasBackstage,
  labels,
  children,
}: {
  content: ReactNode;
  backstage: ReactNode;
  hasBackstage: boolean;
  labels: TabLabels;
  children: ReactNode;
}) {
  const hashTab = useSyncExternalStore(
    subscribeHashTab,
    readHashTab,
    serverSnapshot,
  );
  const active: SlideTab = hasBackstage ? hashTab : "content";

  const setActive = useCallback(
    (t: SlideTab) => {
      if (!hasBackstage && t === "backstage") return;
      if (typeof window === "undefined") return;
      const { pathname, search } = window.location;
      const newHash = t === "backstage" ? "#backstage" : "";
      const url = pathname + search + newHash;
      window.history.replaceState(null, "", url);
      window.dispatchEvent(new Event(HASH_CHANGE_EVENT));
    },
    [hasBackstage],
  );

  const value: TabsContextValue = {
    active,
    setActive,
    hasBackstage,
    labels,
    content,
    backstage,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function useTabs(): TabsContextValue | null {
  return useContext(TabsContext);
}

/**
 * Tab selector — two neutral pills. Colours and font are inherited
 * from the container so the same component reads well against a
 * brand stripe, a blurred backdrop, or a plain background. Returns
 * `null` when the slide has no backstage (class can render the slot
 * unconditionally).
 */
export function SlideTabsSwitcher() {
  const ctx = useTabs();
  if (!ctx || !ctx.hasBackstage) return null;

  return (
    <div
      role="tablist"
      aria-label="Slide tabs"
      className="inline-flex items-center gap-1 rounded-full border border-current/20 p-0.5 text-sm"
    >
      <TabButton
        id="content"
        label={ctx.labels.content}
        active={ctx.active === "content"}
        onClick={() => ctx.setActive("content")}
      />
      <TabButton
        id="backstage"
        label={ctx.labels.backstage}
        active={ctx.active === "backstage"}
        onClick={() => ctx.setActive("backstage")}
      />
    </div>
  );
}

function TabButton({
  id,
  label,
  active,
  onClick,
}: {
  id: SlideTab;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`slide-tab-${id}`}
      aria-selected={active}
      aria-controls={`slide-tabpanel-${id}`}
      onClick={onClick}
      className={`cursor-pointer rounded-full px-3 py-1 font-medium transition-colors ${
        active
          ? "bg-current/15 text-current"
          : "opacity-70 hover:opacity-100"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Renders both markdown bodies, hiding the inactive one with the
 * native `hidden` attribute. This keeps tab switching instant (no
 * re-parse, no layout flash) and preserves scroll position inside
 * each tab across switches.
 */
export function SlideTabsBody() {
  const ctx = useTabs();
  if (!ctx) return null;
  return (
    <>
      <div
        id="slide-tabpanel-content"
        role="tabpanel"
        aria-labelledby="slide-tab-content"
        hidden={ctx.active !== "content"}
      >
        {ctx.content}
      </div>
      {ctx.hasBackstage && (
        <div
          id="slide-tabpanel-backstage"
          role="tabpanel"
          aria-labelledby="slide-tab-backstage"
          hidden={ctx.active !== "backstage"}
        >
          {ctx.backstage}
        </div>
      )}
    </>
  );
}
