import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./resolveSiteUrl";

const ENV_VARS = [
	"SITE_URL",
	"DOMAIN",
	"VERCEL_PROJECT_PRODUCTION_URL",
	"VERCEL_URL",
	"VERCEL_BRANCH_URL",
	"URL",
	"DEPLOY_PRIME_URL",
	"CF_PAGES_URL",
	"NODE_ENV",
] as const;

type EnvSnapshot = Partial<Record<(typeof ENV_VARS)[number], string>>;

function saveEnv(): EnvSnapshot {
	const snap: EnvSnapshot = {};
	for (const key of ENV_VARS) {
		snap[key] = process.env[key];
	}
	return snap;
}

function restoreEnv(snap: EnvSnapshot) {
	for (const key of ENV_VARS) {
		if (snap[key] === undefined) {
			delete process.env[key];
		} else {
			process.env[key] = snap[key];
		}
	}
}

function clearProviderEnv() {
	for (const key of ENV_VARS) {
		if (key === "NODE_ENV") continue;
		delete process.env[key];
	}
}

describe("resolveSiteUrl", () => {
	let snapshot: EnvSnapshot;

	beforeEach(() => {
		snapshot = saveEnv();
		clearProviderEnv();
	});

	afterEach(() => {
		restoreEnv(snapshot);
	});

	describe("fallbacks (no env vars set)", () => {
		it("returns localhost in development (default)", () => {
			// Force development so the test is deterministic regardless of the
			// runner's NODE_ENV (clearProviderEnv intentionally preserves NODE_ENV).
			process.env.NODE_ENV = "development";
			expect(resolveSiteUrl()).toBe("http://localhost:4321");
		});

		it("returns production URL when NODE_ENV=production", () => {
			process.env.NODE_ENV = "production";
			expect(resolveSiteUrl()).toBe("https://yunielacosta.com");
		});
	});

	describe("SITE_URL (highest priority)", () => {
		it("returns SITE_URL with protocol as-is", () => {
			process.env.SITE_URL = "https://example.com";
			expect(resolveSiteUrl()).toBe("https://example.com");
		});

		it("strips trailing slashes from SITE_URL", () => {
			process.env.SITE_URL = "https://example.com///";
			expect(resolveSiteUrl()).toBe("https://example.com");
		});

		it("adds https:// when SITE_URL looks like a hostname", () => {
			process.env.SITE_URL = "example.com";
			expect(resolveSiteUrl()).toBe("https://example.com");
		});
	});

	describe("DOMAIN", () => {
		it("returns DOMAIN when SITE_URL is unset", () => {
			process.env.DOMAIN = "https://my-domain.com";
			expect(resolveSiteUrl()).toBe("https://my-domain.com");
		});
	});

	describe("VERCEL_PROJECT_PRODUCTION_URL", () => {
		it("adds https:// to a bare Vercel production hostname", () => {
			process.env.VERCEL_PROJECT_PRODUCTION_URL = "my-app.vercel.app";
			expect(resolveSiteUrl()).toBe("https://my-app.vercel.app");
		});
	});

	describe("VERCEL_URL", () => {
		it("adds https:// to a bare Vercel preview hostname", () => {
			process.env.VERCEL_URL = "my-app-abc123.vercel.app";
			expect(resolveSiteUrl()).toBe("https://my-app-abc123.vercel.app");
		});
	});

	describe("VERCEL_BRANCH_URL", () => {
		it("adds https:// to a Vercel branch hostname", () => {
			process.env.VERCEL_BRANCH_URL = "my-app-git-main.vercel.app";
			expect(resolveSiteUrl()).toBe("https://my-app-git-main.vercel.app");
		});
	});

	describe("URL (Netlify)", () => {
		it("uses URL when higher-priority vars are absent", () => {
			process.env.URL = "https://my-app.netlify.app";
			expect(resolveSiteUrl()).toBe("https://my-app.netlify.app");
		});
	});

	describe("DEPLOY_PRIME_URL (Netlify PR preview)", () => {
		it("uses DEPLOY_PRIME_URL when URL is absent", () => {
			process.env.DEPLOY_PRIME_URL =
				"https://deploy-preview-42--my-app.netlify.app";
			expect(resolveSiteUrl()).toBe(
				"https://deploy-preview-42--my-app.netlify.app",
			);
		});
	});

	describe("CF_PAGES_URL (Cloudflare Pages)", () => {
		it("uses CF_PAGES_URL as last-resort provider", () => {
			process.env.CF_PAGES_URL = "https://my-app.pages.dev";
			expect(resolveSiteUrl()).toBe("https://my-app.pages.dev");
		});
	});

	describe("priority ordering", () => {
		it("SITE_URL beats VERCEL_URL", () => {
			process.env.SITE_URL = "https://primary.com";
			process.env.VERCEL_URL = "https://secondary.vercel.app";
			expect(resolveSiteUrl()).toBe("https://primary.com");
		});

		it("VERCEL_URL beats CF_PAGES_URL", () => {
			process.env.VERCEL_URL = "my-app.vercel.app";
			process.env.CF_PAGES_URL = "https://my-app.pages.dev";
			expect(resolveSiteUrl()).toBe("https://my-app.vercel.app");
		});
	});

	describe("normalizeCandidate edge cases", () => {
		it("handles http:// URLs without converting to https", () => {
			process.env.SITE_URL = "http://localhost:3000";
			expect(resolveSiteUrl()).toBe("http://localhost:3000");
		});

		it("ignores values with slashes that are not full URLs (not valid hostname)", () => {
			// A raw path like '/some/path' is not a hostname and has no protocol —
			// it should be returned as-is (no https:// prefix added)
			process.env.SITE_URL = "/some/path";
			expect(resolveSiteUrl()).toBe("/some/path");
		});

		it("trims surrounding whitespace from env var value", () => {
			process.env.SITE_URL = "  https://example.com  ";
			expect(resolveSiteUrl()).toBe("https://example.com");
		});
	});
});
