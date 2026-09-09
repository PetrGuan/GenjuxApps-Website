import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import RootDocument from "@/components/root-document";

export const metadata: Metadata = {
  title: "GenjuxApps — 用心制作的软件",
  description: "Genjux 为 Mac、iPhone 和 iPad 制作的应用。",
};

export const viewport: Viewport = { colorScheme: "dark", themeColor: "#090a0d" };

export default function ChineseRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="zh">{children}</RootDocument>;
}
