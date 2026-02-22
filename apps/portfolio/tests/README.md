# E2E Testing with Playwright

Comprehensive end-to-end testing suite for the Yuniel Acosta portfolio website using Playwright.

## 📋 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This test suite provides comprehensive coverage for:

- ✅ Language switching (i18n)
- ✅ CV download functionality
- ✅ Blog navigation and pagination
- ✅ Contact form submission
- ✅ Newsletter subscription
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness
- ✅ Accessibility (a11y) compliance

## 🚀 Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm 9+

### Installation

```bash
# Install dependencies (includes Playwright)
pnpm install

# Install Playwright browsers
pnpm exec playwright install --with-deps
```

## 🧪 Running Tests

### Quick Start

```bash
# Run all tests (headless)
pnpm test:e2e

# Run with UI mode (recommended for development)
pnpm test:e2e:ui

# Run in headed mode (see browser)
pnpm test:e2e:headed

# Debug mode (step through tests)
pnpm test:e2e:debug
```

### Browser-Specific Tests

```bash
# Test on Chromium only
pnpm test:e2e:chromium

# Test on Firefox only
pnpm test:e2e:firefox

# Test on WebKit (Safari) only
pnpm test:e2e:webkit

# Test on mobile viewports
pnpm test:e2e:mobile
```

### Test Specific Files

```bash
# Run a specific test file
pnpm exec playwright test tests/e2e/example.spec.ts

# Run tests matching a pattern
pnpm exec playwright test --grep "contact"

# Run tests in a specific project
pnpm exec playwright test --project=chromium tests/e2e/example.spec.ts
```

### View Reports

```bash
# Open the HTML test report
pnpm test:e2e:report
```

### Generate Tests (Codegen)

```bash
# Record interactions and generate test code
pnpm test:e2e:codegen
```

## 📁 Test Structure

```
tests/
├── e2e/
│   ├── blog-pagination.spec.ts    # Blog navigation & pagination
│   ├── contact-form.spec.ts       # Contact form submission
│   ├── download-cv.spec.ts        # CV download functionality
│   ├── newsletter.spec.ts         # Newsletter subscription
├── fixtures/
│   └── index.ts                   # Test helpers, mocks, and utilities
└── test-results/                  # Test artifacts (generated)
```

## ✍️ Writing Tests

### Using Test Fixtures

Our test suite includes reusable fixtures for common operations:

```typescript
import { test, expect, selectors, mockResponses, testData } from '../fixtures';

test('my test', async ({ page }) => {
  // Use predefined selectors
  await page.click(selectors.contact.submit);
  
  // Use mock responses
  await page.route('**/api/contact.json', route =>
    route.fulfill(mockResponses.contact.success)
  );
  
  // Use test data
  await page.fill(selectors.contact.email, testData.contact.valid.email);
});
```

### Stable Selectors

Always use `data-test` attributes for reliable element selection:

```typescript
// ✅ Good - stable selector
await page.click('[data-test="download-cv"]');

// ❌ Bad - brittle, implementation-dependent
await page.click('.btn-primary.download');
```

### API Mocking

Mock external API calls to ensure test determinism:

```typescript
await page.route('**/api/contact.json', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ success: true })
  })
);
```

### Error Handling

Always include proper waiting and error handling:

```typescript
// Wait for element with timeout
await expect(page.locator(selector)).toBeVisible({ timeout: 10000 });

// Handle optional elements
const element = await page.$(selector);
if (element) {
  await element.click();
}

// Check element exists without throwing
const exists = await page.locator(selector).count() > 0;
```

## 🔄 CI/CD Integration

Tests run automatically on:

- Push to `main`, `develop`, or `feature/*` branches
- Pull requests to `main` or `develop`

### GitHub Actions

The workflow (`.github/workflows/playwright.yml`) runs tests in parallel across:

- Chromium
- Firefox  
- WebKit

Artifacts are saved for 30 days:

