import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import TabButton from "./TabButton.astro";

test("TabButton renders as active", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TabButton, {
		props: {
			company: "Test Company",
			isActive: true,
			tabIndex: 0,
		},
	});

	expect(result).toContain("Test Company");
	expect(result).toContain('data-tab="0"');
	expect(result).toContain('id="tab-0"');
	expect(result).toContain('role="tab"');
	expect(result).toContain('tabindex="0"');
	expect(result).toContain('aria-selected="true"');
	expect(result).toContain('aria-controls="panel-0"');
});

test("TabButton renders as inactive", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(TabButton, {
		props: {
			company: "Test Company",
			isActive: false,
			tabIndex: 1,
		},
	});

	expect(result).toContain("Test Company");
	expect(result).toContain('data-tab="1"');
	expect(result).toContain('id="tab-1"');
	expect(result).toContain('role="tab"');
	expect(result).toContain('tabindex="-1"');
	expect(result).toContain('aria-selected="false"');
	expect(result).toContain('aria-controls="panel-1"');
});
