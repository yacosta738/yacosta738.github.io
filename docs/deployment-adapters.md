# Dynamic Deployment Adapter Configuration

This project supports dynamic adapter configuration based on the `DEPLOYMENT_ADAPTER` environment variable. This allows you to deploy the same codebase to different hosting platforms without changing code.

## Supported Adapters

The following adapters are available:

### 1. Node (`node`)

**Default adapter** - Standalone Node.js server

```bash
DEPLOYMENT_ADAPTER=node
```

**Best for:**

- Self-hosted servers
- Docker containers
- VPS deployments
- Traditional hosting

**Output:** Standalone Node.js application in `dist/` folder

**Run command:** `node dist/server/entry.mjs`

---

### 2. Vercel (`vercel`)

Serverless deployment on Vercel

```bash
DEPLOYMENT_ADAPTER=vercel
```

**Best for:**

- Zero-config Vercel deployments
- Serverless functions
- Edge functions
- Automatic CI/CD with Vercel

**Features:**

- Web Analytics integration enabled by default
- Automatic HTTPS
- Edge network distribution
- Zero configuration needed on Vercel

**Environment variables in Vercel:**
Set `DEPLOYMENT_ADAPTER=vercel` in your Vercel project settings.

---

### 3. Cloudflare (`cloudflare`)

Cloudflare Pages/Workers deployment

```bash
DEPLOYMENT_ADAPTER=cloudflare
```

**Best for:**

- Cloudflare Pages
- Cloudflare Workers
- Edge computing
- Global CDN distribution

**Features:**

- Platform proxy enabled for local development
- Passthrough image service (or use `cloudflare` for Cloudflare Images)
- Access to Cloudflare bindings (KV, R2, D1, etc.)

**Configuration:**
The adapter uses `imageService: "passthrough"` by default. If you want to use Cloudflare Images, change it to `"cloudflare"` in `astro.config.mjs`.

---

### 4. Netlify (`netlify`)

Netlify deployment

```bash
DEPLOYMENT_ADAPTER=netlify
```

**Best for:**

- Netlify deployments
- Netlify Functions
- Netlify Edge Functions
- GitHub/GitLab integration

**Features:**

- Automatic CI/CD
- Preview deployments
- Form handling
- Split testing

---

## How It Works

### 1. Environment Variable Detection

The configuration in `astro.config.mjs` reads the `DEPLOYMENT_ADAPTER` environment variable:

```typescript
const adapterName = (process.env.DEPLOYMENT_ADAPTER || "node").toLowerCase();
```

### 2. Dynamic Import

Based on the adapter name, the appropriate adapter is dynamically imported:

```typescript
switch (adapterName) {
  case "vercel":
    const vercel = await import("@astrojs/vercel/serverless");
    return vercel.default({ webAnalytics: { enabled: true } });
  // ... other cases
}
```

### 3. Fallback

If the adapter fails to load or is not recognized, it falls back to the Node adapter:

```typescript
catch (error) {
  console.warn(`Failed to load adapter "${adapterName}". Falling back to node adapter.`);
  const node = await import("@astrojs/node");
  return node.default({ mode: "standalone" });
}
```

## Configuration Files

### Local Development (.env)

```bash
# Use node adapter for local development
DEPLOYMENT_ADAPTER=node

# Webhook configuration
WEBHOOK_AUTH_TOKEN=your_dev_token
WEBHOOK_FORM_TOKEN_ID=your_dev_form_id
CONTACT_WEBHOOK_URL=https://webhook-test.example.com/contact
NEWSLETTER_WEBHOOK_URL=https://webhook-test.example.com/newsletter
```

### Production (.env.production or hosting platform env vars)

#### Vercel

```bash
DEPLOYMENT_ADAPTER=vercel
WEBHOOK_AUTH_TOKEN=your_prod_token
WEBHOOK_FORM_TOKEN_ID=your_prod_form_id
CONTACT_WEBHOOK_URL=https://webhook.example.com/contact
NEWSLETTER_WEBHOOK_URL=https://webhook.example.com/newsletter
```

#### Cloudflare Pages

```bash
DEPLOYMENT_ADAPTER=cloudflare
WEBHOOK_AUTH_TOKEN=your_prod_token
WEBHOOK_FORM_TOKEN_ID=your_prod_form_id
CONTACT_WEBHOOK_URL=https://webhook.example.com/contact
NEWSLETTER_WEBHOOK_URL=https://webhook.example.com/newsletter
```

#### Netlify

```bash
DEPLOYMENT_ADAPTER=netlify
WEBHOOK_AUTH_TOKEN=your_prod_token
WEBHOOK_FORM_TOKEN_ID=your_prod_form_id
CONTACT_WEBHOOK_URL=https://webhook.example.com/contact
NEWSLETTER_WEBHOOK_URL=https://webhook.example.com/newsletter
```

## Output Mode

The project is configured with `output: "server"` mode, which enables:

- ✅ Server-side rendering (SSR)
- ✅ API routes (`/api/*`)
- ✅ Dynamic routes
- ✅ On-demand rendering

If you want to optimize for mostly static content with some server routes, you can change to `output: "hybrid"` and use `export const prerender = false` in pages that need SSR.

## Testing Different Adapters Locally

To test how your site works with different adapters:

```bash
# Test with Node adapter (default)
DEPLOYMENT_ADAPTER=node pnpm run build
node dist/server/entry.mjs

# Test build for Vercel
DEPLOYMENT_ADAPTER=vercel pnpm run build

# Test build for Cloudflare
DEPLOYMENT_ADAPTER=cloudflare pnpm run build

# Test build for Netlify
DEPLOYMENT_ADAPTER=netlify pnpm run build
```

## Troubleshooting

### Adapter not found

If you get an error about a missing adapter:

```bash
# Install all adapters
pnpm add -D @astrojs/node @astrojs/vercel @astrojs/cloudflare @astrojs/netlify
```

### Build fails on hosting platform

1. Make sure `DEPLOYMENT_ADAPTER` is set correctly in the environment variables
2. Check that the adapter is listed in `devDependencies` in `package.json`
3. Verify the build command in your hosting platform settings

### API routes not working

1. Ensure `output: "server"` is set in `astro.config.mjs`
2. Verify the adapter is loaded correctly (check build logs)
3. Make sure API route files are in `/src/pages/api/` and end with `.ts` or `.js`

## Resources

- [Astro Adapters Documentation](https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter)
- [Vercel Adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Netlify Adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/)
- [Node Adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
