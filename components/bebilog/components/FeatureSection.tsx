"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";
import type { FeatureConfig } from "@/components/bebilog/data";
import { ReactNode } from "react";

type Props = {
  feature: FeatureConfig;
  children: ReactNode;
};

export default function FeatureSection({ feature, children }: Props) {
  const t = useTranslations(`features.${feature.key}`);

  const textContent = (
    <AnimateInView
      direction={feature.layout === "text-left" ? "left" : "right"}
      className="flex-1"
    >
      <div
        className="text-sm font-semibold uppercase tracking-widest mb-3"
        style={{ color: `rgba(${feature.colorRgb}, 0.8)` }}
      >
        {t("label")}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
        {t("title")}
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${feature.color}, ${feature.gradientTo})`,
          }}
        >
          {t("titleHighlight")}
        </span>
      </h2>
      <p className="text-white/50 text-base leading-relaxed max-w-md">
        {t("description")}
      </p>
    </AnimateInView>
  );

  const visualContent = (
    <AnimateInView
      direction={feature.layout === "text-left" ? "right" : "left"}
      delay={0.15}
      className="flex-1"
    >
      {children}
    </AnimateInView>
  );

  return (
    <section
      className="py-24 px-6"
      style={{
        background: `linear-gradient(180deg, #0a0a0a 0%, ${feature.bgTint} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {feature.layout === "text-left" ? (
          <>
            {textContent}
            {visualContent}
          </>
        ) : (
          <>
            {visualContent}
            {textContent}
          </>
        )}
      </div>
    </section>
  );
}
