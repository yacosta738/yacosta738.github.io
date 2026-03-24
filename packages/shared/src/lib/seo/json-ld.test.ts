import { describe, expect, it } from "vitest";
import { buildPersonJsonLd, safeJsonLd } from "./json-ld";

describe("safeJsonLd", () => {
	it("escapes angle brackets to prevent script breakouts", () => {
		const serialized = safeJsonLd({
			value: "</script><script>alert(1)</script>",
		});

		expect(serialized).not.toContain("</script>");
		expect(serialized).toContain(String.raw`\u003c/script>`);
	});
});

describe("buildPersonJsonLd", () => {
	it("normalizes relative image urls against the site origin", () => {
		const person = buildPersonJsonLd(
			{
				name: "Yuniel Acosta",
				image: "/images/profile.webp",
				profiles: [{ url: "https://github.com/yacosta738" }],
			},
			"https://example.com",
		);

		expect(person).toMatchObject({
			"@type": "Person",
			image: "https://example.com/images/profile.webp",
			sameAs: ["https://github.com/yacosta738"],
		});
	});
});
