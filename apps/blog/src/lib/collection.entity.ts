import type { Lang } from "@/i18n/types";

/**
 * Parses an entity ID that may contain a language prefix
 *
 * @param entityId - The entity ID that might contain a language prefix
 * @returns Object containing the language code (or null if none) and cleaned path
 *
 * @example
 * // Returns { lang: "en", path: "yuniel-acosta" }
 * parseEntityId("en/yuniel-acosta");
 *
 * @example
 * // Returns { lang: "zh-cn", path: "yuniel-acosta" }
 * parseEntityId("zh-cn/yuniel-acosta");
 *
 * @example
 * // Returns { lang: null, path: "yuniel-acosta" }
 * parseEntityId("yuniel-acosta");
 */
export function parseEntityId(entityId: string): {
	lang: Lang | null;
	path: string;
} {
	// Match language prefixes like "en/", "es/", "zh-cn/", etc.
	const languagePrefixRegex = /^([a-z]{2}(?:-[a-z]{2})?)\/(.+)$/i;
	const match = entityId.match(languagePrefixRegex);

	if (match) {
		// If language prefix exists, return it with the cleaned path
		return {
			lang: match[1],
			path: match[2],
		};
	}
	// If no language prefix, return null for lang and the original path
	return {
		lang: null,
		path: entityId,
	};
}

/**
 * Cleans an entity ID by removing language prefixes (e.g., "en/", "es/", "zh-cn/")
 *
 * @param entityId - The entity ID that might contain a language prefix
 * @returns The cleaned entity ID without language prefix
 *
 * @example
 * // Returns "yuniel-acosta"
 * cleanEntityId("en/yuniel-acosta");
 *
 * @example
 * // Returns "yuniel-acosta"
 * cleanEntityId("zh-cn/yuniel-acosta");
 *
 * @example
 * // Returns "yuniel-acosta" (when no prefix exists)
 * cleanEntityId("yuniel-acosta");
 */
export function cleanEntityId(entityId: string): string {
	return parseEntityId(entityId).path;
}
