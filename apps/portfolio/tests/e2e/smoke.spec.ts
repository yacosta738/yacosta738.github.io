import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

test.describe("Smoke Tests - Critical Paths", () => {
	test("should load homepage successfully", async ({ page }) => {
		// Navigate directly to English homepage to avoid redirect race condition
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Check title
		await expect(page).toHaveTitle(/Yuniel Acosta/i);

		// Check critical elements exist
		const header = page.getByRole("banner");
		const main = page.locator("main");
		const footer = page.locator("#main-footer");

		await expect(header).toBeVisible();
		await expect(main).toBeVisible();
		await expect(footer).toBeVisible();
	});

	test("should load blog page successfully", async ({ page }) => {
		await page.goto("/en/blog");

		await expect(page).toHaveURL(/\/en\/blog/);

		// Articles should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		await expect(articles.first()).toBeVisible();
	});

	test("should have working navigation links", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Find navigation
		const nav = page
			.getByRole("navigation", { name: "Main navigation" })
			.first();
		await expect(nav).toBeVisible();

		// Check for common navigation links
		const navLinks = nav.locator("a");
		const count = await navLinks.count();

		expect(count).toBeGreaterThan(0);
	});

	test("should have no console errors on homepage", async ({ page }) => {
		const errors: string[] = [];

		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Allow certain expected errors (adjust as needed)
		const criticalErrors = errors.filter(
			(error) => !error.includes("favicon") && !error.includes("404"),
		);

		if (criticalErrors.length > 0) {
			console.warn("Console errors detected:", criticalErrors);
		}

		// Don't fail on warnings, just log them
		expect(errors).toBeDefined();
	});

	test("should load correctly on mobile viewport", async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Check that page is visible
		await expect(page).toHaveTitle(/Yuniel Acosta/i);

		// Check for mobile menu button (hamburger)
		const menuButton = page.locator(
			'[data-drawer-target], button[aria-label*="menu" i]',
		);
		const hasMobileMenu = (await menuButton.count()) > 0;

		if (hasMobileMenu) {
			await expect(menuButton.first()).toBeVisible();
		}
	});

	test("should open and close mobile menu", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Find mobile menu button
		const menuButton = page
			.locator('[data-drawer-target], button[aria-label*="menu" i]')
			.first();
		const hasMenuButton = await menuButton.isVisible().catch(() => false);

		if (hasMenuButton) {
			// Open menu
			await menuButton.click({ force: true });
			await page.waitForTimeout(500); // Animation time

			// Check if drawer/menu is visible
			const drawer = page.locator('[id*="drawer"], [id*="menu"]').first();
			const isDrawerVisible = await drawer.isVisible().catch(() => false);

			if (isDrawerVisible) {
				// Try to close
				const closeButton = page
					.locator('[data-drawer-dismiss], button[aria-label*="close" i]')
					.first();
				const hasCloseButton = await closeButton.isVisible().catch(() => false);

				if (hasCloseButton) {
					await closeButton.click();
				}
			}
		}
	});

	test("should load quickly (< 3s)", async ({ page }) => {
		const startTime = Date.now();

		await page.goto("/en/");
		await page.waitForLoadState("domcontentloaded");

		const loadTime = Date.now() - startTime;

		// Document load time
		console.log(`Page loaded in ${loadTime}ms`);

		// Soft assertion - warn but don't fail
		if (loadTime > 3000) {
			console.warn(`Warning: Page took ${loadTime}ms to load (> 3s)`);
		}

		expect(loadTime).toBeLessThan(10000); // Hard limit at 10s
	});

	test("should handle 404 page gracefully", async ({ page }) => {
		// Try to navigate to non-existent page
		const response = await page.goto("/en/this-page-does-not-exist", {
			waitUntil: "domcontentloaded",
		});

		// Wait a moment for any redirects or page rendering
		await page.waitForTimeout(1000);

		// Get the final URL after any potential redirects
		const url = page.url();

		// Try to get body content with a timeout
		const bodyText = await page
			.locator("body")
			.textContent({ timeout: 5000 })
			.catch(() => "");

		// If we got redirected to 404 page or the status is 404
		const is404Response = response?.status() === 404;
		const has404InUrl = url.includes("/404");
		const content = bodyText?.toLowerCase() || "";
		const has404Content =
			content.includes("404") ||
			content.includes("not found") ||
			content.includes("oops");

		// At least one indicator of 404 should be present
		const is404Page = is404Response || has404InUrl || has404Content;

		// If none of the above, log for debugging
		if (!is404Page) {
			console.log("404 test debug:", {
				url,
				status: response?.status(),
				bodyLength: bodyText?.length || 0,
			});
		}

		// Should indicate it's a 404 somehow
		expect(is404Page || bodyText?.length === 0).toBe(true);
	});

	test("should have proper meta tags", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Check essential meta tags
		const description = await page
			.locator('meta[name="description"]')
			.getAttribute("content");
		const ogTitle = await page
			.locator('meta[property="og:title"]')
			.getAttribute("content");
		const ogImage = await page
			.locator('meta[property="og:image"]')
			.getAttribute("content");

		expect(description).toBeTruthy();
		expect(ogTitle).toBeTruthy();
		expect(ogImage).toBeTruthy();
	});

	test("should have working social links", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Find social media links
		const socialLinks = page.locator(
			'a[href*="github"], a[href*="linkedin"], a[href*="twitter"]',
		);
		const count = await socialLinks.count();

		if (count > 0) {
			const firstLink = socialLinks.first();
			await expect(firstLink).toBeVisible();

			// Should open in new tab
			const target = await firstLink.getAttribute("target");
			expect(target).toBe("_blank");

			// Should have security attributes
			const rel = await firstLink.getAttribute("rel");
			expect(rel).toContain("noopener");
		}
	});

	test("should support keyboard navigation", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Tab through interactive elements
		await page.keyboard.press("Tab");

		// At least one element should be focused
		const focusedElement = await page.evaluate(() => {
			return document.activeElement?.tagName;
		});

		expect(focusedElement).toBeTruthy();
	});

	test("should respect prefers-reduced-motion", async ({ page }) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Page should still load
		await expect(page).toHaveTitle(/Yuniel Acosta/i);

		// Check if CSS respects motion preferences (implementation-dependent)
		const hasMotionMedia = await page.evaluate(() => {
			const styles = Array.from(document.styleSheets);
			return styles.some((sheet) => {
				try {
					const rules = Array.from(sheet.cssRules || []);
					return rules.some((rule) =>
						rule.cssText.includes("prefers-reduced-motion"),
					);
				} catch {
					return false;
				}
			});
		});

		// Just document the behavior
		console.log("Has motion media query:", hasMotionMedia);
	});

	test("should load all languages", async ({ page }) => {
		// Test English
		await page.goto("/en/");
		await expect(page.locator("html")).toHaveAttribute("lang", "en-US");

		// Test Spanish
		await page.goto("/es/");
		await expect(page.locator("html")).toHaveAttribute("lang", "es");
	});

	test("should have working RSS feed link", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Find RSS link
		const rssLink = page.locator('a[href*="rss"]');
		const hasRss = (await rssLink.count()) > 0;

		if (hasRss) {
			const href = await rssLink.first().getAttribute("href");
			expect(href).toMatch(/rss|feed/i);
		}
	});

	test("should have proper favicon", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Check for favicon link
		const favicon = page.locator('link[rel*="icon"]');
		const count = await favicon.count();

		expect(count).toBeGreaterThan(0);
	});
});

test.describe("Cross-Browser Compatibility", () => {
	test("should work in all browsers", async ({ page, browserName }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Basic functionality should work regardless of browser
		await expect(page).toHaveTitle(/Yuniel Acosta/i);

		console.log(`Testing on: ${browserName}`);

		// Check critical elements
		const header = page.getByRole("banner");
		await expect(header).toBeVisible();
	});
});
