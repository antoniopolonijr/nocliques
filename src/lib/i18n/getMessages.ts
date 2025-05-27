import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

export async function getMessages(locale: string) {
  const finalLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return (await import(`../../../messages/${finalLocale}.json`)).default;
}
