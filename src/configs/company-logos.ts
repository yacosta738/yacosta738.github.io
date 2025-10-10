export const COMPANY_LOGOS: Record<string, string> = {
	gft: "gft",
	desoft: "desoft",
	"mercado libre": "meli",
	scanntech: "scanntech",
	"deutsche bank": "deutsche",
};

export function getCompanyLogo(companyName?: string): string | undefined {
	if (!companyName) return undefined;
	const key = companyName.trim().toLowerCase();
	return COMPANY_LOGOS[key];
}

export default COMPANY_LOGOS;
