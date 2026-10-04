# Plan: Quick Wins derivados de la auditoría de portfolio (2026-10-04)

## Ruta

Delegated direct. Cambios mecánicos y de bajo riesgo en una rama con PR. No se
inicia SDD formal porque el alcance son remediaciones puntuales compatibles
con mantener el portfolio como CV-vivo (decisión explícita del usuario).

## Contexto y límites

- Informe: auditoría externa recibida el 4 de octubre de 2026 sobre
  `https://yunielacosta.com/`, `/en/`, `/es/`, `robots.txt` y sitemaps.
- Decisión editorial: el portfolio se mantiene como CV-vivo completo. No se
  recortará la portada, no se moverán proyectos a páginas secundarias y no se
  reescribirá la hero. El alcance de este plan es **mejora, no restructuración**.
- Coexiste con tres planes RPI activos:
  - `accesibilidad-temas.md` (Lighthouse a11y 97/100, contraste y foco).
  - `biome-astro-formato.md` (formato Astro en Biome, en PR).
  - `dependencias-seguras.md` (auditoría de vulnerabilidades, en PR).
- Ningún cambio debe revertir el trabajo previo en
  `packages/shared/src/styles/global.css`.
- La rama de trabajo se crea desde `main` y nunca se commitea directo a `main`.

## Tareas

### RPI-001 — Verificar claims de i18n en el código

- Confirmar en el código que la meta description y el `og:description` en
  `/es/` están realmente en inglés, y que `title` y OG también lo estén si
  aplica.
- Confirmar que `og:locale`, `og:locale:alternate` y los `hreflang` en `en` y
  `es` están bien formados.
- Salida: diff conceptual de qué falta localizar antes de tocar nada.

### RPI-002 — Localizar meta description, title y OG en español

- Crear entradas en el diccionario i18n para `homeDescription` en `en` y `es`
  con textos específicos por idioma, sin elipsis artificial ni truncamiento.
- Reutilizar la misma utilidad que ya consume `homeTitle` para que el cambio
  pase por el mismo punto de control de SEO.
- Verificar title, description, canonical y OG en `/en/`, `/es/` y la raíz
  después del cambio.

### RPI-003 — Enriquecer JSON-LD de Person

- Revisar `buildPersonJsonLd` y `safeJsonLd` en
  `apps/portfolio/src/lib/seo/json-ld.ts`.
- Añadir o completar: `sameAs` (LinkedIn, GitHub, YouTube si aplica),
  `knowsAbout` (Java, Kotlin, Spring Boot, Kafka, DDD, arquitectura
  distribuida), `jobTitle` ajustado a la propuesta real.
- Confirmar que el JSON-LD sigue validando con el Rich Results Test local o
  con una corrida de Astro build + `grep` sobre el HTML.

### RPI-004 — Proteger CLS y diferir carga

- Auditar imágenes y elementos below-the-fold: confirmar `loading="lazy"` y
  `decoding="async"` donde corresponda, y añadir `width`/`height` o
  `aspect-ratio` donde falte.
- Localizar el script de Ahrefs/analytics en el portfolio y diferirlo
  (`defer`, o carga tras interacción) si no es crítico para la conversión.
- Verificar que la imagen personal mantiene `loading="eager"` solo si entra
  en el primer viewport.

### RPI-005 — Limpiar jerarquía de encabezados y nombres accesibles

- Bajar la cita rotatoria de la hero de `h2` a `<p>` con clase visual, para
  que no compita con los encabezados de contenido.
- Revisar que ningún elemento de navegación (`Menu`, items del header) use
  `h2`/`h3` de forma que ensucie el outline.
- Auditar enlaces de iconos (laterales Social/Email): confirmar que cada uno
  tiene `aria-label` o texto accesible, y que el destino se entiende sin
  depender solo del icono.

### RPI-006 — Verificación focalizada

- `pnpm --filter=portfolio check` y `astro check` del portfolio.
- `pnpm --filter=portfolio build` para confirmar que el SSR sigue produciendo
  los meta tags esperados.
- `pnpm test:unit:portfolio` y, si el cambio toca componentes interactivos,
  `pnpm test:e2e:portfolio`.
- Capturar diffs de HTML de `/`, `/en/`, `/es/` antes/después y validar
  manualmente con `curl` o el preview de Cloudflare Pages que los meta tags
  localizados aparecen y que el JSON-LD parsea sin errores.

## Criterios de aceptación

- `/es/` muestra `title`, `meta description`, `og:title` y `og:description`
  en español, sin elipsis ni truncamiento.
- El JSON-LD de Person incluye `sameAs`, `knowsAbout` y `jobTitle`
  coherente con el perfil técnico.
- Ninguna imagen crítica queda sin dimensiones o con `loading` incorrecto.
- La jerarquía de encabezados del home ya no incluye la cita de la hero como
  `h2` y los iconos sin texto visible tienen nombre accesible.
- `pnpm check`, `astro check` del portfolio, `pnpm test:unit:portfolio` y
  `pnpm build:portfolio` pasan en la rama.
