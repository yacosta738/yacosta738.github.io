import { describe, expect, it, vi } from "vitest";

// `hasExternalScripts` is hardcoded `false` in source — whenExternalScripts always
// returns [] in the current configuration. Tests cover the observable contract.
// The normalizeToArray path is unreachable without changing that constant.

describe("whenExternalScripts", () => {
	it("returns an empty array regardless of input when external scripts are disabled", async () => {
		const { whenExternalScripts } = await import("./externalScripts");
		expect(whenExternalScripts()).toEqual([]);
	});

	it("returns an empty array even when a factory function is supplied", async () => {
		const { whenExternalScripts } = await import("./externalScripts");
		const factory = vi.fn(() => ({ name: "partytown", hooks: {} }) as never);
		expect(whenExternalScripts(factory)).toEqual([]);
		expect(factory).not.toHaveBeenCalled();
	});

	it("returns an empty array even when an array of factory functions is supplied", async () => {
		const { whenExternalScripts } = await import("./externalScripts");
		const factory = vi.fn(() => ({ name: "partytown", hooks: {} }) as never);
		expect(whenExternalScripts([factory])).toEqual([]);
		expect(factory).not.toHaveBeenCalled();
	});
});
