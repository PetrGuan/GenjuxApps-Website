"use client";

import { useLocale } from "next-intl";
import { APP_STORE_URL } from "@/components/bebilog/data";

type Props = {
  className?: string;
};

// Official Apple "Download on the App Store" badge, localized per active locale.
export default function AppStoreBadge({ className = "h-11" }: Props) {
  const locale = useLocale();
  const src = locale === "zh" ? "/apps/bebilog/images/app-store-badge-zh.svg" : "/apps/bebilog/images/app-store-badge-en.svg";

  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Download on the App Store" className={className} />
    </a>
  );
}
