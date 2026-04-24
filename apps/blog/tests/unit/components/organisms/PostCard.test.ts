import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostCard from "@/components/organisms/PostCard.astro";

const article = {
	id: "en/articles/cors",
	date: new Date("2023-04-03T00:00:00.000Z"),
	title: "Understanding CORS in Web Development",
	description: "This article explains CORS.",
	author: {
		id: "en/authors/yuniel-acosta-perez",
		slug: "yuniel-acosta-perez",
		name: "Yuniel Acosta Pérez",
	},
	tags: [{ id: "en/tags/cors", slug: "cors", title: "CORS" }],
};

test("post card does not expose raw post.aria translation keys", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PostCard, {
		props: article,
	});

	expect(result).toContain("Understanding CORS in Web Development");
	expect(result).toContain("Yuniel Acosta Pérez");
	expect(result).toContain("CORS");
	expect(result).toContain("dark:text-gray-300");
	expect(result).not.toContain("post.aria.author");
	expect(result).not.toContain("post.aria.tag");
});
