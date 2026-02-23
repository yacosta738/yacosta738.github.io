import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import WidgetCard from "./WidgetCard.astro";

test("WidgetCard renders with a title", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(WidgetCard, {
		props: {
			title: "Hello, World!",
		},
	});

	expect(result).toContain("Hello, World!");
});

test("WidgetCard renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(WidgetCard, {
		props: {
			title: "Hello, World!",
			class: "my-4",
		},
	});

	expect(result).toContain("my-4");
});

test("WidgetCard renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(WidgetCard, {
		props: {
			title: "Hello, World!",
		},
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
