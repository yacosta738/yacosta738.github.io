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

	it("accepts an ImageMetadata-style object with a src property", () => {
		const person = buildPersonJsonLd(
			{ name: "Yuniel Acosta", image: { src: "/assets/photo.webp" } },
			"https://example.com",
		);

		expect(person.image).toBe("https://example.com/assets/photo.webp");
	});

	it("omits the image field when image is null", () => {
		const person = buildPersonJsonLd(
			{ name: "Yuniel Acosta", image: null },
			"https://example.com",
		);

		expect(person).not.toHaveProperty("image");
	});

	it("omits the image field when an object without a src property is passed", () => {
		// Exercises the getImageUrl fallback return "" branch (line 16)
		const person = buildPersonJsonLd(
			{ name: "Yuniel Acosta", image: {} as { src: string } },
			"https://example.com",
		);

		expect(person).not.toHaveProperty("image");
	});

	it("uses siteOrigin as url when basics.url is omitted", () => {
		const person = buildPersonJsonLd({ name: "Yuniel Acosta" }, "https://example.com");

		expect(person.url).toBe("https://example.com");
	});

	it("includes email, address and sameAs when all fields are provided", () => {
		const person = buildPersonJsonLd(
			{
				email: "hello@example.com",
				location: { city: "Havana", countryCode: "CU" },
				profiles: [{ url: "https://linkedin.com/in/yuniel" }],
			},
			"https://example.com",
		);

		expect(person.email).toBe("mailto:hello@example.com");
		expect(person.address).toMatchObject({
			"@type": "PostalAddress",
			addressLocality: "Havana",
			addressCountry: "CU",
		});
		expect(person.sameAs).toEqual(["https://linkedin.com/in/yuniel"]);
	});
});
