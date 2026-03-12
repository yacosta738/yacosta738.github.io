# Portfolio Specification

## Purpose

Define default-locale routing behavior for portfolio content and English locale redirects.

## Requirements

### Requirement: Default locale renders unprefixed about/support

The system MUST render English content at `/about` and `/support`.

#### Scenario: About page uses English content at unprefixed path

- GIVEN a visitor requests `/about`
- WHEN the page is rendered
- THEN the content is in English

#### Scenario: Support page uses English content at unprefixed path

- GIVEN a visitor requests `/support`
- WHEN the page is rendered
- THEN the content is in English

### Requirement: English locale prefixed about/support redirect to unprefixed paths

The system MUST redirect `/en/about` to `/about` and `/en/support` to `/support`.

#### Scenario: Prefixed about redirects to unprefixed about

- GIVEN a visitor requests `/en/about`
- WHEN the request is handled
- THEN the response is a redirect to `/about`

#### Scenario: Prefixed support redirects to unprefixed support

- GIVEN a visitor requests `/en/support`
- WHEN the request is handled
- THEN the response is a redirect to `/support`

### Requirement: English locale catch-all redirects to unprefixed paths

The system MUST redirect any `/en/*` path to the same path without the `/en` prefix.

#### Scenario: Prefixed root redirects to root

- GIVEN a visitor requests `/en/`
- WHEN the request is handled
- THEN the response is a redirect to `/`

#### Scenario: Prefixed nested path redirects to unprefixed nested path

- GIVEN a visitor requests `/en/projects/case-study`
- WHEN the request is handled
- THEN the response is a redirect to `/projects/case-study`

### Requirement: Tests cover locale redirects when test suite exists

If automated tests exist for portfolio routing, the test suite MUST include coverage for the locale redirect behaviors.

#### Scenario: Redirect behavior is covered by tests

- GIVEN automated routing tests exist
- WHEN the test suite is updated
- THEN tests assert redirects for `/en/about`, `/en/support`, and `/en/*`
