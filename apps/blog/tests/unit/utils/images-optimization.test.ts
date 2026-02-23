import { describe, expect, it } from "vitest";
import { parseAspectRatio } from "@/utils/images-optimization";

describe("parseAspectRatio", () => {
	it("parses numeric input", () => {
		expect(parseAspectRatio(1.5)).toBe(1.5);
		expect(parseAspectRatio("1.5")).toBeCloseTo(1.5);
	});

	it("parses colon-separated ratio", () => {
		expect(parseAspectRatio("16:9")).toBeCloseTo(16 / 9);
		expect(parseAspectRatio(" 4 : 3 ")).toBeCloseTo(4 / 3);
	});

	it("parses slash-separated ratio", () => {
		expect(parseAspectRatio("3/2")).toBeCloseTo(3 / 2);
		expect(parseAspectRatio("10 / 5")).toBeCloseTo(2);
	});

	it("returns undefined for invalid inputs", () => {
		expect(parseAspectRatio("")).toBeUndefined();
		expect(parseAspectRatio("abc:def")).toBeUndefined();
		expect(parseAspectRatio("16:0")).toBeUndefined();
	});

	it("handles very long inputs without throwing", () => {
		const long = "a".repeat(100000);
		expect(parseAspectRatio(long)).toBeUndefined();
	});
});
