/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getCollection } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseEntityId } from "@/lib/collection.entity";
import { toArticles } from "./article.mapper";
import { getArticleById, getArticles, hasArticles } from "./article.service";

// Mock the dependencies
vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

vi.mock("./article.mapper", () => ({
	toArticles: vi.fn((articles: Array<{ id: string }>) =>
		Promise.resolve(articles.map((a) => ({ ...a, id: a.id }))),
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

describe("ArticleService", () => {
	beforeEach(() => {
		// Mock the getCollection to simulate filtering
		vi.mocked(getCollection).mockImplementation(async (_collection, filter) => {
			if (filter) {
				return mockArticles.filter(filter) as any;
			}
			return mockArticles as any;
		});

		// Mock parseEntityId
		vi.mocked(parseEntityId).mockImplementation((id) => ({
			lang: id.split("/")[0] as "en" | "es",
			path: id.split("/")[1],
		}));

		// Mock toArticles
		vi.mocked(toArticles).mockImplementation(async (articles) => {
			return articles.map((a) => ({ ...a })) as any;
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
});
