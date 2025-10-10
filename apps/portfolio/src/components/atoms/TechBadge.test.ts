import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TechBadge from "./TechBadge.astro";

test("TechBadge renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TechBadge, {
		props: {
			name: "Astro",
		},
	});

	expect(result).toContain("Astro");
});

test("TechBadge renders with an icon", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TechBadge, {
		props: {
			name: "Astro",
			icon: "simple-icons:astro",
		},
	});

	expect(result).toContain("<svg");
});

test("TechBadge renders with a different size", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TechBadge, {
		props: {
			name: "Astro",
			size: "lg",
		},
	});

	expect(result).toContain("px-4 py-1.5 text-sm");
});

test("TechBadge renders with additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TechBadge, {
		props: {
			name: "Astro",
			class: "my-4",
		},
	});

	expect(result).toContain("my-4");
});
