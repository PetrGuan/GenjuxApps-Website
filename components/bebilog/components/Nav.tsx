"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";
import { APP_STORE_URL } from "@/components/bebilog/data";
import { withBasePath } from "@/lib/site-paths";
import { localizedHref } from "@/i18n/routing.mjs";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale() === "zh" ? "zh" : "en";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Product pages intentionally use a document navigation to leave the isolated route group. */}
          <a href={localizedHref("/", locale)} aria-label={locale === "zh" ? "返回 Genjux 首页" : "Back to Genjux"} className="text-xs text-white/50 transition-colors hover:text-white">
            ← Genjux
          </a>
          <span aria-hidden="true" className="text-white/20">/</span>
          <Image src={withBasePath("/apps/bebilog/images/app-icon.png")} alt="Bebilog" width={28} height={28} className="rounded-lg" />
          <span className="text-white font-bold text-base hidden min-[420px]:inline">Bebilog</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6">
          <a href="#features" className="text-white/50 text-sm hover:text-white/80 transition-colors hidden sm:block">
            {t("features")}
          </a>
          <a href="#pricing" className="text-white/50 text-sm hover:text-white/80 transition-colors hidden sm:block">
            {t("pricing")}
          </a>
          <LanguageToggle />
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-br from-brand to-[#FF5252] rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("download")}
          </a>
        </div>
      </div>
    </nav>
  );
}
