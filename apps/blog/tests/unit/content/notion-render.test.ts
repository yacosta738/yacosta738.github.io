import { render } from "astro:content";
import type { Root } from "hast";
import { describe, expect, it } from "vitest";
import { notionBlockFallbacks } from "@/lib/notion/notion-blocks";

const createEntry = () => ({
	id: "en/2024/01/02/notion-entry",
	collection: "notionArticles",
	data: {
		title: "Notion entry",
		description: "From Notion",
		date: new Date("2024-01-02"),
		author: { id: "en/yuniel-acosta-perez", collection: "authors" },
		tags: [{ id: "en/astro", collection: "tags" }],
		category: { id: "en/tech", collection: "categories" },
		draft: false,
		featured: false,
	},
	rendered: {
		html: "<p>Notion content</p>",
		metadata: {},
	},
});

describe("notion rendering", () => {
	it("renders a Notion-derived entry without errors", async () => {
		const entry = createEntry();
		const result = await render(
			entry as unknown as Parameters<typeof render>[0],
		);
		expect(result.Content).toBeDefined();
	});

	it("applies safe fallbacks for unsupported embeds", () => {
		const tree: Root = {
			type: "root",
			children: [
				{
					type: "element",
					tagName: "iframe",
					properties: { src: "https://evil.com/embed" },
					children: [],
				},
			],
		};

		notionBlockFallbacks()(tree);

		const node = tree.children[0] as {
			tagName?: string;
			properties?: Record<string, unknown>;
		};
		expect(node.tagName).toBe("p");
		expect(node.properties?.className).toContain("notion-embed-fallback");
	});
});
