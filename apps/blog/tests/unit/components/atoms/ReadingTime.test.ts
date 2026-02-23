import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ReadingTime from "@/components/atoms/ReadingTime.astro";

test("ReadingTime renders with a reading time", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ReadingTime, {
		props: {
			readingTime: "5 min",
			currentLocale: "en",
		},
	});

	expect(result).toContain("Reading time: 5 min");
});

test("ReadingTime renders with a different locale", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(ReadingTime, {
		props: {
			readingTime: "5 min",
			currentLocale: "es",
		},
	});

	expect(result).toContain("Tiempo de lectura: 5 min");
});
