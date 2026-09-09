import type { Metadata } from "next";
import { localePath, localizedHref, type SiteLocale } from "@/i18n/routing.mjs";
import { getProduct } from "@/lib/products";
import { localizedAlternates } from "@/lib/localized-metadata";
import { absoluteSiteUrl, siteConfig } from "@/lib/site-config";

export function neoWriterProduct() {
  const product = getProduct("neowriter");
  if (!product) throw new Error("NeoWriter is missing from the product registry.");
  return product;
}

export function neoWriterMetadata(
  title: string,
  description: string,
  page: "home" | "privacy" | "terms" | "support" = "home",
  locale: SiteLocale = "en",
): Metadata {
  const path = page === "home" ? "/apps/neowriter" : `/apps/neowriter/${page}`;
  const alternates = localizedAlternates(path, locale);
  return {
    title,
    description,
    alternates: {
      ...alternates,
      types: {
        "application/rss+xml": [{
          title: locale === "zh" ? "NeoWriter 更新日志" : "NeoWriter release notes",
          url: absoluteSiteUrl(localePath("/apps/neowriter/rss.xml", locale)),
        }],
      },
    },
    icons: { icon: neoWriterProduct().assets.icon },
    openGraph: {
      type: "website",
      title,
      description,
      url: alternates.canonical,
      images: [{ url: absoluteSiteUrl("/apps/neowriter/app-icon.png"), width: 512, height: 512 }],
    },
    twitter: { card: "summary" },
  };
}

export function neoWriterContactHref(subject: string, locale: SiteLocale = "en") {
  return siteConfig.email
    ? `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
    : localizedHref("/contact", locale);
}
