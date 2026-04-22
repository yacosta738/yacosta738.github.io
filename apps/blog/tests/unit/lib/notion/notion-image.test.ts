import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
	containsS3Url,
	createS3UrlRegex,
	downloadImagesInHtml,
	downloadNotionImage,
	isNotionS3Url,
	resolveImageDir,
} from "@blog/lib/notion/notion-image";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const S3_URL =
	"https://prod-files-secure.s3.us-west-2.amazonaws.com/aaaa-bbbb/cccc-dddd/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=3600";
const DOUBLE_ENCODED_S3_URL =
	"https://prod-files-secure.s3.us-west-2.amazonaws.com/aaaa-bbbb/cccc-dddd/image.png?foo=&#x26;amp;bar";
const SPOOFED_S3_URL =
	"https://prod-files-secure.s3.evil.com/aaaa-bbbb/cccc-dddd/image.png?X-Amz-Algorithm=test";
const TRAVERSAL_S3_URL =
	"https://prod-files-secure.s3.us-west-2.amazonaws.com/../../etc/passwd/cccc-dddd/image.png?X-Amz-Algorithm=test";

const EXTERNAL_URL = "https://media.licdn.com/dms/image/example.png";

describe("isNotionS3Url", () => {
	it("returns true for Notion S3 URLs", () => {
		expect(isNotionS3Url(S3_URL)).toBe(true);
	});

	it("returns false for external URLs", () => {
		expect(isNotionS3Url(EXTERNAL_URL)).toBe(false);
	});

	it("returns false for spoofed non-AWS S3-like hostnames", () => {
		expect(isNotionS3Url(SPOOFED_S3_URL)).toBe(false);
	});

	it("returns false for local paths", () => {
		expect(isNotionS3Url("/images/notion/abc/def.png")).toBe(false);
	});
});

