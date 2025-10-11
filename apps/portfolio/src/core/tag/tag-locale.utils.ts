/**
 * Pure utility functions for tag locale handling.
 * These functions don't depend on astro:content and can be tested in Vitest.
 * @module TagLocaleUtils
 */

/**
 * Extracts tag slug from a URL path
 *
 * @param pathname - The URL pathname (e.g., "/en/tag/security" or "/es/tag/seguridad")
 * @returns The tag slug if found, null otherwise
 *
 * @example
 * extractTagSlugFromPath('/en/tag/security'); // Returns 'security'
 * extractTagSlugFromPath('/es/tag/'); // Returns null
 * extractTagSlugFromPath('/en/about'); // Returns null
 */
export function extractTagSlugFromPath(pathname: string): string | null {
	// Pattern: /[lang]/tag/[slug] or /[lang]/tag/[slug]/page/[number]
	// Must have content after /tag/ (not just empty or slash)
	const tagPagePattern = /^\/[a-z]{2}(?:-[a-z]{2})?\/tag\/([^/]+)(?:\/|$)/i;
	const match = pathname.match(tagPagePattern);
	return match ? match[1] : null;
}

/**
 * Checks if a given pathname represents a tag page
 *
 * @param pathname - The URL pathname to check
 * @returns True if the path is a tag page, false otherwise
 *
 * @example
 * isTagPage('/en/tag/security'); // true
 * isTagPage('/en/tag/security/page/2'); // true
 * isTagPage('/en/tag'); // false (tag index)
 * isTagPage('/en/about'); // false
 */
export function isTagPage(pathname: string): boolean {
	return extractTagSlugFromPath(pathname) !== null;
}
