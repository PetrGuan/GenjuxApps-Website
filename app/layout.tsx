import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Genjux — Independent Apps",
  description: "Private, native, human-centered software for Apple platforms.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090a0d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${geist.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
