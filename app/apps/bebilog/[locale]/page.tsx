import { notFound } from "next/navigation";
import BebilogSite from "@/components/bebilog/BebilogSite";
import { bebilogMessages, supportedBebilogLocales, type BebilogLocale } from "@/components/bebilog/data";

type BebilogLocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedBebilogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BebilogLocalePageProps) {
  const { locale } = await params;
  const messages = bebilogMessages[locale as BebilogLocale];

  if (!messages) {
    return {};
  }

  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

export default async function BebilogLocalePage({ params }: BebilogLocalePageProps) {
  const { locale } = await params;

  if (!supportedBebilogLocales.includes(locale as BebilogLocale)) {
    notFound();
  }

  return <BebilogSite locale={locale as BebilogLocale} />;
}
