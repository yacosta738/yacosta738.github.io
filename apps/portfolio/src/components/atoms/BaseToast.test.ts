import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import BaseToast from "./BaseToast.astro";

test("BaseToast renders with default props", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BaseToast);

	expect(result).toContain("bottom-6 right-6");
	expect(result).toContain("bg-gray-900/95");
	expect(result).toContain("max-w-sm p-4");
	expect(result).toContain("button");
});

test("BaseToast renders with specified position", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BaseToast, {
		props: {
			position: "top-left",
		},
	});

	expect(result).toContain("top-6 left-6");
});

test("BaseToast renders with specified variant", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BaseToast, {
		props: {
			variant: "glass",
		},
	});

	expect(result).toContain("backdrop-blur-xl");
});

test("BaseToast renders with specified size", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BaseToast, {
		props: {
			size: "lg",
		},
	});

	expect(result).toContain("max-w-lg p-6");
});

test("BaseToast does not render close button if showCloseButton is false", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(BaseToast, {
		props: {
			showCloseButton: false,
		},
	});

	expect(result).not.toContain("button");
});
