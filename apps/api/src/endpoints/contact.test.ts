// Removed cloudflare:test imports for Vitest-only environment
import { beforeEach, describe, expect, it, vi } from "vitest";
import app from "../index";
import * as hcaptcha from "../utils/hcaptcha";

// Mock the hCaptcha utility
vi.mock("../utils/hcaptcha");

// Mock fetch for the webhook call
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment object for tests
const mockEnv = {
	CONTACT_WEBHOOK_URL: "https://test-webhook.example.com/contact",
	NEWSLETTER_WEBHOOK_URL: "https://test-webhook.example.com/newsletter",
	WEBHOOK_AUTH_TOKEN: "test-auth-token",
	WEBHOOK_FORM_TOKEN_ID: "test-form-token-id",
	HCAPTCHA_SECRET_KEY: "test-hcaptcha-secret",
	HCAPTCHA_SITE_KEY: "test-hcaptcha-site-key",
	ALLOWED_ORIGINS: "http://localhost,https://example.com",
};

describe("Contact Endpoint", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		// Mock hCaptcha to always succeed
		vi.spyOn(hcaptcha, "verifyHCaptcha").mockResolvedValue({
			success: true,
			message: "Captcha verified",
		});
	});

	describe("Successful Submissions", () => {
		it("should successfully send a contact message", async () => {
			// Mock successful webhook response
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify({ success: true }), { status: 200 }),
			);

			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message content",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, undefined);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: true,
				message: "Message sent successfully",
			});

			// Verify webhook call
			expect(mockFetch).toHaveBeenCalledWith(
				mockEnv.CONTACT_WEBHOOK_URL,
				expect.objectContaining({
					method: "POST",
					headers: expect.objectContaining({
						"Content-Type": "application/json",
						"YAP-AUTH-TOKEN": mockEnv.WEBHOOK_AUTH_TOKEN,
						"form-token-id": mockEnv.WEBHOOK_FORM_TOKEN_ID,
					}),
					body: JSON.stringify({
						name: "John Doe",
						email: "john@example.com",
						subject: "Test Subject",
						message: "Test message content",
					}),
				}),
			);
		});

		it("should handle honeypot gracefully", async () => {
			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "Bot Name",
					email: "bot@example.com",
					subject: "Spam Subject",
					message: "Spam message",
					hcaptchaToken: "test-token",
					_gotcha: "bot-filled-this",
				}),
			});

			const response = await app.fetch(request, mockEnv, undefined);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: true,
				message: "Message received",
			});

			// Ensure webhook was not called
			expect(mockFetch).not.toHaveBeenCalled();
		});
	});

	describe("Error Handling", () => {
		it("should return 400 if hCaptcha verification fails", async () => {
			// Mock hCaptcha to fail
			vi.spyOn(hcaptcha, "verifyHCaptcha").mockResolvedValue({
				success: false,
				message: "Invalid token",
			});

			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message content",
					hcaptchaToken: "invalid-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, undefined);

			expect(response.status).toBe(400);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: false,
				message: "Please complete the captcha verification",
			});
		});

		it("should return 500 if webhook fails", async () => {
			// Mock failed webhook response
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify({ success: false }), { status: 500 }),
			);

			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message content",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, undefined);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: false,
				message: "Failed to send message",
			});
		});

		it("should return 500 if env vars are missing", async () => {
			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message content",
					hcaptchaToken: "test-token",
				}),
			});

			// Run with an empty env object
			const response = await app.fetch(request, {}, undefined);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: false,
				message: "Server configuration error",
			});
		});
	});

	describe("Validation", () => {
		it("should return 400 for missing fields", async () => {
			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "John Doe",
					// email is missing
					subject: "Test Subject",
					message: "Test message content",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, undefined);

			// The zod-openapi middleware returns a 400 with validation errors
			expect(response.status).toBe(400);
		});
	});
});
