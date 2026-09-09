import { notFound } from "next/navigation";
import BebilogSite from "@/components/bebilog/BebilogSite";
import { supportedBebilogLocales } from "@/components/bebilog/data";
import { getBebilogMetadata, bebilogViewport } from "@/components/bebilog/metadata";

type BebilogLocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;
export const viewport = bebilogViewport;

export function generateStaticParams() {
  return supportedBebilogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BebilogLocalePageProps) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "zh") notFound();
  return getBebilogMetadata(locale);
}

export default async function BebilogLocalePage({ params }: BebilogLocalePageProps) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "zh") {
    notFound();
  }

  return <BebilogSite locale={locale} />;
}
