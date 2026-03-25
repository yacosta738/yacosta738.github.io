/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { describe, expect, it } from "vitest";
import { toCategories, toCategory } from "./category.mapper";

const makeCategoryEntry = (
	overrides: Record<string, any> = {},
	id = "en/software-development",
): any => ({
	id,
	data: {
		title: "Software Development",
		order: 1,
		...overrides,
	},
});

describe("category.mapper", () => {
	describe("toCategory", () => {
		it("should map a full category entry to Category model", () => {
			const entry = makeCategoryEntry();
			const result = toCategory(entry);
			expect(result).toEqual({
				id: "en/software-development",
				slug: "software-development",
				title: "Software Development",
				order: 1,
			});
		});

		it("should default order to MAX_SAFE_INTEGER when undefined", () => {
			const entry = makeCategoryEntry({ order: undefined });
			const result = toCategory(entry);
			expect(result.order).toBe(Number.MAX_SAFE_INTEGER);
		});

		it("should handle order of 0", () => {
			const entry = makeCategoryEntry({ order: 0 });
			const result = toCategory(entry);
			expect(result.order).toBe(0);
		});

		it("should clean entity id removing language prefix for slug", () => {
			const entry = makeCategoryEntry({}, "es/desarrollo-software");
			const result = toCategory(entry);
			expect(result.slug).toBe("desarrollo-software");
			expect(result.id).toBe("es/desarrollo-software");
		});

		it("should handle id without language prefix", () => {
			const entry = makeCategoryEntry({}, "general");
			const result = toCategory(entry);
			expect(result.slug).toBe("general");
		});

		it("should throw when data object is missing", () => {
			const entry = { id: "en/test" } as any;
			expect(() => toCategory(entry)).toThrow(
				"Invalid category data: data object is missing",
			);
		});

		it("should throw when categoryData is null", () => {
			expect(() => toCategory(null as any)).toThrow(
				"Invalid category data: data object is missing",
			);
		});

		it("should throw when categoryData is undefined", () => {
			expect(() => toCategory(undefined as any)).toThrow(
				"Invalid category data: data object is missing",
			);
		});

		it("should throw when title is missing", () => {
			const entry = makeCategoryEntry({ title: "" });
			expect(() => toCategory(entry)).toThrow(
				"Invalid category data: title is required",
			);
		});

		it("should throw when title is undefined", () => {
			const entry = makeCategoryEntry({ title: undefined });
			expect(() => toCategory(entry)).toThrow(
				"Invalid category data: title is required",
			);
		});
	});

	describe("toCategories", () => {
		it("should map and sort categories by order", () => {
			const entries = [
				makeCategoryEntry({ title: "B", order: 3 }, "en/b"),
				makeCategoryEntry({ title: "A", order: 1 }, "en/a"),
				makeCategoryEntry({ title: "C", order: 2 }, "en/c"),
			];
			const result = toCategories(entries);
			expect(result).toHaveLength(3);
			expect(result[0].title).toBe("A");
			expect(result[1].title).toBe("C");
			expect(result[2].title).toBe("B");
		});

		it("should return empty array for empty input", () => {
			const result = toCategories([]);
			expect(result).toEqual([]);
		});

		it("should sort categories with undefined order to end", () => {
			const entries = [
				makeCategoryEntry(
					{ title: "No Order", order: undefined },
					"en/no-order",
				),
				makeCategoryEntry({ title: "First", order: 1 }, "en/first"),
			];
			const result = toCategories(entries);
			expect(result[0].title).toBe("First");
			expect(result[1].title).toBe("No Order");
		});
	});
});
