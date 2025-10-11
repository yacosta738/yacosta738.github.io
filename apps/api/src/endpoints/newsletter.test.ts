import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppContext } from "../types";
import { Newsletter } from "./newsletter";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof global.fetch;

describe("Newsletter Endpoint", () => {
	let newsletter: Newsletter;
	let mockContext: Partial<AppContext> & Record<string, unknown>;

	type GetValidatedDataSpy = () => Promise<unknown>;
	type JSONResponse = { data: unknown; status: number };

	beforeEach(() => {
		vi.clearAllMocks();
		// Create instance with schema - avoid constructor args
		newsletter = Object.assign(Object.create(Newsletter.prototype), {
			schema: Newsletter.prototype.schema,
		}) as Newsletter;

		// Mock context with environment variables
		mockContext = {
			env: {
				WEBHOOK_AUTH_TOKEN: "test-auth-token",
				WEBHOOK_FORM_TOKEN_ID: "test-form-token-id",
				NEWSLETTER_WEBHOOK_URL: "https://test-webhook.com/newsletter",
				// include contact webhook to satisfy Env
				CONTACT_WEBHOOK_URL: "https://test-webhook.com/contact",
			},
			req: { valid: vi.fn() } as unknown as AppContext["req"],
			json: ((data: unknown, status = 200) => ({
				data,
				status,
			})) as unknown as AppContext["json"],
		};
	});

	describe("Schema Validation", () => {
		it("should have correct schema structure", () => {
			// Create a new instance to access the schema
			const newsletterInstance = new Newsletter({} as any);
			expect(newsletterInstance.schema.tags).toEqual(["Newsletter"]);
			expect(newsletterInstance.schema.summary).toBe("Subscribe to Newsletter");
			expect(newsletterInstance.schema.request.body).toBeDefined();
			expect(newsletterInstance.schema.responses["200"]).toBeDefined();
			expect(newsletterInstance.schema.responses["400"]).toBeDefined();
			expect(newsletterInstance.schema.responses["500"]).toBeDefined();
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
			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			expect((response as unknown as JSONResponse).data).toEqual({
				success: true,
				message: "Subscription successful",
			});
			expect((response as unknown as JSONResponse).status).toBe(200);
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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(spamData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const r = response as unknown as JSONResponse;

			expect(r.data).toEqual({
				success: true,
				message: "Subscription received",
			});
			expect(r.status).toBe(200);
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

				vi.spyOn(
					newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
					"getValidatedData",
				).mockResolvedValueOnce(validData as unknown);

				const response = await newsletter.handle(
					mockContext as unknown as AppContext,
				);

				const rr = response as unknown as JSONResponse;

				expect((rr.data as unknown as Record<string, unknown>).success).toBe(
					true,
				);
				expect(rr.status).toBe(200);
			}
		});
	});

	describe("Error Handling", () => {
		it("should handle missing environment variables", async () => {
			const invalidContext = {
				...(mockContext as Record<string, unknown>),
				env: {},
			};

			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				invalidContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Server configuration error",
			});
			expect(rr.status).toBe(500);
		});

		it("should handle partial missing environment variables", async () => {
			const invalidContext = {
				...(mockContext as Record<string, unknown>),
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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				invalidContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Server configuration error",
			});
			expect(rr.status).toBe(500);
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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Failed to subscribe",
			});
			expect(rr.status).toBe(500);
		});

		it("should handle network errors", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(rr.status).toBe(500);
		});

		it("should handle validation errors", async () => {
			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockRejectedValueOnce(new Error("Validation error"));

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(rr.status).toBe(500);
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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			await newsletter.handle(mockContext as unknown as AppContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body as string);

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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(dataWithHoneypot as unknown);

			await newsletter.handle(mockContext as unknown as AppContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body as string);

			expect(
				(requestBody as unknown as Record<string, unknown>)._gotcha,
			).toBeUndefined();
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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			await newsletter.handle(mockContext as unknown as AppContext);

			const fetchCall = mockFetch.mock.calls[0];
			const headers = fetchCall[1].headers as Record<string, string>;

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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			await newsletter.handle(mockContext as unknown as AppContext);

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

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect((rr.data as unknown as Record<string, unknown>).success).toBe(
				true,
			);
			expect(mockFetch).toHaveBeenCalled();
		});

		it("should handle webhook timeout", async () => {
			const validData = {
				body: {
					email: "test@example.com",
				},
			};

			mockFetch.mockRejectedValueOnce(new Error("Request timeout"));

			vi.spyOn(
				newsletter as unknown as { getValidatedData: GetValidatedDataSpy },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await newsletter.handle(
				mockContext as unknown as AppContext,
			);

			const rr = response as unknown as JSONResponse;

			expect(rr.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(rr.status).toBe(500);
		});
	});
});
