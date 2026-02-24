/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Pagefind UI global type definitions
interface PagefindUIOptions {
	element: string;
	showSubResults?: boolean;
	showImages?: boolean;
	excerptLength?: number;
	resetStyles?: boolean;
	autofocus?: boolean;
	translations?: {
		placeholder?: string;
		[key: string]: string | undefined;
	};
	pageSize?: number;
	debounceTimeoutMs?: number;
}

interface PagefindUI {
	new (
		options: PagefindUIOptions,
	): {
		destroy: () => void;
		triggerSearch: (term: string) => void;
		triggerFilters: (filters: Record<string, string[]>) => void;
	};
}

interface Window {
	PagefindUI: PagefindUI;
	getCaptchaToken?: (widgetId: string) => string | null;
	resetCaptcha?: (widgetId: string) => void;
}
