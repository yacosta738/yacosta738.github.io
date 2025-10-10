import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostCategory from "./PostCategory.astro";

const mockCategory = {
	id: "en/categories/technology",
	slug: "technology",
	title: "Technology",
};

test("PostCategory renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PostCategory, {
		props: {
			category: mockCategory,
			currentLocale: "en",
		},
	});

	expect(result).toContain("Technology");
	expect(result).toContain('href="/en/blog/category/technology/"');
});

test("PostCategory renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PostCategory, {
		props: {
			category: mockCategory,
			currentLocale: "es",
		},
	});

	expect(result).toContain("Technology");
	expect(result).toContain('href="/es/blog/category/technology/"');
});
