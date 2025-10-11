import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Link from "./Link.astro";

test("Link renders as <a> with href", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		props: { href: "https://example.com" },
		slots: { default: "Example" },
	});

	expect(result).toContain("<a");
	expect(result).toContain('href="https://example.com"');
	expect(result).toContain("Example");
});

test("Link renders as <span> without href", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		slots: { default: "No Link" },
	});

	expect(result).toContain("<span");
	expect(result).not.toContain("href");
	expect(result).toContain("No Link");
});

test("Link applies primary variant styles by default", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		props: { href: "#" },
	});

	expect(result).toContain(
		"text-foreground link-underline hover:text-brand-accent focus-visible:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent",
	);
});

test("Link applies social variant styles", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		props: { href: "#", variant: "social", "aria-label": "social" },
	});

	expect(result).toContain("text-foreground-muted inline-flex");
});

test("Link handles external links correctly", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		props: { href: "https://example.com", external: true },
	});

	expect(result).toContain('target="_blank"');
	expect(result).toContain('rel="noopener noreferrer"');
});

test("Link renders slot content", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Link, {
		props: { href: "#" },
		slots: { default: "<strong>Click Me</strong>" },
	});

	expect(result).toContain("<strong>Click Me</strong>");
});
