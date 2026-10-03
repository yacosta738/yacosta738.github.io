# Plan: corrección de accesibilidad en temas claro y oscuro

## Ruta

Delegated direct. Corregir los hallazgos de accesibilidad observados en Portfolio y Blog con atención prioritaria al tema claro, sin degradar el tema oscuro. No se inicia SDD porque el alcance actual es una remediación enfocada y reversible.

## Contexto y límites

- Sitios públicos: `https://yunielacosta.com/` y `https://blog.yunielacosta.com/`.
- Hallazgo: Portfolio reportó contraste insuficiente en ambos modos; en tema claro se observaron fallos adicionales. Blog obtuvo Accessibility 100 en la primera medición, pero no se considera auditado en ambos temas hasta repetir por estado de tema.
- Preservar el cambio local preexistente en `packages/shared/src/styles/global.css` (regla `html.dark { color-scheme: dark; }`); integrar cualquier edición alrededor de él sin borrarlo ni reescribirlo.
- No relajar reglas de Lighthouse ni ocultar elementos para hacer pasar la auditoría.
- Alcance inmediato: arreglar contraste, etiquetas/nombres accesibles si se reproducen y focos visibles que aparezcan en hallazgos. No incluir optimizaciones de rendimiento en este cambio.

## Tareas

- [ ] Confirmar estado actual, reglas de contribución y pruebas disponibles; preservar cambios ajenos.
- [ ] Reproducir y clasificar hallazgos de Lighthouse/axe en Portfolio y Blog para tema claro y oscuro.
- [ ] Implementar las correcciones mínimas en tokens/componentes compartidos o específicos, según evidencia.
- [ ] Ejecutar verificaciones focalizadas y medir Lighthouse Accessibility en los cuatro contextos (dos sitios × dos temas).
- [ ] Registrar limitaciones, resultados y archivos modificados.

## Criterios de aceptación

- No permanecen los fallos de contraste/nombre accesible confirmados dentro del alcance en los sitios/temas verificados.
- El tema oscuro mantiene su aspecto y no empeora el resultado de accesibilidad.
- Verificaciones locales relevantes pasan; los resultados no ejecutados quedan explícitamente pendientes.
- El cambio preexistente en `global.css` permanece intacto.

## Evidencia

- Mobile Lighthouse inicial: Portfolio Accessibility 97; Blog Accessibility 100 (sin separación confiable por tema).
- Trazas anteriores de rendimiento mostraron TTFB/LCP anómalos, pero quedan fuera de este cambio.

## Estado

Working — contexto listo; falta diagnóstico reproducible por tema y plan técnico mínimo antes de editar código fuente.
