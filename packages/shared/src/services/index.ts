/**
 * Services Index
 * Exports all services for easy importing
 */

export { ApiClient, ApiClientError, apiClient } from "./api-client";
export { API_CONFIG, type ApiError, type ApiResponse } from "./api-config";
export {
	type ContactFormData,
	type ContactResponse,
	ContactService,
	contactService,
} from "./contact.service";
export {
	type NewsletterFormData,
	type NewsletterResponse,
	NewsletterService,
	newsletterService,
} from "./newsletter.service";
