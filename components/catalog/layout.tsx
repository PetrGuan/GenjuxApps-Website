import type { ReactNode } from "react";
import type { Viewport } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { catalogT } from "@/i18n/catalog";
import { htmlLanguage, type SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export const catalogViewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#10141c" },
  ],
};

export default function CatalogLayout({ children, locale = "en" }: { children: ReactNode; locale?: SiteLocale }) {
  return (
    <div className={styles.root} lang={htmlLanguage(locale)}>
      <a href="#main-content" className={styles.skipLink}>{catalogT(locale)("common.skip")}</a>
      <SiteHeader locale={locale} />
      <main id="main-content" className={styles.main} tabIndex={-1}>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
