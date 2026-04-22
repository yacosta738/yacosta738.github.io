import { describe, expect, it } from "vitest";
import { getSocialIcon, SOCIAL_ICONS } from "./social.consts";

describe("SOCIAL_ICONS", () => {
	it("should have icon for GitHub", () => {
		expect(SOCIAL_ICONS.github).toBeDefined();
		expect(SOCIAL_ICONS.github).toContain("github");
	});

	it("should have icon for LinkedIn", () => {
		expect(SOCIAL_ICONS.linkedin).toContain("linkedin");
	});
});

describe("getSocialIcon", () => {
	it("returns the correct icon for a known key", () => {
		expect(getSocialIcon("github")).toBe("lucide:github");
	});

	it("is case-insensitive", () => {
		expect(getSocialIcon("GitHub")).toBe("lucide:github");
		expect(getSocialIcon("LINKEDIN")).toBe("lucide:linkedin");
	});

	it("returns the fallback icon for an unknown key", () => {
		expect(getSocialIcon("unknown-network")).toBe("lucide:origami");
	});

	it("returns the fallback icon for an empty string", () => {
		expect(getSocialIcon("")).toBe("lucide:origami");
	});
});
