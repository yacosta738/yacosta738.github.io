/**
 * Test fixtures for Playwright E2E tests
 * Provides reusable test data, API mocks, and helper utilities
 *
 * NOTE: Import `test` and `expect` directly from '@playwright/test' in your test files.
 * This file only exports helpers, selectors, mock data, and test utilities.
 */

import { expect, type Page } from "@playwright/test";

/**
 * API Mock Responses - Reusable mock data for network interception
 */
export const mockResponses = {
	contact: {
		success: {
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				success: true,
				message: "Message sent successfully!",
			}),
		},
		error: {
			status: 500,
			contentType: "application/json",
			body: JSON.stringify({
				success: false,
				message: "Server error. Please try again later.",
			}),
		},
		validationError: {
			status: 400,
			contentType: "application/json",
			body: JSON.stringify({
				success: false,
				message: "Validation failed",
				errors: {
					email: "Invalid email address",
				},
			}),
		},
		honeypot: {
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				success: true,
				message: "Message received",
			}),
		},
	},

	newsletter: {
		success: {
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				success: true,
				message: "Thank you for subscribing!",
			}),
		},
		error: {
			status: 500,
			contentType: "application/json",
			body: JSON.stringify({
				success: false,
				message: "Subscription failed. Please try again.",
			}),
		},
		alreadySubscribed: {
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				success: true,
				message: "You are already subscribed!",
			}),
		},
	},
};

/**
 * Test Data - Sample form data for testing
 */
export const testData = {
	contact: {
		valid: {
			name: "Yuniel Acosta",
			email: "test@example.com",
			message: "Hello from E2E test suite!",
			subject: "Test Subject",
		},
		invalid: {
			name: "",
			email: "invalid-email",
			message: "",
		},
	},

	newsletter: {
		validEmail: "subscriber@example.com",
		invalidEmail: "not-an-email",
	},

	search: {
		validQueries: ["blog", "typescript", "astro", "react", "javascript"],
		noResultsQuery: "xyzabcnonexistentquery123456",
		specialCharsQuery: "test@#$%^&*()",
		unicodeQuery: "café 日本語 emoji 🚀",
		longQuery: "a".repeat(200),
		emptyQuery: "",
	},
};

/**
 * Helper utilities for common test operations
 */
export const helpers = {
	/**
	 * Wait for a selector with custom timeout
	 */
	async waitForSelector(page: Page, selector: string, timeout = 5000) {
		return await page.waitForSelector(selector, { timeout, state: "visible" });
	},

	/**
	 * Fill form fields safely
	 */
	async fillForm(page: Page, fields: Record<string, string>) {
		for (const [selector, value] of Object.entries(fields)) {
			await page.fill(selector, value);
			// Small delay to simulate human typing
			await page.waitForTimeout(50);
		}
	},

	/**
	 * Mock API endpoint with custom response
	 */
	async mockApiEndpoint(
		page: Page,
		endpoint: string,
		response: { status: number; contentType: string; body: string },
	) {
		await page.route(`**/${endpoint}`, (route) => route.fulfill(response));
	},

	/**
	 * Check if element exists without throwing
	 */
	async elementExists(page: Page, selector: string): Promise<boolean> {
		const element = await page.$(selector);
		return element !== null;
	},

	/**
	 * Get element text safely
	 */
	async getTextContent(page: Page, selector: string): Promise<string | null> {
		const element = await page.$(selector);
		return element ? await element.textContent() : null;
	},

	/**
	 * Verify external link behavior
	 */
	async verifyExternalLink(page: Page, selector: string) {
		const link = await page.$(selector);
		const target = await link?.getAttribute("target");
		const rel = await link?.getAttribute("rel");

		expect(target).toBe("_blank");
		expect(rel).toContain("noopener");
	},

	/**
	 * Check accessibility of interactive element
	 */
	async checkA11y(page: Page, selector: string) {
		const element = await page.$(selector);
		const ariaLabel = await element?.getAttribute("aria-label");
		const role = await element?.getAttribute("role");

		// At least one should be present for screen readers
		expect(ariaLabel || role).toBeTruthy();
	},

	/**
	 * Test keyboard navigation
	 */
	async testKeyboardNav(page: Page, selector: string, key = "Enter") {
		await page.focus(selector);
		await page.keyboard.press(key);
	},

	/**
	 * Verify no console errors
	 */
	async expectNoConsoleErrors(page: Page, callback: () => Promise<void>) {
		const errors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		await callback();

		if (errors.length > 0) {
			console.warn("Console errors detected:", errors);
		}
	},

	/**
	 * Wait for network idle
	 */
	async waitForNetworkIdle(page: Page, timeout = 5000) {
		await page.waitForLoadState("networkidle", { timeout });
	},

	/**
	 * Scroll element into view
	 */
	async scrollIntoView(page: Page, selector: string) {
		await page.locator(selector).scrollIntoViewIfNeeded();
	},

	/**
	 * Take screenshot with custom name
	 */
	async takeScreenshot(page: Page, name: string) {
		await page.screenshot({
			path: `test-results/${name}.png`,
			fullPage: true,
		});
	},

	/**
	 * Wait for search UI to initialize
	 */
	async waitForSearchUI(page: Page, timeout = 10000) {
		console.log("Waiting for search UI to initialize...");
		try {
			await page.waitForSelector(".pagefind-ui__search-input", {
				timeout,
				state: "visible",
			});
			console.log("Search UI initialized successfully.");
		} catch (error) {
			console.error("Search UI initialization failed:", error);
			await page.screenshot({
				path: "test-results/search-ui-failure.png",
				fullPage: true,
			});
			throw error;
		}
	},

	/**
	 * Perform search and wait for results
	 */
	async performSearch(page: Page, query: string, waitTime = 1000) {
		const searchInput = page.locator(".pagefind-ui__search-input");
		await searchInput.fill(query);
		await page.waitForTimeout(waitTime);
		return searchInput;
	},

	/**
	 * Get search results count
	 */
	async getSearchResultsCount(page: Page): Promise<number> {
		return await page.locator(".pagefind-ui__result").count();
	},

	/**
	 * Verify search URL parameter
	 */
	async verifySearchParam(page: Page, expectedQuery: string | null) {
		const url = new URL(page.url());
		const actualQuery = url.searchParams.get("q");
		expect(actualQuery).toBe(expectedQuery);
	},
};

