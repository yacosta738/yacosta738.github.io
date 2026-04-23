import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
	collectLocalNotionAssetPaths,
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
});
