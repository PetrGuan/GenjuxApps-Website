import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { lumadioMessages } from "@/i18n/lumadio/messages";
import { localizedAlternates } from "@/lib/localized-metadata";
import { LumadioHome } from "./lumadio-site";
import LumadioPrivacy from "./privacy";
import LumadioSupport from "./support";
import LumadioTerms from "./terms";

export type LumadioPage = "home" | "privacy" | "terms" | "support";

const pagePaths: Record<LumadioPage, string> = {
  home: "/apps/lumadio",
  privacy: "/apps/lumadio/privacy",
  terms: "/apps/lumadio/terms",
  support: "/apps/lumadio/support",
};

export const lumadioViewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07070b",
};

export function getLumadioMetadata(page: LumadioPage, locale: SiteLocale): Metadata {
  const copy = lumadioMessages[locale].metadata[page];
  return {
    title: copy.title,
    description: copy.description,
    alternates: localizedAlternates(pagePaths[page], locale),
  };
}

export function renderLumadioPage(page: LumadioPage, locale: SiteLocale): ReactNode {
  switch (page) {
    case "home": return <LumadioHome locale={locale} />;
    case "privacy": return <LumadioPrivacy locale={locale} />;
    case "terms": return <LumadioTerms locale={locale} />;
    case "support": return <LumadioSupport locale={locale} />;
  }
}
