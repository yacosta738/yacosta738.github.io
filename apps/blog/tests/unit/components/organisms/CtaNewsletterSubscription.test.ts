import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import CtaNewsletterSubscription from "@/components/organisms/CtaNewsletterSubscription.astro";

test("newsletter email field has a semantic label and autocomplete token", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(CtaNewsletterSubscription, {
		props: {},
	});

	expect(result).toContain('for="newsletter-email"');
	expect(result).toContain('autocomplete="email"');
	expect(result).toMatch(/Email address|Correo electrónico/);
});
