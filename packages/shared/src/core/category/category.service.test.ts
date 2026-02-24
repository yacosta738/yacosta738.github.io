/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getCollection, getEntry } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseEntityId } from "@/lib/collection.entity";
import { getCategories, getCategoryById } from "./category.service";

// Mock the dependencies
vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
	getEntry: vi.fn(),
}));

vi.mock("./category.mapper", () => ({
	toCategories: vi.fn((categories: Array<{ id: string }>) =>
		Promise.resolve(categories.map((c) => ({ ...c, id: c.id }))),
	),
	toCategory: vi.fn((category: { id: string }) =>
		Promise.resolve({ ...category, id: category.id }),
	),
}));

vi.mock("@/lib/collection.entity", () => ({
	parseEntityId: vi.fn(),
}));

const mockCategories = [
	{
		id: "en/category-1",
		data: {
			title: "Technology",
			order: 1,
		},
	},
	{
		id: "es/category-2",
		data: {
			title: "Lifestyle",
			order: 2,
		},
	},
	{
		id: "en/category-3",
		data: {
			title: "Tech",
			order: 3,
		},
	},
];

describe("CategoryService", () => {
	beforeEach(() => {
		// Mock the getCollection and getEntry methods
		vi.mocked(getCollection).mockImplementation(async (_collection, filter) => {
			if (filter) {
				return mockCategories.filter((entry) => filter(entry)) as any;
			}
			return mockCategories as any;
		});
		vi.mocked(getEntry).mockResolvedValue(mockCategories[0] as any);

		// Mock parseEntityId
		vi.mocked(parseEntityId).mockImplementation((id) => ({
			lang: id.split("/")[0] as "en" | "es",
			path: id.split("/")[1],
		}));
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getCategories", () => {
		it("should return all categories by default", async () => {
			const categories = await getCategories();
			expect(categories).toHaveLength(3);
		});

		it("should filter categories by lang", async () => {
			const categories = await getCategories({ lang: "en" });
			expect(categories).toHaveLength(2);
		});

		it("should filter categories by title", async () => {
			const categories = await getCategories({ title: "Tech" });
			expect(categories).toHaveLength(2);
		});

		it("should filter categories by orderMin", async () => {
			const categories = await getCategories({ orderMin: 2 });
			expect(categories).toHaveLength(2);
		});

		it("should filter categories by orderMax", async () => {
			const categories = await getCategories({ orderMax: 2 });
			expect(categories).toHaveLength(2);
		});

		it("should filter categories by orderMin and orderMax", async () => {
			const categories = await getCategories({ orderMin: 1, orderMax: 2 });
			expect(categories).toHaveLength(2);
		});
	});

	describe("getCategoryById", () => {
		it("should return a category by id", async () => {
			const category = await getCategoryById("en/category-1");
			expect(category).toBeDefined();
			expect(category?.id).toBe("en/category-1");
		});

		it("should return undefined if category not found", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined);
			const category = await getCategoryById("non-existent");
			expect(category).toBeUndefined();
		});

		it("should throw an error if getEntry fails", async () => {
			vi.mocked(getEntry).mockRejectedValue(new Error("test error"));
			await expect(getCategoryById("any-id")).rejects.toThrow(
				"Failed to fetch category any-id",
			);
		});
	});
});
