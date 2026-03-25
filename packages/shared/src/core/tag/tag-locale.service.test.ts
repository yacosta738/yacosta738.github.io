/**
 * Tests for tag locale service functions (findTagInLanguage, getTagLocalePaths).
 * Pure utility tests for extractTagSlugFromPath / isTagPage live in tag-locale.utils.test.ts.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock getTags for the service functions
vi.mock("./tag.service", () => ({
	getTags: vi.fn(),
}));

vi.mock("./tag.utils", () => ({
	getTagSlug: vi.fn((tag: { slug: string }) => tag.slug),
}));

// ---- Shared mock setup for service function tests ----

let mockGetTags: ReturnType<typeof vi.fn>;
let mockGetTagSlug: ReturnType<typeof vi.fn>;

async function importMocks() {
	const tagService = await import("./tag.service");
	const tagUtils = await import("./tag.utils");
	mockGetTags = vi.mocked(tagService.getTags);
	mockGetTagSlug = vi.mocked(tagUtils.getTagSlug);
}

beforeEach(async () => {
	vi.clearAllMocks();
	await importMocks();
});

afterEach(() => {
	vi.restoreAllMocks();
});

// ---- Service function tests ----

describe("findTagInLanguage", () => {
	let findTagInLanguage: typeof import("./tag-locale.service")["findTagInLanguage"];

	beforeEach(async () => {
		const mod = await import("./tag-locale.service");
		findTagInLanguage = mod.findTagInLanguage;
	});

	it("should return found:true with matching tag when slug matches", async () => {
		const matchingTag = {
			id: "es/security",
			slug: "security",
			title: "Seguridad",
		};
		mockGetTags.mockResolvedValueOnce([matchingTag]);
		mockGetTagSlug.mockReturnValue("security");

		const result = await findTagInLanguage("security", "es");

		expect(result.found).toBe(true);
		expect(result.tag).toBe(matchingTag);
		expect(result.fallbackPath).toContain("security");
	});

	it("should return found:false when no matching tag exists", async () => {
		mockGetTags.mockResolvedValueOnce([
			{ id: "es/javascript", slug: "javascript", title: "JavaScript" },
		]);
		mockGetTagSlug.mockReturnValue("javascript");

		const result = await findTagInLanguage("security", "es");

		expect(result.found).toBe(false);
		expect(result.fallbackPath).toBeDefined();
	});

	it("should return found:false with fallback on error", async () => {
		mockGetTags.mockRejectedValueOnce(new Error("fail"));

		const result = await findTagInLanguage("security", "es");

		expect(result.found).toBe(false);
		expect(result.fallbackPath).toBeDefined();
	});
});

describe("getTagLocalePaths", () => {
	let getTagLocalePaths: typeof import("./tag-locale.service")["getTagLocalePaths"];

	beforeEach(async () => {
		const mod = await import("./tag-locale.service");
		getTagLocalePaths = mod.getTagLocalePaths;
	});

	it("should return current language path as tagFound:true", async () => {
		mockGetTags.mockResolvedValue([]);
		mockGetTagSlug.mockReturnValue("security");

		const paths = await getTagLocalePaths("security", "en", ["en"]);

		expect(paths).toHaveLength(1);
		expect(paths[0].lang).toBe("en");
		// Current language always has tagFound:true because the user is already viewing
		// this tag page — the slug was resolved from the URL, so we know it exists in
		// the current language. mockGetTags returning empty here only affects *other*
		// languages; the current language is unconditionally marked as found.
		expect(paths[0].tagFound).toBe(true);
	});

	it("should check other languages for matching tags", async () => {
		const esTag = { id: "es/security", slug: "security", title: "Seguridad" };
		mockGetTags.mockResolvedValue([esTag]);
		mockGetTagSlug.mockReturnValue("security");

		const paths = await getTagLocalePaths("security", "en", ["en", "es"]);

		expect(paths).toHaveLength(2);
		expect(paths[0].lang).toBe("en");
		expect(paths[0].tagFound).toBe(true);
		expect(paths[1].lang).toBe("es");
		expect(paths[1].tagFound).toBe(true);
	});

	it("should handle unsupported language codes gracefully", async () => {
		// Explicitly mock: tag exists only for "en", not for "zz"
		mockGetTags.mockResolvedValue([]);
		mockGetTagSlug.mockReturnValue("security");

		const paths = await getTagLocalePaths("security", "en", ["en", "zz"]);

		expect(paths).toHaveLength(2);
		expect(paths[1].lang).toBe("zz");
		expect(paths[1].tagFound).toBe(false);
	});
});
