import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TypedText from "@/components/atoms/TypedText.astro";

test("TypedText renders with fallback text", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TypedText, {
		props: {
			text: "Hello, World!",
		},
	});

	expect(result).toContain("Hello, World!");
});

test("TypedText renders with cursor", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TypedText, {
		props: {
			text: "Hello, World!",
			cursor: true,
		},
	});

	expect(result).toContain('class="typed-cursor"');
});

test("TypedText does not render cursor when cursor is false", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TypedText, {
		props: {
			text: "Hello, World!",
			cursor: false,
		},
	});

	expect(result).not.toContain('class="typed-cursor"');
});

test("TypedText renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TypedText, {
		props: {
			text: "Hello, World!",
			class: "my-4",
		},
	});

	expect(result).toContain("my-4");
});
