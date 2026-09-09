import type { Metadata, Viewport } from "next";
import { bebilogMessages } from "./data";
import { localizedAlternates } from "@/lib/localized-metadata";
import type { SiteLocale } from "@/i18n/routing.mjs";

export const bebilogViewport: Viewport = { colorScheme: "dark", themeColor: "#0a0a0a" };

export function getBebilogMetadata(locale: SiteLocale): Metadata {
  return {
    title: bebilogMessages[locale].meta.title,
    description: bebilogMessages[locale].meta.description,
    alternates: localizedAlternates("/apps/bebilog", locale),
  };
}
