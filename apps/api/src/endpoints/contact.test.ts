import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppContext } from "../types";
import { Contact } from "./contact";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof global.fetch;

type MockContext = Partial<AppContext> & Record<string, unknown>;
type JSONResponse = { data: unknown; status: number };

describe("Contact Endpoint", () => {
	let contact: Contact;
	let mockContext: MockContext;

	beforeEach(() => {
		vi.clearAllMocks();
		// Create instance with minimal initialization - schema is accessed via prototype
		contact = Object.assign(Object.create(Contact.prototype), {
			schema: Contact.prototype.schema,
		}) as Contact;

		mockContext = {
			env: {
				WEBHOOK_AUTH_TOKEN: "test-auth-token",
				WEBHOOK_FORM_TOKEN_ID: "test-form-token-id",
				CONTACT_WEBHOOK_URL: "https://test-webhook.com/contact",
				// include other env keys to satisfy Env type
				NEWSLETTER_WEBHOOK_URL: "https://test-webhook.com/newsletter",
			},
			req: { valid: vi.fn() } as unknown as AppContext["req"],
			json: ((data: unknown, status = 200) => ({
				data,
				status,
			})) as unknown as AppContext["json"],
		};
	});

	describe("Schema Validation", () => {
		it("should have correct schema structure", () => {
			// Create a new instance to access the schema
			const contactInstance = new Contact({} as any);
			expect(contactInstance.schema.tags).toEqual(["Contact"]);
			expect(contactInstance.schema.summary).toBe("Send Contact Message");
			expect(contactInstance.schema.request.body).toBeDefined();
			expect(contactInstance.schema.responses["200"]).toBeDefined();
			expect(contactInstance.schema.responses["400"]).toBeDefined();
			expect(contactInstance.schema.responses["500"]).toBeDefined();
		});
	});

	describe("Successful Submissions", () => {
		it("should successfully send a contact message", async () => {
			const validData = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message content",
				},
			};

			// Mock successful webhook response
			mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

			// Mock getValidatedData
			vi.spyOn(
				contact as unknown as { getValidatedData: () => Promise<unknown> },
				"getValidatedData",
			).mockResolvedValueOnce(validData as unknown);

			const response = await contact.handle(
				mockContext as unknown as AppContext,
			);

			const jsonResp = response as unknown as JSONResponse;

			expect(jsonResp.data).toEqual({
				success: true,
				message: "Message sent successfully",
			});
			expect(jsonResp.status).toBe(200);
			expect(mockFetch).toHaveBeenCalledWith(
				"https://test-webhook.com/contact",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"YAP-AUTH-TOKEN": "test-auth-token",
						"form-token-id": "test-form-token-id",
					},
					body: JSON.stringify({
						name: "John Doe",
						email: "john@example.com",
						subject: "Test Subject",
						message: "Test message content",
					}),
				},
			);
		});

		it("should handle honeypot gracefully", async () => {
			const spamData = {
				body: {
					name: "Bot Name",
					email: "bot@example.com",
					subject: "Spam Subject",
					message: "Spam message",
					_gotcha: "bot-filled-this",
				},
			};

			vi.spyOn(
				contact as unknown as { getValidatedData: () => Promise<unknown> },
				"getValidatedData",
			).mockResolvedValueOnce(spamData as unknown);

			const response = await contact.handle(
				mockContext as unknown as AppContext,
			);

			const jsonResp2 = response as unknown as JSONResponse;

			expect(jsonResp2.data).toEqual({
				success: true,
				message: "Message received",
			});
			expect(jsonResp2.status).toBe(200);
			expect(mockFetch).not.toHaveBeenCalled();
		});
	});
});
