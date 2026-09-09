import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath, type SiteLocale } from "@/i18n/routing.mjs";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string; locale?: SiteLocale };

export default function LocaleLink({ href, locale = "en", ...props }: Props) {
  return <Link href={localePath(href, locale)} {...props} />;
}
