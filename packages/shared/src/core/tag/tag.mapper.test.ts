import { describe, expect, it } from "vitest";
import { toTag, toTags } from "./tag.mapper";

describe("toTag", () => {
	it("builds a slug from the title without leading or trailing dashes", () => {
		const tag = toTag({
			id: "en/tags/clean-code",
			data: {
				title: " --- Clean   Code --- ",
			},
		} as never);

		expect(tag.slug).toBe("clean-code");
		expect(tag.title).toBe("--- Clean   Code ---");
	});

	it("falls back to the entity slug when the normalized title becomes empty", () => {
		const tag = toTag({
			id: "en/tags/c-plus-plus",
			data: {
				title: "!!!",
			},
		} as never);

		expect(tag.slug).toBe("c-plus-plus");
	});

	it("normalises accented characters in the title", () => {
		const tag = toTag({
			id: "en/tags/placeholder",
			data: { title: "Café Résumé" },
		} as never);

		expect(tag.slug).toBe("cafe-resume");
	});

	it("truncates titles longer than 200 characters before slugifying", () => {
		const longTitle = "a".repeat(250);
		const tag = toTag({
			id: "en/tags/placeholder",
			data: { title: longTitle },
		} as never);

		// slug must not exceed 200 chars (all 'a's → single segment)
		expect(tag.slug.length).toBeLessThanOrEqual(200);
	});

	it("preserves the tagData.id on the returned object", () => {
		const tag = toTag({
			id: "en/tags/typescript",
			data: { title: "TypeScript" },
		} as never);

		expect(tag.id).toBe("en/tags/typescript");
	});
});

describe("toTags", () => {
	it("maps an array of entries to Tag objects", () => {
		const entries = [
			{ id: "en/tags/react", data: { title: "React" } },
			{ id: "en/tags/astro", data: { title: "Astro" } },
		] as never[];

		const tags = toTags(entries);

		expect(tags).toHaveLength(2);
		expect(tags[0].slug).toBe("react");
		expect(tags[1].slug).toBe("astro");
	});

	it("returns an empty array for empty input", () => {
		expect(toTags([])).toEqual([]);
	});
});
