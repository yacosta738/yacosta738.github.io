# Documentation Conventions

This document outlines the structure and best practices for creating and maintaining documentation in the `/docs` directory. The goal is to ensure that project documentation is easy to navigate, understand, and maintain for all contributors, regardless of their experience level.

## Guiding Principles

-   **Audience-First**: Structure documentation based on who needs it and why. A new contributor has different needs than a senior engineer debugging a specific feature.
-   **Discoverable**: A clear, hierarchical structure is essential. The root `README.md` should always serve as the main table of contents.
-   **Single Source of Truth**: Consolidate related information to avoid redundancy and confusion. Each document should have a clear, distinct purpose.

## Directory Structure

All project documentation resides in the `/docs` directory and is organized into the following categories:

### 1. `/getting-started`

-   **Audience**: Everyone, especially new contributors.
-   **Purpose**: High-level guides that provide an essential overview of the project's main applications. This is the first place a new team member should look.
-   **Examples**:
    -   `portfolio-guide.md`
    -   `api-guide.md`

### 2. `/guides`

-   **Audience**: Developers working on or seeking to understand a specific area of the project.
-   **Purpose**: In-depth, practical guides for major features, processes, or implementations. These are "how-to" documents that go beyond a surface-level overview.
-   **Examples**:
    -   `deployment.md`
    -   `i18n-tags.md`
    -   `security-hcaptcha.md`

### 3. `/reference`

-   **Audience**: Developers who need detailed technical specifications.
-   **Purpose**: Low-level, granular information that can be quickly looked up. This includes API endpoint details, sequence diagrams, and specific configurations.
-   **Examples**:
    -   `api-endpoints.md`
    -   `i18n-tags-flow.md`

### 4. `/architecture`

-   **Audience**: Senior developers, architects, and team leads.
-   **Purpose**: Documents that explain high-level architectural decisions, analyses, and the "why" behind our technical choices.
-   **Examples**:
    -   `semantic-release.md`

### 5. `/archive`

-   **Audience**: Anyone looking for historical context.
-   **Purpose**: A place for documents related to past decisions, fixed bugs, or legacy systems that are no longer active but are kept for historical record.
-   **Examples**:
    -   `redos-email-fix.md`

## Maintaining the Documentation

-   **Adding a New Document**: Before creating a new file, consider if the information can be added to an existing document. If a new document is necessary, place it in the appropriate directory based on the structure above.
-   **Update the Root README**: Whenever a document is added, moved, or deleted, the main table of contents at `docs/README.md` **must** be updated to reflect the change.
-   **Keep it Concise**: Use diagrams, code snippets, and clear headings to make documents easy to scan.
-   **Review Regularly**: Periodically review documents, especially in the `/getting-started` and `/guides` sections, to ensure they are not outdated.
