import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { zodToOpenAPI } from "zod-to-openapi";
import type { AppContext } from "../types";
import { verifyHCaptcha } from "../utils/hcaptcha";

export class Newsletter extends OpenAPIRoute {
	schema = {
		tags: ["Newsletter"],
		summary: "Subscribe to Newsletter",
		request: {
			body: {
				content: {
					"application/json": {
						schema: zodToOpenAPI(
							z.object({
								email: z.string().email().max(254),
								hcaptchaToken: z.string().min(1),
								_gotcha: z.string().optional(),
							}),
						),
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Subscription successful",
				content: {
					"application/json": {
						schema: zodToOpenAPI(
							z.object({
								success: z.boolean(),
								message: z.string(),
							}),
						),
					},
				},
			},
			"400": {
				description: "Invalid request",
				content: {
					"application/json": {
						schema: zodToOpenAPI(
							z.object({
								success: z.boolean(),
								message: z.string(),
							}),
						),
					},
				},
			},
			"500": {
				description: "Internal server error",
				content: {
					"application/json": {
						schema: zodToOpenAPI(
							z.object({
								success: z.boolean(),
								message: z.string(),
							}),
						),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		try {
			// Validate data before destructuring
			const schema =
				this.schema.request.body.content["application/json"].schema;
			const data = await this.getValidatedData<typeof schema>();

			if (!data?.body) {
				return c.json({ success: false, message: "Invalid request body" }, 400);
			}

			const { email, hcaptchaToken, _gotcha } = data.body;

			// Get environment variables
			const authToken = c.env.WEBHOOK_AUTH_TOKEN;
			const formTokenId = c.env.WEBHOOK_FORM_TOKEN_ID;
			const newsletterUrl = c.env.NEWSLETTER_WEBHOOK_URL;
			const hcaptchaSecret = c.env.HCAPTCHA_SECRET_KEY;

			// Validate that environment variables are configured
			if (!authToken || !formTokenId || !newsletterUrl) {
				console.error("Missing webhook configuration in environment variables");
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
				return c.json(
					{
						success: false,
						message: "Failed to subscribe",
					},
					500,
				);
			}

			return c.json({ success: true, message: "Subscription successful" }, 200);
		} catch (error) {
			console.error("Unexpected error in newsletter endpoint:", error);
			return c.json(
				{
					success: false,
					message: "Unexpected server error",
				},
				500,
			);
		}
	}
}
