import {
	DEFAULT_LOCALE,
	type Lang,
	LOCALES,
	SHOW_DEFAULT_LANG_IN_URL,
} from "./types";

export * from "../../../../packages/shared/src/i18n/i18n";
export { useTranslations } from "./utils";

export function useTranslatedPath(lang: Lang) {
	return function translatePath(path: string, targetLang: Lang = lang): string {
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		const defaultLangPrefixRegex = new RegExp(`^/${DEFAULT_LOCALE}(?:/|$)`);
		const normalizedWithoutDefaultPrefix = normalizedPath.replace(
			defaultLangPrefixRegex,
			"/",
		);

		const langPrefixRegex = new RegExp(`^/${targetLang}/`);
		if (langPrefixRegex.test(normalizedPath)) {
			if (!SHOW_DEFAULT_LANG_IN_URL && targetLang === DEFAULT_LOCALE) {
				return normalizedWithoutDefaultPrefix;
			}
			return normalizedPath;
		}

		if (!SHOW_DEFAULT_LANG_IN_URL && targetLang === DEFAULT_LOCALE) {
			return normalizedWithoutDefaultPrefix;
		}

		return `/${targetLang}${normalizedPath}`;
	};
}

const ROUTE_LOCALE_KEYS = Object.keys(LOCALES) as Lang[];

export const ROUTE_LOCALES: Lang[] = SHOW_DEFAULT_LANG_IN_URL
	? ROUTE_LOCALE_KEYS
	: ROUTE_LOCALE_KEYS.filter((lang) => lang !== DEFAULT_LOCALE);

export const localeParams = ROUTE_LOCALES.map((lang) => ({
	params: { lang },
}));
