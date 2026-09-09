import { createTranslator, type AbstractIntlMessages } from "next-intl";
import type { SiteLocale } from "./routing.mjs";

export function translator<Messages extends AbstractIntlMessages>(locale: SiteLocale, messages: Messages) {
  return createTranslator({
    locale,
    messages,
    onError(error) { throw error; },
  });
}
