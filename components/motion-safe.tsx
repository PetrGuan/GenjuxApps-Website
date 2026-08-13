"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSafeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionSafe({ children, className, delay = 0 }: MotionSafeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      transition={reducedMotion ? { duration: 0 } : { delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
