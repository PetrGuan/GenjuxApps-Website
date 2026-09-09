"use client";

import { useEffect } from "react";
import { productSlugs } from "@/lib/products";
import { localizedHref, type SiteLocale } from "@/i18n/routing.mjs";

const legacyAnchors = new Set<string>(["products", ...productSlugs]);

export default function LegacyCatalogAnchor({ locale = "en" }: { locale?: SiteLocale }) {
  useEffect(() => {
    const followAnchor = () => {
      const anchor = window.location.hash.slice(1);
      if (legacyAnchors.has(anchor)) {
        window.location.replace(localizedHref(`/apps#${anchor}`, locale));
      }
    };
    followAnchor();
    window.addEventListener("hashchange", followAnchor);
    return () => window.removeEventListener("hashchange", followAnchor);
  }, [locale]);

  return null;
}
