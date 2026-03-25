import { describe, expect, it } from "vitest";
import { type CategoryLike, getCategorySlug } from "./category.utils";

const makeCategory = (
	overrides: Partial<{ id: string; slug: string }>,
): CategoryLike => ({ id: "en/default", ...overrides }) as CategoryLike;

describe("getCategorySlug", () => {
	it("should return slug when category has a slug property", () => {
		expect(
			getCategorySlug(makeCategory({ id: "en/tech", slug: "technology" })),
		).toBe("technology");
	});

	it("should return cleaned id when slug is empty string", () => {
		expect(getCategorySlug(makeCategory({ id: "en/tech", slug: "" }))).toBe(
			"tech",
		);
	});

	it("should return cleaned id when slug is whitespace", () => {
		expect(getCategorySlug(makeCategory({ id: "en/tech", slug: "   " }))).toBe(
			"tech",
		);
	});

	it("should return cleaned id when no slug property exists", () => {
		expect(getCategorySlug(makeCategory({ id: "en/programming" }))).toBe(
			"programming",
		);
	});

	it("should strip language prefix from id", () => {
		expect(getCategorySlug(makeCategory({ id: "es/desarrollo" }))).toBe(
			"desarrollo",
		);
	});

	it("should handle id without language prefix", () => {
		expect(getCategorySlug(makeCategory({ id: "general" }))).toBe("general");
	});
});
