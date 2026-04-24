import { describe, expect, it } from "vitest";
import { getBlogContentPlan } from "../../../scripts/blog-content-plan.mjs";

describe("getBlogContentPlan", () => {
	it("uses snapshot mode when a cache file already exists", () => {
		expect(
			getBlogContentPlan({
				snapshotExists: true,
				notionToken: "token",
				notionDatabaseId: "database",
			}),
		).toEqual({
			astroMode: "snapshot",
			requiresSync: false,
		});
	});

	it("syncs first when credentials exist but the snapshot is missing", () => {
		expect(
			getBlogContentPlan({
				snapshotExists: false,
				notionToken: "token",
				notionDatabaseId: "database",
			}),
		).toEqual({
			astroMode: "snapshot",
			requiresSync: true,
		});
	});

	it("disables Notion content when neither snapshot nor credentials are available", () => {
		expect(
			getBlogContentPlan({
				snapshotExists: false,
				notionToken: "",
				notionDatabaseId: "",
			}),
		).toEqual({
			astroMode: "disabled",
			requiresSync: false,
		});
	});
});
