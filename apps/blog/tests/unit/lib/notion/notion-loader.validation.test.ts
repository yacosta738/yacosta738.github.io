import { assertNoRemoteNotionImages } from "@blog/lib/notion/notion-snapshot";
import { describe, expect, it } from "vitest";

describe("assertNoRemoteNotionImages", () => {
	it("throws when a cover still points to Notion S3", () => {
		expect(() =>
			assertNoRemoteNotionImages([
				{
					id: "es/2026/04/21/merge-queues",
					data: {
						cover:
							"https://prod-files-secure.s3.us-west-2.amazonaws.com/a/b/image.png",
					},
					body: "<p>ok</p>",
				},
			]),
		).toThrow(/remote notion image url/i);
	});

	it("throws when article HTML still contains a Notion S3 image", () => {
		expect(() =>
			assertNoRemoteNotionImages([
				{
					id: "es/2026/04/21/merge-queues",
					data: {
						cover: "/images/notion/ok/cover.png",
					},
					body: '<img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/a/b/file.gif">',
				},
			]),
		).toThrow(/remote notion image url/i);
	});

	it("passes when cover and inline images are local", () => {
		expect(() =>
			assertNoRemoteNotionImages([
				{
					id: "es/2026/04/21/merge-queues",
					data: {
						cover: "/images/notion/ok/cover.png",
					},
					body: '<img src="/images/notion/ok/file.gif">',
				},
			]),
		).not.toThrow();
	});
});
