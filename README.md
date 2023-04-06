# Welcome to my personal portfolio made with [Astro](https://astro.build)

[![Github Pages Astro CI](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/yacosta738/yacosta738.github.io/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0c5e5ad4-8565-4a37-b181-b4442505a68b/deploy-status)](https://app.netlify.com/sites/yunielacosta/deploys)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=yacosta738_yacosta738.github.io&metric=bugs)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=yacosta738_yacosta738.github.io)](https://sonarcloud.io/summary/new_code?id=yacosta738_yacosta738.github.io)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```shell
drwxr-xr-x    - acosta 10 Sep 10:30 .
.rw-r--r--  303 acosta 31 Aug 09:25 ├── astro-i18next.config.js
.rw-r--r--  994 acosta  9 Sep 19:01 ├── astro.config.js
.rw-r--r--   32 acosta 30 Aug 15:53 ├── netlify.toml
.rw-r--r-- 1.7k acosta  9 Sep 18:59 ├── package.json
.rw-r--r-- 230k acosta  9 Sep 20:03 ├── pnpm-lock.yaml
drwxr-xr-x    - acosta  9 Sep 19:11 ├── public
drwxr-xr-x    - acosta 29 Aug 13:39 │  ├── assets
.rw-r--r-- 4.3k acosta 21 Aug 17:08 │  ├── favicon.ico
drwxr-xr-x    - acosta 29 Aug 13:39 │  ├── files
.rwxr-xr-x 9.0k acosta 21 Aug 17:08 │  ├── logo.svg
.rwxr-xr-x  68k acosta 21 Aug 17:08 │  ├── oops.png
drwxr-xr-x    - acosta  9 Sep 09:36 │  ├── rss
drwxr-xr-x    - acosta  9 Sep 16:49 │  ├── uploads
.rwxrwxrwx  79k acosta 15 Jul 19:36 │  └── you-are-the-best.png
.rw-r--r-- 2.0k acosta  8 Sep 21:11 ├── README.md
.rw-r--r--  429 acosta  2 Sep 13:12 ├── remark-reading-time.mjs
.rw-r--r--  619 acosta 21 Aug 17:08 ├── SECURITY.md
drwxr-xr-x    - acosta 29 Aug 13:39 ├── src
drwxr-xr-x    - acosta 29 Aug 13:39 │  ├── components
drwxr-xr-x    - acosta 30 Aug 17:15 │  ├── data
.rw-r--r--  160 acosta 31 Aug 09:25 │  ├── env.d.ts
drwxr-xr-x    - acosta 29 Aug 13:39 │  ├── locales
drwxr-xr-x    - acosta  7 Sep 18:18 │  ├── models
drwxr-xr-x    - acosta  9 Sep 09:28 │  ├── pages
drwxr-xr-x    - acosta 29 Aug 13:39 │  ├── store
drwxr-xr-x    - acosta  3 Sep 13:05 │  ├── styles
drwxr-xr-x    - acosta 29 Aug 13:39 │  └── util
.rw-r--r-- 1.7k acosta 31 Aug 09:25 ├── tailwind.config.cjs
.rw-r--r--  971 acosta 31 Aug 07:11 └── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components or layouts.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                             |
| :------------------------ | :------------------------------------------------- |
| `npm install`             | Installs dependencies                              |
| `npm run dev`             | Starts local dev server at `localhost:3000`        |
| `npm run build`           | Build your production site to `./dist/`            |
| `npm run preview`         | Preview your build locally, before deploying       |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help`    | Get help using the Astro CLI                       |
| `npm run format`          | Format your code with Prettier                     |
| `npm run lint:eslint`     | Lint your code with ESLint                         |
| `npm run lint:eslint:fix` | Lint and fix your code with ESLint                 |
| `npm run test`            | Run your tests with Playwright                     |
| `npm run test:e2e`        | Run your end-to-end tests with Playwright          |

## :beers: My Social Links

[LinkedIn](https://www.linkedin.com/in/yacosta738/)
[Twitter](https://twitter.com/yacosta738)
[Portfolio & Blog](https://www.yunielacosta.com/)
[GitHub](https://github.com/yacosta738)
[Instagram](https://www.instagram.com/yacosta738)