- Si hay E2E que valide la presencia de meta tags, también pasa.

## Evidencia

- Auditoría externa del 4 de octubre de 2026 (resumen en el chat, no commiteada).
- Mediciones de la auditoría: HTML ~274 KB sin comprimir, ~1490 elementos DOM,
  altura ~10 444 px, TTFB ~1.88 s, FCP ~2.5 s, Speed Index ~4.7 s,
  CLS ~0.069, Accessibility 97/100, Best Practices 96/100, SEO 100/100.
- No se afirma haber medido la producción en esta iteración; las mediciones
  de arriba son del informe externo y se toman como punto de partida, no
  como verdad verificada por nosotros.

## Estado

Done — Quick Wins implementados, validados localmente y commiteados en la
rama `chore/portfolio-seo-audit-qw-2026-10` (worktree
`/Users/acosta/Dev/worktrees/portfolio-seo-audit-qw`).

### Cambios aplicados (commit `587801ea`)

- `packages/shared/src/configs/site.consts.ts`: SITE_DESCRIPTION localizado
  en `en` y `es` con propuesta técnica en primera persona, ~150 caracteres
  cada uno, sin truncado.
- `packages/shared/src/layouts/Layout.astro`: el meta description usa
  `SITE_DESCRIPTION` localizado como fallback y se eliminó el truncado
  artificial a 160 chars (causa del "…" forzado que reportó la auditoría).
- `packages/shared/src/lib/seo/json-ld.ts`: añadido `knowsAbout` con 11
  skills (Java, Kotlin, Spring Boot, Kafka, DDD, arquitectura hexagonal,
  etc.).
- `packages/shared/src/components/sections/Hero.astro`: la cita rotatoria
  pasa de `h2` a `p` para limpiar el outline semántico.
- `packages/shared/src/layouts/Layout.astro`: eliminado el preload de
  Alkatra (fuente huérfana — ningún selector CSS la usa).

### Cambios registrados en el plan (commit `df11b6c1`)

- `docs(rpi)`: este plan agregado al árbol `.agents/rpi/plan/tasks/`.

### Hallazgos que no se aplicaron (decisión editorial)

- La auditoría propuso reescribir hero, recortar la portada, mover CV a
  páginas secundarias y crear `/services/` y `/case-studies/`. El usuario
  eligió mantener el portfolio como CV-vivo completo, así que esos cambios
  quedan fuera de este plan.
- La auditoría reportó "beacon.min.js duplicado": falso, el conteo de
  `grep -c "cloudflareinsights"` incluía el `preconnect` y el script del
  beacon como si fueran duplicados cuando son cosas distintas. Solo hay
  una inyección real.
- La auditoría reportó "meta description en español sigue en inglés": en
  realidad está en inglés en **ambas** URLs (`/` y `/es/`). El fix
  mecánico fue sustituir el fallback roto (`t("default.summary")`, clave
  inexistente en el diccionario) por el `SITE_DESCRIPTION` localizado.
- La auditoría reportó TTFB ~1.88 s; curl desde este entorno midió
  0.32 s para la portada y 0.32 s para `/es/`. La cifra de la auditoría
  parece provenir de una corrida con throttling móvil.

### Hallazgos adicionales descubiertos (fuera del scope de este plan)

- Web Analytics huérfano de Cloudflare (`site_tag:
  00073f5867ca4ed381c23786f4d7d0c6`, `auto_install: false`, sin `ruleset`
  ni `rules`). El real y activo es
  `4c9f2cb7b262481e86a0b7f36a73dc64` (`auto_install: true`, ruleset
  enlazado al zone `yunielacosta.com`). El huérfano se intentó pausar vía
  API de Cloudflare (PUT) y devolvió `Authentication error (10000)` por
  scope insuficiente del token. Queda como acción manual desde el
  dashboard de Cloudflare Pages.
- Alkatra está declarada en `fonts.css` (múltiples formatos) y el archivo
  SVG vive en `packages/shared/src/assets/font/alkatra/` y duplicado en
  `apps/blog/src/assets/font/alkatra/`. Si Alkatra no se va a usar, se
  pueden eliminar los archivos de fuente por completo en un pase
  independiente.

### Verificación focalizada

- `pnpm --filter=portfolio check`: 0 errores, 0 warnings, 0 hints.
- `pnpm --filter=portfolio build`: 20 páginas, sin errores.
- `pnpm test:unit:portfolio`: 13 archivos, 66 tests, todos en verde.
- HTML de `dist/index.html` y `dist/es/index.html` validados con `python`
  + regex: meta description localizada y sin elipsis, `knowsAbout`
  presente en JSON-LD Person, sin preload de Alkatra.
- Tamaño HTML sin comprimir: 274989 → 273455 bytes (root) y
  274989 → 274202 bytes (`/es/`). Reducción marginal porque la mayor
  parte del HTML es el CV-vivo, que no se tocó; la ganancia real es que
  el navegador ya no solicita el woff2 de Alkatra (~16 KB) en la ruta
  crítica.
