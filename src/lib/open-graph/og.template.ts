import { BRAND_NAME } from "@/configs/site.consts";
import { DEFAULT_LOCALE_SETTING } from "@/i18n";
import type { OgData } from "./og.types";

/**
 * Opengraph template to generate svg
 */
export const Template = (props: OgData) => {
	const {
		title,
		author,
		category,
		tags,
		date,
		lang = DEFAULT_LOCALE_SETTING,
	} = props;

	if (!title) {
		throw new Error("Title is required for Open Graph image generation");
	}

	const dateLocale = lang === "es" ? "es-ES" : "en-US";
	const dateFormatter = {
		year: "numeric",
		month: "long",
		day: "numeric",
	} as const;

	const formattedDate = date
		? typeof date === "string"
			? date
			: new Date(date).toLocaleDateString(dateLocale, dateFormatter)
		: new Date().toLocaleDateString(dateLocale, dateFormatter);

	return {
		type: "div",
		props: {
			tw: "flex w-full h-full bg-[#161618]",
			children: {
				type: "div",
				props: {
					tw: "flex flex-col justify-between w-full h-full p-16",
					children: [
						{
							type: "div",
							props: {
								tw: "flex justify-between w-full",
								children: [
									category
										? {
												type: "span",
												props: {
													tw: "text-xl text-emerald-400 font-semibold",
													style: { fontFamily: "JetBrainsMono" },
													children: category,
												},
											}
										: null,
									tags?.length
										? {
												type: "div",
												props: {
													tw: "flex flex-wrap text-xl text-emerald-400",
													children: tags.map((tag) => ({
														type: "span",
														props: {
															tw: "mx-1 font-semibold",
															style: { fontFamily: "JetBrainsMono" },
															children: tag,
														},
													})),
												},
											}
										: null,
								].filter(Boolean),
							},
						},
						{
							type: "div",
							props: {
								tw: "flex",
								children: {
									type: "h1",
									props: {
										tw: "text-6xl font-bold text-[#70E1C8] leading-snug",
										style: { fontFamily: "PlusJakartaSans" },
										children: title,
									},
								},
							},
						},
						{
							type: "div",
							props: {
								tw: "flex items-center justify-between w-full",
								children: [
									{
										type: "svg",
										props: {
											xmlns: "http://www.w3.org/2000/svg",
											width: "130px",
											height: "130px",
											preserveAspectRatio: "xMidYMid",
											version: "1.0",
											viewBox: "0 0 500 500",
											fill: "white",
											children: [
												{
													type: "g",
													props: {
														transform: "matrix(.1 0 0 -.1 0 500)",
														children: [
															{
																type: "path",
																props: {
																	d: "M2413 4169c-74-21-105-52-255-253-156-207-179-233-238-263-32-16-85-18-620-24-558-5-589-6-667-27-170-45-285-113-410-245-65-69-91-106-131-189-69-139-82-196-89-370l-6-148h550l5 108c4 95 8 114 33 161 16 29 47 68 68 87 76 64 72 64 676 64 599 1 637 4 775 59 162 65 304 181 403 330 1 2 55-50 120-115 119-120 182-166 291-210 146-59 131-57 747-63l570-6 53-29c61-34 108-89 129-149 8-23 17-86 20-139l6-98h550l-6 133c-8 153-31 258-82 366-110 230-300 388-550 453-75 20-113 22-645 27l-566 6-49 32c-29 19-119 112-227 235-181 204-230 249-297 268-44 12-114 12-158-1",
																},
															},
															{
																type: "circle",
																props: {
																	cx: "163.589",
																	cy: "250.184",
																	r: "36.5",
																	style: "fill:white;stroke-width:.782143",
																	transform: "matrix(10 0 0 -10 0 5000)",
																},
															},
															{
																type: "circle",
																props: {
																	cx: "3361.053",
																	cy: "-2505.395",
																	r: "365",
																	style: "fill:white;stroke-width:7.82143",
																	transform: "scale(1 -1)",
																},
															},
															{
																type: "path",
																props: {
																	d: "M0 2251c0-249 75-450 228-613 139-147 312-233 522-258 47-5 312-10 600-10 496 0 517-1 560-21 64-29 94-61 251-270 170-228 211-259 338-259 67 0 143 32 192 82 19 19 108 118 199 221 142 162 172 192 224 217l59 30h486c620 0 687 7 866 94q249 121.5 375 381c63 131 80 201 87 368l6 137h-550l-5-103c-4-78-11-114-29-151-28-62-79-112-138-140-45-20-62-21-611-27-553-5-567-6-640-29-173-53-286-125-419-267-79-85-93-96-102-80-5 9-37 48-70 87-107 124-256 218-417 263-74 20-103 21-667 26-584 6-590 6-631 28-66 35-101 70-130 130-23 46-28 72-32 159l-5 104H0z",
																},
															},
														],
													},
												},
											],
										},
									},
									{
										type: "div",
										props: {
											tw: "flex flex-col items-end",
											children: [
												{
													type: "p",
													props: {
														tw: "text-2xl text-white font-medium mx-2",
														style: { fontFamily: "JetBrains Mono" },
														children: author || BRAND_NAME,
													},
												},
												{
													type: "p",
													props: {
														tw: "text-xl uppercase text-gray-300",
														style: { fontFamily: "JetBrains Mono" },
														children: formattedDate,
													},
												},
											],
										},
									},
								],
							},
						},
					],
				},
			},
		},
	};
};
