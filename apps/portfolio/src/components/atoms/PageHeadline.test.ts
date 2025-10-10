import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PageHeadline from "./PageHeadline.astro";

test("PageHeadline renders with a title", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PageHeadline, {
		props: {
			title: "Hello, World!",
		},
	});

	expect(result).toContain("Hello, World!");
});

test("PageHeadline renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PageHeadline, {
		props: {
			title: "Hello, World!",
			class: "my-4 p-4",
		},
	});

	expect(result).toContain("my-4");
	expect(result).toContain("p-4");
});

test("PageHeadline renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(PageHeadline, {
		props: {
			title: "Hello, World!",
		},
		slots: {
			default: "<span>Sub-headline</span>",
		},
	});

	expect(result).toContain("<span>Sub-headline</span>");
});
