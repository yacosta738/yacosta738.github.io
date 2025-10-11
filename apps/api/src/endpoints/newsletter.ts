import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import type { AppContext } from "../types";

export class Newsletter extends OpenAPIRoute {
	schema = {
		tags: ["Newsletter"],
		summary: "Subscribe to Newsletter",
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({
							email: z.string().email().max(254),
							_gotcha: z.string().optional(),
						}),
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Subscription successful",
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
			// Get validated data (pass request context so validation runs)
			// Use a typed helper to avoid `any` lint complaints while the OpenAPIRoute
			// definition doesn't expose the context parameter in its signature.
			const getValidatedData = (
				this as unknown as {
					getValidatedData: (
						c: AppContext,
					) => Promise<{ body: { email: string; _gotcha?: string } }>;
				}
			).getValidatedData;
			const data = await getValidatedData(c);
			const { email, _gotcha } = data.body;

			// Get environment variables
			const authToken = c.env.WEBHOOK_AUTH_TOKEN;
			const formTokenId = c.env.WEBHOOK_FORM_TOKEN_ID;
			const newsletterUrl = c.env.NEWSLETTER_WEBHOOK_URL;

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
}
