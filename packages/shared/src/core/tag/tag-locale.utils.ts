/**
 * Pure utility functions for tag locale handling.
 * These functions don't depend on astro:content and can be tested in Vitest.
 * @module TagLocaleUtils
 */

import { routes } from "@/configs/route.path";
import { LOCALES } from "@/i18n/types";

/**
 * Extracts tag slug from a URL path
 *
 * @param pathname - The URL pathname (e.g., "/tag/security" or "/es/tag/seguridad")
 * @returns The tag slug if found, null otherwise
 *
 * @example
 * extractTagSlugFromPath('/tag/security'); // Returns 'security'
 * extractTagSlugFromPath('/es/tag/seguridad'); // Returns 'seguridad'
 * extractTagSlugFromPath('/tag/'); // Returns null
 * extractTagSlugFromPath('/about'); // Returns null
 */
export function extractTagSlugFromPath(pathname: string): string | null {
	const locales = Object.keys(LOCALES).join("|");
	const tagRoute = routes.tag.replace("/", "\\/");
	// Pattern: /tag/[slug] or /es/tag/[slug]/page/[number]
	// Optional locale prefix based on supported locales
	const tagPagePattern = new RegExp(
		`^/(?:(${locales})/)?${tagRoute}/([^/]+)(?:/|$)`,
		"i",
	);
	const match = tagPagePattern.exec(pathname);
	return match ? match[2] : null;
}

/**
 * Checks if a given pathname represents a tag page
 *
 * @param pathname - The URL pathname to check
 * @returns True if the path is a tag page, false otherwise
 *
 * @example
 * isTagPage('/tag/security'); // true
 * isTagPage('/es/tag/security/page/2'); // true
 * isTagPage('/tag'); // false (tag index)
 * isTagPage('/about'); // false
 */
export function isTagPage(pathname: string): boolean {
	return extractTagSlugFromPath(pathname) !== null;
}
