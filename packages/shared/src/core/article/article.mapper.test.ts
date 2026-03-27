/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getEntries, getEntry } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	toArticle,
	toArticles,
	toExternalArticle,
	toExternalArticles,
	toNotionArticle,
	toNotionArticles,
} from "./article.mapper";

// Mock astro:content
vi.mock("astro:content", () => ({
	getEntry: vi.fn(),
	getEntries: vi.fn(),
}));

// Mock the sub-mappers so we isolate article.mapper logic
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

// --- Helpers ---

const mockAuthorEntry = {
	id: "en/john-doe",
	data: { name: "John Doe", email: "john@example.com" },
};

const mockCategoryEntry = {
	id: "en/software-development",
	data: { title: "Software Development", order: 1 },
};

const mockCategoryEntryEs = {
	id: "es/software-development",
	data: { title: "Desarrollo de Software", order: 1 },
};

const mockTagEntry = {
	id: "en/typescript",
	data: { title: "TypeScript" },
};

const makeArticleEntry = (overrides: Record<string, any> = {}): any => ({
	id: "en/my-article",
	body: "Article body content",
	data: {
		title: "My Article",
		description: "A great article",
		author: { collection: "authors", id: "en/john-doe" },
		category: { collection: "categories", id: "en/software-development" },
		tags: [{ collection: "tags", id: "en/typescript" }],
		cover: "/img/cover.webp",
		featured: true,
		draft: false,
		date: "2024-01-15",
		lastModified: "2024-02-20",
		...overrides,
	},
});

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
		cover: "/img/ext.webp",
		draft: false,
		date: "2024-03-01",
		lastModified: null,
		...overrides,
	},
});

const makeNotionArticleEntry = (overrides: Record<string, any> = {}): any => ({
	id: "en/notion-article",
	body: "Notion body",
	data: {
		title: "Notion Article",
		description: "A notion article",
		author: { collection: "authors", id: "en/john-doe" },
		category: { collection: "categories", id: "en/software-development" },
		tags: [{ collection: "tags", id: "en/typescript" }],
		cover: "/img/notion.webp",
		featured: true,
		draft: false,
		date: "2024-04-01",
		lastModified: null,
		...overrides,
	},
});

const getMockEntryKey = (collectionOrRef: any, maybeId?: any) => {
	if (typeof collectionOrRef === "string" && typeof maybeId !== "string") {
		return `id:${collectionOrRef}`;
	}
	const collection =
		typeof maybeId === "string" ? collectionOrRef : collectionOrRef?.collection;
	const id = typeof maybeId === "string" ? maybeId : collectionOrRef?.id;
	if (typeof collection !== "string" || typeof id !== "string") {
		return null;
	}
	return `${collection}:${id}`;
};

