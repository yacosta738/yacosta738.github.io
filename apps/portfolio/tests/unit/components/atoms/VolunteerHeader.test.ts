import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import VolunteerHeader from "@/components/atoms/VolunteerHeader.astro";

const mockProps = {
	organization: "Test Org",
	position: "Volunteer",
};

test("VolunteerHeader renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(VolunteerHeader, {
		props: mockProps,
	});

	expect(result).toContain("Test Org");
	expect(result).toContain("Volunteer");
});

test("VolunteerHeader renders with a URL", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(VolunteerHeader, {
		props: {
			...mockProps,
			url: "https://example.com",
		},
	});

	expect(result).toContain('href="https://example.com"');
});

test("VolunteerHeader renders with a summary", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(VolunteerHeader, {
		props: {
			...mockProps,
			summary: "A test summary.",
		},
	});

	expect(result).toContain("A test summary.");
});

test("VolunteerHeader renders with highlights", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(VolunteerHeader, {
		props: {
			...mockProps,
			highlights: ["Highlight 1", "Highlight 2"],
		},
	});

	expect(result).toContain("Highlight 1");
	expect(result).toContain("Highlight 2");
});
