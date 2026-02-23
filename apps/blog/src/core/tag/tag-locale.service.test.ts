/**
 * Tests for tag locale utilities
 * Note: We only test pure utility functions that don't depend on astro:content.
 * Functions like findTagInLanguage and getTagLocalePaths cannot be tested in Vitest
 * because they depend on getTags() which uses astro:content (server-only).
 */
import { describe, expect, it } from "vitest";
import { extractTagSlugFromPath, isTagPage } from "./tag-locale.utils";

describe("extractTagSlugFromPath", () => {
	it("should extract tag slug from English tag page", () => {
		const slug = extractTagSlugFromPath("/en/tag/security");
		expect(slug).toBe("security");
	});

	it("should extract tag slug from Spanish tag page", () => {
		const slug = extractTagSlugFromPath("/es/tag/seguridad");
		expect(slug).toBe("seguridad");
	});

	it("should extract tag slug from paginated tag page", () => {
		const slug = extractTagSlugFromPath("/en/tag/security/page/2");
		expect(slug).toBe("security");
	});

	it("should return null for tag index page", () => {
		const slug = extractTagSlugFromPath("/en/tag");
		expect(slug).toBeNull();
	});

	it("should return null for tag index page with trailing slash", () => {
		const slug = extractTagSlugFromPath("/en/tag/");
		expect(slug).toBeNull();
	});

	it("should return null for non-tag page", () => {
		const slug = extractTagSlugFromPath("/en/about");
		expect(slug).toBeNull();
	});

	it("should return null for home page", () => {
		const slug = extractTagSlugFromPath("/en/");
		expect(slug).toBeNull();
	});
});

describe("isTagPage", () => {
	it("should return true for tag page", () => {
		expect(isTagPage("/en/tag/security")).toBe(true);
	});

	it("should return true for paginated tag page", () => {
		expect(isTagPage("/en/tag/security/page/2")).toBe(true);
	});

	it("should return false for tag index", () => {
		expect(isTagPage("/en/tag")).toBe(false);
	});

	it("should return false for tag index with trailing slash", () => {
		expect(isTagPage("/en/tag/")).toBe(false);
	});

	it("should return false for non-tag page", () => {
		expect(isTagPage("/en/about")).toBe(false);
	});

	it("should return false for home page", () => {
		expect(isTagPage("/en/")).toBe(false);
	});

	it("should return false for category page", () => {
		expect(isTagPage("/en/category/tech")).toBe(false);
	});
});
