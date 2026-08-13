"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "./AnimateInView";

const CARDS = [
  {
    key: "local",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "icloud",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 19a4.5 4.5 0 0 1-.42-8.98 7 7 0 0 1 13.84 0A4.5 4.5 0 0 1 17.5 19H6.5Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    key: "noTracking",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "onDevice",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3v3H9V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Privacy() {
  const t = useTranslations("privacy");

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateInView className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-[#50C878] to-[#32ADE6] bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </AnimateInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <AnimateInView key={card.key} delay={i * 0.05}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full hover:border-[rgba(80,200,120,0.2)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[rgba(80,200,120,0.1)] border border-[rgba(80,200,120,0.15)] flex items-center justify-center text-[#50C878] mb-4">
                  {card.icon}
                </div>
                <h3 className="text-white text-sm font-semibold mb-2">
                  {t(`${card.key}.title`)}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {t(`${card.key}.description`)}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
