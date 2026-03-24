type MockPage = Record<string, unknown>;

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

	databases = {
		query: async () => ({ results: globalThis.__notionPages ?? [] }),
	};
	blocks = { children: { list: async () => ({ results: [] }) } };
}

export const isFullPage = () => true;
export const isFullBlock = () => true;
export const iteratePaginatedAPI = async function* () {
	for (const page of globalThis.__notionPages ?? []) {
		yield page;
	}
};
