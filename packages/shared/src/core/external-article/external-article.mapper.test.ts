/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getEntries, getEntry } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	toExternalArticle,
	toExternalArticles,
} from "./external-article.mapper";

// Mock astro:content
vi.mock("astro:content", () => ({
	getEntry: vi.fn(),
	getEntries: vi.fn(),
}));

vi.mock("../author", () => ({
	toAuthor: vi.fn((entry: any) => ({
		id: entry.id,
		slug: entry.id,
		name: entry.data.name,
		email: entry.data.email ?? "",
		avatar: "",
		bio: "",
		location: "",
		socials: [],
	})),
}));

vi.mock("../category", () => ({
	toCategory: vi.fn((entry: any) => ({
		id: entry.id,
		slug: entry.id,
		title: entry.data.title,
		order: entry.data.order ?? 0,
	})),
}));

vi.mock("../tag", () => ({
	toTag: vi.fn((entry: any) => ({
		id: entry.id,
		slug: entry.id,
		title: entry.data.title,
	})),
}));

const mockAuthorEntry = {
	id: "en/john-doe",
	data: { name: "John Doe", email: "john@example.com" },
};

const mockCategoryEntry = {
	id: "en/software-development",
	data: { title: "Software Development", order: 1 },
};

const mockTagEntry = {
	id: "en/typescript",
	data: { title: "TypeScript" },
};

const makeExternalArticleEntry = (
	overrides: Record<string, any> = {},
): any => ({
	id: "en/ext-article",
	body: "External body",
	data: {
		title: "External Article",
		description: "An external article",
		author: { collection: "authors", id: "en/john-doe" },
		category: { collection: "categories", id: "en/software-development" },
		tags: [{ collection: "tags", id: "en/typescript" }],
		cover: { src: "/img/ext.webp", width: 800, height: 600, format: "webp" },
		draft: false,
		date: "2024-03-01",
		lastModified: "2024-04-01",
		isExternal: true,
		link: "https://example.com/article",
		...overrides,
	},
});

describe("external-article.mapper", () => {
	beforeEach(() => {
		vi.mocked(getEntry).mockImplementation(async (ref: any) => {
			const id = typeof ref === "string" ? ref : ref?.id;
			if (!id) return undefined as any;
			if (id.includes("john-doe")) return mockAuthorEntry as any;
			if (id.includes("software-development")) return mockCategoryEntry as any;
			return undefined as any;
		});
		vi.mocked(getEntries).mockResolvedValue([mockTagEntry] as any);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("toExternalArticle", () => {
		it("should map a complete external article entry", async () => {
			const entry = makeExternalArticleEntry();
			const result = await toExternalArticle(entry);
			expect(result.id).toBe("en/ext-article");
			expect(result.title).toBe("External Article");
			expect(result.description).toBe("An external article");
			expect(result.author.name).toBe("John Doe");
			expect(result.category.title).toBe("Software Development");
			expect(result.tags).toHaveLength(1);
			expect(result.tags[0].title).toBe("TypeScript");
			expect(result.draft).toBe(false);
			expect(result.date).toEqual(new Date("2024-03-01"));
			expect(result.lastModified).toEqual(new Date("2024-04-01"));
			expect(result.isExternal).toBe(true);
			expect(result.link).toBe("https://example.com/article");
			expect(result.entry).toBe(entry);
		});

		it("should set lastModified to undefined when falsy", async () => {
			const entry = makeExternalArticleEntry({ lastModified: null });
			const result = await toExternalArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should set lastModified to undefined when empty string", async () => {
			const entry = makeExternalArticleEntry({ lastModified: "" });
			const result = await toExternalArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should set lastModified to undefined when undefined", async () => {
			const entry = makeExternalArticleEntry({ lastModified: undefined });
			const result = await toExternalArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should throw when author is not found", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeExternalArticleEntry();
			await expect(toExternalArticle(entry)).rejects.toThrow(
				"Author not found for external article: en/ext-article",
			);
		});

		it("should throw when category is not found", async () => {
			vi.mocked(getEntry).mockImplementation(async (ref: any) => {
				const id = typeof ref === "string" ? ref : ref?.id;
				if (id?.includes("john-doe")) return mockAuthorEntry as any;
				return undefined as any;
			});
			const entry = makeExternalArticleEntry();
			await expect(toExternalArticle(entry)).rejects.toThrow(
				"Category not found for external article: en/ext-article",
			);
		});

		it("should handle cover being undefined", async () => {
			const entry = makeExternalArticleEntry({ cover: undefined });
			const result = await toExternalArticle(entry);
			expect(result.cover).toBeUndefined();
		});
	});

	describe("toExternalArticles", () => {
		it("should map multiple external articles", async () => {
			const entries = [makeExternalArticleEntry(), makeExternalArticleEntry()];
			entries[1].id = "en/ext-2";
			const results = await toExternalArticles(entries);
			expect(results).toHaveLength(2);
		});

		it("should return empty for empty input", async () => {
			const results = await toExternalArticles([]);
			expect(results).toEqual([]);
		});

		it("should reject if any entry fails (uses Promise.all)", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeExternalArticleEntry();
			await expect(toExternalArticles([entry])).rejects.toThrow(
				"Author not found for external article",
			);
		});
	});
});
