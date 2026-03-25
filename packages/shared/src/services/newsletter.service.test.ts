import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientError } from "./api-client";
import { NewsletterService, newsletterService } from "./newsletter.service";

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

import { apiClient } from "./api-client";

const mockPost = vi.mocked(apiClient.post);

describe("NewsletterService", () => {
	let service: NewsletterService;

	const validData = {
		email: "test@example.com",
		hcaptchaToken: "token123",
	};

	beforeEach(() => {
		service = new NewsletterService();
		mockPost.mockReset();
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("subscribe", () => {
		it("subscribes with valid data and returns success", async () => {
			mockPost.mockResolvedValueOnce({
				success: true,
				message: "Subscribed!",
			});

			const result = await service.subscribe(validData);

			expect(mockPost).toHaveBeenCalledWith("/api/newsletter", validData);
			expect(result).toEqual({ success: true, message: "Subscribed!" });
		});

		it("uses default success message when API returns none", async () => {
			mockPost.mockResolvedValueOnce({
				success: true,
			});

			const result = await service.subscribe(validData);

			expect(result).toEqual({
				success: true,
				message: "Successfully subscribed to newsletter",
			});
		});

		it("returns error response for ApiClientError", async () => {
			const apiError = new ApiClientError("Rate limited", 429);
			mockPost.mockRejectedValueOnce(apiError);

			const result = await service.subscribe(validData);

			expect(result).toEqual({
				success: false,
				message: "Rate limited",
			});
		});

		it("returns generic error for non-ApiClientError", async () => {
			mockPost.mockRejectedValueOnce(new TypeError("fetch failed"));

			const result = await service.subscribe(validData);

			expect(result).toEqual({
				success: false,
				message: "Failed to subscribe. Please try again.",
			});
		});
	});

	describe("validation errors", () => {
		it("fails when email is empty", async () => {
			const result = await service.subscribe({
				...validData,
				email: "",
			});
			expect(result.success).toBe(false);
		});

		it("fails when email is whitespace only", async () => {
			const result = await service.subscribe({
				...validData,
				email: "   ",
			});
			expect(result.success).toBe(false);
		});

		it("fails when email is invalid", async () => {
			const result = await service.subscribe({
				...validData,
				email: "invalid-email",
			});
			expect(result.success).toBe(false);
		});

		it("fails when hcaptchaToken is missing", async () => {
			const result = await service.subscribe({
				email: "test@example.com",
			});
			expect(result.success).toBe(false);
		});

		it("fails when hcaptchaToken is empty string", async () => {
			const result = await service.subscribe({
				...validData,
				hcaptchaToken: "",
			});
			expect(result.success).toBe(false);
		});

		it("fails when hcaptchaToken is whitespace only", async () => {
			const result = await service.subscribe({
				...validData,
				hcaptchaToken: "   ",
			});
			expect(result.success).toBe(false);
		});
	});
});

describe("newsletterService singleton", () => {
	it("is an instance of NewsletterService", () => {
		expect(newsletterService).toBeInstanceOf(NewsletterService);
	});
});
