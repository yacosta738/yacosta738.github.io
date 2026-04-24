import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Contact from "@/components/sections/Contact.astro";

test("contact form hides honeypot from normal users and exposes useful autocomplete tokens", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Contact, {
		props: {},
	});

	expect(result).toContain('autocomplete="name"');
	expect(result).toContain('autocomplete="email"');
	expect(result).not.toContain("Do not fill out this field");
	expect(result).toContain('aria-hidden="true"');
});
