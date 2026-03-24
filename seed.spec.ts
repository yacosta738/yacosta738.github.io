/**
 * Root seed placeholder — Playwright Test Agents reference.
 *
 * Our real seed tests live in the shared E2E package:
 *   - packages/testing-e2e/tests/e2e/seed-portfolio.spec.ts
 *   - packages/testing-e2e/tests/e2e/seed-blog.spec.ts
 *
 * Each app's playwright.config.ts points testDir to that shared location.
 * Use the app-specific seeds when invoking the planner/generator agents.
 *
 * @see https://playwright.dev/docs/test-agents
 */
import { expect, test } from "@playwright/test";

test("seed", async ({ page }) => {
	// This root seed is intentionally minimal.
	// Use app-specific seeds for agent-driven test generation.
	await page.goto("/");
	await expect(page.locator("body")).toBeVisible();
});
