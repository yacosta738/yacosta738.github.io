import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Section from "./Section.astro";

test("Section renders a section element", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Section);

	expect(result).toContain("<section");
});

test("Section renders title when provided", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Section, {
		props: { title: "My Section" },
	});

	expect(result).toContain("<h2");
	expect(result).toContain("My Section");
});

test("Section does not render title when not provided", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Section);

	expect(result).not.toContain("<h2");
});

test("Section renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Section, {
		slots: { default: "<p>This is the section content.</p>" },
	});

	expect(result).toContain("<p>This is the section content.</p>");
});

test("Section applies custom classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Section, {
		props: { class: "my-custom-class" },
	});

	expect(result).toContain("my-custom-class");
});
