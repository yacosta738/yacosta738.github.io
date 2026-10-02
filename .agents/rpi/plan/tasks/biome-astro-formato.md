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
- [x] Publicar la rama y confirmar el SHA remoto `a2ef174d`.
- [x] Corregir el error de compilación de `TextAnimation.astro`: en un script Astro `is:inline` Biome refluía el literal con salto de línea a una cadena JavaScript inválida; se redujo el aviso a un literal corto válido.
- [x] Formatear `cloudflare-small.svg` y `fonts.css` según Biome CI; `pnpm exec biome ci . --diagnostic-level=error` pasó.
- [x] Blog coverage local: 41 archivos de prueba, 221 tests; statements 69.26%, lines 69.32%.
- [x] Validar inclusión de `packages/shared/src` en Portfolio. Vitest requiere `coverage.allowExternal`; con exclusiones para tests y mocks, coverage pasa de 0% a 39.04% statements / 39.44% líneas (13 suites, 66 tests). V8 advierte que no puede parsear algunos modelos/utilidades TypeScript externos y los excluye; porcentaje orientativo, no cobertura completa de Shared.
- [x] Confirmar logs del Pages blog: en `a2ef174d` los prerenders fallaban por referencias de contenido inválidas de `programming` y cuatro tecnologías faltantes; estas referencias están corregidas en la rama publicada. Pages portfolio fallaba por `TextAnimation.astro:30` y el script inline inválido.
- [ ] Confirmar resultado de Sonar con el siguiente CI. El pre-CI `coverage-check` solo comprueba que hay LCOV; los jobs unitarios fallidos no subieron cobertura.
- [ ] Repetir gates fallidos, registrar evidencia y actualizar la PR #2025.

## Riesgos y limitaciones

- Las 79 advertencias y 5 infos Biome son diagnósticos no bloqueantes; no se silencian.
- Los wrappers Astro formateados contienen el LF final que Biome genera; Git whitespace se exceptúa solo para esas 20 rutas.
- CI indicó que falla la compilación de `TextAnimation.astro:30` por una cadena que cruza una línea. Las pruebas Blog/Portfolio no alcanzan a generar cobertura en ese estado.
- SonarCloud y Cloudflare Pages deben confirmarse con sus logs; no inferir que el 0% de cobertura sea una métrica real hasta ver LCOV subido y procesado.
- No se ejecutó verificación E2E visual del comportamiento de scroll extraído.
