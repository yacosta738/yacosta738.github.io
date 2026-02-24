/**
 * Newsletter Service
 * Handles newsletter subscriptions
 */

import { ApiClientError, apiClient } from "./api-client";
import { API_CONFIG } from "./api-config";

export interface NewsletterFormData {
	email: string;
	_gotcha?: string;
	hcaptchaToken?: string;
}

export interface NewsletterResponse {
	success: boolean;
	message: string;
}

export class NewsletterService {
	/**
	 * Subscribe to newsletter
	 */
	async subscribe(data: NewsletterFormData): Promise<NewsletterResponse> {
		try {
			// Validate email and captcha
			this.validateNewsletterData(data);

			// Submit to API
			const response = await apiClient.post<NewsletterResponse>(
				API_CONFIG.endpoints.newsletter,
				data,
			);

			return {
				success: response.success,
				message: response.message || "Successfully subscribed to newsletter",
			};
		} catch (error) {
			console.error("Newsletter service error:", error);

			if (error instanceof ApiClientError) {
				return {
					success: false,
					message: error.message,
				};
			}

			return {
				success: false,
				message: "Failed to subscribe. Please try again.",
			};
		}
	}

	/**
	 * Validate email
	 */
	private validateEmail(email: string): void {
		if (!email?.trim()) {
			throw new Error("Email is required");
		}

		if (!this.isValidEmail(email)) {
			throw new Error("Invalid email address");
		}
	}

	/**
	 * Validate newsletter data including captcha
	 */
	private validateNewsletterData(data: NewsletterFormData): void {
		this.validateEmail(data.email);

		if (!data.hcaptchaToken?.trim()) {
			throw new Error("Please complete the captcha verification");
		}
	}

	/**
	 * Validate email format
	 */
	private isValidEmail(email: string): boolean {
		const value = email.trim();
		if (!value) {
			return false;
		}

		if (
			value.includes(" ") ||
			value.includes("\t") ||
			value.includes("\n") ||
			value.includes("\r")
		) {
			return false;
		}

		const atIndex = value.indexOf("@");
		if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
			return false;
		}

		const localPart = value.slice(0, atIndex);
		const domainPart = value.slice(atIndex + 1);
		if (!localPart || !domainPart || !domainPart.includes(".")) {
			return false;
		}

		if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
			return false;
		}

		const domainLabels = domainPart.split(".");
		return domainLabels.every((label) => label.trim().length > 0);
	}
}

// Export a singleton instance
export const newsletterService = new NewsletterService();
