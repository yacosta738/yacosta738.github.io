import { beforeEach, describe, expect, it, vi } from "vitest";

const getCollectionMock = vi.fn();
const rssMock = vi.fn();

vi.mock("astro:content", () => ({
	getCollection: getCollectionMock,
}));

vi.mock("@astrojs/rss", () => ({
	default: rssMock,
}));

vi.mock("@/configs/site.consts", () => ({
	SITE_TITLE: { en: "Blog title", es: "Título blog" },
	SITE_DESCRIPTION: { en: "Blog description", es: "Descripción blog" },
}));

vi.mock("@/i18n", () => ({
	DEFAULT_LOCALE: "en",
}));

describe("root rss route", () => {
	beforeEach(() => {
		getCollectionMock.mockReset();
		rssMock.mockReset();
		rssMock.mockReturnValue(new Response("rss"));
	});

	it("builds the default-locale RSS feed at /rss.xml", async () => {
		getCollectionMock.mockResolvedValue([
			{
				id: "en/2026/03/29/hello-world",
				data: {
					title: "Hello World",
					description: "Post description",
					date: new Date("2026-03-29"),
					draft: false,
				},
			},
		]);

		const { GET } = await import("../../../src/pages/rss.xml.js");
		const response = await GET({
			site: new URL("https://blog.yunielacosta.com"),
		});

		expect(getCollectionMock).toHaveBeenCalledWith(
			"articles",
			expect.any(Function),
		);
		expect(rssMock).toHaveBeenCalledWith(
			expect.objectContaining({
				title: "Blog title",
				description: "Blog description",
				stylesheet: "/rss/styles.xsl",
				items: [
					expect.objectContaining({
						link: "/2026/03/29/hello-world/",
						title: "Hello World",
					}),
				],
			}),
		);
		expect(response).toBeInstanceOf(Response);
	});
});
