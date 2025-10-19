import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import FormattedDate from "@/components/atoms/FormattedDate.astro";

test("FormattedDate renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(FormattedDate, {
		props: {
			date: new Date("2024-01-01"),
			currentLocale: "en",
		},
	});

	expect(result).toContain("January 1, 2024");
});

test("FormattedDate renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(FormattedDate, {
		props: {
			date: new Date("2024-01-01"),
			currentLocale: "es",
		},
	});

	expect(result).toContain("1 de enero, 2024");
});
