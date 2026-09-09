import { localePath, type SiteLocale } from "@/i18n/routing.mjs";
import { absoluteSiteUrl } from "@/lib/site-config";

export function localizedAlternates(path: string, locale: SiteLocale) {
  const english = absoluteSiteUrl(localePath(path, "en"));
  return {
    canonical: absoluteSiteUrl(localePath(path, locale)),
    languages: {
      en: english,
      "zh-Hans": absoluteSiteUrl(localePath(path, "zh")),
      "x-default": english,
    },
  };
}
