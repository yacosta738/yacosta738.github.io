# i18n Specification

## Purpose

Define locale-aware routing and URL helper behavior for the Astro apps, including default-locale handling and legacy redirects.

## Requirements

### Requirement: Default Locale Uses Unprefixed URLs

The system MUST serve default-locale content at unprefixed URLs (for example, `/about`) across both apps.

#### Scenario: Default locale page resolves at unprefixed path

- GIVEN the default locale is `en`
- WHEN a user requests `/about`
- THEN the response MUST serve the default-locale content for `about`

#### Scenario: Portfolio root serves default locale content

- GIVEN the default locale is `en`
- WHEN a user requests `/` on the portfolio app
- THEN the response MUST serve the default-locale home page content

#### Scenario: Blog root redirects to blog index

- GIVEN the default locale is `en`
- WHEN a user requests `/` on the blog app
- THEN the response MUST redirect to `/blog`

### Requirement: Non-default Locales Use Prefixed URLs

The system MUST serve non-default locale content at locale-prefixed URLs (for example, `/es/about`).

#### Scenario: Non-default locale page resolves at prefixed path

- GIVEN the locale is `es`
- WHEN a user requests `/es/about`
- THEN the response MUST serve the `es` locale content for `about`

#### Scenario: Missing locale prefix defaults to the default locale

- GIVEN the default locale is `en` and a non-default locale `es` exists
- WHEN a user requests `/about` without a locale prefix
- THEN the response MUST serve the default-locale content and MUST NOT require `/en/about`

### Requirement: Legacy Default-Locale Prefix Redirects

The system MUST redirect legacy default-locale prefixed URLs to their unprefixed equivalents.

#### Scenario: Legacy default-locale page redirects to unprefixed path

- GIVEN the default locale is `en`
- WHEN a user requests `/en/about`
- THEN the response MUST redirect to `/about`

#### Scenario: Legacy default-locale root redirects to portfolio root

- GIVEN the default locale is `en`
- WHEN a user requests `/en/` on the portfolio app
- THEN the response MUST redirect to `/`

#### Scenario: Legacy default-locale root redirects to blog index

- GIVEN the default locale is `en`
- WHEN a user requests `/en/` on the blog app
- THEN the response MUST redirect to `/blog`

### Requirement: i18n Path Helpers Emit Canonical URLs

The system MUST generate unprefixed URLs for the default locale and prefixed URLs for non-default locales.

#### Scenario: Default-locale helper output is unprefixed

- GIVEN the default locale is `en`
- WHEN an i18n helper generates a path for `about` in the default locale
- THEN the returned path MUST be `/about`

#### Scenario: Non-default locale helper output is prefixed

- GIVEN the locale is `es`
- WHEN an i18n helper generates a path for `about` in the `es` locale
- THEN the returned path MUST be `/es/about`
