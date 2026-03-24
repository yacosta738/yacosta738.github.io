import { afterEach, describe, expect, it, vi } from "vitest";

describe("ui translations", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		delete process.env.NODE_ENV;
	});

	it("loads and merges translation files for supported languages", async () => {
		const { ui } = await import("./ui");

		expect(Object.keys(ui.en).length).toBeGreaterThan(0);
		expect(Object.keys(ui.es).length).toBeGreaterThan(0);
	});

	it("logs translation counts in development mode", async () => {
		vi.resetModules();
		process.env.NODE_ENV = "development";
		const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

		await import("./ui");

		expect(logSpy).toHaveBeenCalledWith(
			"㊙︎ Loaded translations:",
			expect.stringContaining("en:"),
		);
	});
});
