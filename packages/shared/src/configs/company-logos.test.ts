import { describe, it, expect } from "vitest";
import { COMPANY_LOGOS, getCompanyLogo } from "./company-logos";

describe("company-logos", () => {
	describe("COMPANY_LOGOS", () => {
		it("should be a record of company names to logo keys", () => {
			expect(COMPANY_LOGOS).toBeDefined();
			expect(typeof COMPANY_LOGOS).toBe("object");
		});

		it("should have predefined companies", () => {
			expect(COMPANY_LOGOS.gft).toBeDefined();
			expect(COMPANY_LOGOS.desoft).toBeDefined();
			expect(COMPANY_LOGOS["mercado libre"]).toBeDefined();
		});

		it("should have string logo keys", () => {
			expect(typeof COMPANY_LOGOS.gft).toBe("string");
		});
	});

	describe("getCompanyLogo", () => {
		it("should return logo key for valid company", () => {
			expect(getCompanyLogo("GFT")).toBe("gft");
		});

		it("should return logo key with lowercase", () => {
			expect(getCompanyLogo("DeSoft")).toBe("desoft");
		});

		it("should return undefined for empty input", () => {
			expect(getCompanyLogo("")).toBeUndefined();
		});

		it("should return undefined for unknown company", () => {
			expect(getCompanyLogo("Unknown Company")).toBeUndefined();
		});

		it("should trim whitespace", () => {
			expect(getCompanyLogo("  GFT  ")).toBe("gft");
		});
	});
});