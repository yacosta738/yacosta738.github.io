# Implementation Plan: Implementar soporte completo de externalArticles en páginas de tags

**Branch**: `002-implementar-soporte-completo` | **Date**: 2025-10-16 | **Spec**: ../spec.md
**Input**: Feature specification from `/specs/002-implementar-soporte-completo/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Incluir `externalArticles` tanto en la generación de rutas de páginas de tag como en los listados de dichas páginas, combinándolos con `articles`, respetando `draft`, filtrado por idioma (prefijo en `id`), coincidencia por `tag.slug`, deduplicación por `id` y paginación. Diseñar una API de obtención de artículos combinada, tipada y alineada con Biome/TS strict. Actualizar la plantilla de tag para consumir la nueva API y añadir pruebas (unitarias/E2E).

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (strict)  
**Primary Dependencies**: Astro (content collections), Vitest, Playwright  
**Storage**: N/A (content files en repo)  
**Testing**: Vitest (unit/integration) y Playwright (E2E apps/portfolio)  
**Target Platform**: Static site (Astro pre-render), web  
**Project Type**: Monorepo; app objetivo: apps/portfolio  
**Performance Goals**: Mantener CWV en páginas de tag (LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1)  
**Constraints**: Biome + TS strict; evitar `any`; seguir arquitectura/UI/I18n de AGENTS.md  
**Scale/Scope**: Ámbito limitado a páginas de tag (generación y listado)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Verify against repository Constitution]

- Code Quality: Se mantiene Biome + TS strict; se creará API tipada sin `any`; funciones pequeñas y cohesivas en `core/article`.
- Testing Standards: Pruebas unitarias (combinación/filtrado/dedupe) y al menos 1 E2E (ruta de tag con solo externos). Añadir regresión para el caso R.
- UX Consistency: No se cambian patrones visuales; mantener semántica/links correctos; i18n: rutas por idioma intactas; switch de idioma respeta lógica de tags.
- Performance Requirements: Medir página de tag tras cambios (LCP/INP/CLS) y verificar no regresión. Documentar medición local o en CI.

Todos los gates son alcanzables; no se requieren waivers.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
apps/portfolio/
├── src/
│   ├── core/
│   │   ├── article/
│   │   │   ├── article.service.ts      # Añadir API combinada (nuevo export)
│   │   │   ├── article.mapper.ts       # Reusar; evaluar helper para externos si hiciera falta
│   │   └── tag/
│   ├── pages/
│   │   └── [lang]/blog/tag/[tag].astro # Actualizar para usar API combinada
│   └── tests/ (si aplica unitarios locales)
└── tests/
  └── e2e/                            # Añadir E2E: tag con solo externos
```

**Structure Decision**: Modificaciones confinadas a `apps/portfolio/src/core/article` y a la página de tag, más pruebas en `apps/portfolio/tests/e2e` o `apps/portfolio/src/test-setup.ts` si se añaden unitarias.

## Complexity Tracking

Note: Fill only if Constitution Check has violations that must be justified.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
