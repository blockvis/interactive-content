import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getSlide,
  getSlidesForLang,
  getPresentationData,
  totalSlides,
  getAllPresentationSlugs,
  type ClassMeta,
} from "@/lib/slides";
import type { LayoutName, PlatformSlots } from "@/lib/class-module";
import { resolveI18n, TAB_LABELS, type Localized } from "@/lib/i18n";
import getClassModule from "@/generated/class";
import defaultClassModule from "@default-class/index";
import { ReaderSlideNav, SlideNav } from "@/components/slide-nav";
import { SlideQRCode } from "@/components/qr-code";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MarkdownSlide } from "@/components/markdown-slide";
import {
  SlideTabsBody,
  SlideTabsProvider,
  SlideTabsSwitcher,
} from "@/components/slide-tabs";
import { TranslationBadge } from "@/components/translation-badge";

interface NavTokens {
  showSlideNumber?: boolean;
  showLanguageSwitcher?: boolean;
}
interface QrTokens {
  size?: number;
  caption?: Localized;
}
interface TabsTokens {
  content?: Localized;
  backstage?: Localized;
}
interface ClassChrome {
  nav?: NavTokens;
  qrTitle?: QrTokens;
  qrPerSlide?: QrTokens;
  tabs?: TabsTokens;
}

function getChrome(presentationClass: ClassMeta | null): ClassChrome {
  return (presentationClass?.chrome ?? {}) as ClassChrome;
}

function resolveLayout(name: LayoutName, classSlug: string | null) {
  const classModule = getClassModule(classSlug);
  return (
    classModule?.layouts?.[name] ??
    defaultClassModule.layouts[name] ??
    defaultClassModule.layouts.content!
  );
}

export function generateStaticParams() {
  const params: { slug: string; lang: string; id: string }[] = [];
  for (const slug of getAllPresentationSlugs()) {
    const p = getPresentationData(slug);
    if (!p) continue;
    for (const lang of p.languages) {
      for (const slide of getSlidesForLang(slug, lang)) {
        params.push({ slug, lang, id: String(slide.id) });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string; id: string }>;
}): Promise<Metadata> {
  const { slug, lang, id } = await params;
  const p = getPresentationData(slug);
  if (!p) return {};
  
  const slide = getSlide(slug, lang, Number(id));
  if (!slide) return {};
  const suffix =
    p.presentation?.title ?? p.class?.name ?? "Presentation";
  return {
    title: `${slide.title} — ${suffix}`,
    description: slide.content.slice(0, 160),
  };
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ slug: string; lang: string; id: string }>;
}) {
  const { slug, lang, id } = await params;
  
  const p = getPresentationData(slug);
  if (!p) notFound();

  const slideId = Number(id);
  const slide = getSlide(slug, lang, slideId);

  if (!slide) notFound();

  const total = totalSlides(slug, lang);
  const routePrefix = `/${slug}`;
  const slidePath = `${routePrefix}/slides/${lang}/${slide.id}`;

  const presentationClass = p.class;
  const chrome = getChrome(presentationClass);
  const showLanguageSwitcher = chrome.nav?.showLanguageSwitcher !== false;

  const isTitle = slide.layout === "title";

  // QR policy (platform invariants, not layout choice):
  //  - title slide: mandatory big QR → presentation root
  //  - non-title: corner QR only if class activated qrPerSlide AND slide.qr
  const qrPerSlideActive = Boolean(chrome.qrPerSlide);
  const showCornerQr = !isTitle && slide.qr && qrPerSlideActive;

  const fallbackLang = p.languages[0];

  const titleQr = isTitle ? (
    <SlideQRCode
      path={`/${slug}/`}
      size={chrome.qrTitle?.size ?? 320}
      caption={resolveI18n(chrome.qrTitle?.caption, lang, fallbackLang)}
    />
  ) : null;

  const cornerQr = showCornerQr ? (
    <SlideQRCode
      path={slidePath}
      size={chrome.qrPerSlide?.size ?? 128}
      caption={resolveI18n(chrome.qrPerSlide?.caption, lang, fallbackLang)}
    />
  ) : null;

  const slidesList = getSlidesForLang(slug, lang).map((s) => ({
    id: s.id,
    title: s.title,
  }));

  const nav = (
    <SlideNav
      currentSlide={slideId}
      slides={slidesList}
      lang={lang}
      routePrefix={routePrefix}
    />
  );

  const readerNav = (
    <ReaderSlideNav
      currentSlide={slideId}
      slides={slidesList}
      lang={lang}
      routePrefix={routePrefix}
    />
  );

  const languageSwitcher = showLanguageSwitcher ? (
    <LanguageSwitcher
      currentLang={lang}
      currentSlide={slideId}
      routePrefix={routePrefix}
      languages={p.languages}
    />
  ) : null;

  const hasBackstage = Boolean(slide.backstage && slide.backstage.length > 0);

  const contentNode = <MarkdownSlide content={slide.content} presentationSlug={slug} classSlug={presentationClass?.slug ?? null} />;
  const backstageNode = hasBackstage ? (
    <MarkdownSlide content={slide.backstage!} presentationSlug={slug} classSlug={presentationClass?.slug ?? null} />
  ) : null;

  const tabLabels = {
    content:
      resolveI18n(chrome.tabs?.content ?? TAB_LABELS.content, lang, fallbackLang) ??
      "Slide",
    backstage:
      resolveI18n(
        chrome.tabs?.backstage ?? TAB_LABELS.backstage,
        lang,
        fallbackLang,
      ) ?? "Backstage",
  };

  const tabSwitcher = hasBackstage ? <SlideTabsSwitcher /> : null;
  const slideBody = hasBackstage ? <SlideTabsBody /> : contentNode;

  // Canonical language = presentation's source. Any other language is a
  // translation and gets a badge; `translatedBy` (if set by the translate
  // script) switches the badge into "AI" mode with the model id.
  const translationBadge =
    lang !== p.defaultLanguage ? (
      <TranslationBadge
        sourceLang={p.defaultLanguage}
        model={slide.translatedBy}
      />
    ) : null;

  const platform: PlatformSlots = {
    lang,
    slideNumber: slideId,
    total,
    nav,
    readerNav,
    languageSwitcher,
    titleQr,
    cornerQr,
    tabSwitcher,
    slideBody,
    translationBadge,
  };

  const Layout = resolveLayout(slide.layout, presentationClass?.slug ?? null);

  const rendered = (
    <Layout
      slide={slide}
      presentation={p.presentation}
      classMeta={presentationClass}
      platform={platform}
    />
  );

  if (!hasBackstage) return rendered;

  return (
    <SlideTabsProvider
      content={contentNode}
      backstage={backstageNode}
      hasBackstage={hasBackstage}
      labels={tabLabels}
    >
      {rendered}
    </SlideTabsProvider>
  );
}