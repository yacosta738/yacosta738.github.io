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
- `lychee --no-progress --exclude-all-private --exclude-path node_modules --exclude-path public ./**/*.md`: exit 2 con 13 errores preexistentes distribuidos en 8 Markdown; ninguno de esos archivos Markdown forma parte de este cambio.
- Verificación dirigida de `check:astro` para Portfolio y Blog: ambas pasan con 0 diagnósticos.
- `biome lint . --max-diagnostics=500 --reporter=json`: exit 0, 0 errores, 79 advertencias y 5 infos.
- `biome format . --reporter=json`: Astro/TypeScript formateados; los únicos dos diagnósticos globales observados son los archivos incidentales SVG y CSS, restaurados y fuera del cambio.
- `git diff --check` quedó limpio mediante una excepción `whitespace=-blank-at-eof` limitada a las 20 rutas de wrappers Astro que Biome 2.5 formatea con una línea vacía final; las demás rutas conservan el chequeo habitual.
- El módulo `header-scroll.ts` está incluido en el chequeo Biome y el `astro check` de ambos sitios pasó. No se afirma prueba visual de navegador.

## Estado

- [x] Formatear el inventario revisado de Astro y resolver los errores de lint acordados sin desactivar reglas.
- [x] Externalizar el script scroll de Header tras comprobar que el formatter inline producía JS inválido; conservar el cambio con autorización explícita.
- [x] Corregir los registros y referencias de contenido inválidos sin debilitar los schemas.
- [x] Ejecutar `pnpm check` y capturar exit 0 y evidencia por paquete.
- [x] Limitar la excepción de Git a los 20 wrappers Astro formateados por Biome y verificar `git diff --check`.
- [x] Ejecutar Lychee del pre-push: 13 errores preexistentes en 8 archivos Markdown no modificados por este cambio.
- [x] Crear commit convencional `c6af1141` con la excepción de EOF path-specific y actualizar la evidencia.
- [ ] Empujar la rama y confirmar SHA remoto/estado de checks; la validación Lychee tiene 13 errores preexistentes y requiere ejecución por separado.

## Riesgos y limitaciones

- Las 79 advertencias y 5 infos Biome son diagnósticos no bloqueantes preexistentes/no resueltos en este alcance; no se silencian.
- Los wrappers Astro formateados contienen el LF final que Biome genera; `git diff --check` lo marca como línea vacía adicional.
- No se ejecutó verificación E2E visual del comportamiento de scroll extraído.
