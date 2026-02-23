/**
 * Global type definitions for hCaptcha
 * This file provides TypeScript types for the hCaptcha JavaScript API
 */

interface HCaptchaConfig {
	sitekey: string;
	theme?: "light" | "dark";
	size?: "normal" | "compact" | "invisible";
	tabindex?: number;
	callback?: (token: string) => void;
	"expired-callback"?: () => void;
	"chalexpired-callback"?: () => void;
	"open-callback"?: () => void;
	"close-callback"?: () => void;
	"error-callback"?: (error: string) => void;
}

interface HCaptchaAPI {
	/**
	 * Renders the hCaptcha widget
	 * @param container - The ID of the container or the DOM element
	 * @param config - Configuration object
	 * @returns widgetId - Unique ID for this widget instance
	 */
	render: (container: string | HTMLElement, config: HCaptchaConfig) => string;

	/**
	 * Resets the hCaptcha widget
	 * @param widgetId - Optional widget ID (defaults to first widget)
	 */
	reset: (widgetId?: string) => void;

	/**
	 * Gets the response token from the hCaptcha widget
	 * @param widgetId - Optional widget ID (defaults to first widget)
	 * @returns The response token or empty string
	 */
	getResponse: (widgetId?: string) => string;

	/**
	 * Gets the response key from the hCaptcha widget
	 * @param widgetId - Optional widget ID (defaults to first widget)
	 */
	getRespKey: (widgetId?: string) => string;

	/**
	 * Triggers the hCaptcha workflow programmatically
	 * @param widgetId - Optional widget ID (defaults to first widget)
	 * @param options - Optional async options
	 */
	execute: (
		widgetId?: string,
		options?: { async: boolean },
	) => Promise<{
		response: string;
		key: string;
	}>;
}

declare global {
	interface Window {
		/**
		 * hCaptcha JavaScript API
		 */
		hcaptcha?: HCaptchaAPI;

		/**
		 * Map of container IDs to widget IDs
		 */
		hcaptchaWidgets?: Map<string, string>;

		/**
		 * Helper function to get captcha token by container ID
		 * @param containerId - The ID of the hCaptcha container element
		 * @returns The captcha token or null if not available
		 */
		getCaptchaToken?: (containerId: string) => string | null;

		/**
		 * Helper function to reset captcha by container ID
		 * @param containerId - The ID of the hCaptcha container element
		 */
		resetCaptcha?: (containerId: string) => void;
	}
}

export {};
