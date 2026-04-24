import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import LanguageCard from "@/components/molecules/LanguageCard.astro";

const language = {
	language: "Spanish",
	fluency: "Native speaker",
};

test("linked language card keeps the visible label as the accessible name source", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(LanguageCard, {
		props: {
			language,
			showLink: true,
			href: "/es/",
		},
	});

	expect(result).toContain("Spanish");
	expect(result).toContain("Native speaker");
	expect(result).not.toContain('aria-label="View content in Spanish"');
});
