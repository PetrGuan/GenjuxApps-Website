"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CommandPalette from "@/components/command-palette";
import { studioRoutes } from "@/lib/routes";

export default function SiteHeader() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navigationDisclosureRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const syncDisclosure = () => {
      navigationDisclosureRef.current?.toggleAttribute("open", !mobileQuery.matches);
    };

    syncDisclosure();
    mobileQuery.addEventListener("change", syncDisclosure);
    return () => mobileQuery.removeEventListener("change", syncDisclosure);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA");

      if (!isTyping && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="site-header">
        <nav aria-label="Primary navigation" className="page-shell site-nav">
          <Link href="/" className="wordmark" aria-label="Genjux home">
            GENJUX
          </Link>
          <details className="nav-disclosure" open ref={navigationDisclosureRef}>
            <summary>Menu</summary>
            <div className="nav-links">
              {studioRoutes.map((route) => (
                <Link href={route.href} key={route.href}>
                  {route.label}
                </Link>
              ))}
              <button aria-label="Open product command palette" onClick={() => setPaletteOpen(true)} type="button">
                <span aria-hidden="true">⌘</span> K Explore
              </button>
            </div>
          </details>
        </nav>
      </header>
      <CommandPalette onOpenChange={setPaletteOpen} open={paletteOpen} />
    </>
  );
}
