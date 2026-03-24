import { describe, expect, it } from "vitest";
import { isLang } from "./types";
import { resolveLocaleFromUrl } from "./utils/resolveLocaleFromUrl";

describe("isLang", () => {
	it("accepts configured locale keys only", () => {
		expect(isLang("en")).toBe(true);
		expect(isLang("es")).toBe(true);
		expect(isLang("fr")).toBe(false);
	});

	it("rejects inherited prototype keys", () => {
		expect(isLang("__proto__")).toBe(false);
		expect(isLang("constructor")).toBe(false);
		expect(isLang("toString")).toBe(false);
	});
});

describe("resolveLocaleFromUrl", () => {
	it("prefers a valid params language", () => {
		const locale = resolveLocaleFromUrl(
			new URL("https://example.com/es/about"),
			"en",
		);

		expect(locale).toBe("en");
	});

	it("falls back to a valid locale in the path", () => {
		const locale = resolveLocaleFromUrl(
			new URL("https://example.com/es/about"),
		);

		expect(locale).toBe("es");
	});

	it("falls back to the default locale for invalid inputs", () => {
		expect(
			resolveLocaleFromUrl(new URL("https://example.com/about"), "fr"),
		).toBe("en");
		expect(
			resolveLocaleFromUrl(new URL("https://example.com/__proto__/about")),
		).toBe("en");
	});
});
