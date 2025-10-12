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
 * Verify hCaptcha token with the hCaptcha API
 *
 * @param token - The hCaptcha response token from the client
 * @param secretKey - The hCaptcha secret key from environment variables
 * @param remoteIp - Optional IP address of the user submitting the form
 * @returns Verification result with success status and message
 */
export async function verifyHCaptcha(
	token: string,
	secretKey: string,
	remoteIp?: string,
): Promise<VerificationResult> {
	// Validate inputs
	if (!token) {
		return {
			success: false,
			message: "Missing hCaptcha token",
		};
	}

	if (!secretKey) {
		console.error("hCaptcha secret key not configured");
		return {
			success: false,
			message: "Server configuration error",
		};
	}

	try {
		// Prepare the request body
		const formData = new URLSearchParams();
		formData.append("secret", secretKey);
		formData.append("response", token);
		if (remoteIp) {
			formData.append("remoteip", remoteIp);
		}

		// Make the verification request to hCaptcha
		const response = await fetch("https://hcaptcha.com/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: formData.toString(),
		});

		if (!response.ok) {
			console.error(
				`hCaptcha verification request failed with status: ${response.status}`,
			);
			return {
				success: false,
				message: "Failed to verify captcha",
			};
		}

		const result = (await response.json()) as HCaptchaVerifyResponse;

		if (!result.success) {
			console.warn("hCaptcha verification failed:", result["error-codes"]);
			return {
				success: false,
				message: "Captcha verification failed",
				errorCodes: result["error-codes"],
			};
		}

		// Verification successful
		return {
			success: true,
			message: "Captcha verified successfully",
		};
	} catch (error) {
		console.error("Error verifying hCaptcha:", error);
		return {
			success: false,
			message: "Error verifying captcha",
		};
	}
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
