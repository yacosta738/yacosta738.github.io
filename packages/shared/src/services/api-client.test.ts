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

/**
 * Helper: assert that a callback throws an ApiClientError with the expected
 * message and statusCode, eliminating repetitive try/catch blocks.
 */
const expectApiClientError = async (
	fn: () => Promise<unknown>,
	message: string,
	statusCode: number,
) => {
	try {
		await fn();
		expect.unreachable("Should have thrown");
	} catch (err) {
		expect(err).toBeInstanceOf(ApiClientError);
		expect((err as ApiClientError).message).toBe(message);
		expect((err as ApiClientError).statusCode).toBe(statusCode);
	}
};

/**
 * Helper: mock fetch to hang until the AbortSignal fires, simulating a real
 * timeout via the AbortController wiring in ApiClient.
 */
const mockFetchHangsUntilAbort = () => {
	mockFetch.mockImplementationOnce(
		(_url: string, options: { signal: AbortSignal }) =>
			new Promise((_resolve, reject) => {
				options.signal.addEventListener("abort", () => {
					reject(new DOMException("The operation was aborted", "AbortError"));
				});
			}),
	);
};

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
		it("uses provided baseUrl and timeout", async () => {
			const c = new ApiClient("https://custom.api", 3000);
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ success: true }),
			});
			// Verify custom baseUrl is used by exercising a request
			await c.post("/test", {});
			expect(mockFetch).toHaveBeenCalledWith(
				"https://custom.api/test",
				expect.objectContaining({ method: "POST" }),
			);
		});

		it("falls back to API_CONFIG defaults", async () => {
			const c = new ApiClient();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ success: true }),
			});
			await c.post("/endpoint", {});
			// Should use default API_CONFIG.baseUrl
			const calledUrl = mockFetch.mock.calls[0]?.[0] as string;
			expect(calledUrl).toBe("https://api.test.com/endpoint");
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

			await expectApiClientError(
				() => client.post("/api/contact", {}),
				"Bad request",
				400,
			);
		});

		it("throws ApiClientError with HTTP status fallback when no message", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ success: false }),
			});

			await expectApiClientError(
				() => client.post("/api/test", {}),
				"HTTP error! status: 500",
				500,
			);
		});

		it("triggers real timeout via AbortController wiring", async () => {
			mockFetchHangsUntilAbort();

			const promise = client.post("/api/test", {});

			// Advance past the 5000ms timeout to trigger controller.abort()
			await vi.advanceTimersByTimeAsync(5001);

			await expectApiClientError(() => promise, "Request timeout", 408);
		});

		it("wraps generic Error with status 0", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network failure"));

			await expectApiClientError(
				() => client.post("/api/test", {}),
				"Network failure",
				0,
			);
		});

		it("wraps non-Error throws as unknown error", async () => {
			mockFetch.mockRejectedValueOnce("string error");

			await expectApiClientError(
				() => client.post("/api/test", {}),
				"Unknown error occurred",
				0,
			);
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

			await expectApiClientError(
				() => client.post("/api/test", {}),
				"Validation failed",
				422,
			);
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

			await expectApiClientError(
				() => client.get("/api/missing"),
				"Not found",
				404,
			);
		});

		it("throws ApiClientError with HTTP status fallback when no message", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 503,
				json: () => Promise.resolve({ success: false }),
			});

			await expectApiClientError(
				() => client.get("/api/test"),
				"HTTP error! status: 503",
				503,
			);
		});

		it("triggers real timeout via AbortController wiring", async () => {
			mockFetchHangsUntilAbort();

			const promise = client.get("/api/test");

			await vi.advanceTimersByTimeAsync(5001);

			await expectApiClientError(() => promise, "Request timeout", 408);
		});

		it("wraps generic Error with status 0", async () => {
			mockFetch.mockRejectedValueOnce(new Error("DNS resolution failed"));

			await expectApiClientError(
				() => client.get("/api/test"),
				"DNS resolution failed",
				0,
			);
		});

		it("wraps non-Error throws as unknown error", async () => {
			mockFetch.mockRejectedValueOnce(42);

			await expectApiClientError(
				() => client.get("/api/test"),
				"Unknown error occurred",
				0,
			);
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
