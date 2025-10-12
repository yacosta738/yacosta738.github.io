/**
 * Contact Form Handler
 * Handles contact form submissions as a plain Hono handler
 */

import type { Context } from "hono";
import { verifyHCaptcha } from "../utils/hcaptcha";

interface Env {
	HCAPTCHA_SECRET_KEY: string;
	WEBHOOK_AUTH_TOKEN: string;
	WEBHOOK_FORM_TOKEN_ID: string;
	CONTACT_WEBHOOK_URL: string;
}

export async function handleContactSubmission(c: Context<{ Bindings: Env }>) {
	try {
		// Get data from request body
		const body = await c.req.json();
		const { name, email, subject, message, hcaptchaToken, _gotcha } = body;

		// Basic validation
		if (!name || !email || !subject || !message || !hcaptchaToken) {
			return c.json(
				{
					success: false,
					message: "All fields are required",
				},
				400,
			);
		}

		// Get environment variables
		const authToken = c.env.WEBHOOK_AUTH_TOKEN;
		const formTokenId = c.env.WEBHOOK_FORM_TOKEN_ID;
		const contactUrl = c.env.CONTACT_WEBHOOK_URL;
		const hcaptchaSecret = c.env.HCAPTCHA_SECRET_KEY;

		// Validate that environment variables are configured
		if (!authToken || !formTokenId || !contactUrl || !hcaptchaSecret) {
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
			return c.json({ success: true, message: "Message received" }, 200);
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
		const payload = { name, email, subject, message };

		// Make the request to n8n
		const response = await fetch(contactUrl, {
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
			return c.json({ success: false, message: "Failed to send message" }, 500);
		}

		return c.json({ success: true, message: "Message sent successfully" }, 200);
	} catch (error) {
		console.error("Error in contact endpoint:", error);
		return c.json({ success: false, message: "Internal server error" }, 500);
	}
}
