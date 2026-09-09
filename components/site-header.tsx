"use client";

import { useRef } from "react";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Rss, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import LanguageSwitcher from "@/components/language-switcher";
import { catalogT } from "@/i18n/catalog";
import { englishPath, type SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

const navigation = [
  { href: "/apps", key: "apps" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/donate", key: "donate" },
  { href: "/supporters", key: "supporters" },
] as const;

export default function SiteHeader({ locale = "en" }: { locale?: SiteLocale }) {
  const t = catalogT(locale);
  const pathname = usePathname();
  const canonicalPath = englishPath(pathname ?? "/");
  const menu = useRef<HTMLDetailsElement>(null);
  const active = (href: string) => canonicalPath === href || canonicalPath.startsWith(`${href}/`);
  const links = (
    <>
      {navigation.map(({ href, key }, index) => (
        <span key={href} style={{ display: "contents" }}>
          {index === 3 && <span aria-hidden="true" className={styles.navDivider} />}
          <Link href={href} locale={locale} className={styles.navLink} aria-current={active(href) ? "page" : undefined}>
            {t(`nav.${key}`)}
          </Link>
        </span>
      ))}
      <div className={styles.navTools}>
        <Link href="/feeds" locale={locale} aria-label={t("nav.rss")} className={`${styles.navLink} ${styles.navIcon}`} aria-current={active("/feeds") ? "page" : undefined}>
          <Rss size={18} strokeWidth={1.7} aria-hidden="true" /><span className={styles.navIconLabel}>{t("nav.rss")}</span>
        </Link>
        <Link href="/contact" locale={locale} aria-label={t("nav.contact")} className={`${styles.navLink} ${styles.navIcon}`} aria-current={active("/contact") ? "page" : undefined}>
          <Mail size={19} strokeWidth={1.7} aria-hidden="true" /><span className={styles.navIconLabel}>{t("nav.email")}</span>
        </Link>
      </div>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.shell} ${styles.headerInner}`}>
        <Link href="/" locale={locale} className={styles.wordmark} aria-label={t("nav.home", { name: siteConfig.name })}>
          {siteConfig.name}
        </Link>
        <nav aria-label={t("nav.primary")} className={styles.desktopNav}>{links}</nav>
        <div className={styles.headerControls}>
        <LanguageSwitcher locale={locale} />
        <details
          key={pathname}
          ref={menu}
          className={styles.mobileMenu}
          onKeyDown={(event) => {
            if (event.key === "Escape" && menu.current?.open) {
              menu.current.open = false;
              menu.current.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>
            <span>{t("nav.menu")}</span>
            <Menu size={21} className={styles.menuIcon} aria-hidden="true" />
            <X size={21} className={styles.closeIcon} aria-hidden="true" />
          </summary>
          <nav
            aria-label={t("nav.mobile")}
            className={styles.mobileNav}
            onClick={(event) => {
              if (event.target instanceof Element && event.target.closest("a") && menu.current) {
                menu.current.open = false;
              }
            }}
          >
            {links}
          </nav>
        </details>
        </div>
      </div>
    </header>
  );
}
