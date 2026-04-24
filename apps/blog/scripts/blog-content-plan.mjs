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
