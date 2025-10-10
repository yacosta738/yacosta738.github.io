import { readFile } from "node:fs/promises";
import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import { SITE_TITLE } from "@/configs/site.consts";
import { retrieveLocalizedString } from "@/i18n";
import { DEFAULT_LOCALE_SETTING } from "@/i18n/locales";
import { Template } from "./og.template";

const siteTitle = retrieveLocalizedString(SITE_TITLE);

/**
 * generate filename / path for generated OG images
 *
 * @param filename filename in asset folder
 * @returns
 */
export const getOgImagePath = (filename: string = siteTitle) => {
	let path = filename;

	if (path.startsWith("/")) path = path.substring(1);

	if (path.endsWith("/")) path = path.substring(0, path.length - 1);

	if (path === "") path = siteTitle;

	return `./og/${path}.png`;
};

/**
 * generate opengraph image with satori and return a buffer
 *
 * @param title Title text
 * @param date Date to display
 * @param author Author name
 * @param category Category name
 * @param tags Array of tags
 * @param lang Language code
 * @param renderOptions Rendering options
 */
const generateOgImage = async (
	title: string = siteTitle,
	author?: string,
	category?: string,
	tags?: string[],
	date: Date = new Date(),
	lang: string = DEFAULT_LOCALE_SETTING,
): Promise<Buffer> => {
	try {
		const options: SatoriOptions = {
			width: 1200,
			height: 630,
			embedFont: true,
			fonts: [
				{
					name: "JetBrainsMono",
					data: await readFile("./src/assets/font/JetBrainsMono-Bold.ttf"),
					weight: 600,
					style: "normal",
				},
				{
					name: "JetBrains Mono",
					data: await readFile("./src/assets/font/JetBrainsMono-Regular.ttf"),
					weight: 400,
					style: "normal",
				},
				{
					name: "PlusJakartaSans",
					data: await readFile("./src/assets/font/PlusJakartaSans-Bold.ttf"),
					weight: 900,
					style: "normal",
				},
			],
		};

		const svg = await satori(
			Template({
				title,
				author,
				category,
				tags,
				date,
				lang,
			}),
			options,
		);

		const sharpSvg = Buffer.from(svg);
		const buffer = await sharp(sharpSvg).toBuffer();

		return buffer;
	} catch (error) {
		console.error("Failed to generate OG image:", error);
		throw new Error(
			`Failed to generate OG image: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
};

export default generateOgImage;
