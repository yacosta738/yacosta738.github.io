# API Tests

Este directorio contiene tests unitarios e integración para los endpoints de la API de Cloudflare Workers.

## Estructura de Tests

```text
src/
├── endpoints/
│   ├── contact.ts
│   ├── contact.test.ts       # Tests unitarios del endpoint de contacto
│   ├── newsletter.ts
│   └── newsletter.test.ts    # Tests unitarios del endpoint de newsletter
├── index.ts
└── index.test.ts             # Tests de integración de la aplicación
```

## Ejecutar Tests

### Ejecutar todos los tests

```bash
pnpm test
```

### Ejecutar tests en modo watch

```bash
pnpm test:watch
```

### Ejecutar tests con cobertura

```bash
pnpm test:coverage
```

## Cobertura de Tests

### Contact Endpoint (`contact.test.ts`)

- ✅ **Validación de Schema**: Verifica la estructura del schema OpenAPI
- ✅ **Envío Exitoso**: Prueba el envío exitoso de mensajes de contacto
- ✅ **Protección Honeypot**: Verifica que los bots sean bloqueados
- ✅ **Variables de Entorno**: Valida que las variables de entorno estén configuradas
- ✅ **Manejo de Errores**: Prueba errores de webhook, red y validación
- ✅ **Validación de Datos**: Asegura que los datos se envíen correctamente
- ✅ **Headers de Autenticación**: Verifica los headers de autenticación

**Tests totales**: 12 casos de prueba

### Newsletter Endpoint (`newsletter.test.ts`)

- ✅ **Validación de Schema**: Verifica la estructura del schema OpenAPI
- ✅ **Suscripción Exitosa**: Prueba la suscripción exitosa al newsletter
- ✅ **Protección Honeypot**: Verifica que los bots sean bloqueados
- ✅ **Formatos de Email**: Valida múltiples formatos válidos de email
- ✅ **Variables de Entorno**: Valida que las variables de entorno estén configuradas
- ✅ **Manejo de Errores**: Prueba errores de webhook, red y validación
- ✅ **Validación de Datos**: Asegura que solo el email se envíe al webhook
- ✅ **Headers de Autenticación**: Verifica los headers de autenticación
- ✅ **Casos Edge**: Prueba timeouts y honeypot vacío

**Tests totales**: 17 casos de prueba

### Integration Tests (`index.test.ts`)

- ✅ **Documentación OpenAPI**: Verifica que la documentación se sirva correctamente
- ✅ **Rutas de API**: Valida la existencia de los endpoints
- ✅ **Métodos HTTP**: Asegura que solo POST sea aceptado
- ✅ **Rutas Inválidas**: Verifica respuesta 404 para rutas no existentes
- ✅ **CORS**: Valida los headers CORS

**Tests totales**: 6 casos de prueba

## Configuración de Tests

Los tests utilizan:

- **Vitest**: Framework de testing
- **@cloudflare/vitest-pool-workers**: Pool de workers de Cloudflare para simular el entorno
- **Coverage V8**: Para reportes de cobertura

### Variables de Entorno para Tests

Los tests mockean las siguientes variables de entorno:

```typescript
WEBHOOK_AUTH_TOKEN: "test-auth-token"
WEBHOOK_FORM_TOKEN_ID: "test-form-token-id"
NEWSLETTER_WEBHOOK_URL: "https://test-webhook.com/newsletter"
CONTACT_WEBHOOK_URL: "https://test-webhook.com/contact"
```

## Mejores Prácticas

1. **Mocks**: Todos los tests mockean `fetch` para evitar llamadas reales a APIs externas
2. **Aislamiento**: Cada test limpia los mocks con `beforeEach`
3. **Cobertura**: Se cubren casos exitosos, errores y edge cases
4. **Validación**: Se validan tanto datos como comportamiento
5. **Seguridad**: Se prueban características de seguridad como honeypot

## Agregar Nuevos Tests

Para agregar nuevos tests:

1. Crea un archivo `*.test.ts` junto al archivo que quieres probar
2. Importa las funciones de Vitest
3. Mockea las dependencias externas (fetch, env vars, etc.)
4. Escribe tests siguiendo el patrón AAA (Arrange, Act, Assert)

Ejemplo:

```typescript
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MyEndpoint } from "./my-endpoint";

describe("MyEndpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should do something", async () => {
    // Arrange
    const endpoint = new MyEndpoint();
    
    // Act
    const result = await endpoint.handle(mockContext);
    
    // Assert
    expect(result).toBeDefined();
  });
});
```

## Solución de Problemas

### Error: Module not found

Asegúrate de que todas las dependencias estén instaladas:

```bash
pnpm install
```

### Tests fallan en CI/CD

Verifica que las variables de entorno estén configuradas correctamente en tu entorno de CI/CD.

### Cobertura baja

Ejecuta `pnpm test:coverage` y revisa el reporte HTML en `coverage/index.html` para identificar áreas sin cubrir.
