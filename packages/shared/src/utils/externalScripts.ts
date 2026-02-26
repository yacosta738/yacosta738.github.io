// Disable Partytown by default to reduce ~40KB from initial bundle
// Enable only when you have external scripts that need to run in a web worker
import type { AstroIntegration } from "astro";

const hasExternalScripts = false;

const normalizeToArray = (
	items: (() => AstroIntegration) | (() => AstroIntegration)[],
): AstroIntegration[] => {
	if (Array.isArray(items)) {
		return items.map((item) => item());
	}
	return [items()];
};

export const whenExternalScripts = (
	items: (() => AstroIntegration) | (() => AstroIntegration)[] = [],
): AstroIntegration[] => {
	if (!hasExternalScripts) {
		return [];
	}
	return normalizeToArray(items);
};
