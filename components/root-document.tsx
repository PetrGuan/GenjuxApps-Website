import type { ReactNode } from "react";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { htmlLanguage, withBasePath, type SiteLocale } from "@/i18n/routing.mjs";
import "@/app/globals.css";
import "@/public/site-language.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export default function RootDocument({ locale, children }: { locale: SiteLocale; children: ReactNode }) {
  return (
    <html data-scroll-behavior="smooth" lang={htmlLanguage(locale)}>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <Script src={withBasePath("/site-language.js")} strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
