# Research: Implementar soporte completo de externalArticles en páginas de tags

## Decisions & Rationale

 
### Decision 1: API combinada en `core/article`

- Rationale: Centralizar la lógica de combinación (articles + externalArticles) evita duplicación en páginas y mejora testabilidad.
- Alternatives: Modificar directamente la plantilla de tag (rechazado por tipado y repetición); crear nueva capa de servicio ad hoc (innecesario).


### Decision 2: Filtrado y deduplicación

- Rationale: Usar `article.id` como clave de deduplicación mantiene consistencia y evita mostrar el mismo contenido dos veces.
- Alternatives: Deduplicar por título/URL (frágil); por hash del cuerpo (costoso e innecesario).


### Decision 3: Respeto de idioma y draft

- Rationale: Mantener lógica actual: `parseEntityId(id).lang` para idioma; excluir `draft: true` de ambas colecciones.
- Alternatives: Flags adicionales o campos derivados (innecesario en esta fase).

## Unknowns Resolved

- Tipos estrictos para externalArticles: se mapearán a `Article` mediante el mismo mapper (`toArticles`) o un helper que haga narrow-cast seguro si los campos coinciden. Confirmar compatibilidad de esquemas (content.config.ts muestra misma estructura clave).
- Generación de rutas: `getStaticPaths` consultará la API combinada. Si falla, fallback documentado no es necesario si la API es robusta.

## Best Practices

- Evitar `any`; usar tipos de `astro:content` y modelos locales.
- Mantener funciones pequeñas y puras donde sea posible, con cache local si es necesario (similar a `tagsCache`).
- Pruebas: unitarias para filtrado/combinación y E2E para ruta real `/en/blog/tag/r`.
