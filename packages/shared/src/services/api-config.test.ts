import { describe, expect, it } from "vitest";
import { API_CONFIG, type ApiError, type ApiResponse } from "./api-config";

describe("api-config", () => {
	describe("API_CONFIG", () => {
		it("should have baseUrl property", () => {
			expect(API_CONFIG).toHaveProperty("baseUrl");
			expect(typeof API_CONFIG.baseUrl).toBe("string");
		});

		it("should have endpoints object", () => {
			expect(API_CONFIG).toHaveProperty("endpoints");
			expect(API_CONFIG.endpoints).toHaveProperty("contact");
			expect(API_CONFIG.endpoints).toHaveProperty("newsletter");
		});

		it("should have correct endpoints", () => {
			expect(API_CONFIG.endpoints.contact).toBe("/api/contact");
			expect(API_CONFIG.endpoints.newsletter).toBe("/api/newsletter");
		});

		it("should have timeout", () => {
			expect(API_CONFIG).toHaveProperty("timeout");
			expect(API_CONFIG.timeout).toBe(10000);
		});

		it("should have timeout as const", () => {
			expect(API_CONFIG.timeout).toBe(10000);
		});
	});

	describe("ApiResponse type", () => {
		it("should allow success response", () => {
			const response: ApiResponse = { success: true };
			expect(response.success).toBe(true);
		});

		it("should allow response with data", () => {
			const response: ApiResponse<string> = { success: true, data: "test" };
			expect(response.data).toBe("test");
		});

		it("should allow response with message", () => {
			const response: ApiResponse = { success: true, message: "ok" };
			expect(response.message).toBe("ok");
		});
	});

	describe("ApiError type", () => {
		it("should require success false and message", () => {
			const error: ApiError = { success: false, message: "Error" };
			expect(error.success).toBe(false);
			expect(error.message).toBe("Error");
		});

		it("should allow optional code", () => {
			const error: ApiError = {
				success: false,
				message: "Not found",
				code: "404",
			};
			expect(error.code).toBe("404");
		});
	});
});
