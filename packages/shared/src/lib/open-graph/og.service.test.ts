import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock heavy native deps before importing the module under test
vi.mock("node:fs/promises", () => ({
	readFile: vi.fn().mockResolvedValue(Buffer.from("fake-font")),
}));

vi.mock("satori", () => ({
	default: vi.fn().mockResolvedValue("<svg>mock</svg>"),
}));

vi.mock("sharp", () => ({
	default: vi.fn(() => ({
		toBuffer: vi.fn().mockResolvedValue(Buffer.from("mock-png")),
	})),
}));

// Dynamic import so mocks are registered first
const { getOgImagePath, default: generateOgImage } = await import(
	"./og.service"
);

describe("og.service — getOgImagePath()", () => {
	it("returns a path under ./og/ with .png extension", () => {
		expect(getOgImagePath("hello")).toBe("./og/hello.png");
	});

	it("strips a leading slash", () => {
		expect(getOgImagePath("/hello")).toBe("./og/hello.png");
	});

	it("strips a trailing slash", () => {
		expect(getOgImagePath("hello/")).toBe("./og/hello.png");
	});

	it("falls back to site title when empty string is passed", () => {
		const result = getOgImagePath("");
		expect(result).toMatch(/^\.\/og\/.+\.png$/);
	});

	it("uses default site title when called with no argument", () => {
		const result = getOgImagePath();
		expect(result).toMatch(/^\.\/og\/.+\.png$/);
	});
});

describe("og.service — generateOgImage()", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns a Buffer on success", async () => {
		const result = await generateOgImage("My Title");
		expect(Buffer.isBuffer(result)).toBe(true);
	});

	it("works with all optional arguments provided", async () => {
		const result = await generateOgImage(
			"Title",
			"Author",
			"Category",
			["tag1", "tag2"],
			new Date("2024-01-01"),
			"en",
		);
		expect(Buffer.isBuffer(result)).toBe(true);
	});

	it("throws a descriptive error when satori rejects", async () => {
		const satori = await import("satori");
		vi.mocked(satori.default).mockRejectedValueOnce(new Error("satori boom"));

		await expect(generateOgImage("Bad")).rejects.toThrow(
			"Failed to generate OG image",
		);
	});
});
