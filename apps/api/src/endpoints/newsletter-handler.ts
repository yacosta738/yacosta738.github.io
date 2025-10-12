/**
 * Newsletter Subscription Handler
 * Handles newsletter subscriptions as a plain Hono handler
 */

import type { Context } from "hono";
import { verifyHCaptcha } from "../utils/hcaptcha";

interface Env {
	HCAPTCHA_SECRET_KEY: string;
	WEBHOOK_AUTH_TOKEN: string;
	WEBHOOK_FORM_TOKEN_ID: string;
	NEWSLETTER_WEBHOOK_URL: string;
}

export async function handleNewsletterSubscription(
	c: Context<{ Bindings: Env }>,
) {
	try {
		// Get data from request body
		const body = await c.req.json();
		const { email, hcaptchaToken, _gotcha } = body;

		// Basic validation
		if (!email || !hcaptchaToken) {
			return c.json(
				{
					success: false,
					message: "Email and captcha token are required",
				},
				400,
			);
		}

		// Get environment variables
		const authToken = c.env.WEBHOOK_AUTH_TOKEN;
		const formTokenId = c.env.WEBHOOK_FORM_TOKEN_ID;
		const newsletterUrl = c.env.NEWSLETTER_WEBHOOK_URL;
		const hcaptchaSecret = c.env.HCAPTCHA_SECRET_KEY;

		// Validate that environment variables are configured
		if (!authToken || !formTokenId || !newsletterUrl || !hcaptchaSecret) {
			console.error(
				"Missing webhook or hCaptcha configuration in environment variables",
			);
			return c.json(
				{
					success: false,
					message: "Server configuration error",
				},
				500,
			);
		}

		// Honeypot check
		if (_gotcha) {
			console.warn("Honeypot triggered - potential spam detected");
			return c.json({ success: true, message: "Subscription received" }, 200);
		}

		// Verify hCaptcha token
		const captchaResult = await verifyHCaptcha(
			hcaptchaToken,
			hcaptchaSecret,
			c.req.header("CF-Connecting-IP"), // Cloudflare provides the real IP here
		);

		if (!captchaResult.success) {
			console.warn("hCaptcha verification failed:", captchaResult.message);
			return c.json(
				{
					success: false,
					message: "Please complete the captcha verification",
				},
				400,
			);
		}

		// Prepare the payload for n8n
		const payload = { email };

		// Make the request to n8n
		const response = await fetch(newsletterUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"YAP-AUTH-TOKEN": authToken,
				"form-token-id": formTokenId,
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			console.error(`Webhook request failed with status: ${response.status}`);
			return c.json({ success: false, message: "Failed to subscribe" }, 500);
		}

		return c.json({ success: true, message: "Subscription successful" }, 200);
	} catch (error) {
		console.error("Error in newsletter endpoint:", error);
		return c.json({ success: false, message: "Internal server error" }, 500);
	}
}
