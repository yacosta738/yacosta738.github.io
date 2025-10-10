// This is a serverless function that acts as a secure proxy for the contact form webhook.
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
		const contactUrl = process.env.CONTACT_WEBHOOK_URL;

		// Validate that environment variables are configured
		if (!authToken || !formTokenId || !contactUrl) {
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
			name: string;
			email: string;
			subject: string;
			message: string;
			_gotcha?: string;
		};

		// Honeypot check - if _gotcha has a value, it's a bot
		if (body._gotcha) {
			console.warn("Honeypot triggered - potential spam detected");
			return new Response(
				JSON.stringify({ success: true, message: "Message received" }),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			);
		}

		// Basic validation
		const { name, email, subject, message } = body;
		if (!name || !email || !subject || !message) {
			return new Response(
				JSON.stringify({ success: false, message: "All fields are required" }),
				{ status: 400, headers: { "Content-Type": "application/json" } },
			);
		}

		// Secure email validation (ReDoS safe)
		if (typeof email !== "string" || email.length > 254) {
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
			return new Response(
				JSON.stringify({ success: false, message: "Failed to send message" }),
				{ status: 500, headers: { "Content-Type": "application/json" } },
			);
		}

		return new Response(
			JSON.stringify({ success: true, message: "Message sent successfully" }),
			{ status: 200, headers: { "Content-Type": "application/json" } },
		);
	} catch (error) {
		console.error("Error in contact function:", error);
		return new Response(
			JSON.stringify({ success: false, message: "Internal server error" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
