"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,107,107,0.15)_0%,rgba(175,130,255,0.1)_40%,transparent_70%)] blur-[40px]" />

      {/* iPhone Air frame — 1:2.17 aspect ratio */}
      <div className="relative w-[272px] h-[572px] bg-[#1a1a1a] rounded-[48px] border-[2.5px] border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(255,107,107,0.08)]">
        {/* Screen area with thin bezel */}
        <div className="absolute inset-[4px] rounded-[44px] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="relative z-10 flex justify-center pt-[10px]">
            <div className="w-[100px] h-[30px] bg-black rounded-full" />
          </div>

          {/* Screenshot — offset up to overlap behind Dynamic Island like real iPhone */}
          <img
            src="/apps/bebilog/images/screenshot-home.png"
            alt="Bebilog app home screen"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
