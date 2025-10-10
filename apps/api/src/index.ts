import { fromHono } from "chanfana";
import { Hono } from "hono";
import { Contact } from "./endpoints/contact";
import { Newsletter } from "./endpoints/newsletter";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/api/contact", Contact);
openapi.post("/api/newsletter", Newsletter);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
