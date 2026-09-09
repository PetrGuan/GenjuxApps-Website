import type { SiteLocale } from "@/i18n/routing.mjs";

export function formatDate(value: string, locale: SiteLocale = "en"): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-Hans" : "en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}