/**
 * Page selectors - Centralized selector management
 */
export const selectors = {
	language: {
		toggle: '[data-test="lang-toggle"]',
		htmlLang: "html",
	},

	cv: {
		downloadButton: '[data-test="download-cv"]:not([data-drawer-close])',
	},

	contact: {
		form: "#contact-form",
		name: '[data-test="contact-name"]',
		email: '[data-test="contact-email"]',
		message: '[data-test="contact-message"]',
		subject: '[data-test="contact-subject"]',
		submit: '[data-test="contact-submit"]',
		successMessage: "text=/Message sent successfully!/i",
		errorMessage: "text=/error/i",
	},

	newsletter: {
		email: '[data-test="newsletter-email"]',
		subscribe: '[data-test="newsletter-subscribe"]',
		successMessage: "text=/thank you for subscribing/i",
	},

	blog: {
		articleTitle: '[data-test="article-title"]',
		paginationNav: "role=navigation[name=/pagination/i]",
		paginationNext: '[data-test="pagination-next"]',
		paginationPrev: '[data-test="pagination-prev"]',
		articleHeading: "article h1",
	},

	search: {
		container: "#search",
		input: ".pagefind-ui__search-input",
		clearButton: ".pagefind-ui__search-clear",
		results: ".pagefind-ui__result",
		resultLink: ".pagefind-ui__result-link",
		resultExcerpt: ".pagefind-ui__result-excerpt",
		resultThumb: ".pagefind-ui__result-thumb",
		resultImage: ".pagefind-ui__result-image",
		resultsArea: ".pagefind-ui__results",
		message: ".pagefind-ui__message",
		emptyState: ".pf-empty",
		badge: ".pf-badge",
		topResult: ".pf-top-result",
		meta: ".meta",
		loadMoreButton: ".pagefind-ui__button",
	},

	navigation: {
		logo: 'a[href*="/"]',
		menuButton: "button[data-drawer-target]",
		navLinks: "nav a",
	},
};

/**
 * Language-specific test data
 */
export const i18nData = {
	en: {
		aboutHeading: "About",
		projectsHeading: "Projects",
		contactHeading: "Contact",
		welcomeText: /hello|hi|welcome/i,
		searchTitle: "Search",
		searchDescription: "Search for articles and content",
		searchEmptyTitle: "No results",
		searchEmptyMessage: /No results found for/i,
	},
	es: {
		aboutHeading: "Sobre mí",
		projectsHeading: "Proyectos",
		contactHeading: "Contacto",
		welcomeText: /hola|bienvenido/i,
		searchTitle: "Buscar",
		searchDescription: "Buscar artículos y contenido",
		searchEmptyTitle: "Sin resultados",
		searchEmptyMessage: /No se encontraron resultados para/i,
	},
};
