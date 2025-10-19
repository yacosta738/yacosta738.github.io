import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Typography from "@/components/atoms/Typography.astro";

test("Typography renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		slots: {
			default: "Hello, World!",
		},
	});

	expect(result).toContain("p");
	expect(result).toContain("text-sm");
});

test("Typography renders with specified 'as' prop", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		props: {
			as: "h1",
		},
	});

	expect(result).toContain("h1");
});

test("Typography renders with specified 'variant' prop", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		props: {
			variant: "title",
		},
	});

	expect(result).toContain("text-4xl");
});

test("Typography renders with dateFixedWidth", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		props: {
			variant: "date",
			dateFixedWidth: true,
		},
	});

	expect(result).toContain("min-w-[8ch]");
});

test("Typography renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		props: {
			class: "my-4",
		},
	});

	expect(result).toContain("my-4");
});

test("Typography renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Typography, {
		slots: {
			default: "<span>Hello, World!</span>",
		},
	});

	expect(result).toContain("<span>Hello, World!</span>");
});
