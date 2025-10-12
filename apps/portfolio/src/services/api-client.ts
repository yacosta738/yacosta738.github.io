/**
 * API Client
 * Generic HTTP client for making requests to the API worker
 */

import { API_CONFIG, type ApiResponse } from "./api-config";

export class ApiClient {
	private baseUrl: string;
	private timeout: number;

	constructor(
		baseUrl: string = API_CONFIG.baseUrl,
		timeout: number = API_CONFIG.timeout,
	) {
		this.baseUrl = baseUrl;
		this.timeout = timeout;
	}

	/**
	 * Make a POST request to the API
	 */
	async post<T = unknown>(
		endpoint: string,
		data: Record<string, unknown> | unknown,
	): Promise<ApiResponse<T>> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			// Parse response
			const result = (await response.json()) as ApiResponse<T>;

			if (!response.ok) {
				throw new ApiClientError(
					result.message || `HTTP error! status: ${response.status}`,
					response.status,
				);
			}

			return result;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof ApiClientError) {
				throw error;
			}

			// Handle fetch errors
			if (error instanceof Error) {
				if (error.name === "AbortError") {
					throw new ApiClientError("Request timeout", 408);
				}
				throw new ApiClientError(error.message, 0);
			}

			throw new ApiClientError("Unknown error occurred", 0);
		}
	}

	/**
	 * Make a GET request to the API
	 */
	async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			const result = (await response.json()) as ApiResponse<T>;

			if (!response.ok) {
				throw new ApiClientError(
					result.message || `HTTP error! status: ${response.status}`,
					response.status,
				);
			}

			return result;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof ApiClientError) {
				throw error;
			}

			if (error instanceof Error) {
				if (error.name === "AbortError") {
					throw new ApiClientError("Request timeout", 408);
				}
				throw new ApiClientError(error.message, 0);
			}

			throw new ApiClientError("Unknown error occurred", 0);
		}
	}
}

/**
 * Custom API Client Error
 */
export class ApiClientError extends Error {
	constructor(
		message: string,
		public statusCode: number,
	) {
		super(message);
		this.name = "ApiClientError";
	}
}

// Export a singleton instance
export const apiClient = new ApiClient();
