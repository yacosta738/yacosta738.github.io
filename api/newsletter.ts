// This is a serverless function that acts as a secure proxy for the newsletter subscription form.
// It reads secrets from environment variables and forwards the request to the n8n webhook.

export default async function handler(request: Request) {
	// Handle CORS preflight requests
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": "*", // You might want to restrict this to your domain in production
				"Access-Control-Allow-Methods": "POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		});
	}

	// Only allow POST requests
	if (request.method !== "POST") {
		return new Response(
			JSON.stringify({ success: false, message: "Method not allowed" }),
			{ status: 405 },
		);
	}

	try {
		// Get environment variables
		const authToken = process.env.WEBHOOK_AUTH_TOKEN;
		const formTokenId = process.env.WEBHOOK_FORM_TOKEN_ID;
		const newsletterUrl = process.env.NEWSLETTER_WEBHOOK_URL;

		// Validate that environment variables are configured
		if (!authToken || !formTokenId || !newsletterUrl) {
			console.error("Missing webhook configuration in environment variables");
			return new Response(
				JSON.stringify({
					success: false,
					message: "Server configuration error",
				}),
				{ status: 500, headers: { "Content-Type": "application/json" } },
			);
		}

		// Parse the request body
		const body = (await request.json()) as {
			email: string;
			_gotcha?: string;
		};

		// Honeypot check
		if (body._gotcha) {
			console.warn("Honeypot triggered - potential spam detected");
			return new Response(
				JSON.stringify({ success: true, message: "Subscription received" }),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			);
		}

		// Basic validation
		const { email } = body;
		if (!email) {
			return new Response(
				JSON.stringify({ success: false, message: "Email is required" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		// Secure email validation (ReDoS safe)
		const maxEmailLength = 254;
		if (email.length > maxEmailLength) {
			return new Response(
				JSON.stringify({ success: false, message: "Invalid email address" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if (!emailRegex.test(email)) {
			return new Response(
				JSON.stringify({ success: false, message: "Invalid email address" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
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
			return new Response(
				JSON.stringify({ success: false, message: "Failed to subscribe" }),
				{ status: 500, headers: { "Content-Type": "application/json" } },
			);
		}

		return new Response(
			JSON.stringify({ success: true, message: "Subscription successful" }),
			{ status: 200, headers: { "Content-Type": "application/json" } },
		);
	} catch (error) {
		console.error("Error in newsletter function:", error);
		return new Response(
			JSON.stringify({ success: false, message: "Internal server error" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
