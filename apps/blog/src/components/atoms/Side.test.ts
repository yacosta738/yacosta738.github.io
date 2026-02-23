import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Side from "./Side.astro";

test("Side renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Side);

	expect(result).toContain("right-auto md:left-5 lg:left-10");
});

test("Side does not render when show is false", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Side, {
		props: {
			show: false,
		},
	});

	expect(result).toBe("");
});

test("Side renders with right orientation", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Side, {
		props: {
			orientation: "right",
		},
	});

	expect(result).toContain("left-auto md:right-5 lg:right-10");
});

test("Side renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Side, {
		props: {
			class: "my-4",
		},
	});

	expect(result).toContain("my-4");
});

test("Side renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Side, {
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
