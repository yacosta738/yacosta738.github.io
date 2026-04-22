import { describe, expect, it } from "vitest";
import { tr } from "@blog/i18n/index";

/**
 * `tr` wraps a translation function `t` and returns a fallback when
 * the key has no translation (i.e. `t` echoes the key back unchanged).
 */
const makeT = (dict: Record<string, string>) =>
	(key: string) => dict[key] ?? key;

describe("tr", () => {
	it("returns the translated string when the key exists", () => {
		const t = makeT({ "nav.home": "Home" });
		expect(tr(t, "nav.home")).toBe("Home");
	});

	it("returns fallback when the key is not found (t echoes the key)", () => {
		const t = makeT({});
		expect(tr(t, "missing.key", {}, "Fallback text")).toBe("Fallback text");
	});

	it("returns empty string as fallback by default", () => {
		const t = makeT({});
		expect(tr(t, "missing.key")).toBe("");
	});

	it("returns fallback when translation equals the key itself", () => {
		// t returns the key unchanged — treated as 'no translation'
		const t = makeT({ "nav.home": "nav.home" });
		expect(tr(t, "nav.home", {}, "Default")).toBe("Default");
	});

	it("passes params to the underlying t function", () => {
		const t = (key: string, vars?: Record<string, string | number>) => {
			if (key === "greeting" && vars) return `Hello ${vars.name}`;
			return key;
		};
		expect(tr(t, "greeting", { name: "World" }, "")).toBe("Hello World");
	});

	it("returns fallback when t returns undefined", () => {
		const t = () => undefined as unknown as string;
		expect(tr(t, "any.key", {}, "Fallback")).toBe("Fallback");
	});
});
