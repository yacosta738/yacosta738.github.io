import { describe, expect, it } from "vitest";
import { getGiscusLang, getGiscusTheme, giscusConfig } from "./comments-config";

describe("giscusConfig", () => {
	it("should be a readonly config object with expected fields", () => {
		expect(giscusConfig.repo).toBe("yacosta738/yacosta738.github.io");
		expect(giscusConfig.mapping).toBe("pathname");
		expect(giscusConfig.reactionsEnabled).toBe(true);
		expect(giscusConfig.emitMetadata).toBe(false);
		expect(giscusConfig.inputPosition).toBe("bottom");
		expect(giscusConfig.strict).toBe(false);
	});
});

describe("getGiscusTheme", () => {
	it("should return 'dark' when isDark is true", () => {
		expect(getGiscusTheme(true)).toBe("dark");
	});

	it("should return 'light' when isDark is false", () => {
		expect(getGiscusTheme(false)).toBe("light");
	});
});

describe("getGiscusLang", () => {
	it("should return 'en' for English locale", () => {
		expect(getGiscusLang("en")).toBe("en");
	});

	it("should return 'es' for Spanish locale", () => {
		expect(getGiscusLang("es")).toBe("es");
	});

	it("should fall back to 'en' for unsupported locale", () => {
		expect(getGiscusLang("fr")).toBe("en");
	});

	it("should fall back to 'en' for empty string", () => {
		expect(getGiscusLang("")).toBe("en");
	});

	it("should fall back to 'en' for unknown locale", () => {
		expect(getGiscusLang("de")).toBe("en");
	});
});
