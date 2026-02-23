/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getCollection } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseEntityId } from "@/lib/collection.entity";
import { toArticles } from "./article.mapper";
import {
	getAllArticlesIncludingExternal,
	getArticleById,
	getArticles,
	hasArticles,
} from "./article.service";

// Mock the dependencies
vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

vi.mock("./article.mapper", () => ({
	toArticles: vi.fn((articles: Array<{ id: string; data: any }>) =>
		Promise.resolve(
			articles.map((a) => ({
				id: a.id,
				author: a.data.author,
				category: a.data.category,
				tags: a.data.tags,
				draft: a.data.draft,
				featured: a.data.featured,
				date: a.data.date,
			})),
		),
	),
	toExternalArticles: vi.fn((articles: Array<{ id: string; data: any }>) =>
		Promise.resolve(
			articles.map((a) => ({
				id: a.id,
				author: a.data.author,
				category: a.data.category,
				tags: a.data.tags,
				draft: a.data.draft,
				featured: false, // External articles don't have featured field
				date: a.data.date,
			})),
		),
	),
}));

vi.mock("@/lib/collection.entity", () => ({
	parseEntityId: vi.fn(),
}));

const mockArticles = [
	{
		id: "en/article-1",
		data: {
			draft: false,
			author: { id: "author-1" },
			tags: [{ id: "tag-1" }],
			category: { id: "category-1" },
			featured: true,
			date: new Date("2023-01-01"),
		},
	},
	{
		id: "es/article-2",
		data: {
			draft: true,
			author: { id: "author-2" },
			tags: [{ id: "tag-2" }],
			category: { id: "category-2" },
			featured: false,
			date: new Date("2023-01-02"),
		},
	},
	{
		id: "en/article-3",
		data: {
			draft: false,
			author: { id: "author-1" },
			tags: [{ id: "tag-1" }, { id: "tag-2" }],
			category: { id: "category-1" },
			featured: false,
			date: new Date("2023-01-03"),
		},
	},
];

const mockExternalArticles = [
	{
		id: "en/external-1",
		data: {
			draft: false,
			author: { id: "author-1" },
			tags: [{ id: "en/r" }],
			category: { id: "category-1" },
			date: new Date("2023-02-01"),
		},
	},
	{
		id: "es/external-2",
		data: {
			draft: true,
			author: { id: "author-2" },
			tags: [{ id: "es/r" }],
			category: { id: "category-2" },
			date: new Date("2023-02-02"),
		},
	},
	{
		id: "en/article-1", // Duplicate ID with mockArticles
		data: {
			draft: false,
			author: { id: "author-1" },
			tags: [{ id: "en/r" }],
			category: { id: "category-1" },
			date: new Date("2023-02-03"),
		},
	},
];

