import { DEFAULT_LOCALE, isLang, type Lang } from "@/i18n";

/**
 * Resolves the current locale from the URL and optional params.lang.
 * Ensures only valid locales are returned, falling back to DEFAULT_LOCALE.
 */
export function resolveLocaleFromUrl(url: URL, paramsLang?: string): Lang {
	const localeSegment = url.pathname.split("/")[1];
	if (paramsLang && isLang(paramsLang)) {
		return paramsLang;
	}

	if (localeSegment && isLang(localeSegment)) {
		return localeSegment;
	}

	return DEFAULT_LOCALE;
}
