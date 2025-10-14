import { afterEach, describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./resolveSiteUrl";

describe("resolveSiteUrl helper", () => {
	const env = { ...process.env };
	afterEach(() => {
		// restore env
		for (const k of Object.keys(process.env)) delete process.env[k];
		Object.assign(process.env, env);
	});

	it("returns trimmed https URL when provided with protocol", () => {
		process.env.SITE_URL = "https://example.com/";
		expect(resolveSiteUrl()).toBe("https://example.com");
	});

	it("adds https:// to host-only values and trims trailing slash", () => {
		process.env.SITE_URL = "example.com/";
		expect(resolveSiteUrl()).toBe("https://example.com");
	});

	it("falls back to localhost when no env vars set", () => {
		const candidates = [
			"SITE_URL",
			"VERCEL_PROJECT_PRODUCTION_URL",
			"VERCEL_URL",
			"VERCEL_BRANCH_URL",
			"URL",
			"DEPLOY_PRIME_URL",
			"CF_PAGES_URL",
			"HOST",
		];
		for (const key of candidates) {
			delete process.env[key];
		}
		expect(resolveSiteUrl()).toBe("http://localhost:4321");
	});

	it("handles long/malformed inputs safely", () => {
		process.env.SITE_URL = `${"a".repeat(100000)}/`;
		// should not throw and return trimmed long string (no protocol so not recognized as hostname)
		const result = resolveSiteUrl();
		expect(typeof result).toBe("string");
		expect(result.endsWith("/")).toBe(false);
	});
});
