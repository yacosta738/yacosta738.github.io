# Welcome to my personal monorepo portfolio made with [Astro](https://astro.build)

![Deploy Portfolio](https://img.shields.io/github/actions/workflow/status/yacosta738/yacosta738.github.io/deploy-portfolio.yml?label=deploy%20portfolio)
![Deploy API](https://img.shields.io/github/actions/workflow/status/yacosta738/yacosta738.github.io/deploy-api.yml?label=deploy%20api)
[![CI Pipeline](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/ci.yml)
![CI Reliability](https://img.shields.io/github/actions/workflow/status/yacosta738/yacosta738.github.io/ci.yml?label=ci%20reliability)
[![Playwright E2E Tests](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/playwright.yml/badge.svg)](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/playwright.yml)
![E2E Reliability](https://img.shields.io/github/actions/workflow/status/yacosta738/yacosta738.github.io/playwright.yml?label=e2e%20reliability)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=bugs)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.yunielacosta.com%2F)
![GitHub repo size](https://img.shields.io/github/repo-size/yacosta738/yacosta738.github.io)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=yacosta738_yacosta738.github.io)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/yacosta738/yacosta738.github.io)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/yacosta738/yacosta738.github.io)
[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/github.com/yacosta738/yacosta738.github.io)

![yap-readme.png](docs%2Fimages%2Fyap-readme.png)
Welcome to my little corner of the internet! This is where I store all my achievements and
experiences after becoming a developer. From the first line of code I wrote to my most recent
projects, this portfolio serves as a record of my journey in this field.

In addition to showcasing my work, I also like to share my thoughts and insights through articles
that I write and publish here. Whether it's about the latest trends in technology or a personal
reflection on my growth as a developer, I hope you find something here that sparks your interest.

Thank you for taking the time to visit my portfolio. Feel free to explore and get in touch if you
have any questions or would like to collaborate on a project.

## :beers: My Social Links

:globe_with_meridians: [LinkedIn](https://www.linkedin.com/in/yacosta738/)
:globe_with_meridians: [Twitter](https://twitter.com/yacosta738)
:globe_with_meridians: [Portfolio & Blog](https://www.yunielacosta.com/)
:globe_with_meridians: [GitHub](https://github.com/yacosta738)
:globe_with_meridians: [Instagram](https://www.instagram.com/yacosta738)

## 🚀 Project Structure

This is a monorepo managed with pnpm workspaces. It contains multiple applications and shared
packages.

```markdown
.
├── apps/
│ ├── portfolio/ # Main portfolio website (Astro)
│ ├── blog/ # Personal blog (Astro)
│ └── api/ # Backend API (Cloudflare Workers + Hono)
├── packages/
│ └── shared/ # Shared logic, components, and types
├── docs/ # Project documentation
├── scripts/ # Helper scripts
├── specs/ # Project specifications
└── package.json # Root package.json
```

## 🧞 Commands

All commands are run from the root of the project using pnpm:

### Global Commands

| Command          | Action                                      |
|:-----------------|:--------------------------------------------|
| `pnpm install`   | Installs dependencies for all projects      |
| `pnpm run dev`   | Starts all applications in development mode |
| `pnpm run build` | Builds all applications                     |
| `pnpm run test`  | Runs all unit and E2E tests                 |
| `pnpm run lint`  | Lints the entire codebase with Biome        |
| `pnpm run check` | Runs type checks and linting for all apps   |

### App-Specific Commands

| App           | Command                | Action                   |
|:--------------|:-----------------------|:-------------------------|
| **Portfolio** | `pnpm dev:portfolio`   | Dev server for portfolio |
|               | `pnpm build:portfolio` | Build portfolio          |
| **Blog**      | `pnpm dev:blog`        | Dev server for blog      |
|               | `pnpm build:blog`      | Build blog               |
| **API**       | `pnpm dev:api`         | Dev server for API       |
|               | `pnpm build:api`       | Build API                |

![Alt](https://repobeats.axiom.co/api/embed/e814d9379628a6c98c24408834f6394ec8ea0c07.svg "Repobeats analytics image")
