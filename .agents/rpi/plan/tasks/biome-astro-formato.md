# Tarea: habilitar formato Astro completo con Biome

## Ruta

Delegated direct; no se crean artefactos SDD.

## Objetivo

Completar el commit local `8f5efef7` y actualizar la PR #2025, habilitando el formato Astro en Biome, corrigiendo los errores de lint acordados y reparando las referencias inválidas del contenido compartido.

## Decisiones y alcance

- Se habilitó el soporte/formateador HTML de Biome para Astro sin relajar las reglas de lint.
- Se formatearon los archivos Astro del inventario revisado y se atendieron diagnósticos válidos con fixes seguros, conservando los fallbacks Safari.
- Se externalizó el comportamiento de scroll de `Header.astro` a `header-scroll.ts`: Biome refluía el script inline hasta volverlo JavaScript inválido, y la directiva de formato no lo protegía. El usuario autorizó expresamente conservar esta solución. Se mantienen los hooks de ciclo de vida de Astro y la limpieza de listeners.
- Para referencias de contenido compartido, se agregaron los registros faltantes `libinsane`, `jekyll`, `itunes-api` y `css3`, y se cambiaron cuatro referencias de categoría de `programming` (inexistente) a `software-development`, disponible para cada idioma. No se relajaron esquemas.
- No se incluyeron cambios incidentales de `.agents/skills/openai-cloudflare-deploy/assets/cloudflare-small.svg` ni `packages/shared/src/styles/fonts.css`.

## Verificación

- `pnpm check`: exit 0. Biome informa 0 errores, 79 advertencias y 5 infos; API: 24/24 tests y `wrangler deploy --dry-run` completado; Portfolio Astro: 17 archivos, 0 errores/advertencias/hints; Blog Astro: 315 archivos, 0 errores/advertencias/hints.
- Verificación dirigida de `check:astro` para Portfolio y Blog: ambas pasan con 0 diagnósticos.
- `biome lint . --max-diagnostics=500 --reporter=json`: exit 0, 0 errores, 79 advertencias y 5 infos.
- `biome format . --reporter=json`: Astro/TypeScript formateados; los únicos dos diagnósticos globales observados son los archivos incidentales SVG y CSS, restaurados y fuera del cambio.
- `git diff --check` señala 20 líneas vacías finales en wrappers Astro generados por Biome. La salida formateada de Biome requiere esos dos LF; quitarlos hace fallar la conformidad del formatter. Se conserva la salida de Biome y se documenta esta incompatibilidad puntual con `git diff --check`.
- El módulo `header-scroll.ts` está incluido en el chequeo Biome y el `astro check` de ambos sitios pasó. No se afirma prueba visual de navegador.

## Estado

- [x] Formatear el inventario revisado de Astro y resolver los errores de lint acordados sin desactivar reglas.
- [x] Externalizar el script scroll de Header tras comprobar que el formatter inline producía JS inválido; conservar el cambio con autorización explícita.
- [x] Corregir los registros y referencias de contenido inválidos sin debilitar los schemas.
- [x] Ejecutar `pnpm check` y capturar exit 0 y evidencia por paquete.
- [x] Revisar el alcance staged: solo plan, Astro/TS, cuatro registros de skill y cuatro cambios de frontmatter; no hay cambios unstaged.
- [ ] Crear commit convencional y actualizar la rama de la PR #2025; confirmar SHA remoto y estado de checks.

## Riesgos y limitaciones

- Las 79 advertencias y 5 infos Biome son diagnósticos no bloqueantes preexistentes/no resueltos en este alcance; no se silencian.
- Los wrappers Astro formateados contienen el LF final que Biome genera; `git diff --check` lo marca como línea vacía adicional.
- No se ejecutó verificación E2E visual del comportamiento de scroll extraído.
