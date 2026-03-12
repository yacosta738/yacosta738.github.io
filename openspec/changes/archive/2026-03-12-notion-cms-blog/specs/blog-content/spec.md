# Blog Content Specification

## Purpose

Define expected behavior for loader-based, dual-source blog content (Astro content collections and Notion-derived content), including schema mapping, filtering, slug collision handling, listing/rendering consistency, and fallback behavior when Notion is unavailable.

## Requirements

### Requirement: Dual-Source Availability

The system MUST include content from both the Astro content collection and the Notion-derived source in the blog experience when both sources are available at build time.

#### Scenario: Combined sources render in listing

- GIVEN Astro content entries and Notion-derived entries are available
- WHEN the blog index is generated
- THEN the listing includes entries from both sources
- AND each entry links to its corresponding blog route

#### Scenario: Single source still renders

- GIVEN only one content source is available (Astro or Notion)
- WHEN the blog index is generated
- THEN the listing includes entries from the available source
- AND no errors are surfaced to the end user

### Requirement: Published Filtering

The system MUST filter Notion-derived entries using the same published/draft intent as local content, treating unpublished entries as drafts.

#### Scenario: Published Notion entry appears

- GIVEN a Notion-derived entry marked as published by the configured Notion fields
- WHEN the blog index is generated
- THEN the entry appears in the listing

#### Scenario: Unpublished Notion entry is excluded

- GIVEN a Notion-derived entry with a non-published status or an explicit draft flag
- WHEN the blog index is generated
- THEN the entry is excluded from the listing
- AND it does not appear at its route

### Requirement: Schema Mapping and Validation

The system MUST map Notion properties to the blog schema and exclude entries that do not meet required fields.

#### Scenario: Notion properties map to schema fields

- GIVEN a Notion-derived entry with mapped properties for title, description, date, lastModified, cover, author, tags, category, featured, and draft
- WHEN the entry is normalized
- THEN it conforms to the same required fields used by Astro collection entries
- AND it is eligible for listing and rendering

#### Scenario: Missing required fields exclude entry

- GIVEN a Notion-derived entry missing required fields for the blog schema
- WHEN the entry is normalized
- THEN the entry is excluded from listing and rendering
- AND the build continues without failing

### Requirement: Slug Collision Handling

The system MUST detect slug collisions across sources and enforce deterministic resolution to avoid duplicate routes, favoring existing Astro entries by default.

#### Scenario: Collision resolves deterministically

- GIVEN an Astro entry and a Notion-derived entry with the same slug
- WHEN the entries are merged for routing
- THEN only the Astro entry is selected for the canonical route
- AND the Notion-derived entry is excluded from routing

#### Scenario: Collisions do not break build

- GIVEN multiple entries share the same slug
- WHEN the blog build runs
- THEN the build completes successfully
- AND the resulting routes contain no duplicate slugs

### Requirement: Listing and Sorting Behavior

The system MUST apply consistent listing, sorting, and filtering rules to the combined set of entries.

#### Scenario: Combined entries follow ordering rules

- GIVEN a mix of Astro and Notion-derived entries with dates and lastModified values
- WHEN the blog index is generated
- THEN the combined listing is sorted by date descending
- AND entries missing date are ordered using lastModified descending

#### Scenario: Filters apply across sources

- GIVEN entries from both sources with tags, categories, and featured flags
- WHEN the blog index is generated
- THEN filters behave consistently across both sources

### Requirement: Rendering and Block Fallbacks

The system MUST render Notion-derived content using the same blog template, and MUST degrade gracefully for unsupported Notion block types.

#### Scenario: Notion content renders with template

- GIVEN a Notion-derived entry with supported content blocks
- WHEN the entry is rendered
- THEN the blog post renders using the same template as Astro entries
- AND supported blocks appear in the rendered output

#### Scenario: Unsupported blocks degrade gracefully

- GIVEN a Notion-derived entry containing unsupported blocks (such as images, callouts, or embeds that cannot be rendered)
- WHEN the entry is rendered
- THEN the unsupported blocks are omitted or replaced with a safe fallback
- AND the page still renders without runtime errors

### Requirement: Notion Unavailable Fallback

The system MUST remain buildable when the Notion source is unavailable by falling back to the last successful Notion data if present, or to Astro content only.

#### Scenario: Notion outage uses last successful data

- GIVEN the Notion source is unavailable
- AND previously fetched Notion data exists locally
- WHEN the blog build runs
- THEN the build uses the last successful Notion data
- AND the combined listing includes the last fetched Notion entries

#### Scenario: No Notion data falls back to Astro

- GIVEN the Notion source is unavailable
- AND no previously fetched Notion data exists locally
- WHEN the blog build runs
- THEN the build completes using only Astro content
- AND no Notion entries appear in the listing
