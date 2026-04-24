/**
 * Determines the source of truth for blog content loading.
 *
 * @param {object} params
 * @param {boolean} params.snapshotExists Whether a cached Notion snapshot already exists.
 * @param {string} [params.notionToken] Optional Notion token from the environment.
 * @param {string} [params.notionDatabaseId] Optional Notion database id from the environment.
 * @returns {{ astroMode: "snapshot" | "disabled", requiresSync: boolean }}
 * The returned astroMode is the source of truth for the downstream BLOG_CONTENT_SOURCE
 * environment variable, and requiresSync indicates whether callers must run the Notion
 * sync/validation steps before invoking Astro.
 */
export const getBlogContentPlan = ({
	snapshotExists,
	notionToken,
	notionDatabaseId,
}) => {
	if (snapshotExists) {
		return {
			astroMode: "snapshot",
			requiresSync: false,
		};
	}

	if (notionToken && notionDatabaseId) {
		return {
			astroMode: "snapshot",
			requiresSync: true,
		};
	}

	return {
		astroMode: "disabled",
		requiresSync: false,
	};
};
