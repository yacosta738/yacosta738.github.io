import { Hono } from "hono";
import { cors } from "hono/cors";
import { handleContactSubmission } from "./endpoints/contact-handler";
import { handleNewsletterSubscription } from "./endpoints/newsletter-handler";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// --- CORS middleware for development ---
app.use("/*", cors({
	origin: "*",
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowHeaders: ["Content-Type", "YAP-AUTH-TOKEN", "form-token-id"],
}));
// --- END CORS ---

// Register API routes
app.post("/api/contact", handleContactSubmission);
app.post("/api/newsletter", handleNewsletterSubscription);

// Root endpoint with API info
app.get("/", (c) => c.json({
	name: "YAP API",
	version: "1.0.0",
	endpoints: {
		contact: "/api/contact",
		newsletter: "/api/newsletter",
	},
}));

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
