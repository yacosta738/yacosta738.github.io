// Disable Partytown by default to reduce ~40KB from initial bundle
// Enable only when you have external scripts that need to run in a web worker
import type { AstroIntegration } from "astro";

const hasExternalScripts = false;
export const whenExternalScripts = (
	items: (() => AstroIntegration) | (() => AstroIntegration)[] = [],
) =>
	hasExternalScripts
		? Array.isArray(items)
			? items.map((item) => item())
			: [items()]
		: [];
