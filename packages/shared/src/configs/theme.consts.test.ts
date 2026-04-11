import { describe, expect, it } from "vitest";
import {
	DARK_COLOR,
	HEADER_ID,
	LIGHT_COLOR,
	STORAGE_KEY,
} from "./theme.consts";

describe("theme.consts", () => {
	describe("LIGHT_COLOR", () => {
		it("should be white color", () => {
			expect(LIGHT_COLOR).toBe("#ffffff");
		});
	});

	describe("DARK_COLOR", () => {
		it("should be dark color", () => {
			expect(DARK_COLOR).toBe("#0b1016");
		});
	});

	describe("STORAGE_KEY", () => {
		it("should be theme", () => {
			expect(STORAGE_KEY).toBe("theme");
		});
	});

	describe("HEADER_ID", () => {
		it("should be a valid UUID", () => {
			expect(HEADER_ID).toMatch(/^[0-9a-f-]{36}$/i);
		});
	});
});
