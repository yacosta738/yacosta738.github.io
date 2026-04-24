import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, vi } from "vitest";
import BlogFooter from "@/components/organisms/BlogFooter.astro";

vi.mock("@/core/resume/resume/resume.service", () => ({
	getMainResumeWithData: vi.fn(async () => ({
		basics: {
			profiles: [{ network: "GitHub", url: "https://github.com/example" }],
		},
	})),
}));

test("footer renders focus-visible target classes for navigation links", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BlogFooter, {
		props: {},
	});

	expect(result).toContain("focus-visible:ring-2");
	expect(result).toContain("min-h-6");
});
