# Agregar AgentSync a proyectos destacados

## Ruta

Direct — cambio pequeño de contenido en el portfolio, sin ciclo SDD.

## Objetivo

Mostrar AgentSync en Featured Projects usando la portada proporcionada y enlazar tanto el repositorio como el sitio del proyecto.

## Tareas

- [x] Añadir la portada de AgentSync a los assets compartidos del proyecto.
- [x] Añadir metadata localizada EN/ES con AgentSync destacado y publicado.
- [x] Añadir AgentSync a los datos del currículum EN/ES para que el proyecto pueda resolverse/renderizarse.
- [x] Validar JSON y formato; se intentaron pruebas unitarias enfocadas.

## Evidencia

- `pnpm exec biome check` en los cuatro JSON: pasó, sin fixes.
- `python3 -m json.tool` en los cuatro JSON: todos parsean correctamente.
- La portada es `1774 × 887` y se copió desde la ruta local indicada.
- `pnpm exec vitest run ...`: bloqueado porque `vitest` no está instalado/enlazado en el entorno (`Command "vitest" not found`).

## Evidencia (fix build)

- CI falló con `FailedToFetchRemoteImageDimensions: ~/assets/images/agentsync-cover.png` porque el prefijo `~/` solo resuelve en `apps/portfolio/src/assets/` y el PNG estaba en `packages/shared`.
- Fix: `git mv` del PNG a `apps/portfolio/src/assets/images/` (precedente: `profile-tailors-og.jpg`).
- `pnpm build:portfolio` local: 24 páginas, Complete. CI Pipeline: success. Cloudflare Pages `yap-portfolio`: SUCCESS.

## Estado

Ready