- HTML test reports
- Screenshots (on failure)
- Videos (on failure)
- Traces (on failure)

### Viewing CI Results

1. Go to the Actions tab in GitHub
2. Click on the workflow run
3. Download artifacts to view reports/traces locally

## 🎯 Best Practices

### 1. Test Organization

- Group related tests with `test.describe()`
- Use descriptive test names
- Keep tests focused on one feature
- Use `test.beforeEach()` for common setup

### 2. Selector Strategy

Priority order for selectors:

1. `data-test` attributes (most stable)
2. ARIA roles and labels (accessible)
3. Text content (for unique text)
4. CSS selectors (least stable)

### 3. Assertions

```typescript
// ✅ Use Playwright's auto-retrying assertions
await expect(page.locator(selector)).toBeVisible();
await expect(page).toHaveURL(/pattern/);

// ❌ Avoid raw assertions without retry
const text = await page.textContent(selector);
expect(text).toBe('value'); // No retry if fails
```

### 4. Network Mocking

- Mock all external API calls
- Use HAR files for complex scenarios
- Provide both success and error scenarios

### 5. Flakiness Prevention

- Always wait for elements before interaction
- Use `page.waitForLoadState('networkidle')` after navigation
- Avoid fixed `waitForTimeout()` - use condition-based waits
- Don't depend on animation timing

### 6. Accessibility Testing

- Include keyboard navigation tests
- Check for proper ARIA attributes
- Verify focus management
- Test screen reader announcements

## 🐛 Troubleshooting

### Tests Fail Locally But Pass in CI

```bash
# Run with same settings as CI
CI=true pnpm test:e2e

# Check for timing issues
pnpm test:e2e:headed --repeat-each=3
```

### Timeout Errors

```typescript
// Increase timeout for specific action
await page.click(selector, { timeout: 30000 });

// Or for entire test
test('slow test', async ({ page }) => {
  test.setTimeout(60000);
  // ...
});
```

### Element Not Found

```bash
# Use debug mode to inspect
pnpm test:e2e:debug

# Or add screenshot
await page.screenshot({ path: 'debug.png', fullPage: true });

# Check selector
const count = await page.locator(selector).count();
console.log(`Found ${count} elements`);
```

### Browser Not Installed

```bash
# Reinstall browsers
pnpm exec playwright install --with-deps
```

### Trace Files Too Large

Traces are only captured on failure. To reduce size:

```typescript
// In playwright.config.ts
trace: 'retain-on-failure', // Only on failure
video: 'retain-on-failure', // Only on failure
screenshot: 'only-on-failure', // Only on failure
```

### Slow Tests

```bash
# Run tests in parallel
pnpm exec playwright test --workers=4

# Profile slow tests
pnpm exec playwright test --reporter=html

# Then check the report for slow tests
pnpm test:e2e:report
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Writing Tests Guide](https://playwright.dev/docs/writing-tests)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

## 🎬 Advanced Usage

### Running Specific Browsers

```bash
# Run only on desktop browsers
pnpm exec playwright test --project=chromium --project=firefox --project=webkit

# Run only on mobile
pnpm exec playwright test --project=mobile-chrome --project=mobile-safari
```

### Sharding Tests (Parallel CI)

```bash
# Split tests across 4 machines
pnpm exec playwright test --shard=1/4  # Machine 1
pnpm exec playwright test --shard=2/4  # Machine 2
# etc...
```

### Custom Reporter

```typescript
// playwright.config.ts
reporter: [
  ['html'],
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'results.xml' }]
]
```

### Environment Variables

```bash
# Custom base URL
BASE_URL=https://staging.example.com pnpm test:e2e

# Run in CI mode locally
CI=true pnpm test:e2e
```

## 🤝 Contributing

When adding new tests:

1. Use the existing test structure and fixtures
2. Add `data-test` attributes to new components
3. Include both happy path and error scenarios
4. Test accessibility
5. Update this documentation

## 📝 License

Tests are part of the main project. See main LICENSE file.
