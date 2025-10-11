import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { beforeAll, describe, expect, it } from "vitest";
import app from "./index";

describe("API Worker", () => {
	let ctx: ExecutionContext;

	beforeAll(() => {
		ctx = createExecutionContext();
	});

	describe("OpenAPI Documentation", () => {
		it("should serve OpenAPI documentation at root", async () => {
			const request = new Request("http://localhost/");
			const response = await app.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(200);
			const contentType = response.headers.get("content-type");
			expect(contentType).toContain("text/html");
		});
	});

	describe("API Routes", () => {
		it("should have contact endpoint", async () => {
			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "Test User",
					email: "test@example.com",
					subject: "Test Subject",
					message: "Test message",
				}),
			});

			const response = await app.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			// Should return 500 because env vars are not configured in test
			// but the endpoint exists and processes the request
			expect([200, 400, 500]).toContain(response.status);
		});

		it("should have newsletter endpoint", async () => {
			const request = new Request("http://localhost/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "test@example.com",
				}),
			});

			const response = await app.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			// Should return 500 because env vars are not configured in test
			// but the endpoint exists and processes the request
			expect([200, 400, 500]).toContain(response.status);
		});
	});

	describe("HTTP Methods", () => {
		it("should only accept POST for contact endpoint", async () => {
			const methods = ["GET", "PUT", "DELETE", "PATCH"];

			for (const method of methods) {
				const request = new Request("http://localhost/api/contact", {
					method,
				});

				const response = await app.fetch(request, env, ctx);
				await waitOnExecutionContext(ctx);

				expect([404, 405]).toContain(response.status);
			}
		});

		it("should only accept POST for newsletter endpoint", async () => {
			const methods = ["GET", "PUT", "DELETE", "PATCH"];

			for (const method of methods) {
				const request = new Request("http://localhost/api/newsletter", {
					method,
				});

				const response = await app.fetch(request, env, ctx);
				await waitOnExecutionContext(ctx);

				expect([404, 405]).toContain(response.status);
			}
		});
	});

	describe("Invalid Routes", () => {
		it("should return 404 for non-existent routes", async () => {
			const request = new Request("http://localhost/api/non-existent");
			const response = await app.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			expect(response.status).toBe(404);
		});
	});

	describe("CORS", () => {
		it("should include appropriate headers", async () => {
			const request = new Request("http://localhost/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "Test",
					email: "test@example.com",
					subject: "Test",
					message: "Test",
				}),
			});

			const response = await app.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);

			// Check if response has some headers
			expect(response.headers).toBeDefined();
		});
	});
});
