import type { Metadata, Viewport } from "next";
import RootDocument from "@/components/root-document";

export const metadata: Metadata = {
  title: "Genjux — Software",
  description: "Software products by Genjux.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090a0d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
