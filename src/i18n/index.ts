import type { Multilingual } from "./types";

export * from "./i18n";
export * from "./locales";
export * from "./types";
export * from "./ui";
export * from "./utils";

export const tr = (
	t: (
		key: string | Multilingual,
		variables?: Record<string, string | number>,
	) => string,
	key: string,
	params: Record<string, unknown> = {},
	fallback = "",
) => {
	const s = t(
		key as unknown as Parameters<typeof t>[0],
		params as unknown as Parameters<typeof t>[1],
	) as unknown as string | undefined;
	return s && s !== key ? s : fallback;
};
