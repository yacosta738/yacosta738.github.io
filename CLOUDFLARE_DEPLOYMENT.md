# 🚀 Cloudflare Pages Deployment Guide

This project is optimized for deployment on Cloudflare Pages with aggressive caching and performance optimizations.

## 📋 Prerequisites

- Cloudflare account
- GitHub repository connected to Cloudflare Pages
- Node.js 20+
- pnpm 10.28.0+

## 🔧 Configuration Files

- `wrangler.toml` - Build configuration for Cloudflare Pages
- `apps/portfolio/public/_headers` - Custom HTTP headers for caching and security
- `apps/portfolio/public/_routes.json` - Asset routing optimization
- `.cfignore` - Files to exclude from deployment

## ⚙️ Cloudflare Pages Setup

### 1. Connect Repository

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub repository
4. Select this repository

### 2. Build Configuration

Use these settings in Cloudflare Pages:

```
Framework preset: Astro
Build command: pnpm install && pnpm --filter=portfolio build
Build output directory: apps/portfolio/dist
Root directory: (leave empty or use "/")
```

### 3. Environment Variables

Add these in Cloudflare Pages → Settings → Environment variables:

```
NODE_VERSION = 20
PNPM_VERSION = 10.28.0
```

### 4. Build Settings

**Production branch**: `main` (or your default branch)

**Build caching**: ✅ Enabled (recommended)

## 🎯 Performance Optimizations

### Cache Strategy

Our `_headers` configuration implements:

- **Static assets** (JS, CSS, fonts, images): `max-age=31536000, immutable` (1 year)
- **HTML pages**: `max-age=3600, must-revalidate` (1 hour)
- **Service worker**: `max-age=0, must-revalidate` (no cache)

### Security Headers

All pages include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: restrictive`

### Asset Routing

The `_routes.json` excludes static assets from Cloudflare Functions, improving performance:
- `/_astro/*` - Astro generated assets
- `/assets/*` - Static assets
- `/fonts/*` - Font files
- All image formats (png, jpg, webp, svg, etc.)

## 🧪 Testing Before Deploy

### Local Build

```bash
cd apps/portfolio
pnpm build
pnpm preview
```

### Verify Headers Locally

```bash
# Build the project
pnpm build

# Check if _headers and _routes.json are in dist
ls apps/portfolio/dist/_*

# Preview with headers (requires local server)
pnpm preview
```

### Test with Cloudflare's Wrangler CLI (Optional)

```bash
# Install wrangler globally
npm install -g wrangler

# Preview locally with Cloudflare environment
wrangler pages dev apps/portfolio/dist
```

## 📊 Expected Performance Improvements

| Metric | Before | After Cloudflare Optimization |
|--------|--------|------------------------------|
| **Time to First Byte (TTFB)** | ~300-500ms | ~50-150ms (Cloudflare CDN) |
| **Cache Hit Ratio** | ~30-40% | ~85-95% (1 year cache) |
| **Static Asset Load** | ~200-400ms | ~50-100ms (CDN edge) |
| **Security Score** | Basic | A+ (Security Headers) |

## 🔍 Post-Deployment Verification

After deploying to Cloudflare Pages:

### 1. Check Headers

```bash
curl -I https://your-site.pages.dev/_astro/some-file.js
```

Should return:
```
cache-control: public, max-age=31536000, immutable
```

### 2. Test PageSpeed Insights

```
https://pagespeed.web.dev/analysis/https-your-site-pages-dev/
```

Verify:
- ✅ Accessibility: 95-100 (no contrast errors)
- ✅ Performance: 90-100 (Cloudflare CDN boost)
- ✅ Best Practices: 95-100 (security headers)

### 3. Check Cloudflare Analytics

Go to Cloudflare Dashboard → Pages → Your Project → Analytics

Monitor:
- **Cache Hit Rate**: Should be >80% after warmup
- **Bandwidth Saved**: Should increase over time
- **Edge Response Time**: Should be <100ms globally

## 🐛 Troubleshooting

### Build Fails

1. Check Node version: `NODE_VERSION = 20`
2. Check pnpm version: `PNPM_VERSION = 10.28.0`
3. Verify build command includes `pnpm install`

### Headers Not Applied

1. Verify `_headers` is in `apps/portfolio/public/`
2. Check file is copied to `dist/` after build
3. Cloudflare may take 5-10 minutes to propagate changes

### Cache Not Working

1. Clear Cloudflare cache: Dashboard → Caching → Purge Everything
2. Verify `_routes.json` is in `dist/`
3. Check Browser DevTools → Network → Response Headers

### Assets Not Found (404)

1. Verify `directory = "apps/portfolio/dist"` in build settings
2. Check asset paths in browser console
3. Ensure `_routes.json` is correctly formatted

## 🔗 Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Custom Headers](https://developers.cloudflare.com/pages/platform/headers/)
- [Routing](https://developers.cloudflare.com/pages/platform/serving-pages/)
- [Build Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [Redirects & Rewrites](https://developers.cloudflare.com/pages/platform/redirects/)

## 📞 Support

If you encounter issues:

1. Check Cloudflare Pages build logs
2. Review [Cloudflare Community](https://community.cloudflare.com/)
3. Open an issue in this repository

---

**Note**: First deployment may take 2-5 minutes. Subsequent deployments are faster (~1-2 minutes).
