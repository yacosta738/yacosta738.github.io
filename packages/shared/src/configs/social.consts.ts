import type { SocialIcon } from "@/types";

/**
 * A readonly map of supported social network keys to their corresponding icon identifiers.
 *
 * Each value is a string that references an icon from an icon set (for example, "lucide:github" or "simple-icons:discord").
 * The object is declared `as const` so each entry preserves its literal string type.
 *
 * Supported keys:
 * - github
 * - linkedin
 * - x
 * - twitter
 * - facebook
 * - instagram
 * - youtube
 * - codepen
 * - discord
 *
 * @remarks
 * Use this mapping when you need a stable, centralized source for social icon identifiers across the app.
 */

export const SOCIAL_ICONS: SocialIcon = {
	github: "lucide:github",
	linkedin: "lucide:linkedin",
	x: "lucide:twitter",
	twitter: "lucide:twitter",
	facebook: "lucide:facebook",
	instagram: "lucide:instagram",
	youtube: "lucide:youtube",
	codepen: "lucide:codepen",
	discord: "simple-icons:discord",
} as const;

const isSocialIconKey = (value: string): value is keyof SocialIcon => {
	return Object.hasOwn(SOCIAL_ICONS, value);
};

/**
 * Get the icon identifier for a given social network key.
 *
 * @param name - The social network key (one of the keys defined in SocialIcon).
 * @returns The icon identifier string for the given social network (e.g. "lucide:github").
 * If the key is not found, returns the fallback icon "lucide:origami".
 *
 * @example
 * const icon = getSocialIcon('github'); // "lucide:github"
 * const fallback = getSocialIcon('unknown'); // "lucide:origami"
 */
export const getSocialIcon = (name: string) => {
	const key = name.toLowerCase();
	const icon = isSocialIconKey(key) ? SOCIAL_ICONS[key] : undefined;
	return icon ?? "lucide:origami";
};
