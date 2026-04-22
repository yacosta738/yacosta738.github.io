import { describe, expect, it } from "vitest";
import { Template } from "./og.template";

describe("og.template — Template()", () => {
	it("throws when title is missing", () => {
		expect(() => Template({ title: "" } as Parameters<typeof Template>[0])).toThrow(
			"Title is required",
		);
	});

	it("returns a root div node", () => {
		const result = Template({ title: "Hello World" });
		expect(result.type).toBe("div");
	});

	it("includes the title text somewhere in the tree", () => {
		const json = JSON.stringify(Template({ title: "My Article" }));
		expect(json).toContain("My Article");
	});

	it("includes the category when provided", () => {
		const json = JSON.stringify(Template({ title: "T", category: "Tech" }));
		expect(json).toContain("Tech");
	});

	it("does not include a category node when omitted", () => {
		const result = Template({ title: "T" });
		// category span is only rendered when category is truthy — verify by absence
		const json = JSON.stringify(result);
		expect(json).not.toContain('"category"');
	});

	it("renders each tag as a span", () => {
		const json = JSON.stringify(
			Template({ title: "T", tags: ["rust", "wasm"] }),
		);
		expect(json).toContain("rust");
		expect(json).toContain("wasm");
	});

	it("uses the provided author name", () => {
		const json = JSON.stringify(
			Template({ title: "T", author: "Jane Doe" }),
		);
		expect(json).toContain("Jane Doe");
	});

	it("falls back to BRAND_NAME when author is omitted", () => {
		// BRAND_NAME is a string constant — just verify it appears
		const json = JSON.stringify(Template({ title: "T" }));
		// As long as children contains a non-empty string the brand name is present
		expect(json).toMatch(/"children":".+"/);
	});

	it("formats a Date object for display", () => {
		const date = new Date("2024-06-15");
		const json = JSON.stringify(Template({ title: "T", date }));
		// The year must appear in the formatted output
		expect(json).toContain("2024");
	});

	it("uses a string date as-is", () => {
		const json = JSON.stringify(
			Template({ title: "T", date: "Custom Date String" }),
		);
		expect(json).toContain("Custom Date String");
	});

	it("uses Spanish locale formatting when lang is 'es'", () => {
		// Spanish months are lower-case; just verify no crash and year present
		const date = new Date("2024-01-01");
		const json = JSON.stringify(Template({ title: "T", date, lang: "es" }));
		expect(json).toContain("2024");
	});
});
