import { describe, it, expect } from "vitest";
import { SOCIAL_ICONS } from "./social.consts";

describe("SOCIAL_ICONS", () => {
	it("should have icon for GitHub", () => {
		expect(SOCIAL_ICONS.github).toBeDefined();
		expect(SOCIAL_ICONS.github).toContain("github");
	});

	it("should have icon for LinkedIn", () => {
		expect(SOCIAL_ICONS.linkedin).toContain("linkedin");
	});
});