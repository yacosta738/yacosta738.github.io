import {
	extractTagSlugFromPath,
	getTagLocalePaths,
	isTagPage,
} from "@/core/tag";
import { buildLocalePath } from "./path";
import {
	DEFAULT_LOCALE,
	type Lang,
	LOCALES,
	type Multilingual,
	SHOW_DEFAULT_LANG_IN_URL,
} from "./types";
import { useTranslations } from "./utils";

const ARTICLE_PATH_PATTERN = /^\/(?:\d{4}\/\d{2}\/\d{2}\/[^/]+)\/?$/;

/**
 * Helper to get the translation function
 * @param - The current language
 * @returns - The translation function
 */

/**
 * Helper to translate paths between languages
 * @param lang - The current language
 * @returns - A function that translates paths
 *
 * @example
 * const translatePath = useTranslatedPath('en');
 * translatePath('/about'); // returns '/about' if en is default and SHOW_DEFAULT_LANG_IN_URL is false
 * translatePath('/about', 'es'); // returns '/es/about'
 * translatePath('/en/about', 'en'); // returns '/en/about' (prevents duplicate prefixes)
 */
export function useTranslatedPath(lang: Lang) {
	const fallbackLang = lang || DEFAULT_LOCALE;
	return function translatePath(
		path: string,
		targetLang: Lang = fallbackLang,
	): string {
		const resolvedLang = targetLang || fallbackLang;
		return buildLocalePath(path, resolvedLang);
	};
}

/**
 * Generates an array of locale paths for different languages based on a given URL.
 *
 * @param url - The URL to extract and transform the pathname
 * @returns An array of LocalePath objects containing language code and localized path
 *
 * @example
 * // For URL: new URL('https://example.com/en/about')
 * // Returns: [
 * //   { lang: 'en', path: '/en/about' },
 * //   { lang: 'de', path: '/de/about' },
 * //   ...
 * // ]
 */
/**
 * Build a regex pattern for matching language prefixes
 */
const buildLangPrefixRegex = (): RegExp => {
	const locales = Object.keys(LOCALES) as Lang[];
	const pattern = `^/(${locales.join("|")})/`;
	return new RegExp(pattern);
};

const normalizeLocalizedPathname = (pathname: string): string => {
	const collapsedPath = pathname.replaceAll(/\/{2,}/g, "/");
	return collapsedPath;
};

const getPathLocale = (pathname: string): Lang => {
	const langPrefixRegex = buildLangPrefixRegex();
	const match = langPrefixRegex.exec(pathname);
	return (match?.[1] as Lang | undefined) ?? DEFAULT_LOCALE;
};

const isArticlePath = (pathname: string): boolean => {
	const normalizedPath = normalizeLocalizedPathname(pathname);
	const pathWithoutLocale = normalizedPath.replace(buildLangPrefixRegex(), "/");
	return ARTICLE_PATH_PATTERN.test(pathWithoutLocale);
};

const toArticleId = (pathname: string, lang: Lang): string => {
	const pathWithoutLocale = pathname.replace(buildLangPrefixRegex(), "/");
	return `${lang}/${pathWithoutLocale.replace(/^\/+|\/+$/g, "")}`;
};

export function getLocalePaths(url: URL): LocalePath[] {
	const normalizedPathname = normalizeLocalizedPathname(url.pathname);
	// Create a regex pattern that matches only language prefixes
	const langPrefixRegex = buildLangPrefixRegex();

	// Extract the pathname without the language prefix if it exists
	const pathWithoutLangPrefix = normalizedPathname.replace(langPrefixRegex, "");

	// If pathWithoutLangPrefix is empty, it means the URL was just a language prefix
	// In that case, use "/" as the path
	// Ensure the path starts with "/" for Astro's getRelativeLocaleUrl
	const cleanPath = pathWithoutLangPrefix
		? `/${pathWithoutLangPrefix.replace(/^\/+/, "")}`
		: "/";

	const locales = Object.keys(LOCALES) as Lang[];
	return locales.map((lang) => {
		const localePath = buildLocalePath(cleanPath, lang);
		return {
			lang,
			path: localePath,
		};
	});
}

