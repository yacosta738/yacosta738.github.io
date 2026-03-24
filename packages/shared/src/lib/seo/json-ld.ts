/**
 * Shared JSON-LD structured data utilities for SEO.
 */

/** Safely serialize JSON-LD, escaping `<` to prevent `</script>` breakout */
export const safeJsonLd = (data: Record<string, unknown>): string =>
	JSON.stringify(data).replaceAll("<", String.raw`\u003c`);

/** Extract a URL string from an image that may be a string or ImageMetadata */
const getImageUrl = (
	img: string | { src: string } | null | undefined,
): string => {
	if (!img) return "";
	if (typeof img === "string") return img;
	if (typeof img === "object" && "src" in img) return img.src;
	return "";
};

/**
 * Build a Person JSON-LD object from resume basics data.
 */
export function buildPersonJsonLd(
	basics: {
		name?: string;
		label?: string;
		summary?: string;
		url?: string;
		image?: string | { src: string } | null;
		email?: string;
		location?: { city?: string; countryCode?: string } | null;
		profiles?: Array<{ url: string }>;
	},
	siteOrigin: string,
): Record<string, unknown> {
	const imageUrl = getImageUrl(basics.image);
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: basics.name,
		jobTitle: basics.label,
		description: basics.summary,
		url: basics.url || siteOrigin,
		...(imageUrl && {
			image: imageUrl.startsWith("http")
				? imageUrl
				: new URL(imageUrl, siteOrigin).href,
		}),
		...(basics.email && { email: `mailto:${basics.email}` }),
		...(basics.location && {
			address: {
				"@type": "PostalAddress",
				addressLocality: basics.location.city,
				addressCountry: basics.location.countryCode,
			},
		}),
		...(basics.profiles &&
			basics.profiles.length > 0 && {
				sameAs: basics.profiles.map((p) => p.url),
			}),
	};
}
