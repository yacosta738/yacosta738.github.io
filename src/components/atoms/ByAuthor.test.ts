import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ByAuthor from "./ByAuthor.astro";

const mockAuthor = {
	id: "en/authors/johndoe",
	slug: "johndoe",
	name: "John Doe",
	avatar: "https://example.com/avatar.png",
	description: "A test author",
	social: [],
	route: "/en/authors/johndoe",
};

test("ByAuthor renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ByAuthor, {
		props: {
			author: mockAuthor,
			currentLocale: "en",
		},
	});

	expect(result).toContain("John Doe");
	expect(result).toContain('href="/en/author/johndoe"');
});

test("ByAuthor renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ByAuthor, {
		props: {
			author: mockAuthor,
			currentLocale: "es",
		},
	});

	expect(result).toContain("John Doe");
	expect(result).toContain('href="/es/author/johndoe"');
});
