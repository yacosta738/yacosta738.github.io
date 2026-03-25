import { describe, expect, it } from "vitest";
import { getCategorySlug } from "./category.utils";

describe("getCategorySlug", () => {
	it("should return slug when category has a slug property", () => {
		const category = { id: "en/tech", slug: "technology" } as any;
		expect(getCategorySlug(category)).toBe("technology");
	});

	it("should return cleaned id when slug is empty string", () => {
		const category = { id: "en/tech", slug: "" } as any;
		expect(getCategorySlug(category)).toBe("tech");
	});

	it("should return cleaned id when slug is whitespace", () => {
		const category = { id: "en/tech", slug: "   " } as any;
		expect(getCategorySlug(category)).toBe("tech");
	});

	it("should return cleaned id when no slug property exists", () => {
		const category = { id: "en/programming" } as any;
		expect(getCategorySlug(category)).toBe("programming");
	});

	it("should strip language prefix from id", () => {
		const category = { id: "es/desarrollo" } as any;
		expect(getCategorySlug(category)).toBe("desarrollo");
	});

	it("should handle id without language prefix", () => {
		const category = { id: "general" } as any;
		expect(getCategorySlug(category)).toBe("general");
	});
});
