import { buildLocalizedArticlePaths } from "@blog/lib/article-localization";
import { describe, expect, it } from "vitest";
import type Article from "@/core/article/article.model";

const createArticle = (id: string): Article => ({
	id,
	title: id,
	description: id,
	author: { name: "Yuniel" } as Article["author"],
	tags: [],
	draft: false,
	body: "",
	date: new Date("2026-03-30T00:00:00.000Z"),
	category: { slug: "backend" } as Article["category"],
	featured: false,
});

describe("buildLocalizedArticlePaths", () => {
	it("keeps fallback routes for default-locale posts on localized pages", () => {
		const paths = buildLocalizedArticlePaths(
			[
				createArticle(
					"en/2026/03/11/managing-backpressure-in-modern-backend-systems",
				),
			],
			["es"],
		);

		expect(paths).toEqual([
			{
				params: {
					lang: "es",
					id: "2026/03/11/managing-backpressure-in-modern-backend-systems",
				},
				props: {
					post: expect.objectContaining({
						id: "en/2026/03/11/managing-backpressure-in-modern-backend-systems",
					}),
					usedLangs: ["en"],
				},
			},
		]);
	});

	it("preserves actual localized articles when available", () => {
		const paths = buildLocalizedArticlePaths(
			[
				createArticle(
					"en/2026/03/11/managing-backpressure-in-modern-backend-systems",
				),
				createArticle(
					"es/2026/03/11/managing-backpressure-in-modern-backend-systems",
				),
			],
			["es"],
		);

		expect(paths).toHaveLength(1);
		expect(paths[0]).toEqual({
			params: {
				lang: "es",
				id: "2026/03/11/managing-backpressure-in-modern-backend-systems",
			},
			props: {
				post: expect.objectContaining({
					id: "es/2026/03/11/managing-backpressure-in-modern-backend-systems",
				}),
				usedLangs: ["en", "es"],
			},
		});
	});
});