describe("ArticleService", () => {
	beforeEach(() => {
		// Mock the getCollection to simulate filtering for both collections
		vi.mocked(getCollection).mockImplementation(
			async (collection: string, filter) => {
				const source =
					collection === "externalArticles"
						? mockExternalArticles
						: mockArticles;
				if (filter) {
					return source.filter(filter) as any;
				}
				return source as any;
			},
		);

		// Mock parseEntityId
		vi.mocked(parseEntityId).mockImplementation((id) => ({
			lang: id.split("/")[0] as "en" | "es",
			path: id.split("/")[1],
		}));

		// Mock toArticles
		vi.mocked(toArticles).mockImplementation(async (articles) => {
			return articles.map((a) => ({
				id: a.id,
				author: a.data.author,
				category: a.data.category,
				tags: a.data.tags,
				draft: a.data.draft,
				featured: a.data.featured,
				date: a.data.date,
			})) as any;
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getArticles", () => {
		it("should return non-draft articles by default", async () => {
			const articles = await getArticles();
			expect(getCollection).toHaveBeenCalledWith(
				"articles",
				expect.any(Function),
			);
			expect(articles).toHaveLength(2);
			expect(articles.some((a) => a.draft)).toBe(false);
		});

		it("should filter articles by lang, excluding drafts", async () => {
			const articles = await getArticles({ lang: "en" });
			expect(articles).toHaveLength(2);
		});

		it("should filter articles by lang, including drafts", async () => {
			const articles = await getArticles({ lang: "es", includeDrafts: true });
			expect(articles).toHaveLength(1);
			expect(articles[0].id).toBe("es/article-2");
		});

		it("should include draft articles when requested", async () => {
			const articles = await getArticles({ includeDrafts: true });
			expect(articles).toHaveLength(3);
		});

		it("should filter by author, including drafts", async () => {
			const articles = await getArticles({
				author: "author-2",
				includeDrafts: true,
			});
			expect(articles).toHaveLength(1);
			expect(articles[0].id).toBe("es/article-2");
		});

		it("should filter by tags, excluding drafts", async () => {
			const articles = await getArticles({ tags: "tag-2" });
			expect(articles).toHaveLength(1);
			expect(articles[0].id).toBe("en/article-3");
		});

		it("should filter by tags, including drafts", async () => {
			const articles = await getArticles({
				tags: "tag-2",
				includeDrafts: true,
			});
			expect(articles).toHaveLength(2);
		});

		it("should filter by category, including drafts", async () => {
			const articles = await getArticles({
				category: "category-2",
				includeDrafts: true,
			});
			expect(articles).toHaveLength(1);
			expect(articles[0].id).toBe("es/article-2");
		});

		it("should filter by featured", async () => {
			const articles = await getArticles({ featured: true });
			expect(articles).toHaveLength(1);
			expect(articles[0].id).toBe("en/article-1");
		});
	});

	describe("getArticleById", () => {
		it("should return an article by id", async () => {
			const article = await getArticleById("en/article-1");
			expect(article).toBeDefined();
			expect(article?.id).toBe("en/article-1");
		});

		it("should return undefined if article not found", async () => {
			const article = await getArticleById("non-existent");
			expect(article).toBeUndefined();
		});
	});

	describe("hasArticles", () => {
		it("should return true if articles exist", async () => {
			const result = await hasArticles();
			expect(result).toBe(true);
		});

		it("should return false if no articles exist that are not drafts", async () => {
			vi.mocked(getCollection).mockImplementation(
				async (_collection, filter) => {
					const allDrafts = [
						{
							id: "en/article-1",
							data: { draft: true },
						},
					];
					if (filter) {
						return allDrafts.filter(filter) as any;
					}
					return allDrafts as any;
				},
			);
			const result = await hasArticles();
			expect(result).toBe(false);
		});
	});

	describe("getAllArticlesIncludingExternal", () => {
		it("should return combined articles from both collections", async () => {
			const articles = await getAllArticlesIncludingExternal();
			// Should return non-draft articles from both collections
			// mockArticles: 2 non-draft (en/article-1, en/article-3)
			// mockExternalArticles: 1 non-draft (en/external-1)
			// After deduplication: en/article-1 should appear only once
			expect(articles.length).toBeGreaterThanOrEqual(2);
			expect(getCollection).toHaveBeenCalledWith(
				"articles",
				expect.any(Function),
			);
			expect(getCollection).toHaveBeenCalledWith(
				"externalArticles",
				expect.any(Function),
			);
		});

		it("should deduplicate articles with same id from both collections", async () => {
			const articles = await getAllArticlesIncludingExternal();
			const ids = articles.map((a) => a.id);
			const uniqueIds = new Set(ids);
			// Should not have duplicate IDs
			expect(ids.length).toBe(uniqueIds.size);
		});

		it("should filter by lang across both collections", async () => {
			const articles = await getAllArticlesIncludingExternal({ lang: "en" });
			// All returned articles should be English
			expect(articles.every((a) => a.id.startsWith("en/"))).toBe(true);
		});

		it("should filter by tags across both collections", async () => {
			const articles = await getAllArticlesIncludingExternal({ tags: "en/r" });
			// Should return external articles with tag "en/r"
			expect(articles.length).toBeGreaterThanOrEqual(1);
		});

		it("should exclude drafts by default from both collections", async () => {
			const articles = await getAllArticlesIncludingExternal();
			expect(articles.every((a) => !a.draft)).toBe(true);
		});

		it("should include drafts when requested from both collections", async () => {
			const articles = await getAllArticlesIncludingExternal({
				includeDrafts: true,
			});
			// Should include all articles (drafts + non-drafts) from both collections
			expect(articles.length).toBeGreaterThanOrEqual(3);
		});

		it("should filter by author across both collections", async () => {
			const articles = await getAllArticlesIncludingExternal({
				author: "author-1",
			});
			expect(articles.every((a) => a.author.id === "author-1")).toBe(true);
		});

		it("should filter by category across both collections", async () => {
			const articles = await getAllArticlesIncludingExternal({
				category: "category-1",
			});
			expect(articles.every((a) => a.category.id === "category-1")).toBe(true);
		});
	});
});
