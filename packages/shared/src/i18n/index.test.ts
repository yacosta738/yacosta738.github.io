import { describe, expect, it } from "vitest";
import { tr } from "./index";

describe("tr", () => {
	it("should return translated string when translation differs from key", () => {
		const mockT = (key: string) => {
			if (key === "nav.home") return "Home";
			return key;
		};

		expect(tr(mockT, "nav.home")).toBe("Home");
	});

	it("should return fallback when translation equals the key (not found)", () => {
		const mockT = (key: string) => key;

		expect(tr(mockT, "nav.missing", {}, "Fallback")).toBe("Fallback");
	});

	it("should return empty string as default fallback", () => {
		const mockT = (key: string) => key;

		expect(tr(mockT, "nav.missing")).toBe("");
	});

	it("should return fallback when translation is undefined", () => {
		const mockT = () => undefined as unknown as string;

		expect(tr(mockT, "nav.missing", {}, "Default")).toBe("Default");
	});

	it("should return fallback when translation is empty string", () => {
		const mockT = () => "";

		expect(tr(mockT, "nav.missing", {}, "Default")).toBe("Default");
	});

	it("should pass params to the translation function", () => {
		const mockT = (key: string, vars?: Record<string, string | number>) => {
			if (key === "greeting" && vars) return `Hello ${vars.name}`;
			return key;
		};

		expect(tr(mockT, "greeting", { name: "Alice" })).toBe("Hello Alice");
	});

	it("should return translated value when it differs from key with params", () => {
		const mockT = (key: string, _vars?: Record<string, string | number>) => {
			if (key === "items.count") return "5 items";
			return key;
		};

		expect(tr(mockT, "items.count", { count: 5 })).toBe("5 items");
	});
});
