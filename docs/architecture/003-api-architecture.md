# ADR-003: API Architecture

## Status
**Accepted** | Date: 2024-01

## Context
The API needs to handle:
- Contact form submission
- Newsletter subscription
- Protection against spam and bots

## Decision
We will use **Cloudflare Workers** with **Hono** as the framework:

### Stack:
- **Runtime**: Cloudflare Workers (Edge)
- **Framework**: Hono
- **Validation**: Zod + @hono/zod-openapi
- **Documentation**: OpenAPI 3.0 + Swagger UI

### Endpoints:
```
POST /api/contact    - Send contact message
POST /api/subscribe  - Newsletter subscription
GET  /doc            - OpenAPI documentation
```

### Security Measures Implemented:

1. **Rate Limiting**
   - In-memory per IP (20 req/min)
   - Consider Cloudflare Level in production

2. **CORS with Allowlist**
   - Only allowed origins via `ALLOWED_ORIGINS`
   - No wildcards (`*`)

3. **hCaptcha**
   - Server-side token verification
   - Invalid tokens are rejected

4. **Honeypot**
   - `_gotcha` field (hidden field)
   - If it has value = spam

5. **Input Validation**
   - Zod schemas with strict validation
   - Data sanitization

### Integration:
- Forms are sent to **n8n** via webhooks
- Authentication via headers (`YAP-AUTH-TOKEN`, `form-token-id`)

## Consequences
- ✅ Edge computing = low latency
- ✅ Predictable costs (Workers + n8n)
- ✅ Automatic documentation
- ❌ In-memory rate limiting only works per isolate
- ❌ Dependency on n8n for processing
