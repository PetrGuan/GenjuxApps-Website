"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ConstellationScene = dynamic(() => import("./constellation-scene"), { ssr: false });

export default function Constellation() {
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(desktopQuery.matches && !reducedMotion);

    update();
    desktopQuery.addEventListener("change", update);
    return () => desktopQuery.removeEventListener("change", update);
  }, [reducedMotion]);

  return enabled ? <div aria-hidden="true" className="constellation"><ConstellationScene /></div> : null;
}
