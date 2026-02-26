# Project Documentation

Welcome to the project documentation. This directory is organized to help you find information quickly, whether you're a new contributor or a seasoned developer.

## 🚀 Getting Started

If you're new to the project, start here. These guides provide a high-level overview of the main applications.

-   [**Portfolio Application Guide](./getting-started/portfolio-guide.md)**: An overview of the Astro-based frontend application.
-   [**API Guide](./getting-started/api-guide.md)**: An overview of the Cloudflare Worker API.

## 📚 Topical Guides

These guides provide in-depth explanations of specific features and processes.

-   [**Deployment](./guides/deployment.md)**: How the project is deployed to different platforms.
-   [**Internationalization (i18n) & Tags](./guides/i18n-tags.md)**: The solution for multi-language tag pages.
-   [**Security & hCaptcha](./guides/security-hcaptcha.md)**: The implementation of hCaptcha for bot protection.

## 🛠️ Technical Reference

Low-level details for developers who need to understand the specifics of an implementation.

-   [**API Endpoints](./reference/api-endpoints.md)**: Detailed diagrams and specifications for the API endpoints.
-   [**i18n Tags Flow Diagram](./reference/i18n-tags-flow.md)**: A visual diagram of the tag switching logic.
-   **API Testing Guide**: *(This guide needs to be recreated after being lost during reorganization)*.

## 🏛️ Architecture & Decisions

High-level documents about architectural choices and process analysis.

This project uses **Architecture Decision Records (ADRs)** to document significant architectural choices. ADRs are numbered sequentially (ADR-001, ADR-002, etc.) and follow the format established in [adr.github.io](https://adr.github.io/).

-   [Monorepo Structure](./architecture/001-monorepo-structure.md) - Overall architecture and workspace setup
-   [Content Collections](./architecture/002-content-collections.md) - Data and content management system
-   [API Architecture](./architecture/003-api-architecture.md) - Cloudflare Workers API design
-   [Testing Strategy](./architecture/004-testing-strategy.md) - Testing approach and coverage goals
-   [Semantic Release](./architecture/semantic-release.md) - Analysis of the monorepo's release process

## 🗄️ Archive

Historical documents kept for context.

-   [**ReDoS Email Validation Fix](./archive/redos-email-fix.md)**: A post-mortem on a legacy security vulnerability.