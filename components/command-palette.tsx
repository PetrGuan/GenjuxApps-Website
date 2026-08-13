"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { products } from "@/lib/products";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const productLinks = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (!open) {
      return;
    }

    productLinks.current[0]?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      const index = Number.parseInt(event.key, 10) - 1;
      if (
        index >= 0 &&
        index < products.length &&
        dialogRef.current?.contains(document.activeElement)
      ) {
        productLinks.current[index]?.click();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="palette-layer">
      <button
        aria-label="Close product explorer"
        className="palette-backdrop"
        onClick={() => onOpenChange(false)}
        type="button"
      />
      <div
        aria-label="Product explorer"
        aria-modal="true"
        className="command-palette"
        ref={dialogRef}
        role="dialog"
      >
        <div className="palette-title">
          <span>⌘ K</span>
          <p>PRODUCT EXPLORER</p>
          <span>ESC</span>
        </div>
        <div className="palette-list">
          {products.map((product, index) => (
            <Link
              href={product.route}
              key={product.slug}
              onClick={() => onOpenChange(false)}
              ref={(element) => {
                productLinks.current[index] = element;
              }}
            >
              <img alt="" src={product.assets.icon} />
              <span>
                <strong>{product.name}</strong>
                <small>{product.tagline}</small>
              </span>
              <kbd>{index + 1}</kbd>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
