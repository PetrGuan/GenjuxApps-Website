import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";
import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { siteConfig } from "@/lib/site-config";
import { NeoWriterHome, neoWriterHomeDescription } from "./home";
import { NeoWriterPrivacy, neoWriterPrivacyMetadata } from "./privacy";
import { NeoWriterSupport, neoWriterSupportMetadata } from "./support";
import { NeoWriterTerms, neoWriterTermsMetadata } from "./terms";
import { neoWriterMetadata, neoWriterProduct } from "./site";
import styles from "./neowriter.module.css";

export type NeoWriterPage = "home" | "privacy" | "terms" | "support";

export const neoWriterViewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#161d22" },
  ],
};

const shellCopy = {
  en: {
    skip: "Skip to content",
    navigation: "NeoWriter navigation",
    links: [
      { href: "/apps/neowriter#recovery", label: "Protection" },
      { href: "/apps/neowriter#writing", label: "Flow" },
      { href: "/apps/neowriter#encryption", label: "Encryption" },
      { href: "/apps/neowriter#questions", label: "Questions" },
      { href: "/apps/neowriter/support", label: "Support" },
    ],
    allApps: "All apps",
    byline: "An app by",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    backToTop: "Back to top",
  },
  zh: {
    skip: "跳到主要内容",
    navigation: "NeoWriter 导航",
    links: [
      { href: "/apps/neowriter#recovery", label: "草稿保护" },
      { href: "/apps/neowriter#writing", label: "写作心流" },
      { href: "/apps/neowriter#encryption", label: "加密" },
      { href: "/apps/neowriter#questions", label: "常见问题" },
      { href: "/apps/neowriter/support", label: "支持" },
    ],
    allApps: "全部应用",
    byline: "开发者",
    privacy: "隐私",
    terms: "条款",
    support: "支持",
    backToTop: "返回顶部",
  },
} as const;

function pageContent(page: NeoWriterPage, locale: SiteLocale) {
  switch (page) {
    case "home":
      return <NeoWriterHome locale={locale} />;
    case "privacy":
      return <NeoWriterPrivacy locale={locale} />;
    case "terms":
      return <NeoWriterTerms locale={locale} />;
    case "support":
      return <NeoWriterSupport locale={locale} />;
  }
}

export function renderNeoWriterPage(page: NeoWriterPage, locale: SiteLocale): ReactNode {
  const copy = shellCopy[locale];
  const product = neoWriterProduct();

  return (
    <div className={styles.root} lang={locale === "zh" ? "zh-Hans" : "en"}>
      <LocaleLink href="#neowriter-main" locale={locale} className={styles.skipLink}>{copy.skip}</LocaleLink>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.navigation}`}>
          <LocaleLink href="/apps/neowriter" locale={locale} className={styles.brand}>
            <Image src={product.assets.icon} alt="" width={34} height={34} />
            NeoWriter
          </LocaleLink>
          <nav className={styles.navLinks} aria-label={copy.navigation}>
            {copy.links.map(({ href, label }) => <LocaleLink href={href} locale={locale} key={href}>{label}</LocaleLink>)}
          </nav>
          <div className={styles.headerActions}>
            <LanguageSwitcher locale={locale} />
            <LocaleLink href="/apps" locale={locale} className={styles.backLink}>{copy.allApps} <ArrowUpRight size={14} aria-hidden="true" /></LocaleLink>
          </div>
        </div>
      </header>
      <main id="neowriter-main" tabIndex={-1}>{pageContent(page, locale)}</main>
      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <p>NeoWriter <span>/</span> {copy.byline} <LocaleLink href="/" locale={locale}>{siteConfig.name}</LocaleLink></p>
          <div>
            <LocaleLink href="/apps/neowriter/privacy" locale={locale}>{copy.privacy}</LocaleLink>
            <LocaleLink href="/apps/neowriter/terms" locale={locale}>{copy.terms}</LocaleLink>
            <LocaleLink href="/apps/neowriter/support" locale={locale}>{copy.support}</LocaleLink>
            <LocaleLink href="/apps" locale={locale}>{copy.allApps}</LocaleLink>
            <LocaleLink href="#neowriter-main" locale={locale}>{copy.backToTop}</LocaleLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function getNeoWriterMetadata(page: NeoWriterPage, locale: SiteLocale): Metadata {
  if (page === "home") {
    return neoWriterMetadata(
      locale === "zh" ? "NeoWriter - 保护每一版草稿，找到写作心流" : "NeoWriter - Protect your drafts. Find your flow.",
      neoWriterHomeDescription(locale),
      page,
      locale,
    );
  }

  const copy = page === "privacy"
    ? neoWriterPrivacyMetadata(locale)
    : page === "terms"
      ? neoWriterTermsMetadata(locale)
      : neoWriterSupportMetadata(locale);
  return neoWriterMetadata(copy.title, copy.description, page, locale);
}
