/**
 * Contact Service
 * Handles contact form submissions
 */

import { ApiClientError, apiClient } from "./api-client";
import { API_CONFIG } from "./api-config";

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	_gotcha?: string;
	hcaptchaToken?: string;
}

export interface ContactResponse {
	success: boolean;
	message: string;
}

export class ContactService {
	/**
	 * Submit a contact form
	 */
	async submitContact(data: ContactFormData): Promise<ContactResponse> {
		try {
			// Validate required fields
			this.validateContactData(data);

			// Submit to API
			const response = await apiClient.post<ContactResponse>(
				API_CONFIG.endpoints.contact,
				data,
			);

			return {
				success: response.success,
				message: response.message || "Message sent successfully",
			};
		} catch (error) {
			console.error("Contact service error:", error);

			if (error instanceof ApiClientError) {
				return {
					success: false,
					message: error.message,
				};
			}

			return {
				success: false,
				message: "Failed to send message. Please try again.",
			};
		}
	}

	/**
	 * Validate contact form data
	 */
	private validateContactData(data: ContactFormData): void {
		if (!data.name?.trim()) {
			throw new Error("Name is required");
		}

		if (!data.email?.trim()) {
			throw new Error("Email is required");
		}

		if (!this.isValidEmail(data.email)) {
			throw new Error("Invalid email address");
		}

		if (!data.subject?.trim()) {
			throw new Error("Subject is required");
		}

		if (!data.message?.trim()) {
			throw new Error("Message is required");
		}

		if (data.message.trim().length < 10) {
			throw new Error("Message must be at least 10 characters");
		}

		if (!data.hcaptchaToken?.trim()) {
			throw new Error("Please complete the captcha verification");
		}
	}

	/**
	 * Validate email format
	 */
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}

// Export a singleton instance
export const contactService = new ContactService();
