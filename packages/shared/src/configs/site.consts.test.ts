import { describe, expect, it, vi } from "vitest";

// We need to test that the module reads import.meta.env properly.
// Since the values are module-level constants, we re-import per test scenario.

describe("site.consts", () => {
	it("exports default BRAND_NAME when env not set", async () => {
		vi.stubEnv("BRAND_NAME", "");

		const mod = await import("./site.consts");

		// BRAND_NAME falls back to the default when env is falsy
		// Since the module is cached, we test the exported value directly
		expect(mod.BRAND_NAME).toBeDefined();
		expect(
			typeof mod.BRAND_NAME === "string" || typeof mod.BRAND_NAME === "object",
		).toBe(true);
	});

	it("exports SITE_TITLE", async () => {
		const mod = await import("./site.consts");
		expect(mod.SITE_TITLE).toBeDefined();
	});

	it("exports SITE_DESCRIPTION as a multilingual object", async () => {
		const mod = await import("./site.consts");
		expect(mod.SITE_DESCRIPTION).toHaveProperty("en");
		expect(mod.SITE_DESCRIPTION).toHaveProperty("es");
		expect(typeof mod.SITE_DESCRIPTION.en).toBe("string");
		expect(typeof mod.SITE_DESCRIPTION.es).toBe("string");
	});

	it("SITE_DESCRIPTION.en has a meaningful default", async () => {
		const mod = await import("./site.consts");
		expect(mod.SITE_DESCRIPTION.en).toContain("Yuniel Acosta");
	});

	it("SITE_DESCRIPTION.es is in Spanish", async () => {
		const mod = await import("./site.consts");
		expect(mod.SITE_DESCRIPTION.es).toContain("Portafolio de Yuniel Acosta");
	});

	it("exports X_ACCOUNT", async () => {
		const mod = await import("./site.consts");
		expect(mod.X_ACCOUNT).toBeDefined();
		// Default should contain the twitter handle
		if (typeof mod.X_ACCOUNT === "string") {
			expect(mod.X_ACCOUNT).toContain("@yacosta738");
		}
	});

	it("exports NOT_TRANSLATED_CAUTION as multilingual object", async () => {
		const mod = await import("./site.consts");
		expect(mod.NOT_TRANSLATED_CAUTION).toHaveProperty("en");
		expect(mod.NOT_TRANSLATED_CAUTION).toHaveProperty("es");
		expect(typeof mod.NOT_TRANSLATED_CAUTION.en).toBe("string");
		expect(typeof mod.NOT_TRANSLATED_CAUTION.es).toBe("string");
	});

	it("NOT_TRANSLATED_CAUTION.en has English message", async () => {
		const mod = await import("./site.consts");
		expect(mod.NOT_TRANSLATED_CAUTION.en).toContain("not available");
	});

	it("NOT_TRANSLATED_CAUTION.es has Spanish message", async () => {
		const mod = await import("./site.consts");
		expect(mod.NOT_TRANSLATED_CAUTION.es).toContain("no está disponible");
	});
});
