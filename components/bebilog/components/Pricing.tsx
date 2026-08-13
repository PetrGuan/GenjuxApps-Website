"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";

export default function Pricing() {
  const t = useTranslations("pricing");

  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-6xl mx-auto">
        <AnimateInView className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-white/40 text-base">{t("subtitle")}</p>
        </AnimateInView>

        <div className="flex flex-col md:flex-row gap-5 max-w-2xl mx-auto">
          <AnimateInView direction="left" className="flex-1">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 h-full">
              <div className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4">
                {t("free.name")}
              </div>
              <div className="text-4xl font-extrabold text-white mb-1">{t("free.price")}</div>
              <div className="text-white/30 text-sm mb-6">{t("free.period")}</div>
              <div className="flex flex-col gap-2.5">
                {freeFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#50C878] text-xs">✓</span>
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>

          <AnimateInView direction="right" className="flex-1">
            <div className="relative bg-gradient-to-b from-[rgba(255,107,107,0.08)] to-[rgba(175,130,255,0.08)] border border-[rgba(255,107,107,0.2)] rounded-2xl p-8 h-full">
              <div className="absolute -top-2.5 right-5 px-3 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#AF82FF] rounded-md text-white text-[11px] font-bold">
                {t("pro.badge")}
              </div>
              <div className="text-[rgba(255,107,107,0.8)] text-sm font-semibold uppercase tracking-wider mb-4">
                {t("pro.name")}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{t("pro.price")}</span>
                <span className="text-white/40 text-sm">{t("pro.period")}</span>
              </div>
              <div className="text-white/30 text-sm mb-6">{t("pro.altPricing")}</div>
              <div className="flex flex-col gap-2.5">
                {proFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#FF6B6B] text-xs">★</span>
                    <span className="text-white/60 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
