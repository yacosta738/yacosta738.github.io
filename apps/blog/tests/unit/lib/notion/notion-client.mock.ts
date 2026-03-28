type MockPage = Record<string, unknown>;

export const LogLevel = {
	ERROR: "error",
};

declare global {
	var __notionImportError: string | undefined;
	var __notionPages: MockPage[] | undefined;
}

export class Client {
	constructor() {
		if (globalThis.__notionImportError) {
			throw new Error(globalThis.__notionImportError);
		}
	}

	request = async () => ({ results: globalThis.__notionPages ?? [] });
	databases = {};
	blocks = { children: { list: async () => ({ results: [] }) } };
}

export const isFullPage = () => true;
export const isFullBlock = () => true;
export const iteratePaginatedAPI = async function* () {
	for (const page of globalThis.__notionPages ?? []) {
		yield page;
	}
};
