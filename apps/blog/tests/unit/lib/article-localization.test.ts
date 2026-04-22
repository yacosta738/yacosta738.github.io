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

	it("falls back to first available lang when DEFAULT_LOCALE is absent", () => {
		// Posts only in "es" — DEFAULT_LOCALE ("en") is not in the map
		// This hits getFallbackArticle lines 20-21
		const paths = buildLocalizedArticlePaths(
			[
				createArticle(
					"es/2026/03/11/managing-backpressure-in-modern-backend-systems",
				),
			],
			["en", "es"],
		);

		expect(paths).toHaveLength(2);
		// Both route locales should use the "es" article as fallback
		for (const p of paths) {
			expect(p.props.post.id).toBe(
				"es/2026/03/11/managing-backpressure-in-modern-backend-systems",
			);
		}
	});

	it("skips posts whose id has no slash (no lang prefix)", () => {
		// A post with id "no-slash-here" has no "/" so idPath is ""
		// This hits the `if (!idPath) continue` on line 34
		const paths = buildLocalizedArticlePaths(
			[createArticle("no-slash-here")],
			["en"],
		);

		expect(paths).toHaveLength(0);
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
