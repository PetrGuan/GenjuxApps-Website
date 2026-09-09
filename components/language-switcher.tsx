"use client";

import { usePathname } from "next/navigation";
import { localizedHref, type SiteLocale } from "@/i18n/routing.mjs";

export default function LanguageSwitcher({ locale = "en" }: { locale?: SiteLocale }) {
  const pathname = usePathname() ?? "/";
  return (
    <nav className="site-language-switcher" aria-label={locale === "zh" ? "网站语言" : "Site language"}>
      <a href={localizedHref(pathname, "en")} hrefLang="en" data-site-locale="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
      <a href={localizedHref(pathname, "zh")} hrefLang="zh-Hans" data-site-locale="zh" aria-current={locale === "zh" ? "page" : undefined}>中文</a>
    </nav>
  );
}
