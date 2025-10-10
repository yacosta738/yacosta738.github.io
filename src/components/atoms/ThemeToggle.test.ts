import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ThemeToggle from "./ThemeToggle.astro";

test("ThemeToggle renders with correct ARIA labels", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ThemeToggle, {
		props: {
			currentLocale: "en",
		},
	});

	expect(result).toContain('aria-label="Toggle Theme"');
	expect(result).toContain('title="Toggle between light and dark theme"');
});

test("ThemeToggle renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ThemeToggle, {
		props: {
			currentLocale: "es",
		},
	});

	expect(result).toContain('aria-label="Alternar Tema"');
	expect(result).toContain('title="Alternar entre tema claro y oscuro"');
});
