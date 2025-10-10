import { describe, expect, it, vi, beforeEach } from "vitest";
import { Contact } from "./contact";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Contact Endpoint", () => {
	let contact: Contact;
	let mockContext: any;

	beforeEach(() => {
		vi.clearAllMocks();
		contact = new Contact();

		// Mock context with environment variables
		mockContext = {
			env: {
				WEBHOOK_AUTH_TOKEN: "test-auth-token",
				WEBHOOK_FORM_TOKEN_ID: "test-form-token-id",
				CONTACT_WEBHOOK_URL: "https://test-webhook.com/contact",
			},
			req: {
				valid: vi.fn(),
			},
			json: vi.fn((data, status) => ({
				data,
				status,
			})),
		};
	});

	describe("Schema Validation", () => {
		it("should have correct schema structure", () => {
			expect(contact.schema.tags).toEqual(["Contact"]);
			expect(contact.schema.summary).toBe("Send Contact Message");
			expect(contact.schema.request.body).toBeDefined();
			expect(contact.schema.responses["200"]).toBeDefined();
			expect(contact.schema.responses["400"]).toBeDefined();
			expect(contact.schema.responses["500"]).toBeDefined();
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
			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			// Mock getValidatedData
			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await contact.handle(mockContext);

			expect(response.data).toEqual({
				success: true,
				message: "Message sent successfully",
			});
			expect(response.status).toBe(200);
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

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(spamData);

			const response = await contact.handle(mockContext);

			expect(response.data).toEqual({
				success: true,
				message: "Message received",
			});
			expect(response.status).toBe(200);
			expect(mockFetch).not.toHaveBeenCalled();
		});
	});

	describe("Error Handling", () => {
		it("should handle missing environment variables", async () => {
			const invalidContext = {
				...mockContext,
				env: {},
			};

			const validData = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message",
				},
			};

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await contact.handle(invalidContext);

			expect(response.data).toEqual({
				success: false,
				message: "Server configuration error",
			});
			expect(response.status).toBe(500);
		});

		it("should handle webhook failure", async () => {
			const validData = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await contact.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Failed to send message",
			});
			expect(response.status).toBe(500);
		});

		it("should handle network errors", async () => {
			const validData = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test Subject",
					message: "Test message",
				},
			};

			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			const response = await contact.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(response.status).toBe(500);
		});

		it("should handle validation errors", async () => {
			vi.spyOn(contact, "getValidatedData").mockRejectedValueOnce(
				new Error("Validation error"),
			);

			const response = await contact.handle(mockContext);

			expect(response.data).toEqual({
				success: false,
				message: "Internal server error",
			});
			expect(response.status).toBe(500);
		});
	});

	describe("Data Validation", () => {
		it("should pass all required fields to webhook", async () => {
			const validData = {
				body: {
					name: "Jane Smith",
					email: "jane@example.com",
					subject: "Important Question",
					message: "This is a detailed message with important content.",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			await contact.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body);

			expect(requestBody).toEqual({
				name: "Jane Smith",
				email: "jane@example.com",
				subject: "Important Question",
				message: "This is a detailed message with important content.",
			});
		});

		it("should not include honeypot field in webhook payload", async () => {
			const dataWithHoneypot = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test",
					message: "Test message",
					_gotcha: "",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(
				dataWithHoneypot,
			);

			await contact.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const requestBody = JSON.parse(fetchCall[1].body);

			expect(requestBody._gotcha).toBeUndefined();
		});
	});

	describe("Authentication Headers", () => {
		it("should include correct authentication headers", async () => {
			const validData = {
				body: {
					name: "John Doe",
					email: "john@example.com",
					subject: "Test",
					message: "Test message",
				},
			};

			mockFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
			});

			vi.spyOn(contact, "getValidatedData").mockResolvedValueOnce(validData);

			await contact.handle(mockContext);

			const fetchCall = mockFetch.mock.calls[0];
			const headers = fetchCall[1].headers;

			expect(headers["Content-Type"]).toBe("application/json");
			expect(headers["YAP-AUTH-TOKEN"]).toBe("test-auth-token");
			expect(headers["form-token-id"]).toBe("test-form-token-id");
		});
	});
});