describe("downloadNotionImage", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-img-"));
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
		vi.restoreAllMocks();
	});

	it("returns original URL for non-S3 URLs", async () => {
		const result = await downloadNotionImage(EXTERNAL_URL, tempDir);
		expect(result).toBe(EXTERNAL_URL);
	});

	it("returns original URL for spoofed S3-like hostnames", async () => {
		const result = await downloadNotionImage(SPOOFED_S3_URL, tempDir);
		expect(result).toBe(SPOOFED_S3_URL);
	});

	it("returns original URL when path segments are unsafe", async () => {
		const result = await downloadNotionImage(TRAVERSAL_S3_URL, tempDir);
		expect(result).toBe(TRAVERSAL_S3_URL);
	});

	it("downloads S3 image and returns public path", async () => {
		const fakeImage = new Uint8Array([137, 80, 78, 71]); // PNG magic bytes
		vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(fakeImage, {
				status: 200,
				headers: { "content-type": "image/png" },
			}),
		);

		const result = await downloadNotionImage(S3_URL, tempDir);

		expect(result).toBe("/images/notion/aaaa-bbbb/cccc-dddd.png");

		// Verify file was written
		const localPath = path.join(tempDir, "aaaa-bbbb", "cccc-dddd.png");
		expect(existsSync(localPath)).toBe(true);
		const content = await readFile(localPath);
		expect(content[0]).toBe(137); // PNG magic byte
	});

	it("returns cached public path if file already exists", async () => {
		const fakeImage = new Uint8Array([137, 80, 78, 71]);
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(fakeImage, {
				status: 200,
				headers: { "content-type": "image/png" },
			}),
		);

		// First download
		await downloadNotionImage(S3_URL, tempDir);
		expect(fetchSpy).toHaveBeenCalledTimes(1);

		// Second call should use cache (no fetch)
		const result = await downloadNotionImage(S3_URL, tempDir);
		expect(result).toBe("/images/notion/aaaa-bbbb/cccc-dddd.png");
		expect(fetchSpy).toHaveBeenCalledTimes(1); // Still 1
	});

	it("falls back to original URL on fetch failure", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(null, { status: 403 }),
		);

		const result = await downloadNotionImage(S3_URL, tempDir);
		expect(result).toBe(S3_URL);
	});

	it("falls back to original URL on network error", async () => {
		vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
			new Error("Network error"),
		);

		const result = await downloadNotionImage(S3_URL, tempDir);
		expect(result).toBe(S3_URL);
	});

	it("aborts slow downloads with a timeout signal", async () => {
		const fetchSpy = vi
			.spyOn(globalThis, "fetch")
			.mockRejectedValueOnce(new Error("The operation was aborted"));

		const result = await downloadNotionImage(S3_URL, tempDir);

		expect(result).toBe(S3_URL);
		expect(fetchSpy).toHaveBeenCalledWith(
			S3_URL,
			expect.objectContaining({ signal: expect.any(AbortSignal) }),
		);
	});

	it("falls back to original URL when content-type is not an image", async () => {
		const xmlBody = "<Error><Code>AccessDenied</Code></Error>";
		vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(xmlBody, {
				status: 200,
				headers: { "content-type": "application/xml" },
			}),
		);

		const result = await downloadNotionImage(S3_URL, tempDir);
		expect(result).toBe(S3_URL);
	});

	it("falls back to original URL when content-type header is missing", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response("data", { status: 200 }),
		);

		const result = await downloadNotionImage(S3_URL, tempDir);
		expect(result).toBe(S3_URL);
	});

	it("handles HTML-encoded ampersands in URLs", async () => {
		const htmlEncodedUrl = S3_URL.replaceAll("&", "&#x26;");
		const fakeImage = new Uint8Array([255, 216, 255]); // JPEG magic bytes
		vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(fakeImage, {
				status: 200,
				headers: { "content-type": "image/jpeg" },
			}),
		);

		// The function should decode entities and still download
		const result = await downloadNotionImage(htmlEncodedUrl, tempDir);
		// Non-S3 after decoding? No — the prefix check uses the raw URL
		// which still starts with the S3 prefix before the query params
		expect(result).toBe("/images/notion/aaaa-bbbb/cccc-dddd.png");
	});

	it("does not double-unescape doubly encoded ampersands", async () => {
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			new Response(new Uint8Array([137, 80, 78, 71]), {
				status: 200,
				headers: { "content-type": "image/png" },
			}),
		);

		await downloadNotionImage(DOUBLE_ENCODED_S3_URL, tempDir);

		expect(fetchSpy).toHaveBeenCalledWith(
			expect.stringContaining("foo=&amp;bar"),
			expect.objectContaining({ signal: expect.any(AbortSignal) }),
		);
	});
});

describe("downloadImagesInHtml", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-html-"));
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
		vi.restoreAllMocks();
	});

	it("returns HTML unchanged when no S3 URLs present", async () => {
		const html = `<img src="${EXTERNAL_URL}" alt="test">`;
		const result = await downloadImagesInHtml(html, tempDir);
		expect(result).toBe(html);
	});

	it("replaces S3 URLs in HTML with local paths", async () => {
		const fakeImage = new Uint8Array([137, 80, 78, 71]);
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			new Response(fakeImage, {
				status: 200,
				headers: { "content-type": "image/png" },
			}),
		);

		const html = `<div class="notion-image"><img src="${S3_URL}" alt=""></div>`;
		const result = await downloadImagesInHtml(html, tempDir);

		expect(result).toContain("/images/notion/aaaa-bbbb/cccc-dddd.png");
		expect(result).not.toContain("prod-files-secure.s3");
	});

	it("replaces HTML-encoded S3 URLs", async () => {
		const fakeImage = new Uint8Array([137, 80, 78, 71]);
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			new Response(fakeImage, {
				status: 200,
				headers: { "content-type": "image/png" },
			}),
		);

		const encodedUrl = S3_URL.replaceAll("&", "&#x26;");
		const html = `<img src="${encodedUrl}" alt="">`;
		const result = await downloadImagesInHtml(html, tempDir);

		expect(result).toContain("/images/notion/aaaa-bbbb/cccc-dddd.png");
		expect(result).not.toContain("prod-files-secure.s3");
	});

	it("handles multiple S3 URLs in HTML", async () => {
		const fakeImage = new Uint8Array([137, 80, 78, 71]);
		vi.spyOn(globalThis, "fetch").mockImplementation(
			async () =>
				new Response(new Uint8Array(fakeImage), {
					status: 200,
					headers: { "content-type": "image/png" },
				}),
		);

		const url2 =
			"https://prod-files-secure.s3.us-west-2.amazonaws.com/xxxx/yyyy/photo.jpg?X-Amz-Algorithm=test";
		const html = `<img src="${S3_URL}"><img src="${url2}">`;
		const result = await downloadImagesInHtml(html, tempDir);

		expect(result).toContain("/images/notion/aaaa-bbbb/cccc-dddd.png");
		expect(result).toContain("/images/notion/xxxx/yyyy.jpg");
		expect(result).not.toContain("prod-files-secure.s3");
	});
});

