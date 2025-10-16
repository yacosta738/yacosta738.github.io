# Data Model: externalArticles + articles (tags pages)

## Entities

### Article (combined view)

- id: string
- title: string
- description: string
- date: Date
- lastModified?: Date
- author: { id, name }
- cover?: Asset
- tags: Array<{ id: string; slug: string; title: string }>
- category: { id, title }
- draft: boolean
- featured?: boolean
- isExternal: boolean (derivado por colección de origen)

### Tag

- id: string (incluye prefijo de idioma)
- slug: string
- title: string
- lang: string (derivado del id)

## Rules

- Filtrado por idioma: `parseEntityId(article.id).lang === currentLang`.
- Coincidencia de tag: `article.tags.some(t => t.slug === currentTagSlug)`.
- Deduplicación: por `article.id`.
- Paginación: mantener límite actual (16), ordenar por fecha descendente.
