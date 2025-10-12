import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { handleContactSubmission } from "./endpoints/contact-handler";
import { handleNewsletterSubscription } from "./endpoints/newsletter-handler";

// --- Zod Schemas for OpenAPI ---
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
app.use(
	"/*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "YAP-AUTH-TOKEN", "form-token-id"],
	}),
);

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
