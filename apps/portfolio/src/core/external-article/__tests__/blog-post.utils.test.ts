import { describe, expect, test } from "vitest";
import type Article from "@/core/article/article.model";
import {
	getBlogPostRel,
	getBlogPostTarget,
	getBlogPostUrl,
	isArticle,
	isExternalArticle,
} from "@/lib/blog-post.utils";
import type ExternalArticle from "../external-article.model";

// Mock data
const mockExternalArticle: ExternalArticle = {
	id: "es/2017/07/10/thesis",
	title: "Test External Article",
	description: "Test description",
	author: {
		id: "test-author",
		slug: "test-author",
		name: "Test Author",
		email: "test@example.com",
		avatar: "/images/test-avatar.webp",
		bio: "Test bio",
		location: "Test location",
		socials: [],
	},
	tags: [],
	draft: false,
	date: new Date("2017-07-10"),
	category: {
		id: "test-category",
		slug: "test-category",
		title: "Test Category",
		order: 1,
	},
	isExternal: true,
	link: "https://example.com/external-article",
};

const mockArticle: Article = {
	id: "es/2023/04/06/test-article",
	title: "Test Article",
	description: "Test description",
	author: {
		id: "test-author",
		slug: "test-author",
		name: "Test Author",
		email: "test@example.com",
		avatar: "/images/test-avatar.webp",
		bio: "Test bio",
		location: "Test location",
		socials: [],
	},
	tags: [],
	draft: false,
	body: "Test body content",
	date: new Date("2023-04-06"),
	category: {
		id: "test-category",
		slug: "test-category",
		title: "Test Category",
		order: 1,
	},
	featured: false,
};

describe("Blog Post Utils", () => {
	describe("isExternalArticle", () => {
		test("should return true for external articles", () => {
			expect(isExternalArticle(mockExternalArticle)).toBe(true);
		});

		test("should return false for regular articles", () => {
			expect(isExternalArticle(mockArticle)).toBe(false);
		});
	});

	describe("isArticle", () => {
		test("should return false for external articles", () => {
			expect(isArticle(mockExternalArticle)).toBe(false);
		});

		test("should return true for regular articles", () => {
			expect(isArticle(mockArticle)).toBe(true);
		});
	});

	describe("getBlogPostUrl", () => {
		test("should return external link for external articles", () => {
			const url = getBlogPostUrl(mockExternalArticle, "es");
			expect(url).toBe("https://example.com/external-article");
		});

		test("should return internal URL for regular articles", () => {
			const url = getBlogPostUrl(mockArticle, "es");
			expect(url).toBe("/es/blog/2023/04/06/test-article");
		});
	});

	describe("getBlogPostTarget", () => {
		test("should return _blank for external articles", () => {
			const target = getBlogPostTarget(mockExternalArticle);
			expect(target).toBe("_blank");
		});

		test("should return undefined for regular articles", () => {
			const target = getBlogPostTarget(mockArticle);
			expect(target).toBeUndefined();
		});
	});

	describe("getBlogPostRel", () => {
		test("should return noopener noreferrer for external articles", () => {
			const rel = getBlogPostRel(mockExternalArticle);
			expect(rel).toBe("noopener noreferrer");
		});

		test("should return undefined for regular articles", () => {
			const rel = getBlogPostRel(mockArticle);
			expect(rel).toBeUndefined();
		});
	});
});
