# ADR-004: Estrategia de Testing

## Estado
**Aceptado** | Fecha: 2024-01

## Contexto
Necesitamos una estrategia de testing que garantice:
- Calidad del código
- Regresión minima
- Confianza en despliegues

## Decisión
Usaremos una estrategia de testing en múltiples niveles:

### Niveles de Testing:

#### 1. Unit Tests (Vitest)
- **Alcance**: Utilidades, funciones puras, componentes aislados
- **Ubicación**: `tests/unit/**/*.test.ts`
- **Ejecución**: En CI y pre-push

#### 2. Integration Tests (Vitest)
- **Alcance**: API endpoints, handlers
- **Ubicación**: `src/**/*.test.ts` (en cada app)
- **Mocks**: Wrangler para testing de Workers

#### 3. E2E Tests (Playwright)
- **Alcance**: Flujos completos del usuario
- **Ubicación**: `packages/testing-e2e/tests/e2e/**/*.spec.ts`
- **Navegadores**: Chromium, Firefox, WebKit, Mobile
- **Accesibilidad**: @axe-core/playwright

### Cobertura objetivo:
- Unit: >70% para lógica de negocio
- API: 100% coverage en endpoints
- E2E: Flujos críticos (contact, newsletter, navegación)

### Pipeline CI:
```
1. Biome (lint + format)
2. TypeScript check
3. Unit tests + coverage
4. Build
5. E2E tests (Playwright)
6. SonarCloud quality gate
```

## Consecuencias
- ✅ Múltiples niveles = confianza
- ✅ Coverage tracking
- ✅ Accesibilidad verificada
- ❌ Tiempo de CI aumenta
- ❌ Mantenimiento de tests E2E

## Referencias
- Playwright config: `apps/*/playwright.config.ts`
- Vitest config: `apps/*/vitest.config.ts`
