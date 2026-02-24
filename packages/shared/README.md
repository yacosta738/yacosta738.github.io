# Shared Package

This package contains shared logic, components, and data used by the applications in this monorepo (`portfolio` and `blog`).

## 📦 Contents

- **Data**: Centralized content for articles, authors, projects, and skills.
- **i18n**: Core internationalization logic, translations, and reusable components.
- **Services**: API client and service abstractions for backend communication.
- **Library**: Utility functions and common types.
- **Icons**: Shared SVG icons.

## 📁 Structure

```
src/
├── data/          # JSON and MD/MDX data files
├── i18n/          # Shared translations and logic
├── icons/         # Shared SVG assets
├── layouts/       # Reusable Astro layouts
├── lib/           # Common utilities
├── services/      # API communication layer
├── styles/        # Global CSS and fonts
└── types/         # Common TypeScript definitions
```

## 🚀 Usage

This package is intended to be used as a dependency in the other apps in the monorepo. It is not a standalone application.

Example of using a shared service:

```typescript
import { contactService } from "@packages/shared/services";
```

Example of using shared translations:

```typescript
import { useTranslations } from "@packages/shared/i18n";
```

## 🧪 Testing

Unit tests for shared logic are located in `src/lib` and other directories. Run them using:

```bash
pnpm test:unit
```

## 📄 License

See the root `README.md` for license information.
