# Plan: mantenimiento de dependencias

## Ruta

Delegated direct. El usuario autorizó actualizar dependencias e instalar lo
necesario. Primero remediar dependencias vulnerables; después correr checks,
unit tests, E2E y builds antes de cualquier PR. SEO y rendimiento quedan para
una etapa posterior.

## Contexto y límites

- Monorepo con `apps/blog`, `apps/portfolio`, `apps/api` y paquetes
  compartidos; versiones centralizadas en `pnpm-workspace.yaml`.
- Auditoría inicial: `pnpm audit --prod` reportó 48 avisos (1 crítico,
  22 altos, 21 moderados, 4 bajos); `pnpm audit` reportó 121 (3 críticos,
  52 altos, 51 moderados, 15 bajos).
- La instalación inicial no tenía `node_modules/`; por eso
  `pnpm outdated -r` indicó `missing` y no describió un árbol instalado.
- Críticos iniciales: `astro@6.4.6` (blog, RCE AVIF), `tar@7.5.13` vía
  `astro-icon > @iconify/tools` y `shell-quote@1.8.3` vía `npm-run-all2`.
- Otros avisos altos incluían `js-yaml`, `fast-uri`, `sharp`, `undici`, `ws`,
  `brace-expansion`, `nanoid`, `postcss`, `svgo`, `deepmerge-ts`, `smol-toml`
  y `devalue`.
- Astro 7.3.5 requiere Node >=22.12; `@astrojs/mdx` 8.0.2 requiere Astro
  ^7.2.10. El entorno del repo cumple los requisitos de Node.
- Preservar el cambio previo del usuario en
  `packages/shared/src/styles/global.css`; no revertirlo ni mezclar su
  intención en el cambio de dependencias.
- El usuario autorizó las actualizaciones y pidió que pasen todos los gates
  antes de abrir PR. Nunca trabajar directamente en `main`.

## Tareas

### RPI-001 — Confirmar inventario reproducible

- Revisar estado de `pnpm-lock.yaml`, instalación y dependencias
  directas/transitivas afectadas.
- Repetir auditorías de producción y desarrollo, y asociar avisos priorizados
  a paquete, app, severidad, ruta y corrección.
- Criterio: documentar vulnerabilidades y opciones de corrección.
- Evidencia: `pnpm install --frozen-lockfile` terminó correctamente en el
  worktree; se registraron las auditorías iniciales anteriores.

### RPI-002 — Evaluar parches compatibles

- Determinar upgrades seguros para dependencias directas y transitivas,
  evitando overrides indiscriminados.
- Revisar rangos compatibles, cambios mayores y verificaciones requeridas.
- Criterio: elegir una secuencia de cambios compatible con el workspace.
- Evidencia: catálogo y lockfile actualizados; auditoría final fresca sin
  vulnerabilidades. Se eliminó `astro-critters`, que no se usaba en
  configuraciones Astro y retenía una dependencia vulnerable.

### RPI-003 — Evaluar Astro 7 para el workspace

- Contrastar migración oficial, requisitos de Node, Vite 8 e integraciones
  usadas.
- Mantener versiones coherentes entre Blog, Portfolio y paquetes
  compartidos.
- Criterio: validar compatibilidad con checks, builds y pruebas.
- Evidencia: Astro 7.3.5 y `@astrojs/mdx` 8.0.2 alineados en el
  catálogo; checks, builds y E2E completaron correctamente.

### RPI-004 — Actualizar dependencias y verificar todo

- Trabajar en `chore/dependency-security`, sin tocar `main`; conservar el
  comportamiento del workspace.
- Validar lockfile reproducible, auditorías, checks, unit tests, E2E y builds
  antes de publicar.
- Criterio: que pasen `pnpm check`, `pnpm test:unit`, `pnpm test:e2e`,
  `pnpm build` y auditorías.
- Evidencia (2026-10-01): `pnpm install --frozen-lockfile` pasó. Ejecuciones
  frescas de `pnpm audit` y `pnpm audit --prod` reportaron
  `No known vulnerabilities found`. `pnpm check` pasó; se mantienen avisos
  no bloqueantes de referencias de contenido del Blog. `pnpm test:unit` pasó:
  Portfolio 66, Blog 221, API 24. `pnpm test:e2e` pasó: 25 passed,
  20 skipped. `pnpm build` completó API, Portfolio (20 páginas) y Blog
  (489 páginas). Para corregir la inferencia de dimensiones del favicon desde
  `public/`, `Logo.astro` usa `<img>` nativo y su prueba previene la regresión.
  Se fijó `ASTRO_PREVIEW_BACKGROUND=0` en Playwright del Blog para evitar que
  Astro separe el proceso preview bajo el entorno de pruebas. `git diff --check`
  pasó y `packages/shared/src/styles/global.css` permanece intacto.
- Revisión externa: CodeRabbit no pudo conectar por 403 de membresía de
  organización; limitación registrada. La revisión local del diff no encontró
  artefactos generados inesperados.

## Evidencia de diagnóstico (2026-10-01)

- Auditorías iniciales: `pnpm audit --prod` encontró 48 avisos y
  `pnpm audit` 121.
- La consulta de compatibilidad indicó Astro 7.3.5, Node >=22.12 y
  `@astrojs/mdx` 8.0.2 con peer Astro ^7.2.10.
- La documentación oficial de Astro v7 consultada vía Context7 señala el
  salto a Vite 8 y Node mínimo v22.12.0.

## Estado

- RPI-001: completo; inventario y auditorías de origen registrados.
- RPI-002: completo; catálogo, dependencias y lockfile actualizados;
  auditoría final en cero vulnerabilidades.
- RPI-003: completo; compatibilidad validada funcionalmente mediante checks,
  build y E2E.
- RPI-004: gates completos; diff revisado localmente. CodeRabbit no pudo
  revisar por error 403; limitación no bloqueante documentada.
- Rama activa: `chore/dependency-security`; `main` no se modificó.
- El usuario aprobó explícitamente una PR única pese al tamaño estimado de
  5.219 líneas modificadas, frente al presupuesto recomendado de 400. La
  remediación y el lockfile se conservan juntos como unidad coherente.
- `packages/shared/src/styles/global.css` se preservó sin cambios.
- Permanecen advertencias no bloqueantes de referencias de contenido Notion
  durante el build.
