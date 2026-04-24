import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostTag from "@/components/atoms/PostTag.astro";

const mockTag = {
	id: "en/tags/astro",
	slug: "astro",
	title: "Astro",
};

test("PostTag renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PostTag, {
		props: {
			tag: mockTag,
			currentLocale: "en",
		},
	});

	expect(result).toContain("Astro");
	expect(result).toContain('href="/tag/astro/"');
	expect(result).not.toContain("post.aria.tag");
});

test("PostTag renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PostTag, {
		props: {
			tag: mockTag,
			currentLocale: "es",
		},
	});

	expect(result).toContain("Astro");
	expect(result).toContain('href="/es/tag/astro/"');
	expect(result).not.toContain("post.aria.tag");
});
