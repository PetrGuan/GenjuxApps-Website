"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import { AppleIcon, AndroidIcon } from "./Icons";
import AppStoreBadge from "./AppStoreBadge";

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text moves up faster than scroll (parallax out)
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Phone moves up slower than scroll (stays behind)
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Text content with parallax */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full mb-8"
          >
            <AppleIcon className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white/70 text-xs">{t("badge")}</span>
            <span className="text-white/30 text-xs">·</span>
            <AndroidIcon className="w-3.5 h-3.5 text-brand/70" />
            <span className="text-brand/70 text-xs">{t("badgeAndroid")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-brand via-sleep to-growth bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16"
          >
            <AppStoreBadge className="h-12" />
            <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 text-base cursor-default">
              <AndroidIcon className="w-5 h-5" />
              {t("androidComingSoon")}
            </div>
          </motion.div>
        </motion.div>

        {/* Phone mockup with slower parallax */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ y: phoneY, scale: phoneScale }}
          className="flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
