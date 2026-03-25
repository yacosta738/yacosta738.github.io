import { describe, expect, it } from "vitest";
import { extractTagSlugFromPath, isTagPage } from "./tag-locale.utils";

describe("extractTagSlugFromPath", () => {
	it("should extract slug from /tag/security", () => {
		expect(extractTagSlugFromPath("/tag/security")).toBe("security");
	});

	it("should extract slug from locale-prefixed path /es/tag/seguridad", () => {
		expect(extractTagSlugFromPath("/es/tag/seguridad")).toBe("seguridad");
	});

	it("should extract slug from /en/tag/javascript", () => {
		expect(extractTagSlugFromPath("/en/tag/javascript")).toBe("javascript");
	});

	it("should extract slug from path with trailing slash", () => {
		expect(extractTagSlugFromPath("/tag/security/")).toBe("security");
	});

	it("should extract slug from paginated path /es/tag/security/page/2", () => {
		expect(extractTagSlugFromPath("/es/tag/security/page/2")).toBe("security");
	});

	it("should return null for /tag/ (no slug)", () => {
		expect(extractTagSlugFromPath("/tag/")).toBeNull();
	});

	it("should return null for /about", () => {
		expect(extractTagSlugFromPath("/about")).toBeNull();
	});

	it("should return null for /tag (index)", () => {
		expect(extractTagSlugFromPath("/tag")).toBeNull();
	});

	it("should return null for empty path", () => {
		expect(extractTagSlugFromPath("")).toBeNull();
	});
});

describe("isTagPage", () => {
	it("should return true for /tag/security", () => {
		expect(isTagPage("/tag/security")).toBe(true);
	});

	it("should return true for /es/tag/security/page/2", () => {
		expect(isTagPage("/es/tag/security/page/2")).toBe(true);
	});

	it("should return false for /tag (index)", () => {
		expect(isTagPage("/tag")).toBe(false);
	});

	it("should return false for /about", () => {
		expect(isTagPage("/about")).toBe(false);
	});
});
