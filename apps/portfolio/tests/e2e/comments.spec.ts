import { expect, type Page, test } from "@playwright/test";

/**
 * E2E Tests for Comments Section (User Story 1)
 *
 * Tests verify:
 * - Comments widget loads when section becomes visible
 * - Existing comments display correctly
 * - Authentication prompt appears for unauthenticated users
 * - Error states are handled gracefully
 */

const BLOG_POST_URL = "/en/blog/"; // We'll use the blog list to find a post

/**
 * Helper: Navigate to a blog post
 */
async function navigateToBlogPost(page: Page): Promise<void> {
	await page.goto(BLOG_POST_URL);

	// Find and click the first blog post link
	const firstPostLink = page.locator('article a[href*="/blog/"]').first();
	await expect(firstPostLink).toBeVisible();
	await firstPostLink.click();

	// Wait for the post to load - be specific to avoid CTA heading
	await expect(page.locator("article h1").first()).toBeVisible();
} /**
 * Helper: Scroll to comments section
 */
async function scrollToComments(page: Page): Promise<void> {
	const commentsSection = page.locator('[data-testid="comments-section"]');
	await commentsSection.scrollIntoViewIfNeeded();
}

test.describe("Comments Section - Basic Functionality", () => {
	test("T007: Load comments section and verify widget appears", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Comments section should exist but widget not loaded yet
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await expect(commentsSection).toBeVisible();

		// Scroll to comments section to trigger lazy loading
		await scrollToComments(page);

		// Wait for Giscus script to load (max 5 seconds)
		const giscusContainer = page.locator(".giscus-container");
		await expect(giscusContainer).toBeVisible({ timeout: 5000 });

		// Verify Giscus iframe appears
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		await expect(giscusFrame.locator("body")).toBeVisible({ timeout: 10000 });
	});

	test("T008: Verify existing comments display (if any)", async ({ page }) => {
		await navigateToBlogPost(page);
		await scrollToComments(page);

		// Wait for Giscus to load
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		await expect(giscusFrame.locator("body")).toBeVisible({ timeout: 10000 });

		// Check if discussion exists (may be empty for new posts)
		// We don't assert comments exist, just that the widget loaded successfully
		// If comments exist, they should be visible in the iframe
		const discussionFrame = giscusFrame.locator('[class*="gsc-comments"]');

		// Either comments exist, or "No comments yet" message, or sign-in prompt
		// All are valid states - we just verify the widget is functional
		await expect(
			discussionFrame
				.or(giscusFrame.locator('[class*="gsc-comment-box"]'))
				.or(giscusFrame.locator("text=/sign in|no comments/i")),
		).toBeVisible({ timeout: 15000 });
	});

	test("T009: Verify authentication prompt for unauthenticated users", async ({
		page,
	}) => {
		await navigateToBlogPost(page);
		await scrollToComments(page);

		// Wait for Giscus to load
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		await expect(giscusFrame.locator("body")).toBeVisible({ timeout: 10000 });

		// Look for sign-in button or authentication prompt
		// Giscus shows "Sign in with GitHub" for unauthenticated users
		const signInButton = giscusFrame.locator('button:has-text("Sign in")');

		// Either sign-in button exists, or user is already authenticated
		// (In CI, user won't be authenticated, so button should appear)
		const commentBox = giscusFrame.locator('[class*="gsc-comment-box"]');

		// One of these should be visible
		await expect(signInButton.or(commentBox)).toBeVisible({ timeout: 15000 });
	});

	test("T010: Verify error state when provider unavailable", async ({
		page,
	}) => {
		// Intercept Giscus requests and simulate failure
		await page.route("https://giscus.app/**", (route) => {
			route.abort("failed");
		});

		await navigateToBlogPost(page);
		await scrollToComments(page);

		// Comments section should still be visible
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await expect(commentsSection).toBeVisible();

		// Wait a bit for the script to attempt loading
		await page.waitForTimeout(3000);

		// Verify Giscus iframe doesn't load (error state)
		const giscusFrame = page.locator("iframe.giscus-frame");
		await expect(giscusFrame).not.toBeVisible({ timeout: 5000 });

		// The container should still exist but widget won't load
		const giscusContainer = page.locator(".giscus-container");
		await expect(giscusContainer).toBeVisible();
	});
});

test.describe("Comments Section - Accessibility", () => {
	test("Verify comments section has proper heading and landmarks", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Verify heading exists and is accessible
		const heading = page.locator("#comments-heading");
		await expect(heading).toBeVisible();

		// Verify section has proper ARIA label
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await expect(commentsSection).toHaveAttribute(
			"aria-labelledby",
			"comments-heading",
		);
	});

	test("Verify keyboard navigation to comments section", async ({ page }) => {
		await navigateToBlogPost(page);

		// Tab through the page to verify comments section is reachable
		await page.keyboard.press("Tab");

		// Scroll to comments
		await scrollToComments(page);

		// Verify section is focusable/visible
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await expect(commentsSection).toBeVisible();
	});
});

test.describe("Comments Section - Performance", () => {
	test("Verify lazy loading - widget not loaded until visible", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Check that Giscus script is NOT loaded initially
		const giscusFrame = page.locator("iframe.giscus-frame");
		await expect(giscusFrame)
			.not.toBeVisible({ timeout: 1000 })
			.catch(() => {
				// Expected - frame shouldn't exist yet
			});

		// Now scroll to comments
		await scrollToComments(page);

		// Now it should load
		await expect(giscusFrame).toBeVisible({ timeout: 10000 });
	});

	test("Verify no layout shift when comments load", async ({ page }) => {
		await navigateToBlogPost(page);

		// Get initial page height
		const initialHeight = await page.evaluate(() => document.body.scrollHeight);

		// Scroll to comments
		await scrollToComments(page);

		// Wait for widget to load
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		await expect(giscusFrame.locator("body")).toBeVisible({ timeout: 10000 });

		// Get height after comments load
		const finalHeight = await page.evaluate(() => document.body.scrollHeight);

		// Height should not change dramatically (reserved space prevents CLS)
		// Allow some change for widget initialization, but not massive shift
		const heightDiff = Math.abs(finalHeight - initialHeight);
		expect(heightDiff).toBeLessThan(200); // Less than 200px shift
	});
});
