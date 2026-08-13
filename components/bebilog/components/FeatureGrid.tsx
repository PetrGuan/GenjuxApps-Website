"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import LucideIcon from "./LucideIcon";
import { GRID_ITEMS } from "@/components/bebilog/data";

export default function FeatureGrid() {
  const t = useTranslations("grid");

  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <AnimateInView className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-white/40 text-base">{t("subtitle")}</p>
        </AnimateInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {GRID_ITEMS.map((item, i) => (
            <AnimateInView key={item.key} delay={i * 0.03}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-white/[0.12] hover:-translate-y-0.5 transition-all">
                <div className="flex justify-center mb-2 text-white/70">
                  <LucideIcon name={item.iconName} size={28} strokeWidth={1.5} />
                </div>
                <div className="text-white text-sm font-semibold">
                  {t(`items.${item.key}.title`)}
                </div>
                <div className="text-white/40 text-xs mt-1">
                  {t(`items.${item.key}.description`)}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
