import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildBlogUrl, getBlogBaseUrl, normalizeBaseUrl } from "./blog-url";

describe("normalizeBaseUrl", () => {
	it("should return empty string for undefined", () => {
		expect(normalizeBaseUrl(undefined)).toBe("");
	});

	it("should return empty string for empty string", () => {
		expect(normalizeBaseUrl("")).toBe("");
	});

	it("should return empty string for whitespace-only string", () => {
		expect(normalizeBaseUrl("   ")).toBe("");
	});

	it("should strip trailing slash", () => {
		expect(normalizeBaseUrl("https://example.com/")).toBe(
			"https://example.com",
		);
	});

	it("should keep URL without trailing slash as-is", () => {
		expect(normalizeBaseUrl("https://example.com")).toBe("https://example.com");
	});

	it("should prepend https:// if no protocol", () => {
		expect(normalizeBaseUrl("example.com")).toBe("https://example.com");
	});

	it("should preserve http:// protocol", () => {
		expect(normalizeBaseUrl("http://example.com")).toBe("http://example.com");
	});

	it("should preserve https:// protocol (case-insensitive)", () => {
		expect(normalizeBaseUrl("HTTPS://Example.com")).toBe("HTTPS://Example.com");
	});

	it("should trim whitespace before processing", () => {
		expect(normalizeBaseUrl("  example.com  ")).toBe("https://example.com");
	});
});

describe("getBlogBaseUrl", () => {
	describe("in production", () => {
		beforeEach(() => {
			vi.stubEnv("NODE_ENV", "production");
		});

		afterEach(() => {
			vi.unstubAllEnvs();
		});

		it("should return default blog URL when no domain provided", () => {
			expect(getBlogBaseUrl()).toBe("https://blog.yunielacosta.com");
		});

		it("should return default blog URL for empty string domain", () => {
			expect(getBlogBaseUrl("")).toBe("https://blog.yunielacosta.com");
		});

		it("should prepend blog. to provided domain", () => {
			expect(getBlogBaseUrl("https://yunielacosta.com")).toBe(
				"https://blog.yunielacosta.com",
			);
		});

		it("should not double-prepend blog. if already present", () => {
			expect(getBlogBaseUrl("https://blog.yunielacosta.com")).toBe(
				"https://blog.yunielacosta.com",
			);
		});

		it("should return default URL for invalid domain", () => {
			expect(getBlogBaseUrl("not a valid url at all !!!")).toBe(
				"https://blog.yunielacosta.com",
			);
		});

		it("should handle domain without protocol", () => {
			expect(getBlogBaseUrl("yunielacosta.com")).toBe(
				"https://blog.yunielacosta.com",
			);
		});
	});

	describe("in development", () => {
		beforeEach(() => {
			vi.stubEnv("NODE_ENV", "development");
		});

		afterEach(() => {
			vi.unstubAllEnvs();
		});

		it("should return localhost when no domain provided", () => {
			expect(getBlogBaseUrl()).toBe("http://localhost:4322");
		});

		it("should return localhost for empty domain", () => {
			expect(getBlogBaseUrl("")).toBe("http://localhost:4322");
		});

		it("should return localhost for localhost domain", () => {
			expect(getBlogBaseUrl("http://localhost:3000")).toBe(
				"http://localhost:4322",
			);
		});

		it("should return localhost for 127.0.0.1", () => {
			expect(getBlogBaseUrl("http://127.0.0.1:3000")).toBe(
				"http://localhost:4322",
			);
		});

		it("should handle IPv6 ::1 (brackets in hostname, not matched as localhost)", () => {
			// new URL("http://[::1]:3000").hostname === "[::1]" (with brackets)
			// isLocalhost doesn't match "[::1]", falls through to buildBlogBaseUrl
			// URL API ignores hostname assignment for IPv6, so origin stays as-is
			const result = getBlogBaseUrl("http://[::1]:3000");
			expect(result).toBe("http://[::1]:3000");
		});

		it("should return localhost for bare ::1 (invalid URL fallback)", () => {
			expect(getBlogBaseUrl("::1")).toBe("http://localhost:4322");
		});

		it("should prepend blog. to non-localhost domain in dev", () => {
			expect(getBlogBaseUrl("https://yunielacosta.com")).toBe(
				"https://blog.yunielacosta.com",
			);
		});

		it("should return localhost for invalid URL in dev", () => {
			expect(getBlogBaseUrl("not valid !!!")).toBe("http://localhost:4322");
		});
	});
});

describe("buildBlogUrl", () => {
	beforeEach(() => {
		vi.stubEnv("NODE_ENV", "development");
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("should concatenate base URL with path", () => {
		expect(buildBlogUrl("/my-post")).toBe("http://localhost:4322/my-post");
	});

	it("should handle empty path", () => {
		expect(buildBlogUrl("")).toBe("http://localhost:4322");
	});

	it("should use domain when provided", () => {
		vi.stubEnv("NODE_ENV", "production");
		expect(buildBlogUrl("/my-post", "https://yunielacosta.com")).toBe(
			"https://blog.yunielacosta.com/my-post",
		);
	});
});
