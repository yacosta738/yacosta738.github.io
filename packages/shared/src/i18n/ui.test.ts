import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let previousNodeEnv: string | undefined;

describe("ui translations", () => {
	beforeEach(() => {
		previousNodeEnv = process.env.NODE_ENV;
	});

	afterEach(() => {
		vi.restoreAllMocks();
		if (previousNodeEnv === undefined) {
			delete process.env.NODE_ENV;
		} else {
			process.env.NODE_ENV = previousNodeEnv;
		}
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
