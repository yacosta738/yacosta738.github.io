import { RECAPTCHA_SECRET_KEY } from 'astro:env/server';

export const prerender = false;

export async function POST({ request }: { request: Request }) {
	try {
		const { token } = await request.json();

		if (!token) {
			return new Response(
				JSON.stringify({
					success: false,
					'error-codes': ['missing-input-response'],
				}),
				{ status: 400 }
			);
		}

		if (!RECAPTCHA_SECRET_KEY) {
			console.error('RECAPTCHA_SECRET_KEY is not defined');
			return new Response(
				JSON.stringify({
					success: false,
					'error-codes': ['invalid-input-secret'],
				}),
				{ status: 500 }
			);
		}

		const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
		const params = new URLSearchParams({
			secret: RECAPTCHA_SECRET_KEY,
			response: token,
		});

		const response = await fetch(recaptchaURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: params,
		});

		if (!response.ok) {
			throw new Error(`reCAPTCHA verification failed: ${response.statusText}`);
		}

		const responseData = await response.json();
		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('reCAPTCHA verification error:', error);
		return new Response(
			JSON.stringify({
				success: false,
				'error-codes': ['internal-error'],
				message: error instanceof Error ? error.message : 'Unknown error',
			}),
			{ status: 500 }
		);
	}
}
