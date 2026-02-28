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

const MAX_HOSTNAME_LENGTH = 253;

const normalizeHostname = (hostname: string): string => {
	let value = hostname.toLowerCase();

	if (value.startsWith("[") && value.endsWith("]")) {
		value = value.slice(1, -1);
	}

	if (value.length > MAX_HOSTNAME_LENGTH) {
		value = value.slice(0, MAX_HOSTNAME_LENGTH);
	}

	let result = "";
	let previousWasDot = false;
	for (const char of value) {
		if (char === ".") {
			if (!previousWasDot) {
				result += char;
			}
			previousWasDot = true;
			continue;
		}

		result += char;
		previousWasDot = false;
	}

	return result.replace(/\.+$/, "");
};

const isLocalHostname = (hostname: string): boolean =>
	hostname === "localhost" ||
	hostname.endsWith(".localhost") ||
	hostname === "localhost.localdomain" ||
	hostname.endsWith(".local") ||
	hostname === "::1" ||
	hostname === "0:0:0:0:0:0:0:1" ||
	hostname === "0000:0000:0000:0000:0000:0000:0000:0001" ||
	hostname.startsWith("::ffff:127.") ||
	hostname === "0.0.0.0" ||
	hostname.startsWith("127.");

const isPrivateIpv6Address = (hostname: string): boolean =>
	hostname.includes(":") && /^(?:fc|fd|fe[89ab])/.test(hostname);

const isPrivateIpv4Address = (hostname: string): boolean => {
	const octets = toIpv4Octets(hostname);
	if (!octets) {
		return false;
	}

	const [first, second] = octets;

	return (
		first === 10 ||
		(first === 172 && second >= 16 && second <= 31) ||
		(first === 192 && second === 168) ||
		(first === 169 && second === 254)
	);
};

export const isLocalOrPrivateHostname = (hostname: string): boolean => {
	const normalizedHostname = normalizeHostname(hostname);

	if (isLocalHostname(normalizedHostname)) {
		return true;
	}

	if (isPrivateIpv6Address(normalizedHostname)) {
		return true;
	}

	return isPrivateIpv4Address(normalizedHostname);
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
