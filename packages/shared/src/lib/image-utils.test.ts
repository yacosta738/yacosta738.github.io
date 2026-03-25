import { beforeEach, describe, expect, it, vi } from "vitest";
import { isLocalImage, prepareImageForOptimizedPicture } from "./image-utils";

vi.mock("@/utils/images", () => ({
	findImage: vi.fn(),
}));

import { findImage } from "@/utils/images";

const mockFindImage = vi.mocked(findImage);

describe("isLocalImage", () => {
	it("returns true for relative paths", () => {
		expect(isLocalImage("./assets/photo.png")).toBe(true);
		expect(isLocalImage("assets/photo.png")).toBe(true);
		expect(isLocalImage("../images/pic.jpg")).toBe(true);
	});

	it("returns false for http URLs", () => {
		expect(isLocalImage("http://example.com/photo.png")).toBe(false);
		expect(isLocalImage("https://example.com/photo.png")).toBe(false);
	});

	it("returns false for absolute/public paths", () => {
		expect(isLocalImage("/images/photo.png")).toBe(false);
	});
});

describe("prepareImageForOptimizedPicture", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("returns ImageMetadata object as-is when valid", async () => {
		const meta = { src: "/img.png", width: 100, height: 100, format: "png" };
		const result = await prepareImageForOptimizedPicture(meta);
		expect(result).toBe(meta);
	});

	it("returns null for non-ImageMetadata objects (missing src)", async () => {
		const obj = { width: 100, height: 100 };
		const result = await prepareImageForOptimizedPicture(obj);
		expect(result).toBeNull();
	});

	it("returns null for objects with non-string src", async () => {
		const obj = { src: 123 };
		const result = await prepareImageForOptimizedPicture(obj);
		expect(result).toBeNull();
	});

	it("returns null for objects with non-number width", async () => {
		const obj = { src: "/img.png", width: "100" };
		const result = await prepareImageForOptimizedPicture(obj);
		expect(result).toBeNull();
	});

	it("returns null for objects with non-number height", async () => {
		const obj = { src: "/img.png", height: "50" };
		const result = await prepareImageForOptimizedPicture(obj);
		expect(result).toBeNull();
	});

	it("returns ImageMetadata when src is string and width/height are undefined", async () => {
		const meta = { src: "/img.png" };
		const result = await prepareImageForOptimizedPicture(meta);
		expect(result).toBe(meta);
	});

	it("returns null for null input", async () => {
		const result = await prepareImageForOptimizedPicture(null);
		expect(result).toBeNull();
	});

	it("returns null for non-string, non-object input", async () => {
		expect(await prepareImageForOptimizedPicture(42)).toBeNull();
		expect(await prepareImageForOptimizedPicture(true)).toBeNull();
		expect(await prepareImageForOptimizedPicture(undefined)).toBeNull();
	});

	it("returns http URL strings as-is", async () => {
		const url = "https://example.com/photo.jpg";
		const result = await prepareImageForOptimizedPicture(url);
		expect(result).toBe(url);
		expect(mockFindImage).not.toHaveBeenCalled();
	});

	it("returns http URL strings as-is (http)", async () => {
		const result = await prepareImageForOptimizedPicture(
			"http://example.com/a.png",
		);
		expect(result).toBe("http://example.com/a.png");
	});

	it("resolves local path via findImage when metadata is returned", async () => {
		const meta = { src: "/resolved.png", width: 200, height: 100 };
		mockFindImage.mockResolvedValue(
			meta as ReturnType<typeof mockFindImage> extends Promise<infer T>
				? T
				: never,
		);
		const result = await prepareImageForOptimizedPicture("./local/photo.png");
		expect(mockFindImage).toHaveBeenCalledWith("./local/photo.png");
		expect(result).toBe(meta);
	});

	it("returns original string when findImage returns null", async () => {
		mockFindImage.mockResolvedValue(null);
		const result = await prepareImageForOptimizedPicture("./missing.png");
		expect(result).toBe("./missing.png");
	});

	it("returns original string when findImage throws", async () => {
		mockFindImage.mockRejectedValue(new Error("fail"));
		const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		try {
			const result = await prepareImageForOptimizedPicture("./broken.png");
			expect(result).toBe("./broken.png");
			expect(consoleSpy).toHaveBeenCalled();
		} finally {
			consoleSpy.mockRestore();
		}
	});
});
