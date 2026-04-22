import { fileToUrl } from "@blog/lib/notion/notion-file";
import { describe, expect, it } from "vitest";

describe("fileToUrl", () => {
	it("returns undefined when given null", () => {
		expect(fileToUrl(null)).toBeUndefined();
	});

	it("returns undefined when given undefined", () => {
		expect(fileToUrl(undefined)).toBeUndefined();
	});

	it("returns the external URL for an external file object", () => {
		expect(
			fileToUrl({
				type: "external",
				external: { url: "https://example.com/image.png" },
			}),
		).toBe("https://example.com/image.png");
	});

	it("returns the file URL for a hosted file object", () => {
		expect(
			fileToUrl({
				type: "file",
				file: { url: "https://s3.amazonaws.com/bucket/file.pdf" },
			}),
		).toBe("https://s3.amazonaws.com/bucket/file.pdf");
	});

	it("returns undefined for an unknown file type", () => {
		expect(fileToUrl({ type: "other" } as never)).toBeUndefined();
	});
});
