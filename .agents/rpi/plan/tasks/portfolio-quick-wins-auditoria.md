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

Ready — Quick Wins acordados con el usuario (CV-vivo, sin restructuración).
Pendiente crear la rama de trabajo, ejecutar RPI-001 antes de cualquier
escritura en código fuente y registrar la evidencia real de cada cambio.
