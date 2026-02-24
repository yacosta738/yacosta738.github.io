import { envField } from "astro/config";

export default {
	DOMAIN: envField.string({
		context: "client",
		access: "public",
		optional: true,
	}),
	AHREFS_KEY: envField.string({
		context: "client",
		access: "public",
		default: "",
	}),
	API_URL: envField.string({
		context: "client",
		access: "public",
		default: "http://localhost:8787",
	}),
	HCAPTCHA_SITE_KEY: envField.string({
		context: "client",
		access: "public",
		optional: true,
	}),
};
