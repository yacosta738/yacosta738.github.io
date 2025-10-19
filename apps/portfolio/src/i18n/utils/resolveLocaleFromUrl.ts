import { DEFAULT_LOCALE, type Lang, LOCALES } from "@/i18n";

/**
 * Resolves the current locale from the URL and optional params.lang.
 * Ensures only valid locales are returned, falling back to DEFAULT_LOCALE.
 */
export function resolveLocaleFromUrl(url: URL, paramsLang?: string): Lang {
    const localeSegment = url.pathname.split("/")[1];
    const validLocales = Object.keys(LOCALES);
    return (paramsLang ||
        (validLocales.includes(localeSegment) ? localeSegment : undefined) ||
        DEFAULT_LOCALE) as Lang;
}
