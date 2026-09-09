import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import CatalogLayout, { catalogViewport } from "@/components/catalog/layout";
import { siteConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/site-paths";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: withBasePath("/images/avatar.webp") },
};
export const viewport: Viewport = catalogViewport;
export default function EnglishCatalogLayout({ children }: { children: ReactNode }) {
  return <CatalogLayout locale="en">{children}</CatalogLayout>;
}
