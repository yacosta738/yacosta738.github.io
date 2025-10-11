import { vi } from "vitest";

// Mock astro:content module to avoid server-only module errors in tests
vi.mock("astro:content", () => ({
	getCollection: vi.fn(async () => []),
	getEntry: vi.fn(async () => null),
	getEntries: vi.fn(async () => []),
	render: vi.fn(async () => ({
		Content: () => null,
		headings: [],
		remarkPluginFrontmatter: {},
	})),
	z: {
		object: vi.fn(),
		string: vi.fn(),
		array: vi.fn(),
		boolean: vi.fn(),
		number: vi.fn(),
		date: vi.fn(),
		optional: vi.fn(),
		enum: vi.fn(),
		union: vi.fn(),
		record: vi.fn(),
		literal: vi.fn(),
		nullable: vi.fn(),
		transform: vi.fn(),
	},
}));

// Mock astro:i18n module
vi.mock("astro:i18n", () => ({
	getRelativeLocaleUrl: vi.fn(
		(lang: string, path: string) => `/${lang}${path}`,
	),
}));
