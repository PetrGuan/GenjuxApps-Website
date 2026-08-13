"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import { AndroidIcon } from "./Icons";
import AppStoreBadge from "./AppStoreBadge";

export default function FooterCTA() {
  const t = useTranslations("footerCTA");
  const heroT = useTranslations("hero");

  return (
    <section className="py-24 px-6 bg-[radial-gradient(ellipse_at_center,rgba(255,107,107,0.06)_0%,transparent_70%)]">
      <AnimateInView className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-white/40 text-base mb-8">{t("subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <AppStoreBadge className="h-12" />
          <div className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white/50 text-base cursor-default">
            <AndroidIcon className="w-5 h-5" />
            {heroT("androidComingSoon")}
          </div>
        </div>
      </AnimateInView>
    </section>
  );
}
