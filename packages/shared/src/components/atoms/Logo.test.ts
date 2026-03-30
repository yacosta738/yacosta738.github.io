import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Logo from "./Logo.astro";

test("Logo renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Logo, {
		props: {
			currentLocale: "en",
		},
	});

	expect(result).toContain('href="/"');
	expect(result).toContain('alt="Yuniel Acosta logo"');
}, 10000);

test("Logo renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Logo, {
		props: {
			currentLocale: "es",
		},
	});

	expect(result).toContain('href="/es/"');
	expect(result).toContain('alt="Yuniel Acosta logo"');
});
