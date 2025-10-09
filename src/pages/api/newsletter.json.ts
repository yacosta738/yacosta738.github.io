import type { APIRoute } from "astro";

/**
 * API Route para el formulario de suscripción al newsletter
 * Actúa como proxy seguro hacia el webhook backend, ocultando tokens y credenciales del cliente
 */
export const POST: APIRoute = async ({ request }) => {
	try {
		// Obtener las variables de entorno
		const authToken = import.meta.env.WEBHOOK_AUTH_TOKEN;
		const formTokenId = import.meta.env.WEBHOOK_FORM_TOKEN_ID;
		const newsletterUrl = import.meta.env.NEWSLETTER_WEBHOOK_URL;

		// Validar que las variables de entorno estén configuradas
		if (!authToken || !formTokenId || !newsletterUrl) {
			console.error("Missing webhook configuration in environment variables");
			return new Response(
				JSON.stringify({
					success: false,
					message: "Server configuration error",
				}),
				{
					status: 500,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Parsear el cuerpo de la petición
		const body = await request.json();

		// Validar los campos requeridos
		const { email, _gotcha } = body;

		// Honeypot check - si _gotcha tiene valor, es un bot
		if (_gotcha) {
			console.warn("Honeypot triggered - potential spam detected");
			// Devolver success true pero sin procesar para no alertar al bot
			return new Response(
				JSON.stringify({
					success: true,
					message: "Subscription received",
				}),
				{
					status: 200,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Validación básica
		if (!email) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Email is required",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Validación de email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Invalid email address",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Preparar los datos para n8n
		const payload = {
			email,
		};

		// Hacer la petición a n8n con los headers de autenticación
		const response = await fetch(newsletterUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"YAP-AUTH-TOKEN": authToken,
				"form-token-id": formTokenId,
			},
			body: JSON.stringify(payload),
		});

		// Verificar si la respuesta del webhook fue exitosa
		if (!response.ok) {
			console.error(`Webhook request failed with status: ${response.status}`);
			return new Response(
				JSON.stringify({
					success: false,
					message: "Failed to subscribe",
				}),
				{
					status: 500,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Responder con éxito
		return new Response(
			JSON.stringify({
				success: true,
				message: "Subscription successful",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	} catch (error) {
		console.error("Error in newsletter API route:", error);
		return new Response(
			JSON.stringify({
				success: false,
				message: "Internal server error",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};

// Preflight request handler para CORS
export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
};
