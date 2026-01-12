/**
 * hCaptcha Verification Utility
 *
 * Provides server-side verification of hCaptcha tokens to prevent bot submissions.
 */

interface HCaptchaVerifyResponse {
	success: boolean;
	challenge_ts?: string;
	hostname?: string;
	credit?: boolean;
	"error-codes"?: string[];
	score?: number;
	score_reason?: string[];
}

interface VerificationResult {
	success: boolean;
	message: string;
	errorCodes?: string[];
}

/**
 * Common hCaptcha error codes and their meanings
 */
export const HCAPTCHA_ERROR_CODES = {
	"missing-input-secret": "Your secret key is missing",
	"invalid-input-secret": "Your secret key is invalid or malformed",
	"missing-input-response":
		"The response parameter (verification token) is missing",
	"invalid-input-response":
		"The response parameter (verification token) is invalid or malformed",
	"bad-request": "The request is invalid or malformed",
	"invalid-or-already-seen-response":
		"The response parameter has already been checked, or has another issue",
	"not-using-dummy-passcode":
		"You have used a testing sitekey but have not used its matching secret",
	"sitekey-secret-mismatch":
		"The sitekey is not registered with the provided secret",
} as const;

/**
 * Verifies an hCaptcha token with the hCaptcha API
 *
 * @param token - The hCaptcha response token from the client
 * @param secret - Your hCaptcha secret key
 * @param remoteip - Optional: The user's IP address for additional validation
 * @returns Promise resolving to a VerificationResult
 *
 * @example
 * const result = await verifyHCaptcha(
 *   token,
 *   env.HCAPTCHA_SECRET_KEY,
 *   request.headers.get("CF-Connecting-IP")
 * );
 * if (result.success) {
 *   // Proceed with form submission
 * }
 */
export async function verifyHCaptcha(
	token: string,
	secret: string,
	remoteip?: string | null,
): Promise<VerificationResult> {
	// Validate input parameters
	if (!token || typeof token !== "string") {
		return {
			success: false,
			message: "Invalid or missing captcha token",
		};
	}

	if (!secret || typeof secret !== "string") {
		return {
			success: false,
			message: "Server configuration error: missing secret key",
		};
	}

	try {
		// Build the request body
		const params = new URLSearchParams({
			response: token,
			secret: secret,
		});

		// Add remote IP if provided (optional but recommended)
		if (remoteip) {
			params.append("remoteip", remoteip);
		}

		// Make the verification request to hCaptcha
		const response = await fetch("https://hcaptcha.com/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params.toString(),
		});

		// Handle network errors
		if (!response.ok) {
			console.error(
				`hCaptcha API returned status ${response.status}: ${response.statusText}`,
			);
			return {
				success: false,
				message: "Failed to verify captcha with hCaptcha service",
			};
		}

		// Parse the response
		const data = (await response.json()) as HCaptchaVerifyResponse;

		// Check if verification was successful
		if (data.success) {
			return {
				success: true,
				message: "Captcha verification successful",
			};
		}

		// Handle verification failure with detailed error codes
		const errorCodes = data["error-codes"] || [];
		const errorMessages = errorCodes
			.map(
				(code) =>
					HCAPTCHA_ERROR_CODES[code as keyof typeof HCAPTCHA_ERROR_CODES] ||
					code,
			)
			.join(", ");

		console.warn(
			"hCaptcha verification failed:",
			errorMessages || "Unknown error",
		);

		return {
			success: false,
			message: errorMessages || "Captcha verification failed",
			errorCodes,
		};
	} catch (error) {
		// Handle unexpected errors
		console.error("Error during hCaptcha verification:", error);
		return {
			success: false,
			message: "An error occurred while verifying captcha",
		};
	}
}
