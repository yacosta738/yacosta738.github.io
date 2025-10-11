import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TagBadge from "./TagBadge.astro";

test("TagBadge renders with correct link and text", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TagBadge, {
		props: {
			title: "JavaScript",
			slug: "javascript",
			lang: "en",
		},
	});

	expect(result).toContain("JavaScript");
	expect(result).toContain('href="/en/tag/javascript"');
});

test("TagBadge applies correct variant and size", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TagBadge, {
		props: {
			title: "React",
			slug: "react",
			lang: "es",
			variant: "primary",
			size: "lg",
		},
	});

	expect(result).toContain("React");
	expect(result).toContain("badge-primary");
	expect(result).toContain("px-4 py-1.5 text-sm");
});

test("TagBadge includes additional classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TagBadge, {
		props: {
			title: "TypeScript",
			slug: "typescript",
			lang: "en",
			class: "custom-class",
		},
	});

	expect(result).toContain("TypeScript");
	expect(result).toContain("custom-class");
});
