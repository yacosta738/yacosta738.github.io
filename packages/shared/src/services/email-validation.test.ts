import { describe, expect, it } from "vitest";
import { isValidEmailAddress } from "./email-validation";

describe("isValidEmailAddress", () => {
	it("should accept a valid email", () => {
		expect(isValidEmailAddress("user@example.com")).toBe(true);
	});

	it("should accept email with subdomain", () => {
		expect(isValidEmailAddress("user@mail.example.com")).toBe(true);
	});

	it("should accept email with plus addressing", () => {
		expect(isValidEmailAddress("user+tag@example.com")).toBe(true);
	});

	it("should accept email with dots in local part", () => {
		expect(isValidEmailAddress("first.last@example.com")).toBe(true);
	});

	it("should reject empty string", () => {
		expect(isValidEmailAddress("")).toBe(false);
	});

	it("should reject whitespace-only string", () => {
		expect(isValidEmailAddress("   ")).toBe(false);
	});

	it("should reject email with space in middle", () => {
		expect(isValidEmailAddress("user @example.com")).toBe(false);
	});

	it("should reject email with tab", () => {
		expect(isValidEmailAddress("user\t@example.com")).toBe(false);
	});

	it("should reject email with newline", () => {
		expect(isValidEmailAddress("user\n@example.com")).toBe(false);
	});

	it("should reject email with carriage return", () => {
		expect(isValidEmailAddress("user\r@example.com")).toBe(false);
	});

	it("should reject email without @", () => {
		expect(isValidEmailAddress("userexample.com")).toBe(false);
	});

	it("should reject email with multiple @", () => {
		expect(isValidEmailAddress("user@@example.com")).toBe(false);
	});

	it("should reject email with @ at start", () => {
		expect(isValidEmailAddress("@example.com")).toBe(false);
	});

	it("should reject email without domain dot", () => {
		expect(isValidEmailAddress("user@examplecom")).toBe(false);
	});

	it("should reject email with domain starting with dot", () => {
		expect(isValidEmailAddress("user@.example.com")).toBe(false);
	});

	it("should reject email with domain ending with dot", () => {
		expect(isValidEmailAddress("user@example.com.")).toBe(false);
	});

	it("should reject email with empty domain label", () => {
		expect(isValidEmailAddress("user@example..com")).toBe(false);
	});

	it("should trim leading/trailing whitespace before validation", () => {
		expect(isValidEmailAddress("  user@example.com  ")).toBe(true);
	});
});
