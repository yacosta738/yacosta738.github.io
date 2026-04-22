import { buildBlogListing } from "@blog/lib/blog-listing";
import type { BlogPost } from "@blog/lib/blog-post.utils";
import { describe, expect, it } from "vitest";
import type Article from "@/core/article/article.model";
import type ExternalArticle from "@/core/external-article/external-article.model";

const makeAuthor = () =>
	({ name: "Test Author", email: "" }) as Article["author"];
const makeCategory = () =>
	({ name: "General", slug: "general" }) as Article["category"];

const makeArticle = (id: string, date: Date, featured = false): Article => ({
	id,
	date,
	featured,
	title: `Title for ${id}`,
	body: "<p>content</p>",
	description: "",
	draft: false,
	tags: [],
	category: makeCategory(),
	author: makeAuthor(),
});

const makeExternal = (id: string, date: Date): ExternalArticle => ({
	id,
	date,
	title: `External ${id}`,
	link: "https://example.com",
	isExternal: true,
	description: "",
	draft: false,
	tags: [],
	category: makeCategory(),
	author: makeAuthor(),
});

describe("buildBlogListing", () => {
	it("returns empty arrays when no posts", () => {
		const result = buildBlogListing({
			articles: [],
			externalArticles: [],
			locale: "en",
		});

		expect(result.sortedPosts).toEqual([]);
		expect(result.featuredPosts).toEqual([]);
		expect(result.visiblePosts).toEqual([]);
	});

	it("filters articles by locale prefix", () => {
		const articles: BlogPost[] = [
			makeArticle("en/post-1", new Date("2024-01-01")),
			makeArticle("es/post-2", new Date("2024-01-02")),
		];

		const result = buildBlogListing({
			articles,
			externalArticles: [],
			locale: "en",
		});

		expect(result.sortedPosts).toHaveLength(1);
		expect(result.sortedPosts[0].id).toBe("en/post-1");
	});

	it("filters external articles by locale prefix", () => {
		const externalArticles: BlogPost[] = [
			makeExternal("en/ext-1", new Date("2024-01-01")),
			makeExternal("es/ext-2", new Date("2024-01-02")),
		];

		const result = buildBlogListing({
			articles: [],
			externalArticles,
			locale: "en",
		});

		expect(result.sortedPosts).toHaveLength(1);
		expect(result.sortedPosts[0].id).toBe("en/ext-1");
	});

	it("sorts combined posts by date descending", () => {
		const articles: BlogPost[] = [
			makeArticle("en/old", new Date("2024-01-01")),
			makeArticle("en/new", new Date("2024-06-01")),
		];
		const externalArticles: BlogPost[] = [
			makeExternal("en/mid", new Date("2024-03-01")),
		];

		const result = buildBlogListing({
			articles,
			externalArticles,
			locale: "en",
		});

		expect(result.sortedPosts.map((p) => p.id)).toEqual([
			"en/new",
			"en/mid",
			"en/old",
		]);
	});

	it("picks featured articles up to the default limit (3)", () => {
		const articles: BlogPost[] = [
			makeArticle("en/f1", new Date("2024-01-01"), true),
			makeArticle("en/f2", new Date("2024-02-01"), true),
			makeArticle("en/f3", new Date("2024-03-01"), true),
			makeArticle("en/f4", new Date("2024-04-01"), true),
		];

		const result = buildBlogListing({
			articles,
			externalArticles: [],
			locale: "en",
		});

		expect(result.featuredPosts).toHaveLength(3);
		expect(result.featuredPosts.map((p) => p.id)).toEqual([
			"en/f4",
			"en/f3",
			"en/f2",
		]);
	});

	it("respects a custom featuredLimit", () => {
		const articles: BlogPost[] = [
			makeArticle("en/f1", new Date("2024-01-01"), true),
			makeArticle("en/f2", new Date("2024-02-01"), true),
		];

		const result = buildBlogListing({
			articles,
			externalArticles: [],
			locale: "en",
			featuredLimit: 1,
		});

		expect(result.featuredPosts).toHaveLength(1);
	});

	it("excludes featured posts from visiblePosts", () => {
		const articles: BlogPost[] = [
			makeArticle("en/featured", new Date("2024-03-01"), true),
			makeArticle("en/regular", new Date("2024-01-01"), false),
		];

		const result = buildBlogListing({
			articles,
			externalArticles: [],
			locale: "en",
		});

		const visibleIds = result.visiblePosts.map((p) => p.id);
		expect(visibleIds).not.toContain("en/featured");
		expect(visibleIds).toContain("en/regular");
	});

	it("external articles never appear in featuredPosts", () => {
		const externalArticles: BlogPost[] = [
			makeExternal("en/ext", new Date("2024-06-01")),
		];

		const result = buildBlogListing({
			articles: [],
			externalArticles,
			locale: "en",
		});

		expect(result.featuredPosts).toHaveLength(0);
		expect(result.visiblePosts).toHaveLength(1);
	});

	it("sortedPosts includes both articles and externals", () => {
		const articles: BlogPost[] = [
			makeArticle("en/art", new Date("2024-01-01")),
		];
		const externalArticles: BlogPost[] = [
			makeExternal("en/ext", new Date("2024-02-01")),
		];

		const result = buildBlogListing({
			articles,
			externalArticles,
			locale: "en",
		});

		expect(result.sortedPosts).toHaveLength(2);
	});

	it("featuredPosts are sorted by date descending", () => {
		const articles: BlogPost[] = [
			makeArticle("en/f1", new Date("2024-01-01"), true),
			makeArticle("en/f3", new Date("2024-03-01"), true),
			makeArticle("en/f2", new Date("2024-02-01"), true),
		];

		const result = buildBlogListing({
			articles,
			externalArticles: [],
			locale: "en",
		});

		expect(result.featuredPosts.map((p) => p.id)).toEqual([
			"en/f3",
			"en/f2",
			"en/f1",
		]);
	});
});
