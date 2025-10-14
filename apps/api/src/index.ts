import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { handleContactSubmission } from "./endpoints/contact-handler";
import { handleNewsletterSubscription } from "./endpoints/newsletter-handler";

// --- Zod Schemas for OpenAPI ---
// Note: Using z.string().email() as z.email() is not yet available in Zod v4.1.12
// The deprecation warning is for future migration when Zod releases standalone z.email()
const ContactSchema = z.object({
	name: z.string().openapi({ example: "John Doe" }),
	email: z.string().email().openapi({ example: "john.doe@example.com" }),
	subject: z.string().openapi({ example: "Regarding your services" }),
	message: z.string().openapi({ example: "I would like to inquire about..." }),
	hcaptchaToken: z.string().openapi({ description: "hCaptcha client token" }),
	_gotcha: z.string().optional().openapi({ description: "Honeypot field" }),
});

const NewsletterSchema = z.object({
	email: z.string().email().openapi({ example: "jane.doe@example.com" }),
	hcaptchaToken: z.string().openapi({ description: "hCaptcha client token" }),
	_gotcha: z.string().optional().openapi({ description: "Honeypot field" }),
});

const SuccessResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string(),
});

const ErrorResponseSchema = z.object({
	success: z.boolean().openapi({ example: false }),
	message: z.string(),
});

// --- Route Definitions for OpenAPI ---
const contactRoute = createRoute({
	method: "post",
	path: "/api/contact",
	request: {
		body: {
			content: {
				"application/json": {
					schema: ContactSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Successful response",
			content: { "application/json": { schema: SuccessResponseSchema } },
		},
		400: {
			description: "Bad request (validation error)",
			content: { "application/json": { schema: ErrorResponseSchema } },
		},
		500: {
			description: "Server error",
			content: { "application/json": { schema: ErrorResponseSchema } },
		},
	},
});

const newsletterRoute = createRoute({
	method: "post",
	path: "/api/newsletter",
	request: {
		body: {
			content: {
				"application/json": {
					schema: NewsletterSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Successful response",
			content: { "application/json": { schema: SuccessResponseSchema } },
		},
		400: {
			description: "Bad request (validation error)",
			content: { "application/json": { schema: ErrorResponseSchema } },
		},
		500: {
			description: "Server error",
			content: { "application/json": { schema: ErrorResponseSchema } },
		},
	},
});

// --- Hono App Initialization ---
const app = new OpenAPIHono<{ Bindings: Env }>();

// --- CORS Middleware ---
// Use an allowlist driven by the `ALLOWED_ORIGINS` environment variable.
// The value should be a comma-separated list of origins (for example:
// "https://example.com,https://app.example.com"). In local/test environments
// set it to the specific origins you need. Never use "*" in production.

/**
 * Parse allowed origins from environment variable
 * @param env - Environment object with string key-value pairs
 * @returns Array of allowed origin strings
 */
const parseAllowedOrigins = (
	env?: Record<string, string | undefined>,
): string[] => {
	const raw = env?.ALLOWED_ORIGINS;
	if (!raw) return [];
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
};

/**
 * CORS middleware with allowlist validation
 * Uses c.env.ALLOWED_ORIGINS from Cloudflare Workers environment
 */
app.use("/*", async (c, next) => {
	const requestOrigin = c.req.header("origin");

	// Parse allowed origins from the Worker's environment bindings
	const allowedOrigins = parseAllowedOrigins({
		ALLOWED_ORIGINS: c.env.ALLOWED_ORIGINS,
	});

	// If no origin header, proceed without CORS headers (same-origin request)
	if (!requestOrigin) {
		return await next();
	}

	// If empty allowlist, log warning and deny CORS
	if (allowedOrigins.length === 0) {
		console.warn("ALLOWED_ORIGINS is not configured. Denying CORS request.");
		if (c.req.method === "OPTIONS") {
			return new Response("CORS not configured", { status: 403 });
		}
		return await next();
	}

	const originAllowed = allowedOrigins.includes(requestOrigin);

	// Reject disallowed origins
	if (!originAllowed) {
		console.warn(`CORS denied for origin: ${requestOrigin}`);
		if (c.req.method === "OPTIONS") {
			return new Response("CORS origin denied", { status: 403 });
		}
		// Continue without CORS headers - browser will block cross-origin access
		return await next();
	}

	// Set CORS headers for allowed origins
	c.header("Access-Control-Allow-Origin", requestOrigin);
	c.header("Vary", "Origin");
	c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	c.header(
		"Access-Control-Allow-Headers",
		"Content-Type, YAP-AUTH-TOKEN, form-token-id",
	);
	c.header("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours

	// Handle preflight requests
	if (c.req.method === "OPTIONS") {
		return c.body(null, 204);
	}

	return await next();
});

// --- OpenAPI Route Registration ---
app.openapi(contactRoute, handleContactSubmission);
app.openapi(newsletterRoute, handleNewsletterSubscription);

// --- OpenAPI Documentation Endpoints ---
// The Swagger UI endpoint
app.get(
	"/",
	swaggerUI({
		url: "/doc",
	}),
);

// The OpenAPI specification endpoint
app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "YAP API",
		description: "API for the portfolio website of Yuniel Acosta.",
	},
});

export default app;
