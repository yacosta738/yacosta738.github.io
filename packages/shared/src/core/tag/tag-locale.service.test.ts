/**
 * Tests for tag locale service and utilities
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { extractTagSlugFromPath, isTagPage } from "./tag-locale.utils";

// Mock getTags for the service functions
vi.mock("./tag.service", () => ({
	getTags: vi.fn(),
}));

vi.mock("./tag.utils", () => ({
	getTagSlug: vi.fn((tag: { slug: string }) => tag.slug),
}));

// ---- Pure utility tests (no mocks needed) ----

describe("extractTagSlugFromPath", () => {
	it("should extract tag slug from English tag page", () => {
		expect(extractTagSlugFromPath("/tag/security")).toBe("security");
	});

	it("should extract tag slug from Spanish tag page", () => {
		expect(extractTagSlugFromPath("/es/tag/seguridad")).toBe("seguridad");
	});

	it("should extract tag slug from paginated tag page", () => {
		expect(extractTagSlugFromPath("/tag/security/page/2")).toBe("security");
	});

	it("should return null for tag index page", () => {
		expect(extractTagSlugFromPath("/tag")).toBeNull();
	});

	it("should return null for tag index page with trailing slash", () => {
		expect(extractTagSlugFromPath("/tag/")).toBeNull();
	});

	it("should return null for non-tag page", () => {
		expect(extractTagSlugFromPath("/about")).toBeNull();
	});

	it("should return null for home page", () => {
		expect(extractTagSlugFromPath("/")).toBeNull();
	});
});

describe("isTagPage", () => {
	it("should return true for tag page", () => {
		expect(isTagPage("/tag/security")).toBe(true);
	});

	it("should return true for paginated tag page", () => {
		expect(isTagPage("/tag/security/page/2")).toBe(true);
	});

	it("should return false for tag index", () => {
		expect(isTagPage("/tag")).toBe(false);
	});

	it("should return false for tag index with trailing slash", () => {
		expect(isTagPage("/tag/")).toBe(false);
	});

	it("should return false for non-tag page", () => {
		expect(isTagPage("/about")).toBe(false);
	});

	it("should return false for home page", () => {
		expect(isTagPage("/")).toBe(false);
	});

	it("should return false for category page", () => {
		expect(isTagPage("/category/tech")).toBe(false);
	});
});

// ---- Service function tests (with mocks) ----

describe("findTagInLanguage", () => {
	let findTagInLanguage: typeof import("./tag-locale.service")["findTagInLanguage"];
	let mockGetTags: ReturnType<typeof vi.fn>;
	let mockGetTagSlug: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		vi.clearAllMocks();
		const tagService = await import("./tag.service");
		const tagUtils = await import("./tag.utils");
		const mod = await import("./tag-locale.service");
		findTagInLanguage = mod.findTagInLanguage;
		mockGetTags = vi.mocked(tagService.getTags);
		mockGetTagSlug = vi.mocked(tagUtils.getTagSlug);
	});

	afterEach(() => {
		vi.restoreAllMocks();
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
	let mockGetTags: ReturnType<typeof vi.fn>;
	let mockGetTagSlug: ReturnType<typeof vi.fn>;

	beforeEach(async () => {
		vi.clearAllMocks();
		const tagService = await import("./tag.service");
		const tagUtils = await import("./tag.utils");
		const mod = await import("./tag-locale.service");
		getTagLocalePaths = mod.getTagLocalePaths;
		mockGetTags = vi.mocked(tagService.getTags);
		mockGetTagSlug = vi.mocked(tagUtils.getTagSlug);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return current language path as tagFound:true", async () => {
		mockGetTags.mockResolvedValue([]);
		mockGetTagSlug.mockReturnValue("security");

		const paths = await getTagLocalePaths("security", "en", ["en"]);

		expect(paths).toHaveLength(1);
		expect(paths[0].lang).toBe("en");
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
		const paths = await getTagLocalePaths("security", "en", ["en", "zz"]);

		expect(paths).toHaveLength(2);
		expect(paths[1].lang).toBe("zz");
		expect(paths[1].tagFound).toBe(false);
	});
});
