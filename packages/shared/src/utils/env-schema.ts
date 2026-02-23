import { envField } from "astro/config";

export default {
	AHREFS_KEY: envField.string({
		context: "client",
		access: "public",
		default: "",
	}),
	BRAND_NAME: envField.string({
		context: "client",
		access: "public",
		default: "Yuniel Acosta - Full Stack Developer",
	}),
	SITE_TITLE: envField.string({
		context: "client",
		access: "public",
		default: "Yuniel Acosta - Full Stack Developer",
	}),
	SITE_DESCRIPTION_EN: envField.string({
		context: "client",
		access: "public",
		default: "Portfolio of Yuniel Acosta, Full Stack Developer",
	}),
	SITE_DESCRIPTION_ES: envField.string({
		context: "client",
		access: "public",
		default: "Portafolio de Yuniel Acosta, Desarrollador Full Stack",
	}),
	X_ACCOUNT: envField.string({
		context: "client",
		access: "public",
		default: "@yacosta738",
	}),
	NOT_TRANSLATED_CAUTION_EN: envField.string({
		context: "client",
		access: "public",
		default: "This page is not available in your language.",
	}),
	NOT_TRANSLATED_CAUTION_ES: envField.string({
		context: "client",
		access: "public",
		default: "Esta página no está disponible en tu idioma.",
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
