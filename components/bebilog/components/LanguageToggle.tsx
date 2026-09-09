"use client";

import { useLocale } from "next-intl";
import LanguageSwitcher from "@/components/language-switcher";

export default function LanguageToggle() {
  const locale = useLocale();
  return <LanguageSwitcher locale={locale === "zh" ? "zh" : "en"} />;
}
