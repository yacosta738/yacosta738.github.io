import {
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
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

describe("Newsletter Endpoint", () => {
	let ctx: ExecutionContext;

	beforeEach(() => {
		vi.resetAllMocks();
		ctx = createExecutionContext();
		// Mock hCaptcha to always succeed
		vi.spyOn(hcaptcha, "verifyHCaptcha").mockResolvedValue({
			success: true,
			message: "Captcha verified",
		});
	});

	describe("Successful Subscriptions", () => {
		it("should successfully subscribe an email", async () => {
			// Mock successful webhook response
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify({ success: true }), { status: 200 }),
			);

			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: true,
				message: "Subscription successful",
			});

			// Verify webhook call
			expect(mockFetch).toHaveBeenCalledWith(
				mockEnv.NEWSLETTER_WEBHOOK_URL,
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({ email: "test@example.com" }),
				}),
			);
		});

		it("should handle honeypot gracefully", async () => {
			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "bot@example.com",
					hcaptchaToken: "test-token",
					_gotcha: "bot-filled-this",
				}),
			});

			const response = await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(200);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: true,
				message: "Subscription received",
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

			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					hcaptchaToken: "invalid-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

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
				new Response(
					JSON.stringify({ success: false, message: "Failed to subscribe" }),
					{ status: 500 },
				),
			);

			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: false,
				message: "Failed to subscribe",
			});
		});

		it("should return 500 if env vars are missing", async () => {
			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					hcaptchaToken: "test-token",
				}),
			});

			// Run with an empty env object
			const response = await app.fetch(request, {}, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(500);
			const jsonResponse = await response.json();
			expect(jsonResponse).toEqual({
				success: false,
				message: "Server configuration error",
			});
		});
	});

	describe("Validation", () => {
		it("should return 400 for an invalid email", async () => {
			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "not-an-email",
					hcaptchaToken: "test-token",
				}),
			});

			const response = await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

			// The zod-openapi middleware returns a 400 with validation errors
			expect(response.status).toBe(400);
		});

		it("should not include honeypot field in webhook payload", async () => {
			// Mock successful webhook response
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify({ success: true }), { status: 200 }),
			);

			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					hcaptchaToken: "test-token",
					_gotcha: "", // Empty but present
				}),
			});

			await app.fetch(request, mockEnv, ctx);
			await waitOnExecutionContext(ctx);

			expect(mockFetch).toHaveBeenCalled();
			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body as string);

			expect(requestBody).not.toHaveProperty("_gotcha");
			expect(requestBody).toEqual({ email: "test@example.com" });
		});
	});
});
