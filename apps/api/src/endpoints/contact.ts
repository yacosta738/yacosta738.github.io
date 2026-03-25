import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import type { AppContext } from "../types";
import { verifyHCaptcha } from "../utils/hcaptcha";

export class Contact extends OpenAPIRoute {
	schema = {
		tags: ["Contact"],
		summary: "Send Contact Message",
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({
							name: z.string().min(1),
							email: z.email().max(254),
							subject: z.string().min(1),
							message: z.string().min(1),
							hcaptchaToken: z.string().min(1),
							_gotcha: z.string().optional(),
						}),
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Message sent successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
						}),
					},
				},
			},
			"400": {
				description: "Invalid request",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
						}),
					},
				},
			},
			"500": {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		try {
			// Get validated data
			const data = await this.getValidatedData<typeof this.schema>();
			const { name, email, subject, message, hcaptchaToken, _gotcha } =
				data.body;

			// Get environment variables
			const authToken = c.env.WEBHOOK_AUTH_TOKEN;
			const formTokenId = c.env.WEBHOOK_FORM_TOKEN_ID;
			const contactUrl = c.env.CONTACT_WEBHOOK_URL;
			const hcaptchaSecret = c.env.HCAPTCHA_SECRET_KEY;

			// Validate that environment variables are configured
			if (!authToken || !formTokenId || !contactUrl) {
				console.error("Missing webhook configuration in environment variables");
				return c.json(
					{
						success: false,
						message: "Server configuration error",
					},
					500,
				);
			}

			// Honeypot check - if _gotcha has a value, it's a bot
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

			// Make the request to n8n with authentication headers
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
				return c.json(
					{ success: false, message: "Failed to send message" },
					500,
				);
			}

			return c.json(
				{ success: true, message: "Message sent successfully" },
				200,
			);
		} catch (error) {
			console.error("Error in contact endpoint:", error);
			return c.json({ success: false, message: "Internal server error" }, 500);
		}
	}
}
