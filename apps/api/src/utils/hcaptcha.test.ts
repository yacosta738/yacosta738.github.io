import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyHCaptcha } from "./hcaptcha";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("verifyHCaptcha", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("accepts successful verification when hostname is allowlisted", async () => {
		mockFetch.mockResolvedValueOnce(
			new Response(JSON.stringify({ success: true, hostname: "example.com" }), {
				status: 200,
			}),
		);

		const result = await verifyHCaptcha("token", "secret", "127.0.0.1", [
			"example.com",
			"www.example.com",
		]);

		expect(result.success).toBe(true);
	});

	it("rejects successful verification when hostname is not allowlisted", async () => {
		mockFetch.mockResolvedValueOnce(
			new Response(
				JSON.stringify({ success: true, hostname: "attacker.com" }),
				{
					status: 200,
				},
			),
		);

		const result = await verifyHCaptcha("token", "secret", "127.0.0.1", [
			"example.com",
		]);

		expect(result.success).toBe(false);
		expect(result.message).toBe("Captcha hostname validation failed");
	});

	it("accepts successful verification when no expected hostnames are provided", async () => {
		mockFetch.mockResolvedValueOnce(
			new Response(
				JSON.stringify({ success: true, hostname: "any-host.com" }),
				{
					status: 200,
				},
			),
		);

		const result = await verifyHCaptcha("token", "secret", "127.0.0.1");

		expect(result.success).toBe(true);
	});
});
