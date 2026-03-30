import {
	DEFAULT_LOCALE,
	type Lang,
	LOCALES,
	SHOW_DEFAULT_LANG_IN_URL,
} from "./types";

const buildLocalePrefixRegex = (locales: string[]): RegExp => {
	if (locales.length === 0) return /^\//;
	return new RegExp(`^/(?:${locales.join("|")})(?:/|$)`);
};

const normalizePath = (path: string): string =>
	(path.startsWith("/") ? path : `/${path}`).replaceAll(/\/{2,}/g, "/");

export const stripLocalePrefix = (path: string): string => {
	const normalizedPath = normalizePath(path);
	const localePrefixRegex = buildLocalePrefixRegex(Object.keys(LOCALES));
	return normalizedPath.replace(localePrefixRegex, "/");
};

export const buildLocalePath = (path: string, targetLang: Lang): string => {
	const pathWithoutLocale = stripLocalePrefix(path);

	if (!SHOW_DEFAULT_LANG_IN_URL && targetLang === DEFAULT_LOCALE) {
		return pathWithoutLocale;
	}

	const suffix = pathWithoutLocale === "/" ? "/" : pathWithoutLocale;
	return `/${targetLang}${suffix}`;
};
