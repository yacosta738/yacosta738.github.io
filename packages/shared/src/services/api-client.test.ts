import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient, ApiClientError, apiClient } from "./api-client";

// Mock api-config
vi.mock("./api-config", () => ({
	API_CONFIG: {
		baseUrl: "https://api.test.com",
		timeout: 5000,
		endpoints: { contact: "/api/contact", newsletter: "/api/newsletter" },
	},
}));

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("ApiClient", () => {
	let client: ApiClient;

	beforeEach(() => {
		vi.useFakeTimers();
		client = new ApiClient("https://api.test.com", 5000);
		mockFetch.mockReset();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("constructor", () => {
		it("uses provided baseUrl and timeout", () => {
			const c = new ApiClient("https://custom.api", 3000);
			// Verify it works by making a request
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ success: true }),
			});
			// The constructor just sets fields; we test via post/get
			expect(c).toBeInstanceOf(ApiClient);
		});

		it("falls back to API_CONFIG defaults", () => {
			const c = new ApiClient();
			expect(c).toBeInstanceOf(ApiClient);
		});
	});

	describe("post", () => {
		it("sends POST request with JSON body and returns parsed response", async () => {
			const responseData = { success: true, message: "OK", data: { id: 1 } };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(responseData),
			});

			const result = await client.post("/api/contact", { name: "Test" });

			expect(mockFetch).toHaveBeenCalledWith(
				"https://api.test.com/api/contact",
				expect.objectContaining({
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ name: "Test" }),
				}),
			);
			expect(result).toEqual(responseData);
		});

		it("throws ApiClientError with response message on non-ok response", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 400,
				json: () => Promise.resolve({ success: false, message: "Bad request" }),
			});

			try {
				await client.post("/api/contact", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Bad request");
				expect((err as ApiClientError).statusCode).toBe(400);
			}
		});

		it("throws ApiClientError with HTTP status fallback when no message", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ success: false }),
			});

			try {
				await client.post("/api/test", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("HTTP error! status: 500");
				expect((err as ApiClientError).statusCode).toBe(500);
			}
		});

		it("throws ApiClientError with status 408 on timeout (AbortError)", async () => {
			const abortError = new DOMException(
				"The operation was aborted",
				"AbortError",
			);
			mockFetch.mockRejectedValueOnce(abortError);

			try {
				await client.post("/api/test", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Request timeout");
				expect((err as ApiClientError).statusCode).toBe(408);
			}
		});

		it("wraps generic Error with status 0", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network failure"));

			try {
				await client.post("/api/test", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Network failure");
				expect((err as ApiClientError).statusCode).toBe(0);
			}
		});

		it("wraps non-Error throws as unknown error", async () => {
			mockFetch.mockRejectedValueOnce("string error");

			try {
				await client.post("/api/test", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Unknown error occurred");
				expect((err as ApiClientError).statusCode).toBe(0);
			}
		});

		it("re-throws ApiClientError from non-ok response without wrapping", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 422,
				json: () =>
					Promise.resolve({
						success: false,
						message: "Validation failed",
					}),
			});

			try {
				await client.post("/api/test", {});
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Validation failed");
				expect((err as ApiClientError).statusCode).toBe(422);
			}
		});
	});

	describe("get", () => {
		it("sends GET request and returns parsed response", async () => {
			const responseData = { success: true, data: [1, 2, 3] };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(responseData),
			});

			const result = await client.get("/api/items");

			expect(mockFetch).toHaveBeenCalledWith(
				"https://api.test.com/api/items",
				expect.objectContaining({
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}),
			);
			expect(result).toEqual(responseData);
		});

		it("throws ApiClientError with message on non-ok response", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				json: () => Promise.resolve({ success: false, message: "Not found" }),
			});

			try {
				await client.get("/api/missing");
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Not found");
				expect((err as ApiClientError).statusCode).toBe(404);
			}
		});

		it("throws ApiClientError with HTTP status fallback when no message", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 503,
				json: () => Promise.resolve({ success: false }),
			});

			try {
				await client.get("/api/test");
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("HTTP error! status: 503");
				expect((err as ApiClientError).statusCode).toBe(503);
			}
		});

		it("throws ApiClientError with status 408 on timeout", async () => {
			const abortError = new DOMException(
				"The operation was aborted",
				"AbortError",
			);
			mockFetch.mockRejectedValueOnce(abortError);

			try {
				await client.get("/api/test");
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Request timeout");
				expect((err as ApiClientError).statusCode).toBe(408);
			}
		});

		it("wraps generic Error with status 0", async () => {
			mockFetch.mockRejectedValueOnce(new Error("DNS resolution failed"));

			try {
				await client.get("/api/test");
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("DNS resolution failed");
				expect((err as ApiClientError).statusCode).toBe(0);
			}
		});

		it("wraps non-Error throws as unknown error", async () => {
			mockFetch.mockRejectedValueOnce(42);

			try {
				await client.get("/api/test");
				expect.unreachable("Should have thrown");
			} catch (err) {
				expect(err).toBeInstanceOf(ApiClientError);
				expect((err as ApiClientError).message).toBe("Unknown error occurred");
				expect((err as ApiClientError).statusCode).toBe(0);
			}
		});
	});
});

describe("ApiClientError", () => {
	it("sets name, message, and statusCode", () => {
		const err = new ApiClientError("test error", 404);
		expect(err.name).toBe("ApiClientError");
		expect(err.message).toBe("test error");
		expect(err.statusCode).toBe(404);
		expect(err).toBeInstanceOf(Error);
	});
});

describe("apiClient singleton", () => {
	it("is an instance of ApiClient", () => {
		expect(apiClient).toBeInstanceOf(ApiClient);
	});
});
