import type { Context } from "hono";

/**
 * Environment variables and bindings available to the Worker
 *
 * Plaintext Variables (from wrangler.jsonc vars):
 * - CONTACT_WEBHOOK_URL: Webhook URL for contact form submissions
 * - NEWSLETTER_WEBHOOK_URL: Webhook URL for newsletter subscriptions
 *
 * Secrets (from .dev.vars locally or wrangler secret in production):
 * - HCAPTCHA_SECRET_KEY: hCaptcha secret key for server-side validation
 * - WEBHOOK_AUTH_TOKEN: Authentication token for webhook requests
 * - WEBHOOK_FORM_TOKEN_ID: Form-specific token for validation
 */
export interface Env {
	// Plaintext environment variables
	CONTACT_WEBHOOK_URL: string;
	NEWSLETTER_WEBHOOK_URL: string;

	// Secrets
	HCAPTCHA_SECRET_KEY: string;
	WEBHOOK_AUTH_TOKEN: string;
	WEBHOOK_FORM_TOKEN_ID: string;
}

export type AppContext = Context<{ Bindings: Env }>;