describe("downloadNotionImage – logger branch", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-logger-"));
	});

	afterEach(async () => {
		await rm(tempDir, { recursive: true, force: true });
		vi.restoreAllMocks();
	});

	it("calls logger.warn when paths cannot be derived for a valid S3 host URL", async () => {
		// A URL that passes isNotionS3Url (correct host) but has only 2 path segments,
		// so deriveImagePaths returns null → triggers the !paths logger branch (lines 131-134).
		const shortPathUrl =
			"https://prod-files-secure.s3.us-west-2.amazonaws.com/parentId/objId?X-Amz-Algorithm=AWS4-HMAC-SHA256";
		const warnSpy = vi.fn();
		const debugSpy = vi.fn();

		const result = await downloadNotionImage(shortPathUrl, tempDir, {
			warn: warnSpy,
			debug: debugSpy,
		});

		expect(result).toBe(shortPathUrl);
		expect(warnSpy).toHaveBeenCalledOnce();
		expect(warnSpy.mock.calls[0][0]).toContain("unable to parse S3 URL");
	});

	it("falls back to logger.debug when warn is absent and paths cannot be derived", async () => {
		const shortPathUrl =
			"https://prod-files-secure.s3.us-west-2.amazonaws.com/parentId/objId?X-Amz-Algorithm=AWS4-HMAC-SHA256";
		const debugSpy = vi.fn();

		const result = await downloadNotionImage(shortPathUrl, tempDir, {
			debug: debugSpy,
		});

		expect(result).toBe(shortPathUrl);
		expect(debugSpy).toHaveBeenCalledOnce();
		expect(debugSpy.mock.calls[0][0]).toContain("unable to parse S3 URL");
	});
});

describe("createS3UrlRegex / containsS3Url", () => {
	it("matches S3 URLs in HTML content", () => {
		const html = `<img src="${S3_URL}" alt="">`;
		expect(createS3UrlRegex().test(html)).toBe(true);
		expect(containsS3Url(html)).toBe(true);
	});

	it("does not match non-S3 URLs", () => {
		const html = `<img src="${EXTERNAL_URL}" alt="">`;
		expect(createS3UrlRegex().test(html)).toBe(false);
		expect(containsS3Url(html)).toBe(false);
	});

	it("returns independent regex instances", () => {
		expect(createS3UrlRegex()).not.toBe(createS3UrlRegex());
	});
});

describe("resolveImageDir", () => {
	it("resolves to public/images/notion relative to cache file", () => {
		const cacheUrl = new URL(
			"file:///project/apps/blog/.cache/notion-loader.json",
		);
		const result = resolveImageDir(cacheUrl);
		expect(result).toContain("public");
		expect(result).toContain("images");
		expect(result).toContain("notion");
		expect(result).toContain(
			path.join("apps", "blog", "public", "images", "notion"),
		);
	});
});
