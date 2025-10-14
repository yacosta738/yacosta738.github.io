# CORS Fix Deployment Guide

## Issues Fixed

### 1. Production Issue
**Error**: `Access to fetch at 'https://api.yunielacosta.com/api/newsletter' from origin 'https://v4.yunielacosta.com' has been blocked by CORS policy`

**Root Cause**: The production origin in `wrangler.jsonc` was configured as `https://www.v4.yunielacosta.com` (with `www`) but the actual origin is `https://v4.yunielacosta.com` (without `www`).

**Fix Applied**: Updated `wrangler.jsonc` line 38:
```diff
- "ALLOWED_ORIGINS": "https://yacosta738.github.io,https://www.yunielacosta.com,https://www.v4.yunielacosta.com"
+ "ALLOWED_ORIGINS": "https://yacosta738.github.io,https://www.yunielacosta.com,https://v4.yunielacosta.com"
```

### 2. Local Development Issue
**Error**: `Access to fetch at 'http://localhost:8787/api/newsletter' from origin 'http://localhost:4321' has been blocked by CORS policy`

**Root Cause**: The CORS middleware was silently failing when `ALLOWED_ORIGINS` was empty or not configured, not logging any warnings.

**Fix Applied**: Enhanced CORS middleware in `src/index.ts` to:
- Log warnings when CORS is not configured or origin is denied
- Properly handle empty allowlist scenarios
- Return 403 status for OPTIONS requests from denied origins

## Deployment Steps

### For Production

1. **Deploy the updated worker to Cloudflare**:
   ```bash
   cd apps/api
   pnpm run deploy
   ```

2. **Verify deployment**:
   - Check that the worker is deployed: https://api.yunielacosta.com/
   - Test the newsletter endpoint from https://v4.yunielacosta.com

3. **If still failing, verify Cloudflare environment variables**:
   ```bash
   wrangler secret list
   ```
   
   Make sure the `ALLOWED_ORIGINS` variable is set correctly in Cloudflare dashboard or via:
   ```bash
   # Note: ALLOWED_ORIGINS is a plain var, not a secret
   # It's already in wrangler.jsonc, but if you need to override via dashboard:
   # Go to: Cloudflare Dashboard > Workers & Pages > yap-api > Settings > Variables
   ```

### For Local Development

1. **Verify `.dev.vars` file exists** (already checked ✓):
   ```bash
   cat apps/api/.dev.vars
   ```

2. **Ensure ALLOWED_ORIGINS includes localhost:4321**:
   ```
   ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000
   ```

3. **Restart the local worker**:
   ```bash
   # Stop current dev server (Ctrl+C)
   pnpm run dev
   ```

4. **Test from the portfolio**:
   - Open http://localhost:4321
   - Try subscribing to the newsletter
   - Check browser DevTools Network tab for CORS headers

## Verification Checklist

### Production
- [ ] Deploy worker: `pnpm run deploy`
- [ ] Test from https://v4.yunielacosta.com
- [ ] Verify CORS headers in browser DevTools:
  - `Access-Control-Allow-Origin: https://v4.yunielacosta.com`
  - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type, YAP-AUTH-TOKEN, form-token-id`

### Local
- [ ] Restart dev server
- [ ] Test from http://localhost:4321
- [ ] Verify CORS headers include `Access-Control-Allow-Origin: http://localhost:4321`
- [ ] Check worker logs for any CORS warnings

## Debugging

### If production still fails:

1. **Check worker logs**:
   ```bash
   wrangler tail
   ```

2. **Verify the actual origin being sent**:
   - Open browser DevTools > Network
   - Look at the OPTIONS preflight request
   - Check the `Origin` header value

3. **Test CORS directly**:
   ```bash
   curl -X OPTIONS https://api.yunielacosta.com/api/newsletter \
     -H "Origin: https://v4.yunielacosta.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -v
   ```

   Expected response headers:
   ```
   Access-Control-Allow-Origin: https://v4.yunielacosta.com
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, YAP-AUTH-TOKEN, form-token-id
   ```

### If local still fails:

1. **Verify `.dev.vars` is loaded**:
   ```bash
   # Check wrangler output when starting dev server
   # Should show: "Using vars defined in .dev.vars"
   ```

2. **Check allowed origins in code**:
   Add temporary logging in `src/index.ts`:
   ```typescript
   console.log("ALLOWED_ORIGINS env:", c.env.ALLOWED_ORIGINS);
   console.log("Parsed origins:", allowedOrigins);
   console.log("Request origin:", requestOrigin);
   ```

## Files Changed

1. `apps/api/wrangler.jsonc` - Updated production ALLOWED_ORIGINS
2. `apps/api/src/index.ts` - Enhanced CORS middleware with better logging

## Related Documentation

- [CORS Implementation Guide](./docs/guides/cors-implementation.md)
- [API Endpoints Reference](./docs/reference/api-endpoints.md)
