import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import IconButton from "./IconButton.astro";

test("IconButton renders with default classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(IconButton);

	expect(result).toContain("p-2");
	expect(result).toContain("text-foreground");
});

test("IconButton renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(IconButton, {
		props: {
			class: "my-4 p-4",
		},
	});

	expect(result).toContain("my-4");
	expect(result).toContain("p-4");
});

test("IconButton renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(IconButton, {
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
