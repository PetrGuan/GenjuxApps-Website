"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import AppStoreBadge from "./AppStoreBadge";

// Floating CTA that fades in once the visitor has scrolled past the
// hero (roughly one viewport height), so the download action stays
// reachable without scrolling back to the top.
export default function StickyCTA() {
  const t = useTranslations("hero");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a]/90 py-2 pl-4 pr-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="hidden sm:block text-white/50 text-xs whitespace-nowrap">
        {t("badge")}
      </span>
      <AppStoreBadge className="h-9" />
    </div>
  );
}
