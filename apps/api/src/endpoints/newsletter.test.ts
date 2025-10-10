import { describe, expect, it, vi, beforeEach } from "vitest";
import { Newsletter } from "./newsletter";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Newsletter Endpoint", () => {
	let newsletter: Newsletter;
	let mockContext: any;

	beforeEach(() => {
		vi.clearAllMocks();
		newsletter = new Newsletter();

		// Mock context with environment variables
		mockContext = {
			env: {
				WEBHOOK_AUTH_TOKEN: "test-auth-token",
				WEBHOOK_FORM_TOKEN_ID: "test-form-token-id",
				NEWSLETTER_WEBHOOK_URL: "https://test-webhook.com/newsletter",
			},
			req: {
				valid: vi.fn(),
			},
			json: vi.fn((data, status) => ({
				data,
				status,
			})),
		};
	});

	describe("Schema Validation", () => {
		it("should have correct schema structure", () => {
			expect(newsletter.schema.tags).toEqual(["Newsletter"]);
			expect(newsletter.schema.summary).toBe("Subscribe to Newsletter");
			expect(newsletter.schema.request.body).toBeDefined();
			expect(newsletter.schema.responses["200"]).toBeDefined();
			expect(newsletter.schema.responses["400"]).toBeDefined();
			expect(newsletter.schema.responses["500"]).toBeDefined();
		});
	});

	describe("Successful Subscriptions", () => {
		it("should successfully subscribe an email", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			// Mock successful webhook response
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			// Mock getValidatedData
			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: true,
				message: "Subscription successful",
			});
			expect(response.status).toBe(200);
			expect(mockFetch).toHaveBeenCalledWith(
				"https://test-webhook.com/newsletter",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"YAP-AUTH-TOKEN": "test-auth-token",
						"form-token-id": "test-form-token-id",
					},
					body: JSON.stringify({
						email: "test@example.com",
					}),
				},
			);
		});

		it("should handle honeypot gracefully", async () => {
			const spamData = {
				body: {
					email: "bot@example.com",
					_gotcha: "bot-filled-this",
				},
			};

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(spamData);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: true,
				message: "Subscription received",
			});
			expect(response.status).toBe(200);
			expect(mockFetch).not.toHaveBeenCalled();
		});

		it("should accept various valid email formats", async () => {
			const validEmails = [
				"simple@example.com",
				"user+tag@example.co.uk",
				"user.name@example.com",
				"user_name@example-domain.com",
			];

			for (const email of validEmails) {
				vi.clearAllMocks();

				const validData = {
					body: { email },
				};

				mockFetch.mockResolvedValueOnce({
					ok: true,
					status: 200,
				});

				vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(
					validData,
				);

				const response = await newsletter.handle(mockContext);

				expect(response.data.success).toBe(true);
				expect(response.status).toBe(200);
			}
		});
	});

	describe("Error Handling", () => {
		it("should handle missing environment variables", async () => {
			const invalidContext = {
				...mockContext,
				env: {},
			};

			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(invalidContext);

			expect(response.data).toEqual({
				success: false,
				message: "Server configuration error",
			});
			expect(response.status).toBe(500);
		});

		it("should handle partial missing environment variables", async () => {
			const invalidContext = {
				...mockContext,
				env: {
					WEBHOOK_AUTH_TOKEN: "test-token",
					// Missing WEBHOOK_FORM_TOKEN_ID and NEWSLETTER_WEBHOOK_URL
				},
			};

			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(invalidContext);

			expect(response.data).toEqual({
				success: false,
				message: "Server configuration error",
			});
			expect(response.status).toBe(500);
		});

		it("should handle webhook failure", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Failed to subscribe",
			});
			expect(response.status).toBe(500);
		});

		it("should handle network errors", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(response.status).toBe(500);
		});

		it("should handle validation errors", async () => {
			vi.spyOn(newsletter, "getValidatedData").mockRejectedValueOnce(
				new Error("Validation error"),
			);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(response.status).toBe(500);
		});
	});

	describe("Data Validation", () => {
		it("should only pass email to webhook", async () => {
			const validData = {
				body: {
					email: "subscriber@example.com",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			await newsletter.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body);

			expect(requestBody).toEqual({
				email: "subscriber@example.com",
			});
			expect(Object.keys(requestBody)).toHaveLength(1);
		});

		it("should not include honeypot field in webhook payload", async () => {
			const dataWithHoneypot = {
				body: {
					email: "test@example.com",
					_gotcha: "",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(
				dataWithHoneypot,
			);

			await newsletter.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body);

			expect(requestBody._gotcha).toBeUndefined();
			expect(requestBody).toEqual({
				email: "test@example.com",
			});
		});
	});

	describe("Authentication Headers", () => {
		it("should include correct authentication headers", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			await newsletter.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const headers = fetchCall[1].headers;

			expect(headers["Content-Type"]).toBe("application/json");
			expect(headers["YAP-AUTH-TOKEN"]).toBe("test-auth-token");
			expect(headers["form-token-id"]).toBe("test-form-token-id");
		});

		it("should use correct webhook URL from environment", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			await newsletter.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			expect(fetchCall[0]).toBe("https://test-webhook.com/newsletter");
		});
	});

	describe("Edge Cases", () => {
		it("should handle empty honeypot field correctly", async () => {
			const validData = {
				body: {
					email: "test@example.com",
					_gotcha: "",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(mockContext);

			expect(response.data.success).toBe(true);
			expect(mockFetch).toHaveBeenCalled();
		});

		it("should handle webhook timeout", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockRejectedValueOnce(new Error("Request timeout"));

			vi.spyOn(newsletter, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await newsletter.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(response.status).toBe(500);
		});
	});
});
