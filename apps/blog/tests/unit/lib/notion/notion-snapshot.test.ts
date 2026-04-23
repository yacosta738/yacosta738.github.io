import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
	assertNoRemoteNotionImages,
	collectLocalNotionAssetPaths,
	FatalNotionValidationError,
	readSnapshot,
	writeSnapshot,
} from "@blog/lib/notion/notion-snapshot";
import { describe, expect, it } from "vitest";

describe("notion-snapshot", () => {
	it("writes normalized entries to disk as JSON", () => {
		const dir = mkdtempSync(path.join(os.tmpdir(), "notion-snapshot-"));
		const filePath = path.join(dir, "notion-loader.json");

		writeSnapshot(filePath, {
			version: 1,
			lastSync: "2026-04-23T00:00:00.000Z",
			entries: [
				{
					id: "es/2026/04/21/merge-queues",
					data: { cover: "/images/notion/cover.png" },
					rendered: { html: "<p>ok</p>" },
				},
			],
		});

		const content = JSON.parse(readFileSync(filePath, "utf8"));
		expect(content.entries).toHaveLength(1);
		expect(content.entries[0].id).toBe("es/2026/04/21/merge-queues");
	});

	it("reads normalized entries from disk", () => {
		const dir = mkdtempSync(path.join(os.tmpdir(), "notion-snapshot-"));
		const filePath = path.join(dir, "notion-loader.json");

		writeSnapshot(filePath, {
			version: 1,
			lastSync: "2026-04-23T00:00:00.000Z",
			entries: [
				{
					id: "es/2026/04/21/merge-queues",
					data: { cover: "/images/notion/cover.png" },
					rendered: { html: "<p>ok</p>" },
				},
			],
		});

		const snapshot = readSnapshot(filePath);
		expect(snapshot.entries[0]?.id).toBe("es/2026/04/21/merge-queues");
	});

	it("throws when snapshot file is malformed", () => {
		const dir = mkdtempSync(path.join(os.tmpdir(), "notion-snapshot-"));
		const filePath = path.join(dir, "notion-loader.json");

		writeFileSync(
			filePath,
			JSON.stringify({ version: 2, entries: [] }),
			"utf8",
		);

		expect(() => readSnapshot(filePath)).toThrow(/expected version 1/i);
	});

	it("collects local notion asset paths from cover and rendered html", () => {
		const assetPaths = collectLocalNotionAssetPaths([
			{
				id: "es/2026/04/21/merge-queues",
				data: { cover: "/images/notion/covers/cover.png" },
				rendered: {
					html: '<img src="/images/notion/inline/file.gif"><img src="/images/notion/inline/file.gif">',
				},
			},
		]);

		expect(assetPaths).toEqual([
			"/images/notion/covers/cover.png",
			"/images/notion/inline/file.gif",
		]);
	});

	it("throws a fatal validation error for remote notion image urls", () => {
		expect(() =>
			assertNoRemoteNotionImages([
				{
					id: "es/2026/04/21/merge-queues",
					data: {
						cover:
							"https://prod-files-secure.s3.eu-central-1.amazonaws.com/a/b/image.png",
					},
				},
			]),
		).toThrow(FatalNotionValidationError);
	});
});
