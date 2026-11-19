import { scriptHashes } from "./_csp-hashes.generated.js";

interface PagesFunctionContext {
	next: () => Promise<Response>;
}

const SCRIPT_SRC_BASE =
	"'self' 'wasm-unsafe-eval' https://js.hcaptcha.com https://challenges.cloudflare.com https://static.cloudflareinsights.com https://analytics.ahrefs.com";

const CSP_DIRECTIVES: string[] = [
	"default-src 'self'",
	`script-src ${SCRIPT_SRC_BASE} ${scriptHashes.join(" ")}`,
	"style-src 'self' 'unsafe-inline' https://hcaptcha.com",
	"img-src 'self' data: https: blob:",
	"font-src 'self' data:",
	"connect-src 'self' https://api.hcaptcha.com https://hcaptcha.com https://*.hcaptcha.com https://cloudflareinsights.com https://api.yunielacosta.com",
	"worker-src 'self' blob:",
	"frame-src https://hcaptcha.com https://challenges.cloudflare.com https://*.hcaptcha.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self' https://api.hcaptcha.com",
	"frame-ancestors 'none'",
];

const CSP_HEADER_VALUE = CSP_DIRECTIVES.join("; ");

export async function onRequest(
	context: PagesFunctionContext,
): Promise<Response> {
	const response = await context.next();
	response.headers.set("Content-Security-Policy", CSP_HEADER_VALUE);
	return response;
}
