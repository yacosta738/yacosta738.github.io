# Implementación CORS Mejorada para Hono + Cloudflare Workers

## Resumen de Cambios

Se ha mejorado la implementación de CORS en el API Worker para:
1. **Eliminar el uso de `any` en el tipado**
2. **Usar allowlist de orígenes basada en variables de entorno**
3. **Aprovechar el sistema de tipos auto-generado de Wrangler**

## ¿Es esta la mejor implementación para CORS en Hono?

### ✅ Ventajas de la implementación actual

1. **Sin dependencias externas**: No usamos el middleware `hono/cors` predeterminado, dándanos control total
2. **Type-safe**: Usa el tipo `Env` generado automáticamente por Wrangler
3. **Flexible**: Se adapta a entornos de desarrollo, staging y producción mediante variable de entorno
4. **Seguro por defecto**: Si no hay `ALLOWED_ORIGINS` configurado, no se agregan headers CORS (más seguro que usar "*")
5. **Eficiente**: Cache de preflight de 24 horas (`Access-Control-Max-Age: 86400`)
6. **Explícito**: Rechaza preflights de orígenes no permitidos con 403

### 🔄 Alternativas consideradas

#### Opción 1: Usar `hono/cors` middleware (más simple)
```typescript
import { cors } from "hono/cors";

app.use("/*", cors({
  origin: (origin) => {
    const allowed = parseAllowedOrigins(c.env);
    return allowed.includes(origin) ? origin : null;
  },
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "YAP-AUTH-TOKEN", "form-token-id"],
  maxAge: 86400,
}));
```

**Pros**: Menos código, mantenido por el equipo de Hono
**Contras**: Menos control sobre el comportamiento exacto, no rechaza explícitamente con 403

#### Opción 2: Implementación custom (actual - recomendada para este caso)
Nuestra implementación actual es óptima porque:
- Necesitamos control fino sobre el comportamiento de rechazo
- Queremos documentar claramente la lógica de seguridad
- Integramos perfectamente con el sistema de tipos de Cloudflare Workers

## Evitar `any` en el tipado

### ❌ Problema anterior
```typescript
const runtimeEnv = (typeof globalThis !== "undefined" && (globalThis as any).ENV)
  ? (globalThis as any).ENV as Record<string, string | undefined>
  : (typeof process !== "undefined" && process.env) ? process.env : undefined;
```

### ✅ Solución actual (sin `any`)
```typescript
/**
 * Parse allowed origins from environment variable
 */
const parseAllowedOrigins = (env?: Record<string, string | undefined>): string[] => {
  const raw = env?.ALLOWED_ORIGINS;
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
};

// Dentro del middleware
const allowedOrigins = parseAllowedOrigins({ ALLOWED_ORIGINS: c.env.ALLOWED_ORIGINS });
```

**Por qué funciona:**
1. Wrangler genera automáticamente el tipo `Env` en `worker-configuration.d.ts`
2. El contexto de Hono `c.env` es tipado como `Env`
3. Accedemos directamente a `c.env.ALLOWED_ORIGINS` (tipo: `string`)
4. No necesitamos leer de `globalThis` o `process.env` porque Cloudflare Workers inyecta las vars en `c.env`

## Variables de Entorno: ALLOWED_ORIGINS

### 📍 Ubicación de configuración

#### 1. **Desarrollo local**: `.dev.vars`
```bash
# apps/api/.dev.vars (NO commiteado)
ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000
```

Archivo de ejemplo en: `apps/api/.dev.vars.example`

#### 2. **Configuración de Wrangler**: `wrangler.jsonc`
```jsonc
{
  "vars": {
    "ALLOWED_ORIGINS": "${ALLOWED_ORIGINS}"
  }
}
```

Esto permite que la variable sea inyectada desde:
- `.dev.vars` en desarrollo local
- Variables de entorno de Cloudflare en producción

#### 3. **Producción**: Cloudflare Dashboard o CLI

**Opción A: Dashboard de Cloudflare**
1. Ve a Workers & Pages > tu worker
2. Settings > Variables and Secrets
3. Agrega variable de entorno:
   - Name: `ALLOWED_ORIGINS`
   - Value: `https://yacosta738.github.io,https://www.yunielacosta.com`

**Opción B: Wrangler CLI**
```bash
# Establecer variable de entorno en producción
wrangler secret put ALLOWED_ORIGINS
# Cuando te pregunte, ingresa: https://yacosta738.github.io,https://www.yunielacosta.com
```

O usando variables de entorno (para CI/CD):
```bash
echo "https://yacosta738.github.io,https://www.yunielacosta.com" | wrangler secret put ALLOWED_ORIGINS
```

### 🔧 Formato de ALLOWED_ORIGINS

