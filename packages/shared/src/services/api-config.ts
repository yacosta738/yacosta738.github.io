/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

// Get the API base URL from environment variables or use a default
const getApiBaseUrl = (): string => {
	// Check if we're in development or production
	if (import.meta.env.DEV) {
		// In development, use the local worker or a dev deployment
		return import.meta.env.API_URL || "http://localhost:8787";
	}

	// In production, use the deployed worker URL
	return import.meta.env.API_URL || "https://api.yunielacosta.com";
};

export const API_CONFIG = {
	baseUrl: getApiBaseUrl(),
	endpoints: {
		contact: "/api/contact",
		newsletter: "/api/newsletter",
	},
	timeout: 10000, // 10 seconds
} as const;

/**
 * API Response types
 */
export interface ApiResponse<T = unknown> {
	success: boolean;
	message?: string;
	data?: T;
}

export interface ApiError {
	success: false;
	message: string;
	code?: string;
}
