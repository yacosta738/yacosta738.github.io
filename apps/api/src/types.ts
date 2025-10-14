import type { Context } from "hono";

/**
 * Environment variables and bindings available to the Worker
 *
 * NOTE: This interface extends the auto-generated Env from worker-configuration.d.ts
 * Run `pnpm cf-typegen` after changing wrangler.jsonc to regenerate types.
 *
 * Plaintext Variables (from wrangler.jsonc vars):
 * - CONTACT_WEBHOOK_URL: Webhook URL for contact form submissions
 * - NEWSLETTER_WEBHOOK_URL: Webhook URL for newsletter subscriptions
 * - ALLOWED_ORIGINS: Comma-separated list of allowed CORS origins
 *
 * Secrets (from .dev.vars locally or wrangler secret in production):
 * - HCAPTCHA_SECRET_KEY: hCaptcha secret key for server-side validation
 * - WEBHOOK_AUTH_TOKEN: Authentication token for webhook requests
 * - WEBHOOK_FORM_TOKEN_ID: Form-specific token for validation
 */
// The Env interface is auto-generated in worker-configuration.d.ts by wrangler
// We just need to document it here for reference

export type AppContext = Context<{ Bindings: Env }>;
