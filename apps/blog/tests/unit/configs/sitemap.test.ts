import {
	filterBlogSitemapPage,
	serializeBlogSitemapItem,
} from "@blog/configs/sitemap";
import { describe, expect, it, vi } from "vitest";

describe("blog sitemap helpers", () => {
	it("filters excluded pages from the sitemap", () => {
		expect(
			filterBlogSitemapPage("https://blog.yunielacosta.com/2026/03/29/post/"),
		).toBe(true);
		expect(filterBlogSitemapPage("https://blog.yunielacosta.com/search/")).toBe(
			false,
		);
		expect(
			filterBlogSitemapPage("https://blog.yunielacosta.com/es/blog/"),
		).toBe(false);
		expect(
			filterBlogSitemapPage("https://blog.yunielacosta.com/en/about/"),
		).toBe(false);
	});

	it("serializes homepage items with weekly frequency and top priority", () => {
		vi.useFakeTimers();
		const now = new Date("2026-03-29T18:00:00.000Z");
		vi.setSystemTime(now);

		const item = serializeBlogSitemapItem({
			url: "https://blog.yunielacosta.com/",
		});

		expect(item.lastmod).toEqual(now);
		expect(item.changefreq).toBe("weekly");
		expect(item.priority).toBe(1);

		vi.useRealTimers();
	});

	it("serializes blog, project, taxonomy, author, and fallback pages", () => {
		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/es/blog/tag/kotlin/",
			}),
		).toMatchObject({ changefreq: "weekly", priority: 0.7 });

		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/projects/",
			}),
		).toMatchObject({ changefreq: "monthly", priority: 0.8 });

		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/tag/security/",
			}),
		).toMatchObject({ changefreq: "weekly", priority: 0.5 });

		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/author/yuniel-acosta-perez/",
			}),
		).toMatchObject({ changefreq: "monthly", priority: 0.4 });

		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/about/",
			}),
		).toMatchObject({ changefreq: "monthly", priority: 0.6 });
	});

	it("serializes direct blog posts with monthly frequency", () => {
		expect(
			serializeBlogSitemapItem({
				url: "https://blog.yunielacosta.com/blog/post",
			}),
		).toMatchObject({ changefreq: "monthly", priority: 0.8 });
	});
});
