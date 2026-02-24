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
		const langPrefixRegex = new RegExp(`^/${targetLang}/`);
		if (langPrefixRegex.test(normalizedPath)) {
			return normalizedPath;
		}
		if (!SHOW_DEFAULT_LANG_IN_URL && targetLang === DEFAULT_LOCALE) {
			return normalizedPath;
		}
		return `/${targetLang}${normalizedPath}`;
	};
}

export const localeParams = Object.keys(LOCALES).map((langKey) => ({
	params: { lang: langKey },
}));
