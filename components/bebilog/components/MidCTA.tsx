"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import AppStoreBadge from "./AppStoreBadge";

// Repeat CTA banner inserted mid-scroll, so visitors don't have to
// scroll all the way back up (or down to the footer) to convert.
export default function MidCTA() {
  const t = useTranslations("midCTA");

  return (
    <section className="px-6">
      <AnimateInView className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-brand/10 via-white/[0.03] to-transparent px-8 py-10 sm:px-10">
          <div className="text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1.5">
              {t("title")}
            </h3>
            <p className="text-white/40 text-sm">{t("subtitle")}</p>
          </div>
          <AppStoreBadge className="h-11 shrink-0" />
        </div>
      </AnimateInView>
    </section>
  );
}
