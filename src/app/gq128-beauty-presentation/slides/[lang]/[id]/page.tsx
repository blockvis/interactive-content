import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getSlide,
  getSlidesForLang,
  languages,
  presentation,
  presentationClass,
  totalSlides,
} from "@/lib/slides";
import type { LayoutName, PlatformSlots } from "@/lib/class-module";
import { resolveI18n, type Localized } from "@/lib/i18n";
import classModule from "@/generated/class";
import defaultClassModule from "@default-class/index";
import { SlideNav } from "@/components/slide-nav";
import { SlideQRCode } from "@/components/qr-code";
import { LanguageSwitcher } from "@/components/language-switcher";

const SLUG = "gq128-beauty-presentation";

interface NavTokens {
  showSlideNumber?: boolean;
  showLanguageSwitcher?: boolean;
}
interface QrTokens {
  size?: number;
  caption?: Localized;
}
interface ClassChrome {
  nav?: NavTokens;
  qrTitle?: QrTokens;
  qrPerSlide?: QrTokens;
}

function getChrome(): ClassChrome {
  return (presentationClass?.chrome ?? {}) as ClassChrome;
}

function resolveLayout(name: LayoutName) {
  return (
    classModule.layouts[name] ??
    defaultClassModule.layouts[name] ??
    defaultClassModule.layouts.content!
  );
}

export function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of languages) {
    for (const slide of getSlidesForLang(lang)) {
      params.push({ lang, id: String(slide.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const slide = getSlide(lang, Number(id));
  if (!slide) return {};
  const suffix =
    presentation?.title ?? presentationClass?.name ?? "Presentation";
  return {
    title: `${slide.title} — ${suffix}`,
    description: slide.body.slice(0, 160),
  };
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const slideId = Number(id);
  const slide = getSlide(lang, slideId);

  if (!slide) notFound();

  const total = totalSlides(lang);
  const routePrefix = `/${SLUG}`;
  const slidePath = `${routePrefix}/slides/${lang}/${slide.id}`;

  const chrome = getChrome();
  const showSlideNumber = chrome.nav?.showSlideNumber !== false;
  const showLanguageSwitcher = chrome.nav?.showLanguageSwitcher !== false;

  const isTitle = slide.layout === "title";

  // QR policy (platform invariants, not layout choice):
  //  - title slide: mandatory big QR → presentation root
  //  - non-title: corner QR only if class activated qrPerSlide AND slide.qr
  const qrPerSlideActive = Boolean(chrome.qrPerSlide);
  const showCornerQr = !isTitle && slide.qr && qrPerSlideActive;

  const fallbackLang = languages[0];

  const titleQr = isTitle ? (
    <SlideQRCode
      path={`/${SLUG}/`}
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

  const nav = (
    <SlideNav
      currentSlide={slideId}
      totalSlides={total}
      lang={lang}
      routePrefix={routePrefix}
      showSlideNumber={showSlideNumber}
    />
  );

  const navPills = (
    <SlideNav
      currentSlide={slideId}
      totalSlides={total}
      lang={lang}
      routePrefix={routePrefix}
      showSlideNumber={showSlideNumber}
      orientation="pills"
    />
  );

  const navNextOnly = (
    <SlideNav
      currentSlide={slideId}
      totalSlides={total}
      lang={lang}
      routePrefix={routePrefix}
      orientation="next-only"
    />
  );

  const languageSwitcher = showLanguageSwitcher ? (
    <LanguageSwitcher
      currentLang={lang}
      currentSlide={slideId}
      routePrefix={routePrefix}
    />
  ) : null;

  const platform: PlatformSlots = {
    lang,
    slideNumber: slideId,
    total,
    nav,
    navPills,
    navNextOnly,
    languageSwitcher,
    titleQr,
    cornerQr,
  };

  const Layout = resolveLayout(slide.layout);

  return (
    <Layout
      slide={slide}
      presentation={presentation}
      classMeta={presentationClass}
      platform={platform}
    />
  );
}
