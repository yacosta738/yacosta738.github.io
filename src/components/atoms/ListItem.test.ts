import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ListItem from "./ListItem.astro";

test("ListItem renders with default variant", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ListItem);

	expect(result).toContain("gap-y-2");
});

test("ListItem renders with compact variant", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ListItem, {
		props: {
			variant: "compact",
		},
	});

	expect(result).toContain("gap-y-1");
});

test("ListItem renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ListItem, {
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