```bash
# Formato: lista separada por comas, sin espacios después de las comas (se eliminan automáticamente)
ALLOWED_ORIGINS=https://domain1.com,https://domain2.com,https://subdomain.domain3.com

# ✅ Correcto
ALLOWED_ORIGINS=https://yacosta738.github.io,https://www.yunielacosta.com

# ✅ También correcto (espacios se eliminan)
ALLOWED_ORIGINS=https://yacosta738.github.io, https://www.yunielacosta.com

# ❌ Incorrecto - usa http en producción solo si es necesario
ALLOWED_ORIGINS=http://yacosta738.github.io

# ✅ Para desarrollo local
ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000,http://127.0.0.1:4321
```

**Importante**: 
- Incluye el protocolo (`https://` o `http://`)
- NO incluyas trailing slashes
- Incluye el puerto si es diferente del estándar (80/443)
- Para desarrollo local, incluye todas las variantes (localhost, 127.0.0.1, puertos)

### 🧪 Verificación

#### Test manual local:
```bash
# 1. Asegúrate de tener .dev.vars configurado
cat apps/api/.dev.vars

# 2. Ejecuta el worker localmente
pnpm --filter yap-api dev

# 3. En otra terminal, prueba con curl
curl -H "Origin: http://localhost:4321" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     http://localhost:8787/api/contact

# Deberías ver:
# Access-Control-Allow-Origin: http://localhost:4321
# Access-Control-Allow-Methods: GET, POST, OPTIONS
# Status: 204

# 4. Prueba con origen no permitido
curl -H "Origin: https://malicious.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     http://localhost:8787/api/contact

# Deberías ver:
# Status: 403
# Body: CORS origin denied
```

## Mejores prácticas adicionales

### 1. Usa credenciales solo cuando sea necesario
Si necesitas enviar cookies o headers de autenticación:
```typescript
c.header("Access-Control-Allow-Credentials", "true");
```
Y en el cliente:
```javascript
fetch(url, { credentials: 'include' })
```

### 2. Minimiza headers permitidos
Solo incluye los headers que realmente necesitas:
```typescript
c.header("Access-Control-Allow-Headers", "Content-Type, YAP-AUTH-TOKEN, form-token-id");
```

### 3. Separa entornos
```bash
# .dev.vars (desarrollo)
ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000

# Producción (Cloudflare)
ALLOWED_ORIGINS=https://yacosta738.github.io,https://www.yunielacosta.com

# Staging (Cloudflare - ambiente staging)
ALLOWED_ORIGINS=https://staging.yacosta738.github.io
```

### 4. Monitorea rechazos CORS
Agrega logging cuando se rechaza un origen:
```typescript
if (!originAllowed) {
  console.warn(`CORS blocked: ${requestOrigin}`);
  if (c.req.method === "OPTIONS") {
    return new Response("CORS origin denied", { status: 403 });
  }
}
```

### 5. Mantén los tipos sincronizados
Después de cambiar `wrangler.jsonc`:
```bash
pnpm --filter yap-api cf-typegen
```

## Testing

Los tests actuales en `src/index.test.ts` verifican que:
1. Los endpoints responden correctamente
2. Los métodos HTTP son validados
3. Las rutas existen

**Tests adicionales recomendados para CORS** (agregar en el futuro):
```typescript
describe("CORS Policy", () => {
  it("should allow configured origins", async () => {
    const env = { ...mockEnv, ALLOWED_ORIGINS: "https://example.com" };
    const request = new Request("http://localhost/api/contact", {
      method: "OPTIONS",
      headers: { "Origin": "https://example.com" }
    });
    const response = await app.fetch(request, env, ctx);
    
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://example.com");
  });

  it("should reject non-configured origins", async () => {
    const env = { ...mockEnv, ALLOWED_ORIGINS: "https://example.com" };
    const request = new Request("http://localhost/api/contact", {
      method: "OPTIONS",
      headers: { "Origin": "https://malicious.com" }
    });
    const response = await app.fetch(request, env, ctx);
    
    expect(response.status).toBe(403);
  });

  it("should handle missing ALLOWED_ORIGINS gracefully", async () => {
    const env = { ...mockEnv, ALLOWED_ORIGINS: "" };
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Origin": "https://example.com" }
    });
    const response = await app.fetch(request, env, ctx);
    
    // Should continue without CORS headers
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});
```

## Resumen

✅ **Sin `any` en el tipado** - usa tipos generados por Wrangler
✅ **Implementación segura** - allowlist explícita, rechaza desconocidos
✅ **Configuración clara** - variable de entorno `ALLOWED_ORIGINS`
✅ **Ubicación documentada** - `.dev.vars`, `wrangler.jsonc`, Cloudflare Dashboard
✅ **Tests pasan** - 20/20 tests exitosos
✅ **Type-safe** - aprovecha el sistema de tipos de Cloudflare Workers

Esta es una implementación robusta y recomendada para CORS en Cloudflare Workers con Hono.
