import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Container from "./Container.astro";

test("Container renders with default class", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Container);

	expect(result).toContain('class="flex"');
});

test("Container renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Container, {
		props: {
			class: "my-4 p-4",
		},
	});

	expect(result).toContain('class="flex my-4 p-4"');
});

test("Container renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Container, {
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
