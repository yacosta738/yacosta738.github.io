import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

test.describe("CV Download", () => {
	test.beforeEach(async ({}, testInfo) => {
		if (testInfo.project.name.includes("mobile")) {
			test.skip();
		}
	});
	test("should download CV file and verify integrity", async ({
		page,
	}, testInfo) => {
		await page.goto("/");

		// Check if download button exists
		const downloadButton = page.locator(selectors.cv.downloadButton);
		await expect(downloadButton).toBeVisible({ timeout: 10000 });

		// Setup download handler and trigger download
		const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
		await downloadButton.click();

		const download = await downloadPromise;

		// Verify suggested filename
		const suggestedFilename = download.suggestedFilename();
		expect(suggestedFilename).toMatch(/\.pdf$/i);
		expect(suggestedFilename.toLowerCase()).toContain("cv");

		// Save the file
		const outputPath = path.join(testInfo.outputPath(), "downloaded-cv.pdf");
		await download.saveAs(outputPath);

		// Verify file exists and has content
		expect(fs.existsSync(outputPath)).toBeTruthy();
		const stats = fs.statSync(outputPath);
		expect(stats.size).toBeGreaterThan(1000); // At least 1KB

		// Verify it's a PDF by checking file signature (magic bytes)
		const buffer = fs.readFileSync(outputPath);
		const pdfSignature = buffer.toString("utf-8", 0, 5);
		expect(pdfSignature).toBe("%PDF-");
	});

	test("should download CV from English version", async ({
		page,
	}, testInfo) => {
		await page.goto("/en/");

		const downloadButton = page.locator(selectors.cv.downloadButton);

		// Wait for button to be ready
		await expect(downloadButton).toBeVisible();
		await expect(downloadButton).toBeEnabled();

		const downloadPromise = page.waitForEvent("download");
		await downloadButton.click();
		const download = await downloadPromise;

		const outputPath = testInfo.outputPath("cv-en.pdf");
		await download.saveAs(outputPath);

		expect(fs.existsSync(outputPath)).toBeTruthy();
	});

	test("should download CV from Spanish version", async ({
		page,
	}, testInfo) => {
		await page.goto("/es/");

		const downloadButton = page.locator(selectors.cv.downloadButton);
		await expect(downloadButton).toBeVisible();

		const downloadPromise = page.waitForEvent("download");
		await downloadButton.click();
		const download = await downloadPromise;

		const outputPath = testInfo.outputPath("cv-es.pdf");
		await download.saveAs(outputPath);

		expect(fs.existsSync(outputPath)).toBeTruthy();
	});

	test("should have accessible download button", async ({ page }) => {
		await page.goto("/");

		const downloadButton = page.locator(selectors.cv.downloadButton);

		// Check accessibility
		await expect(downloadButton).toBeVisible();

		// Should have appropriate aria-label or text
		const ariaLabel = await downloadButton.getAttribute("aria-label");
		const text = await downloadButton.textContent();

		expect(ariaLabel || text).toBeTruthy();
		expect((ariaLabel || text || "").toLowerCase()).toMatch(
			/cv|curriculum|resume|download/,
		);

		// Test keyboard accessibility
		await downloadButton.focus();
		await expect(downloadButton).toBeFocused();
	});

	test("should not break on rapid clicks", async ({ page }) => {
		await page.goto("/");

		const downloadButton = page.locator(selectors.cv.downloadButton);
		await expect(downloadButton).toBeVisible();

		// Try multiple rapid clicks
		const downloads: Promise<unknown>[] = [];
		for (let i = 0; i < 3; i++) {
			const downloadPromise = page
				.waitForEvent("download", { timeout: 5000 })
				.catch(() => null);
			downloads.push(downloadPromise);
			await downloadButton.click();
			await page.waitForTimeout(100); // Small delay between clicks
		}

		const results = await Promise.all(downloads);
		const successfulDownloads = results.filter((d) => d !== null);

		// At least one download should succeed
		expect(successfulDownloads.length).toBeGreaterThan(0);
	});
});
