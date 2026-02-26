# ADR-002: Content and Data System

## Status
**Accepted** | Date: 2024-01

## Context
We need a system to manage portfolio and blog content:
- Resume/CV (multiple languages)
- Blog articles
- Tags, categories, authors
- Projects and metadata

## Decision
We will use **Astro Content Collections** with **JSON loaders** for data and **glob loaders** for content:

### Collections Defined:
1. **resume** - CV data (JSON per language)
2. **articles** - Blog articles (MD/MDX)
3. **tags** - Blog tags (Markdown)
4. **categories** - Categories (Markdown)
5. **authors** - Authors (JSON)
6. **externalArticles** - External articles (MD/MDX with link)
7. **skillsLibrary** - Skills library (JSON)
8. **languagesLibrary** - Supported languages (JSON)
9. **projectMetadata** - Project metadata (JSON)

### Data Location:
```
packages/shared/src/data/
├── resume/
│   ├── en/resume.json
│   └── es/resume.json
├── articles/
│   └── *.md
├── tags/
│   └── *.md
├── authors/
│   └── *.json
└── ...
```

### Benefits:
- ✅ Type-safety with Zod schemas
- ✅ Validation at build time
- ✅ Excellent DX with autocomplete
- ✅ Centralized data, multiple consumers

## Consequences
- Content changes require rebuild
- Data must follow defined schemas
- More complex data migrations
