/**
 * Tests for the robots.txt Astro API route.
 *
 * getRobotsTxt() is a pure function (not exported) — we exercise it indirectly
 * via the GET handler with a minimal Astro APIContext mock.
 *
 * Coverage targets:
 *   - GET handler happy path (returns 200 text/plain)
 *   - GET handler error path (missing `site` throws)
 *   - Content assertions: default-locale rules, non-default locale prefixes, AI bot blocks
 */
import { GET } from "@blog/pages/robots.txt";
import type { APIContext } from "astro";
import {
	DEFAULT_LOCALE_SETTING,
	LOCALES_SETTING,
} from "@/i18n/locales";
import { describe, expect, it } from "vitest";

/** Build a minimal APIContext with a `site` URL. */
function makeContext(site: URL | undefined): APIContext {
	return { site } as unknown as APIContext;
}

describe("GET /robots.txt", () => {
	it("returns a 200 Response with text/plain content-type", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
	});

	it("includes the sitemap URL pointing to sitemap-index.xml", async () => {
		const site = new URL("https://yunielacosta.com/");
		const res = await GET(makeContext(site));
		const body = await res.text();
		expect(body).toContain(
			"Sitemap: https://yunielacosta.com/sitemap-index.xml",
		);
	});

	it("allows all user-agents by default", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		expect(body).toContain("User-agent: *");
		expect(body).toContain("Allow: /");
	});

	it("disallows category and tag pages for the default (en) locale without a lang prefix", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		// Default locale → no lang prefix
		expect(body).toContain("Disallow: /category/");
		expect(body).toContain("Disallow: /tag/");
	});

	it("disallows category and tag pages for each non-default locale with the correct prefix", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		for (const lang of Object.keys(LOCALES_SETTING)) {
			if (lang === DEFAULT_LOCALE_SETTING) continue;
			const prefix = `/${lang}`;
			expect(body).toContain(`Disallow: ${prefix}/category/`);
			expect(body).toContain(`Disallow: ${prefix}/tag/`);
		}
	});

	it("blocks AI training bots (GPTBot, ChatGPT-User, CCBot, ClaudeBot)", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		for (const bot of ["GPTBot", "ChatGPT-User", "CCBot", "ClaudeBot"]) {
			expect(body).toContain(`User-agent: ${bot}`);
			expect(body).toMatch(
				new RegExp(`User-agent: ${bot}[\\s\\S]*?Disallow: \\/`),
			);
		}
	});

	it("adds crawl-delay for aggressive scrapers (AhrefsBot, SemrushBot)", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		for (const bot of ["AhrefsBot", "SemrushBot"]) {
			// Extract only the block that belongs to this bot (up to the next
			// "User-agent:" line or end-of-file) so assertions are scoped to
			// that specific section.
			const blockMatch = body.match(
				new RegExp(
					`User-agent: ${bot}([\\s\\S]*?)(?=\\nUser-agent:|$)`,
				),
			);
			expect(blockMatch, `Expected to find a "${bot}" block`).not.toBeNull();
			const block = blockMatch![0];
			expect(block).toContain("Crawl-delay: 10");
			// AhrefsBot and SemrushBot are rate-limited, NOT fully disallowed
			expect(block).not.toContain("Disallow: /");
		}
	});

	it("blocks known bad bots (MJ12bot, DotBot)", async () => {
		const res = await GET(makeContext(new URL("https://example.com/")));
		const body = await res.text();
		expect(body).toContain("User-agent: MJ12bot");
		expect(body).toContain("User-agent: DotBot");
		expect(body).toMatch(/User-agent: MJ12bot[\s\S]*?Disallow: \//);
		expect(body).toMatch(/User-agent: DotBot[\s\S]*?Disallow: \//);
	});

	it("throws when site is undefined", () => {
		expect(() => GET(makeContext(undefined))).toThrow(
			"Missing `site` in Astro context",
		);
	});
});
