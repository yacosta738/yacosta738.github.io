import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientError } from "./api-client";
import { ContactService, contactService } from "./contact.service";

// Mock dependencies
vi.mock("./api-client", async () => {
	class MockApiClientError extends Error {
		constructor(
			message: string,
			public statusCode: number,
		) {
			super(message);
			this.name = "ApiClientError";
		}
	}
	return {
		ApiClientError: MockApiClientError,
		apiClient: {
			post: vi.fn(),
		},
	};
});

vi.mock("./api-config", () => ({
	API_CONFIG: {
		baseUrl: "https://api.test.com",
		timeout: 5000,
		endpoints: { contact: "/api/contact", newsletter: "/api/newsletter" },
	},
}));

vi.mock("./email-validation", () => ({
	isValidEmailAddress: vi.fn((email: string) => {
		return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
	}),
}));

// Get mocked apiClient
import { apiClient } from "./api-client";

const mockPost = vi.mocked(apiClient.post);

describe("ContactService", () => {
	let service: ContactService;

	const validData = {
		name: "John Doe",
		email: "john@example.com",
		subject: "Hello",
		message: "This is a test message with enough chars",
		hcaptchaToken: "token123",
	};

	beforeEach(() => {
		service = new ContactService();
		mockPost.mockReset();
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("submitContact", () => {
		it("submits valid contact data and returns success", async () => {
			mockPost.mockResolvedValueOnce({
				success: true,
				message: "Sent!",
			});

			const result = await service.submitContact(validData);

			expect(mockPost).toHaveBeenCalledWith("/api/contact", validData);
			expect(result).toEqual({ success: true, message: "Sent!" });
		});

		it("uses default success message when API returns none", async () => {
			mockPost.mockResolvedValueOnce({
				success: true,
			});

			const result = await service.submitContact(validData);

			expect(result).toEqual({
				success: true,
				message: "Message sent successfully",
			});
		});

		it("returns error response for ApiClientError", async () => {
			const apiError = new ApiClientError("Server error", 500);
			mockPost.mockRejectedValueOnce(apiError);

			const result = await service.submitContact(validData);

			expect(result).toEqual({
				success: false,
				message: "Server error",
			});
		});

		it("returns generic error for non-ApiClientError", async () => {
			mockPost.mockRejectedValueOnce(new Error("random error"));

			const result = await service.submitContact(validData);

			expect(result).toEqual({
				success: false,
				message: "Failed to send message. Please try again.",
			});
		});
	});

	describe("validation errors", () => {
		const expectValidationFailure = async (
			data: Parameters<typeof service.submitContact>[0],
		) => {
			const result = await service.submitContact(data);
			expect(result.success).toBe(false);
			expect(mockPost).not.toHaveBeenCalled();
			return result;
		};

		it("fails when name is empty", async () => {
			const result = await expectValidationFailure({
				...validData,
				name: "",
			});
			expect(result.message).toBe("Failed to send message. Please try again.");
		});

		it("fails when name is whitespace only", async () => {
			await expectValidationFailure({ ...validData, name: "   " });
		});

		it("fails when email is empty", async () => {
			await expectValidationFailure({ ...validData, email: "" });
		});

		it("fails when email is invalid", async () => {
			await expectValidationFailure({ ...validData, email: "not-an-email" });
		});

		it("fails when subject is empty", async () => {
			await expectValidationFailure({ ...validData, subject: "" });
		});

		it("fails when subject is whitespace only", async () => {
			await expectValidationFailure({ ...validData, subject: "   " });
		});

		it("fails when message is empty", async () => {
			await expectValidationFailure({ ...validData, message: "" });
		});

		it("fails when message is less than 10 characters", async () => {
			await expectValidationFailure({ ...validData, message: "Short" });
		});

		it("fails when hcaptchaToken is missing", async () => {
			await expectValidationFailure({
				...validData,
				hcaptchaToken: undefined,
			});
		});

		it("fails when hcaptchaToken is empty string", async () => {
			await expectValidationFailure({ ...validData, hcaptchaToken: "" });
		});

		it("fails when hcaptchaToken is whitespace only", async () => {
			await expectValidationFailure({ ...validData, hcaptchaToken: "   " });
		});
	});
});

describe("contactService singleton", () => {
	it("is an instance of ContactService", () => {
		expect(contactService).toBeInstanceOf(ContactService);
	});
});
