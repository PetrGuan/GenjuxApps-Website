import type { Metadata } from "next";
import { absoluteSiteUrl, siteConfig } from "@/lib/site-config";
import { localePath, type SiteLocale } from "@/i18n/routing.mjs";
import { localizedAlternates } from "@/lib/localized-metadata";

export function mainSiteMetadata(title: string, description: string, path: string, locale: SiteLocale = "en"): Metadata {
  return {
    title: locale === "zh" ? `${title} | ${siteConfig.name}` : title,
    description,
    alternates: {
      ...localizedAlternates(path, locale),
      types: {
        "application/rss+xml": [
          { title: `${siteConfig.name} - ${locale === "zh" ? "博客" : "Blog"}`, url: absoluteSiteUrl(localePath("/rss.xml", locale)) },
          { title: `${siteConfig.name} - ${locale === "zh" ? "新应用" : "New apps"}`, url: absoluteSiteUrl(localePath("/rss-apps.xml", locale)) },
          { title: `${siteConfig.name} - ${locale === "zh" ? "新项目" : "New projects"}`, url: absoluteSiteUrl(localePath("/rss-repos.xml", locale)) },
        ],
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteSiteUrl(localePath(path, locale)),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: absoluteSiteUrl("/images/avatar.webp"), width: 512, height: 512 }],
    },
    twitter: { card: "summary", title, description },
  };
}
