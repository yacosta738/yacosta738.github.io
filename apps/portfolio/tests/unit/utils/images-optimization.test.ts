import { describe, expect, it } from "vitest";
import {
	getBreakpoints,
	getSizes,
	parseAspectRatio,
} from "@/utils/images-optimization";

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

describe("images-optimization", () => {
	describe("getSizes", () => {
		it("should return undefined if no width or layout is provided", () => {
			expect(getSizes()).toBeUndefined();
		});

		it('should return correct sizes for "constrained" layout', () => {
			expect(getSizes(1200, "constrained")).toBe(
				"(min-width: 1200px) 1200px, 100vw",
			);
		});

		it('should return correct sizes for "fixed" layout', () => {
			expect(getSizes(800, "fixed")).toBe("800px");
		});

		it('should return correct sizes for "fullWidth" layout', () => {
			expect(getSizes(1920, "fullWidth")).toBe("100vw");
		});
	});

	describe("getBreakpoints", () => {
		const customBreakpoints = [640, 750, 828, 1080, 1280];

		it('should return device sizes for "fullWidth" layout', () => {
			expect(getBreakpoints({ layout: "fullWidth" })).not.toHaveLength(0);
		});

		it('should return custom breakpoints for "fullWidth" layout', () => {
			expect(
				getBreakpoints({ layout: "fullWidth", breakpoints: customBreakpoints }),
			).toEqual(customBreakpoints);
		});

		it('should return correct breakpoints for "fixed" layout', () => {
			expect(getBreakpoints({ width: 300, layout: "fixed" })).toEqual([
				300, 600,
			]);
		});

		it('should return correct breakpoints for "constrained" layout', () => {
			const result = getBreakpoints({
				width: 1000,
				layout: "constrained",
				breakpoints: customBreakpoints,
			});
			expect(result).toContain(1000);
			expect(result).toContain(2000);
			expect(result).toEqual(
				expect.arrayContaining([1000, 2000, ...customBreakpoints]),
			);
		});
	});
});
