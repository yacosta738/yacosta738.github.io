/**
 * Service for handling tag localization and cross-language mapping.
 * This module provides utilities to find equivalent tags across different languages
 * based on slug matching (e.g., "security" in English maps to "security" in Spanish,
 * even though their titles differ).
 *
 * @module TagLocaleService
 */

import type { Lang } from "@/i18n/types";
import { LOCALES } from "@/i18n/types";
import type Tag from "./tag.model";
import { getTags } from "./tag.service";

export { extractTagSlugFromPath, isTagPage } from "./tag-locale.utils";

const isLang = (value: string): value is Lang => {
	return Object.hasOwn(LOCALES, value);
};

/**
 * Result of attempting to find a tag in a target language
 */
export type TagLocaleResult = {
	found: boolean;
	tag?: Tag;
	fallbackPath: string;
};

/**
 * Finds the equivalent tag in a target language based on the source tag's slug.
 * If no equivalent is found, provides a fallback path.
 *
 * @param sourceTagSlug - The slug of the tag in the current language
 * @param targetLang - The target language to switch to
 * @returns Promise resolving to a TagLocaleResult with the found tag or fallback
 *
 * @example
 * // Find "security" tag in Spanish when currently viewing English version
 * const result = await findTagInLanguage('security', 'es');
 * if (result.found) {
 *   console.log(`Found: ${result.tag.slug}`); // "security"
 * } else {
 *   console.log(`Fallback to: ${result.fallbackPath}`); // "/es/tag"
 * }
 */
export async function findTagInLanguage(
	sourceTagSlug: string,
	targetLang: Lang,
): Promise<TagLocaleResult> {
	try {
		// Get all tags in the target language
		const targetTags = await getTags({ lang: targetLang });

		// Try to find a tag with the same slug in the target language
		const matchingTag = targetTags.find((tag) => tag.slug === sourceTagSlug);

		if (matchingTag) {
			return {
				found: true,
				tag: matchingTag,
				fallbackPath: `/${targetLang}/tag/${matchingTag.slug}`,
			};
		}

		// No matching tag found - provide fallback to tags index
		return {
			found: false,
			fallbackPath: `/${targetLang}/tag`,
		};
	} catch (error) {
		console.error(`Error finding tag in language ${targetLang}:`, error);
		// On error, fallback to tags index
		return {
			found: false,
			fallbackPath: `/${targetLang}/tag`,
		};
	}
}

/**
 * Generates locale paths for a tag page, intelligently mapping tags across languages.
 * If a tag doesn't exist in a target language, the path will point to the tags index instead.
 *
 * @param currentTagSlug - The slug of the current tag
 * @param currentLang - The current language
 * @param availableLanguages - Array of all available language codes
 * @returns Promise resolving to an array of locale paths for the tag
 *
 * @example
 * const paths = await getTagLocalePaths('security', 'en', ['en', 'es']);
 * // Returns:
 * // [
 * //   { lang: 'en', path: '/en/tag/security', tagFound: true },
 * //   { lang: 'es', path: '/es/tag/security', tagFound: true }
 * // ]
 */
export async function getTagLocalePaths(
	currentTagSlug: string,
	currentLang: Lang,
	availableLanguages: string[],
): Promise<Array<{ lang: string; path: string; tagFound: boolean }>> {
	const paths = [];

	for (const lang of availableLanguages) {
		if (lang === currentLang) {
			// Current language - keep the same path
			paths.push({
				lang,
				path: `/${lang}/tag/${currentTagSlug}`,
				tagFound: true,
			});
		} else {
			// Different language - try to find equivalent tag
			if (!isLang(lang)) {
				paths.push({
					lang,
					path: `/${currentLang}/tag/${currentTagSlug}`,
					tagFound: false,
				});
				continue;
			}

			const result = await findTagInLanguage(currentTagSlug, lang);

			paths.push({
				lang,
				path: result.fallbackPath,
				tagFound: result.found,
			});
		}
	}

	return paths;
}

// Pure utility functions are now imported from tag-locale.utils.ts and re-exported above