describe("article.mapper", () => {
	beforeEach(() => {
		vi.mocked(getEntry).mockImplementation(
			async (collectionOrRef: any, maybeId?: any) => {
				const key = getMockEntryKey(collectionOrRef, maybeId);
				if (!key) return undefined as any;
				if (
					key === "id:en/john-doe" ||
					key === "authors:en/john-doe" ||
					key === "authors:es/yuniel-acosta-perez" ||
					key === "authors:en/yuniel-acosta-perez"
				)
					return mockAuthorEntry as any;
				if (
					key === "id:en/software-development" ||
					key === "categories:en/software-development"
				)
					return mockCategoryEntry as any;
				if (key === "categories:es/software-development")
					return mockCategoryEntryEs as any;
				return undefined as any;
			},
		);
		vi.mocked(getEntries).mockResolvedValue([mockTagEntry] as any);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	// ─── toArticle ───────────────────────────────────────────────

	describe("toArticle", () => {
		it("should map a complete article entry", async () => {
			const entry = makeArticleEntry();
			const result = await toArticle(entry);
			expect(result.id).toBe("en/my-article");
			expect(result.title).toBe("My Article");
			expect(result.description).toBe("A great article");
			expect(result.author.name).toBe("John Doe");
			expect(result.category.title).toBe("Software Development");
			expect(result.tags).toHaveLength(1);
			expect(result.tags[0].title).toBe("TypeScript");
			expect(result.featured).toBe(true);
			expect(result.draft).toBe(false);
			expect(result.body).toBe("Article body content");
			expect(result.date).toEqual(new Date("2024-01-15"));
			expect(result.lastModified).toEqual(new Date("2024-02-20"));
			expect(result.cover).toBe("/img/cover.webp");
			expect(result.entry).toBe(entry);
		});

		it("should set lastModified to undefined when not provided", async () => {
			const entry = makeArticleEntry({ lastModified: undefined });
			const result = await toArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should set lastModified to undefined when falsy", async () => {
			const entry = makeArticleEntry({ lastModified: "" });
			const result = await toArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should default body to empty string when undefined", async () => {
			const entry = makeArticleEntry();
			entry.body = undefined;
			const result = await toArticle(entry);
			expect(result.body).toBe("");
		});

		it("should handle tags being undefined (defaults to empty array)", async () => {
			const entry = makeArticleEntry({ tags: undefined });
			vi.mocked(getEntries).mockResolvedValue([] as any);
			const result = await toArticle(entry);
			expect(result.tags).toEqual([]);
		});

		it("should handle tags being null (defaults to empty array)", async () => {
			const entry = makeArticleEntry({ tags: null });
			vi.mocked(getEntries).mockResolvedValue([] as any);
			const result = await toArticle(entry);
			expect(result.tags).toEqual([]);
		});

		it("should filter out invalid tag references", async () => {
			const entry = makeArticleEntry({
				tags: [
					{ collection: "tags", id: "en/typescript" },
					"",
					null,
					42,
					{ collection: "", id: "x" },
					{ collection: "tags", id: "" },
				],
			});
			const result = await toArticle(entry);
			expect(result.tags).toHaveLength(1);
		});

		it("should throw when author is not found", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeArticleEntry();
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article: en/my-article",
			);
		});

		it("should throw when category is not found", async () => {
			vi.mocked(getEntry).mockImplementation(
				async (collectionOrRef: any, maybeId?: any) => {
					const key = getMockEntryKey(collectionOrRef, maybeId);
					if (key === "authors:en/john-doe") return mockAuthorEntry as any;
					return undefined as any;
				},
			);
			const entry = makeArticleEntry();
			await expect(toArticle(entry)).rejects.toThrow(
				"Category not found for article: en/my-article",
			);
		});

		it("should handle string author reference", async () => {
			const entry = makeArticleEntry({ author: "en/john-doe" });
			const result = await toArticle(entry);
			expect(result.author.name).toBe("John Doe");
		});

		it("should handle string category reference", async () => {
			const entry = makeArticleEntry({
				category: "en/software-development",
			});
			const result = await toArticle(entry);
			expect(result.category.title).toBe("Software Development");
		});

		it("should treat invalid author ref (empty string) as missing", async () => {
			const entry = makeArticleEntry({ author: "" });
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat invalid author ref (number) as missing", async () => {
			const entry = makeArticleEntry({ author: 42 });
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat invalid category ref (null) as missing", async () => {
			const entry = makeArticleEntry({ category: null });
			await expect(toArticle(entry)).rejects.toThrow(
				"Category not found for article",
			);
		});

		it("should treat object ref with empty collection as invalid", async () => {
			const entry = makeArticleEntry({
				author: { collection: "", id: "en/john-doe" },
			});
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat object ref with empty id as invalid", async () => {
			const entry = makeArticleEntry({
				author: { collection: "authors", id: "" },
			});
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat whitespace-only string ref as invalid", async () => {
			const entry = makeArticleEntry({ author: "   " });
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat object ref with whitespace-only collection as invalid", async () => {
			const entry = makeArticleEntry({
				author: { collection: "  ", id: "en/john-doe" },
			});
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should treat object ref with whitespace-only id as invalid", async () => {
			const entry = makeArticleEntry({
				author: { collection: "authors", id: "  " },
			});
			await expect(toArticle(entry)).rejects.toThrow(
				"Author not found for article",
			);
		});

		it("should filter out falsy tags from getEntries result", async () => {
			vi.mocked(getEntries).mockResolvedValue([
				mockTagEntry,
				null,
				undefined,
				mockTagEntry,
			] as any);
			const entry = makeArticleEntry();
			const result = await toArticle(entry);
			expect(result.tags).toHaveLength(2);
		});
	});

	// ─── toArticles ──────────────────────────────────────────────

	describe("toArticles", () => {
		it("should map multiple articles", async () => {
			const entries = [makeArticleEntry(), makeArticleEntry()];
			entries[1].id = "en/second-article";
			const results = await toArticles(entries);
			expect(results).toHaveLength(2);
		});

		it("should return empty array for empty input", async () => {
			const results = await toArticles([]);
			expect(results).toEqual([]);
		});

		it("should skip failed entries and warn", async () => {
			const warnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => undefined);

			// First call succeeds, second fails
			const good = makeArticleEntry();
			const bad = makeArticleEntry({ author: null, category: null });
			bad.id = "en/bad-article";
			vi.mocked(getEntry).mockImplementation(
				async (collectionOrRef: any, maybeId?: any) => {
					const key = getMockEntryKey(collectionOrRef, maybeId);
					if (!key) return undefined as any;
					if (key === "authors:en/john-doe") return mockAuthorEntry as any;
					if (key === "categories:en/software-development")
						return mockCategoryEntry as any;
					return undefined as any;
				},
			);

			const results = await toArticles([good, bad]);
			expect(results).toHaveLength(1);
			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining("Skipping article entry en/bad-article"),
			);
			warnSpy.mockRestore();
		});

		it("should include reason in warning when error is not an Error instance", async () => {
			const warnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => undefined);

			const entry = makeArticleEntry();
			// Force getEntry to throw a non-Error
			vi.mocked(getEntry).mockRejectedValue("some string error");

			const results = await toArticles([entry]);
			expect(results).toHaveLength(0);
			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining("some string error"),
			);
			warnSpy.mockRestore();
		});

		it("should use 'unknown' id in warning when entry has no id", async () => {
			const warnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => undefined);

			const entry = makeArticleEntry();
			delete entry.id;
			vi.mocked(getEntry).mockRejectedValue(new Error("fail"));

			const results = await toArticles([entry]);
			expect(results).toHaveLength(0);
			expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("unknown"));
			warnSpy.mockRestore();
		});
	});

	// ─── toExternalArticle ───────────────────────────────────────

	describe("toExternalArticle", () => {
		it("should map a complete external article entry", async () => {
			const entry = makeExternalArticleEntry();
			const result = await toExternalArticle(entry);
			expect(result.id).toBe("en/ext-article");
			expect(result.title).toBe("External Article");
			expect(result.featured).toBe(false);
			expect(result.draft).toBe(false);
			expect(result.date).toEqual(new Date("2024-03-01"));
			expect(result.lastModified).toBeUndefined();
		});

		it("should default draft to false when undefined", async () => {
			const entry = makeExternalArticleEntry({ draft: undefined });
			const result = await toExternalArticle(entry);
			expect(result.draft).toBe(false);
		});

		it("should default body to empty when undefined", async () => {
			const entry = makeExternalArticleEntry();
			entry.body = undefined;
			const result = await toExternalArticle(entry);
			expect(result.body).toBe("");
		});

		it("should set lastModified when provided", async () => {
			const entry = makeExternalArticleEntry({
				lastModified: "2024-05-01",
			});
			const result = await toExternalArticle(entry);
			expect(result.lastModified).toEqual(new Date("2024-05-01"));
		});

		it("should throw when author not found", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeExternalArticleEntry();
			await expect(toExternalArticle(entry)).rejects.toThrow(
				"Author not found for external article: en/ext-article",
			);
		});

		it("should throw when category not found", async () => {
			vi.mocked(getEntry).mockImplementation(
				async (collectionOrRef: any, maybeId?: any) => {
					const key = getMockEntryKey(collectionOrRef, maybeId);
					if (key === "authors:en/john-doe") return mockAuthorEntry as any;
					return undefined as any;
				},
			);
			const entry = makeExternalArticleEntry();
			await expect(toExternalArticle(entry)).rejects.toThrow(
				"Category not found for external article: en/ext-article",
			);
		});

		it("should handle tags being undefined", async () => {
			const entry = makeExternalArticleEntry({ tags: undefined });
			vi.mocked(getEntries).mockResolvedValue([] as any);
			const result = await toExternalArticle(entry);
			expect(result.tags).toEqual([]);
		});

		it("should handle string author reference", async () => {
			const entry = makeExternalArticleEntry({ author: "en/john-doe" });
			const result = await toExternalArticle(entry);
			expect(result.author.name).toBe("John Doe");
		});

		it("should handle invalid author ref as missing", async () => {
			const entry = makeExternalArticleEntry({ author: "" });
			await expect(toExternalArticle(entry)).rejects.toThrow(
				"Author not found for external article",
			);
		});
	});

	// ─── toExternalArticles ──────────────────────────────────────

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

		it("should skip failed entries and warn", async () => {
			const warnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => undefined);
			const good = makeExternalArticleEntry();
			const bad = makeExternalArticleEntry({ author: null });
			bad.id = "en/bad-ext";
			const results = await toExternalArticles([good, bad]);
			expect(results).toHaveLength(1);
			expect(warnSpy).toHaveBeenCalledWith(
				expect.stringContaining("Skipping external article entry"),
			);
			warnSpy.mockRestore();
		});
	});

	// ─── toNotionArticle ─────────────────────────────────────────

	describe("toNotionArticle", () => {
		it("should map a complete notion article entry", async () => {
			const entry = makeNotionArticleEntry();
			const result = await toNotionArticle(entry);
			expect(result.id).toBe("en/notion-article");
			expect(result.title).toBe("Notion Article");
			expect(result.author.name).toBe("John Doe");
			expect(result.category.title).toBe("Software Development");
			expect(result.featured).toBe(true);
			expect(result.draft).toBe(false);
		});

		it("should use fallback author (en) when author ref is invalid", async () => {
			const entry = makeNotionArticleEntry({ author: null });
			// getEntry for fallback "en/yuniel-acosta-perez" should still resolve
			const result = await toNotionArticle(entry);
			expect(result.author).toBeDefined();
		});

		it("should use fallback author (es) when id starts with es/", async () => {
			const entry = makeNotionArticleEntry({ author: null });
			entry.id = "es/notion-article";
			const result = await toNotionArticle(entry);
			expect(result.author).toBeDefined();
		});

		it("should throw when both primary and fallback author not found", async () => {
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeNotionArticleEntry({ author: null });
			await expect(toNotionArticle(entry)).rejects.toThrow(
				"Author not found for notion article: en/notion-article",
			);
		});

		it("should use fallback category (en) when category ref is invalid", async () => {
			const entry = makeNotionArticleEntry({ category: null });
			// getEntry will resolve for software-development fallback
			const result = await toNotionArticle(entry);
			expect(result.category).toBeDefined();
		});

		it("should use fallback category (es) when id starts with es/", async () => {
			const entry = makeNotionArticleEntry({ category: null });
			entry.id = "es/notion-article";
			vi.mocked(getEntry).mockImplementation(
				async (collectionOrRef: any, maybeId?: any) => {
					const key = getMockEntryKey(collectionOrRef, maybeId);
					if (!key) return undefined as any;
					if (
						key === "authors:en/john-doe" ||
						key === "authors:es/yuniel-acosta-perez" ||
						key === "authors:en/yuniel-acosta-perez"
					)
						return mockAuthorEntry as any;
					if (key === "categories:es/software-development") {
						return mockCategoryEntryEs as any;
					}
					return undefined as any;
				},
			);
			const result = await toNotionArticle(entry);
			expect(result.category.id).toBe("es/software-development");
		});

		it("should throw when both primary and fallback category not found", async () => {
			vi.mocked(getEntry).mockImplementation(
				async (collectionOrRef: any, maybeId?: any) => {
					const key = getMockEntryKey(collectionOrRef, maybeId);
					if (
						key === "authors:en/john-doe" ||
						key === "authors:es/yuniel-acosta-perez" ||
						key === "authors:en/yuniel-acosta-perez"
					)
						return mockAuthorEntry as any;
					return undefined as any;
				},
			);
			const entry = makeNotionArticleEntry({ category: null });
			await expect(toNotionArticle(entry)).rejects.toThrow(
				"Category not found for notion article: en/notion-article",
			);
		});

		it("should default featured to false when undefined", async () => {
			const entry = makeNotionArticleEntry({ featured: undefined });
			const result = await toNotionArticle(entry);
			expect(result.featured).toBe(false);
		});

		it("should default draft to false when undefined", async () => {
			const entry = makeNotionArticleEntry({ draft: undefined });
			const result = await toNotionArticle(entry);
			expect(result.draft).toBe(false);
		});

		it("should default body to empty when undefined", async () => {
			const entry = makeNotionArticleEntry();
			entry.body = undefined;
			const result = await toNotionArticle(entry);
			expect(result.body).toBe("");
		});

		it("should set lastModified when provided", async () => {
			const entry = makeNotionArticleEntry({
				lastModified: "2024-06-15",
			});
			const result = await toNotionArticle(entry);
			expect(result.lastModified).toEqual(new Date("2024-06-15"));
		});

		it("should set lastModified undefined when falsy", async () => {
			const entry = makeNotionArticleEntry({ lastModified: "" });
			const result = await toNotionArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});

		it("should handle tags being undefined", async () => {
			const entry = makeNotionArticleEntry({ tags: undefined });
			vi.mocked(getEntries).mockResolvedValue([] as any);
			const result = await toNotionArticle(entry);
			expect(result.tags).toEqual([]);
		});

		it("should use fallback category path and still map featured/draft defaults", async () => {
			// category is invalid → fallback fires, featured and draft are undefined
			const entry = makeNotionArticleEntry({
				category: null,
				featured: undefined,
				draft: undefined,
			});
			const result = await toNotionArticle(entry);
			expect(result.featured).toBe(false);
			expect(result.draft).toBe(false);
			expect(result.category).toBeDefined();
		});

		it("should map lastModified in fallback category path", async () => {
			const entry = makeNotionArticleEntry({
				category: null,
				lastModified: "2024-07-01",
			});
			const result = await toNotionArticle(entry);
			expect(result.lastModified).toEqual(new Date("2024-07-01"));
		});

		it("should set lastModified undefined in fallback category path when falsy", async () => {
			const entry = makeNotionArticleEntry({
				category: null,
				lastModified: undefined,
			});
			const result = await toNotionArticle(entry);
			expect(result.lastModified).toBeUndefined();
		});
	});

	// ─── toNotionArticles ────────────────────────────────────────

	describe("toNotionArticles", () => {
		it("should map multiple notion articles", async () => {
			const entries = [makeNotionArticleEntry(), makeNotionArticleEntry()];
			entries[1].id = "en/notion-2";
			const results = await toNotionArticles(entries);
			expect(results).toHaveLength(2);
		});

		it("should return empty for empty input", async () => {
			const results = await toNotionArticles([]);
			expect(results).toEqual([]);
		});

		it("should skip failed entries and warn", async () => {
			const warnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => undefined);
			vi.mocked(getEntry).mockResolvedValue(undefined as any);
			const entry = makeNotionArticleEntry();
			const results = await toNotionArticles([entry]);
			expect(results).toHaveLength(0);
			expect(warnSpy).toHaveBeenCalled();
			warnSpy.mockRestore();
		});
	});
});
