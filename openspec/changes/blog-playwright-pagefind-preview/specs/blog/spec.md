# Blog Specification

## Purpose

Define expected behavior for blog Playwright preview runs and Pagefind asset loading so E2E search tests always have required build outputs and assets resolve under non-root bases.

## Requirements

### Requirement: Enforced Build And Preview For Pagefind E2E

The system MUST run the blog Playwright web server in preview mode for E2E runs that depend on Pagefind assets.

#### Scenario: Preview runs for E2E with Pagefind assets

- GIVEN a blog Playwright E2E run is started
- WHEN the web server command is resolved
- THEN the server runs in preview mode for the blog app
- AND the server is expected to serve built assets including Pagefind outputs

#### Scenario: Preview still required when a build already exists

- GIVEN a blog build output exists on disk
- WHEN a blog Playwright E2E run starts
- THEN the web server still uses preview mode to serve the built output

### Requirement: Skip-Build Guard Requires Pagefind Assets

The system MUST only skip the blog build step when the blog build output exists and Pagefind assets are present under the expected build output path.

#### Scenario: Skip build when dist and Pagefind assets exist

- GIVEN the blog build output directory exists
- AND the Pagefind asset directory exists under the build output
- WHEN the blog Playwright E2E run evaluates whether to skip the build
- THEN the build step is skipped

#### Scenario: Do not skip build when Pagefind assets are missing

- GIVEN the blog build output directory exists
- AND the Pagefind asset directory is missing or empty
- WHEN the blog Playwright E2E run evaluates whether to skip the build
- THEN the build step is not skipped

### Requirement: Base-Aware Pagefind Asset URLs

The system MUST resolve Pagefind UI asset URLs using the configured Astro base so asset requests are valid for non-root deployments.

#### Scenario: Pagefind assets resolve with non-root base

- GIVEN the blog is configured with a non-root base
- WHEN the search page renders Pagefind UI asset URLs
- THEN the asset URLs are prefixed with the configured base
- AND the resulting URLs resolve to Pagefind assets under the build output

#### Scenario: Pagefind assets resolve with root base

- GIVEN the blog is configured with the root base
- WHEN the search page renders Pagefind UI asset URLs
- THEN the asset URLs resolve without an extra base prefix
