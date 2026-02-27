import { getRelativeLocaleUrl } from "astro:i18n";
import {
	extractTagSlugFromPath,
	getTagLocalePaths,
	isTagPage,
} from "@/core/tag";
import {
	DEFAULT_LOCALE,
	type Lang,
	LOCALES,
	type Multilingual,
	SHOW_DEFAULT_LANG_IN_URL,
} from "./types";
import { useTranslations } from "./utils";

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
	return function translatePath(path: string, targetLang: Lang = lang): string {
		// Ensure path starts with a slash
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;

		// Check if path already starts with the target language prefix
		const langPrefixRegex = new RegExp(`^/${targetLang}/`);
		if (langPrefixRegex.test(normalizedPath)) {
			// Path already has the language prefix, return as is
			return normalizedPath;
		}

		// For default language, we might not show the language prefix based on config
		if (!SHOW_DEFAULT_LANG_IN_URL && targetLang === DEFAULT_LOCALE) {
			return normalizedPath;
		}

		// For other languages, or if we always show the language prefix
		return `/${targetLang}${normalizedPath}`;
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
	const locales = Object.keys(LOCALES);
	const pattern = `^/(${locales.join("|")})/`;
	return new RegExp(pattern);
};

export function getLocalePaths(url: URL): LocalePath[] {
	// Create a regex pattern that matches only language prefixes
	const langPrefixRegex = buildLangPrefixRegex();

	// Extract the pathname without the language prefix if it exists
	const pathWithoutLangPrefix = url.pathname.replace(langPrefixRegex, "");

	// If pathWithoutLangPrefix is empty, it means the URL was just a language prefix
	// In that case, use "/" as the path
	// Ensure the path starts with "/" for Astro's getRelativeLocaleUrl
	const cleanPath = pathWithoutLangPrefix
		? `/${pathWithoutLangPrefix.replace(/^\/+/, "")}`
		: "/";

	return Object.keys(LOCALES).map((lang) => {
		const localePath = getRelativeLocaleUrl(lang, cleanPath);
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
	const pathname = url.pathname;

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

	// For non-tag pages, use the standard behavior
	return getLocalePaths(url);
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

export const retrieveLocalizedString = (key: string | Multilingual): string => {
	const currentLang = (import.meta.env.LANG as Lang) || DEFAULT_LOCALE;
	const t = useTranslations(currentLang);
	return t(key);
};
