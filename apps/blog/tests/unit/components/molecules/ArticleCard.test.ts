import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ArticleCard from "@/components/molecules/ArticleCard.astro";

test("external article card announces external destination in its accessible name", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ArticleCard, {
		props: {
			title: "Why use Linux in software development?",
			description: "External article",
			url: "https://binarycoffee.dev/post/linux-in-software-development",
			"data-external": "true",
		},
	});

	expect(result).toContain("external site");
});
