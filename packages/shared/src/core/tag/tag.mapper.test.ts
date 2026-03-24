import { describe, expect, it } from "vitest";
import { toTag } from "./tag.mapper";

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
});
