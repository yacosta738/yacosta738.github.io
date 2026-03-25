import { describe, expect, it } from "vitest";
import {
	getOriginAndOg,
	getPublicOrigin,
	isLocalOrPrivateHostname,
	resolvePublicOrigin,
} from "./public-origin";

describe("isLocalOrPrivateHostname", () => {
	it("should return true for localhost", () => {
		expect(isLocalOrPrivateHostname("localhost")).toBe(true);
		expect(isLocalOrPrivateHostname("my.localhost")).toBe(true);
		expect(isLocalOrPrivateHostname("localhost.localdomain")).toBe(true);
	});

	it("should return true for .local hostnames", () => {
		expect(isLocalOrPrivateHostname("my-device.local")).toBe(true);
	});

	it("should return true for loopback addresses", () => {
		expect(isLocalOrPrivateHostname("127.0.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("127.0.1.1")).toBe(true);
		expect(isLocalOrPrivateHostname("::1")).toBe(true);
		expect(isLocalOrPrivateHostname("[::1]")).toBe(true);
		expect(isLocalOrPrivateHostname("0:0:0:0:0:0:0:1")).toBe(true);
		expect(isLocalOrPrivateHostname("0.0.0.0")).toBe(true);
	});

	it("should return true for full-length IPv6 loopback", () => {
		expect(
			isLocalOrPrivateHostname("0000:0000:0000:0000:0000:0000:0000:0001"),
		).toBe(true);
	});

	it("should return true for IPv4-mapped IPv6 loopback (::ffff:127.x)", () => {
		expect(isLocalOrPrivateHostname("::ffff:127.0.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("::ffff:127.255.255.255")).toBe(true);
	});

	it("should return true for IPv4 private ranges", () => {
		expect(isLocalOrPrivateHostname("10.0.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("10.255.255.255")).toBe(true);
		expect(isLocalOrPrivateHostname("172.16.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("172.31.255.255")).toBe(true);
		expect(isLocalOrPrivateHostname("192.168.1.1")).toBe(true);
		expect(isLocalOrPrivateHostname("192.168.0.0")).toBe(true);
		expect(isLocalOrPrivateHostname("169.254.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("169.254.255.255")).toBe(true);
	});

	it("should return false for non-private IPv4 in 172.x range", () => {
		expect(isLocalOrPrivateHostname("172.15.0.1")).toBe(false);
		expect(isLocalOrPrivateHostname("172.32.0.1")).toBe(false);
	});

	it("should return false for public hostnames", () => {
		expect(isLocalOrPrivateHostname("google.com")).toBe(false);
		expect(isLocalOrPrivateHostname("fcd.com")).toBe(false);
		expect(isLocalOrPrivateHostname("yunielacosta.com")).toBe(false);
		expect(isLocalOrPrivateHostname("8.8.8.8")).toBe(false);
	});

	it("should return true for IPv6 ULA (fc00::/7)", () => {
		expect(isLocalOrPrivateHostname("fc00::1")).toBe(true);
		expect(isLocalOrPrivateHostname("[fc00::1]")).toBe(true);
		expect(
			isLocalOrPrivateHostname("fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"),
		).toBe(true);
	});

	it("should return true for IPv6 Link-Local (fe80::/10)", () => {
		expect(isLocalOrPrivateHostname("fe80::1")).toBe(true);
		expect(isLocalOrPrivateHostname("fe90::1")).toBe(true);
		expect(isLocalOrPrivateHostname("fea0::1")).toBe(true);
		expect(isLocalOrPrivateHostname("feb0::1")).toBe(true);
		expect(
			isLocalOrPrivateHostname("febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff"),
		).toBe(true);
	});

	it("should return false for non-private IPv6", () => {
		expect(isLocalOrPrivateHostname("2001:db8::1")).toBe(false);
	});

	// normalizeHostname edge cases
	it("normalizes uppercase to lowercase", () => {
		expect(isLocalOrPrivateHostname("LOCALHOST")).toBe(true);
		expect(isLocalOrPrivateHostname("LocalHost")).toBe(true);
	});

	it("strips bracket notation from IPv6", () => {
		expect(isLocalOrPrivateHostname("[::1]")).toBe(true);
		expect(isLocalOrPrivateHostname("[fc00::1]")).toBe(true);
	});

	it("collapses consecutive dots", () => {
		expect(isLocalOrPrivateHostname("my..localhost")).toBe(true);
	});

	it("removes trailing dots", () => {
		expect(isLocalOrPrivateHostname("localhost.")).toBe(true);
		expect(isLocalOrPrivateHostname("localhost...")).toBe(true);
	});

	it("truncates hostnames exceeding 253 characters", () => {
		const longHost = "a".repeat(260) + ".localhost";
		// After truncation to 253, this won't end with .localhost
		expect(isLocalOrPrivateHostname(longHost)).toBe(false);
	});

	it("returns false for invalid IPv4 octets > 255", () => {
		expect(isLocalOrPrivateHostname("10.0.0.256")).toBe(false);
		expect(isLocalOrPrivateHostname("999.0.0.1")).toBe(false);
	});

	it("returns false for IPv4-like strings that don't match pattern", () => {
		expect(isLocalOrPrivateHostname("10.0.0")).toBe(false);
		expect(isLocalOrPrivateHostname("10.0.0.1.2")).toBe(false);
	});
});

describe("getPublicOrigin", () => {
	it("should return empty string for undefined site", () => {
		expect(getPublicOrigin(undefined)).toBe("");
	});

	it("should return empty string for local sites", () => {
		expect(getPublicOrigin(new URL("http://localhost:4321"))).toBe("");
	});

	it("should return empty string for non-http(s) protocols", () => {
		expect(getPublicOrigin(new URL("ftp://example.com"))).toBe("");
	});

	it("should return origin for public https sites", () => {
		expect(getPublicOrigin(new URL("https://yunielacosta.com"))).toBe(
			"https://yunielacosta.com",
		);
	});

	it("should return origin for public http sites", () => {
		expect(getPublicOrigin(new URL("http://yunielacosta.com"))).toBe(
			"http://yunielacosta.com",
		);
	});

	it("should return empty string for private IP sites", () => {
		expect(getPublicOrigin(new URL("http://192.168.1.1:8080"))).toBe("");
		expect(getPublicOrigin(new URL("http://10.0.0.1"))).toBe("");
	});
});

describe("resolvePublicOrigin", () => {
	const makeRequest = (host?: string) =>
		new Request("https://dummy.test", {
			headers: host ? { host } : {},
		});

	it("returns site origin when site is public", () => {
		const site = new URL("https://yunielacosta.com");
		const result = resolvePublicOrigin(
			site,
			makeRequest(),
			new URL("http://localhost:4321"),
		);
		expect(result).toBe("https://yunielacosta.com");
	});

	it("falls back to host header when site is local", () => {
		const result = resolvePublicOrigin(
			new URL("http://localhost:4321"),
			makeRequest("yunielacosta.com"),
			new URL("http://localhost:4321"),
		);
		expect(result).toBe("https://yunielacosta.com");
	});

	it("falls back to currentUrl when host header is also local", () => {
		const result = resolvePublicOrigin(
			new URL("http://localhost:4321"),
			makeRequest("localhost:3000"),
			new URL("https://example.com"),
		);
		expect(result).toBe("https://example.com");
	});

	it("falls back to currentUrl when no host header", () => {
		const result = resolvePublicOrigin(
			undefined,
			makeRequest(),
			new URL("https://example.com"),
		);
		expect(result).toBe("https://example.com");
	});

	it("returns empty string when all sources are local", () => {
		const result = resolvePublicOrigin(
			new URL("http://localhost"),
			makeRequest("localhost"),
			new URL("http://localhost:4321"),
		);
		expect(result).toBe("");
	});

	it("handles invalid host header gracefully", () => {
		// A host header that causes URL constructor to throw
		const result = resolvePublicOrigin(
			undefined,
			makeRequest(":::invalid"),
			new URL("https://fallback.com"),
		);
		expect(result).toBe("https://fallback.com");
	});

	it("uses site undefined and host header is private IP", () => {
		const result = resolvePublicOrigin(
			undefined,
			makeRequest("192.168.1.1"),
			new URL("https://public.example.com"),
		);
		expect(result).toBe("https://public.example.com");
	});
});

describe("getOriginAndOg", () => {
	it("returns public origin and og URLs for a public site", () => {
		const result = getOriginAndOg(new URL("https://yunielacosta.com"), "en");
		expect(result).toEqual({
			alternatesOrigin: "https://yunielacosta.com",
			ogImage: "https://yunielacosta.com/ogp.png",
			ogUrl: "https://yunielacosta.com/en/",
		});
	});

	it("falls back to localhost when site is not public", () => {
		const result = getOriginAndOg(new URL("http://localhost:4321"), "es");
		expect(result).toEqual({
			alternatesOrigin: "",
			ogImage: "http://localhost/ogp.png",
			ogUrl: "http://localhost/es/",
		});
	});

	it("falls back to localhost when site is undefined", () => {
		const result = getOriginAndOg(undefined, "en");
		expect(result).toEqual({
			alternatesOrigin: "",
			ogImage: "http://localhost/ogp.png",
			ogUrl: "http://localhost/en/",
		});
	});
});