/**
 * Enhanced version of getLocalePaths that handles tag pages intelligently.
 * For tag pages, it checks if the tag exists in each language and provides
 * appropriate fallbacks if not.
 *
 * @param url - The URL to extract and transform the pathname
 * @returns Promise resolving to an array of LocalePath objects with smart tag handling
 *
 * @example
 * // For tag page URL: new URL('https://example.com/en/tag/security')
 * // Returns: [
 * //   { lang: 'en', path: '/en/tag/security' },
 * //   { lang: 'es', path: '/es/tag/security' },  // if tag exists
 * //   { lang: 'de', path: '/de/tag' },           // fallback if tag doesn't exist
 * // ]
 */
export async function getLocalePathsEnhanced(url: URL): Promise<LocalePath[]> {
	const pathname = normalizeLocalizedPathname(url.pathname);

	// Check if this is a tag page
	if (isTagPage(pathname)) {
		const tagSlug = extractTagSlugFromPath(pathname);
		if (tagSlug) {
			// Extract current language using the shared regex builder
			const langPrefixRegex = buildLangPrefixRegex();
			const match = langPrefixRegex.exec(pathname);
			const currentLang = match?.[1] ?? DEFAULT_LOCALE;

			// Get tag-aware locale paths
			const tagPaths = await getTagLocalePaths(
				tagSlug,
				currentLang,
				Object.keys(LOCALES),
			);

			// HACK: The type definition for `getTagLocalePaths` is incorrect.
			// It can return a path object, but the type says it's always a string.
			// We cast it here to what it actually is at runtime to make TS happy.
			const tagPathsTyped = tagPaths as Array<{
				lang: string;
				path: string | { path: string };
				tagFound: boolean;
			}>;

			return tagPathsTyped.map(({ lang, path }) => ({
				lang,
				path: typeof path === "string" ? path : path.path,
			}));
		}
	}

	if (isArticlePath(pathname)) {
		const { getArticles } = await import("@/core/article");
		const articleIds = new Set(
			(await getArticles()).map((article) => article.id),
		);
		const currentLang = getPathLocale(pathname);
		const paths = getLocalePaths(new URL(pathname, url.origin));
		const existingPaths = paths.filter(({ lang, path }) =>
			articleIds.has(toArticleId(path, lang)),
		);
		const currentPath = paths.find(({ lang }) => lang === currentLang);

		if (
			currentPath &&
			!existingPaths.some(
				({ lang, path }) =>
					lang === currentPath.lang && path === currentPath.path,
			)
		) {
			return [currentPath, ...existingPaths];
		}

		return existingPaths;
	}

	// For non-tag pages, use the standard behavior
	return getLocalePaths(new URL(pathname, url.origin));
}

type LocalePath = {
	lang: Lang;
	path: string;
};

/**
 * Helper to get locale parms for Astro's `getStaticPaths` function
 * @returns - The list of locale params
 * @see https://docs.astro.build/en/guides/routing/#dynamic-routes
 */
export const localeParams = Object.keys(LOCALES).map((lang) => ({
	params: { lang },
}));

const ROUTE_LOCALE_KEYS = Object.keys(LOCALES).filter(
	(lang): lang is Lang => lang in LOCALES,
);

export const ROUTE_LOCALES: Lang[] = SHOW_DEFAULT_LANG_IN_URL
	? ROUTE_LOCALE_KEYS
	: ROUTE_LOCALE_KEYS.filter((lang) => lang !== DEFAULT_LOCALE);

export const localeRouteParams = ROUTE_LOCALES.map((lang) => ({
	params: { lang },
}));

export const retrieveLocalizedString = (key: string | Multilingual): string => {
	const currentLang = (import.meta.env.LANG as Lang) || DEFAULT_LOCALE;
	const t = useTranslations(currentLang);
	return t(key);
};
