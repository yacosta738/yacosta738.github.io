import { describe, expect, it } from "vitest";
import { getPublicOrigin, isLocalOrPrivateHostname } from "./public-origin";

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

	it("should return true for IPv4 private ranges", () => {
		expect(isLocalOrPrivateHostname("10.0.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("172.16.0.1")).toBe(true);
		expect(isLocalOrPrivateHostname("172.31.255.255")).toBe(true);
		expect(isLocalOrPrivateHostname("192.168.1.1")).toBe(true);
		expect(isLocalOrPrivateHostname("169.254.0.1")).toBe(true);
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
		expect(
			isLocalOrPrivateHostname("febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff"),
		).toBe(true);
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

	it("should return origin for public sites", () => {
		expect(getPublicOrigin(new URL("https://yunielacosta.com"))).toBe(
			"https://yunielacosta.com",
		);
	});
});
