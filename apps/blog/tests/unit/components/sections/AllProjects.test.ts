import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import AllProjects from "@/components/sections/AllProjects.astro";

const projects = [
	{
		name: "Demo Project",
		description: "A project description",
		isActive: true,
		metadata: {
			featured: false,
			tech: ["TypeScript"],
			url: "https://example.com",
			repository: "https://github.com/example/demo",
		},
	},
];

test("archive link and compact project links expose minimum target-size and focus classes", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(AllProjects, {
		props: { projects, limit: 6 },
	});

	expect(result).toContain("archive-link");
	expect(result).toContain("min-h-6");
	expect(result).toContain("focus-visible:ring-2");
});
