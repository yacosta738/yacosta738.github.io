# Feature Specification: Implementar soporte completo de externalArticles en páginas de tags

**Feature Branch**: `002-implementar-soporte-completo`  
**Created**: 2025-10-16  
**Status**: Draft  
**Input**: User description: "Implementar soporte completo de externalArticles: incluir externalArticles en la generación de rutas y en el listado de artículos para páginas de tag, con tipos estrictos y sin romper Biome/TS. Cambios: 1) Core Article API combinada (articles + externalArticles), 2) actualizar [lang]/blog/tag/[tag].astro para usar la API combinada, 3) pruebas y verificación."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Ver tags con contenido (Priority: P1)

Como visitante del blog, cuando abro una URL de tag existente (por ejemplo, `/en/blog/tag/r`), quiero ver artículos asociados a ese tag aunque sean externos, para no encontrar páginas vacías o inexistentes.

**Why this priority**: Evita enlaces rotos o tags sin página cuando el contenido existe en artículos externos; mejora SEO y experiencia de navegación.

**Independent Test**: Acceder a `/en/blog/tag/r` en local tras el build. Debe renderizar una lista con al menos un artículo externo asociado.

**Acceptance Scenarios**:

1. **Given** existe al menos un artículo externo con tag `r` en inglés y ninguno interno, **When** visito `/en/blog/tag/r`, **Then** la página existe y lista ese artículo.
2. **Given** existen artículos internos y externos con el tag, **When** visito `/en/blog/tag/[tag]`, **Then** veo la lista combinada sin duplicados, paginada según el límite actual.

---

### User Story 2 - Generación de rutas de tags completa (Priority: P2)

Como motor de pre-render, al generar rutas estáticas de tags por idioma, quiero incluir tags con artículos externos (aunque no existan internos) para que todas las etiquetas con contenido tengan página.

**Why this priority**: Garantiza consistencia entre el listado de tags y las páginas disponibles; evita 404 en tags usados por artículos externos.

**Independent Test**: Inspeccionar rutas generadas para tags con solo artículos externos y confirmar que se construyen.

**Acceptance Scenarios**:

1. **Given** un tag `r` con artículos solo en `externalArticles` y `draft: false`, **When** se ejecuta el build estático, **Then** se genera `/en/blog/tag/r`.

---

### User Story 3 - Conmutación de idioma sin roturas (Priority: P3)

Como usuario que cambia de idioma, cuando estoy en una página de tag, quiero que el cambio a otro idioma mantenga el contexto del tag si existe en el idioma destino; si no existe, debo caer a la página índice de tags del idioma destino.

**Why this priority**: Mantiene continuidad de navegación multilenguaje.

**Independent Test**: Usar la utilidad de paths locales para un tag con/ sin equivalente y verificar rutas de fallback.

**Acceptance Scenarios**:

1. **Given** el tag `r` existe en `en` y `es`, **When** cambio a `es` desde `/en/blog/tag/r`, **Then** voy a `/es/blog/tag/r`.
2. **Given** un tag sin equivalente en el idioma destino, **When** cambio de idioma, **Then** navego a `/[lang]/blog/tag` (índice) como fallback.

3. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- Tag sin artículos (todos `draft: true`): no debe generar ruta; la página debe devolver 404 o no renderizarse.
- Artículo externo con tag pero `isExternal: true` y link inválido: debe mostrarse pero con manejo visual/UX para enlaces externos; no bloquear generación.
- Duplicados: si un artículo interno y uno externo comparten mismo ID por error, la lista debe deduplicar por `id`.
- Paginación: cuando el número combinado supera el límite por página, la paginación debe ser consistente y estable.
- Idiomas: artículos externos referenciados deben respetar el prefijo de idioma en `id` para filtrado correcto.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: El sistema DEBE generar rutas de páginas de tag por idioma cuando exista al menos un artículo (interno o externo) publicado (`draft: false`) con ese tag en ese idioma.
- **FR-002**: El listado de artículos en la página de tag DEBE combinar artículos de `articles` y `externalArticles`, filtrados por el `lang` de la URL y por coincidencia exacta de `tag.slug`.
- **FR-003**: El sistema DEBE evitar duplicados cuando un mismo contenido pudiera aparecer en ambas colecciones; la definición de duplicado será coincidencia exacta de `id`.
- **FR-004**: La paginación DEBE calcularse sobre el total combinado respetando el límite actual de posts por página.
- **FR-005**: El cambio de idioma DEBE mantener el slug del tag si existe en el idioma destino; si no existe, DEBE redirigir al índice de tags del idioma destino.
- **FR-006**: Los artículos con `draft: true` NO DEBEN contar para generación de rutas ni mostrarse en listados.
- **FR-007**: Los artículos externos DEBEN respetar el filtrado por idioma usando el prefijo de su `id` (p. ej., `en/...`).


Assumptions:

- Los slugs de tags son compartidos entre idiomas cuando corresponda (mismo slug); los títulos pueden diferir.
- El índice de tags por idioma ya existe y no se modifica en este cambio.
- El tamaño de página por defecto se mantiene (actualmente 16).

### Non-Functional Requirements

- **NFR-001 (Code Quality)**: El código DEBE pasar Biome y TypeScript strict (`pnpm check`).
- **NFR-002 (Testing)**: Añadir/actualizar pruebas: unitarias para combinación/filtrado/deduplicación y E2E para rutas de tag con contenido solo externo.
- **NFR-003 (Accesibilidad & UX)**: Mantener navegación y foco; para enlaces externos, indicar destino externo conforme a las normas del sitio.
- **NFR-004 (Performance)**: La combinación no debe introducir latencias perceptibles; mantener presupuesto actual de CWV en páginas de tag.

### Key Entities *(include if feature involves data)*

- **Article**: contenido del blog con atributos clave: `id`, `title`, `date`, `draft`, `tags[] (slug, title)`, `category`, `author`, `isExternal (derivado)`.
- **Tag**: etiqueta con atributos clave: `id`, `slug`, `title`, `lang (derivado del id)`.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Todas las etiquetas con al menos 1 artículo (interno o externo, no draft) generan su ruta de tag en el build (100% de cobertura en `getStaticPaths`).
- **SC-002**: Al visitar `/en/blog/tag/r` (caso actual), la página carga y muestra ≥1 artículo en <1.5s en entorno local de desarrollo.
- **SC-003**: La combinación de artículos no introduce duplicados (tasa de duplicados 0% en listados).
- **SC-004**: La paginación presenta el número correcto de páginas y elementos por página en todos los casos probados (100% de coincidencia esperada).
- **SC-005**: Se mantiene el presupuesto de rendimiento actual en páginas de tag (LCP ≤ 2.5s medido en build local).
- **SC-006**: Pruebas unitarias y E2E añadidas pasan en CI sin intermitencias.
