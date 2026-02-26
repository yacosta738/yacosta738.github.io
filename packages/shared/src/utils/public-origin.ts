const toIpv4Octets = (hostname: string): number[] | null => {
	if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)) {
		return null;
	}

	const octets = hostname.split(".").map(Number);
	if (octets.some((octet) => Number.isNaN(octet) || octet < 0 || octet > 255)) {
		return null;
	}

	return octets;
};

export const isLocalOrPrivateHostname = (hostname: string): boolean => {
	let value = hostname.toLowerCase();
	if (value.startsWith("[") && value.endsWith("]")) {
		value = value.slice(1, -1);
	}
	value = value.replace(/\.+$/, "");

	if (
		value === "localhost" ||
		value.endsWith(".localhost") ||
		value === "localhost.localdomain" ||
		value.endsWith(".local") ||
		value === "::1" ||
		value === "0:0:0:0:0:0:0:1" ||
		value === "0.0.0.0" ||
		value.startsWith("127.")
	) {
		return true;
	}

	if (value.includes(":")) {
		if (
			value.startsWith("fc") ||
			value.startsWith("fd") ||
			value.startsWith("fe8") ||
			value.startsWith("fe9") ||
			value.startsWith("fea") ||
			value.startsWith("feb")
		) {
			return true;
		}
	}

	const octets = toIpv4Octets(value);
	if (!octets) {
		return false;
	}

	const [first, second] = octets;
	if (first === 10) {
		return true;
	}

	if (first === 172 && second >= 16 && second <= 31) {
		return true;
	}

	if (first === 192 && second === 168) {
		return true;
	}

	if (first === 169 && second === 254) {
		return true;
	}

	return false;
};

export const getPublicOrigin = (site?: URL): string => {
	if (!site) {
		return "";
	}

	if (site.protocol !== "http:" && site.protocol !== "https:") {
		return "";
	}

	if (isLocalOrPrivateHostname(site.hostname)) {
		return "";
	}

	return site.origin;
};

export const getOriginAndOg = (
	site: URL | undefined,
	defaultLocale: string,
): {
	alternatesOrigin: string;
	ogImage: string;
	ogUrl: string;
} => {
	const alternatesOrigin = getPublicOrigin(site);
	const baseOrigin = alternatesOrigin || "http://localhost";

	return {
		alternatesOrigin,
		ogImage: `${baseOrigin}/ogp.png`,
		ogUrl: `${baseOrigin}/${defaultLocale}/`,
	};
};
