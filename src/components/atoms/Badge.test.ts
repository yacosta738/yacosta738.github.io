import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Badge from "./Badge.astro";

test("Badge renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Badge, {
		slots: {
			default: "Default Badge",
		},
	});

	expect(result).toContain("Default Badge");
	// Default variant is 'primary' and size is 'md'
	expect(result).toContain("badge-primary");
	expect(result).toContain("px-3 py-1 text-xs");
});

test("Badge renders with specified variant and size", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Badge, {
		props: {
			variant: "secondary",
			size: "lg",
		},
		slots: {
			default: "Large Secondary Badge",
		},
	});

	expect(result).toContain("Large Secondary Badge");
	expect(result).toContain("bg-blue-50 text-blue-900"); // secondary variant
	expect(result).toContain("px-4 py-1.5 text-sm"); // lg size
});

test("Badge renders with custom class", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Badge, {
		props: {
			class: "custom-class",
		},
		slots: {
			default: "Custom Class Badge",
		},
	});

	expect(result).toContain("Custom Class Badge");
	expect(result).toContain("custom-class");
});

test("Badge renders content from slot", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Badge, {
		slots: {
			default: "<span>Slot Content</span>",
		},
	});

	expect(result).toContain("<span>Slot Content</span>");
});
