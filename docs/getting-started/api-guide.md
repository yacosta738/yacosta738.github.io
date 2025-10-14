# Guide: API Migration to Cloudflare Workers

This guide provides a comprehensive overview of the migration from local Astro API endpoints to a centralized Cloudflare Worker. It covers the architecture, setup, usage, and rationale behind the changes.

## 1. Executive Summary

The primary goal of this migration was to decouple the API logic from the frontend application by moving it to a Cloudflare Worker. This was achieved by introducing a dedicated service layer in the portfolio application that communicates with the worker.

### Key Benefits
- **Separation of Concerns:** The frontend is now only responsible for presentation, while the worker handles API logic.
- **Improved Type Safety:** Full TypeScript support across the client and server reduces runtime errors.
- **Maintainability & Reusability:** A single, centralized API client and service layer simplifies updates and is easy to reuse.
- **Enhanced Testability:** Services can be mocked and tested independently of the UI.
- **Centralized Configuration:** A single source of truth for API URLs and settings.

### "Before" Architecture
```
Component (e.g., Contact.astro)
  └─> fetch("/api/contact.json")
      └─> Astro API Route
          └─> External Webhook
```

### "After" Architecture
```
Component (e.g., Contact.astro)
  └─> contactService.submitContact()
      └─> apiClient.post()
          └─> Cloudflare Worker API
              └─> External Webhook
```

---

## 2. Service Layer Implementation

A new service layer was created at `apps/portfolio/src/services/` to handle all API communication.

### File Structure
```text
src/services/
├── api-config.ts          # Centralized API configuration (URLs, endpoints)
├── api-client.ts          # Generic HTTP client for POST/GET requests
├── contact.service.ts     # Service for the contact form
├── newsletter.service.ts  # Service for the newsletter subscription
├── index.ts               # Public exports for all services
└── README.md              # Service layer documentation
```

### API Client (`api-client.ts`)
- Features a 10-second timeout.
- Provides robust error handling.
- Supports request cancellation via `AbortController`.

### Services (`contact.service.ts`, `newsletter.service.ts`)
These services encapsulate the logic for interacting with specific endpoints. They use the `api-client` to make requests and handle data validation before sending.

**Example Usage:**
```typescript
// In Contact.astro
import { contactService } from "@/services";

const result = await contactService.submitContact(data);
// result is typed as { success: boolean, message: string }
```
```typescript
// In CtaNewsletterSubscription.astro (using dynamic import)
const { newsletterService } = await import("@/services");

const result = await newsletterService.subscribe({ email, _gotcha });
```

---

## 3. Worker Setup and Configuration

The Cloudflare Worker is located in `apps/api/`.

### Local Development

1.  **Install Dependencies:**
    ```bash
    cd apps/api
    pnpm install
    ```
2.  **Log in to Wrangler:**
    ```bash
    wrangler login
    ```
3.  **Configure Secrets:** The worker requires secrets for authentication and webhook URLs. These must be set using Wrangler.
    ```bash
    # Authentication token for webhooks
    wrangler secret put WEBHOOK_AUTH_TOKEN

    # Form token ID
    wrangler secret put WEBHOOK_FORM_TOKEN_ID

    # Webhook URLs
    wrangler secret put CONTACT_WEBHOOK_URL
    wrangler secret put NEWSLETTER_WEBHOOK_URL
    ```
4.  **Start the Dev Server:**
    ```bash
    pnpm dev
    ```
    The worker will be available at `http://localhost:8787`.

5.  **Configure Portfolio Environment:** Create a `.env` file in `apps/portfolio/` with the following content:
    ```
    API_URL=http://localhost:8787
    ```

### Production Deployment

1.  **Deploy the Worker:**
    ```bash
    cd apps/api
    pnpm deploy
    ```
    This will deploy the worker to your Cloudflare account.

2.  **Set Production Secrets:** Repeat the `wrangler secret put` commands without the `--env development` flag if you have different production values.

3.  **Configure Production Environment:** In your hosting provider (Vercel, Netlify, etc.), set the `API_URL` environment variable to your production worker URL (e.g., `https://api.yourdomain.com`).

---

## 4. API Endpoint Reference

The worker exposes the following endpoints.

### `POST /contact`
- **Purpose:** Forwards a contact message to a webhook.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string",
    "_gotcha": "string?" // Honeypot field, should be empty
  }
  ```
- **Success Response (200):** `{ "success": true, "message": "Message sent successfully" }`
- **Error Response (500):** `{ "success": false, "message": "Failed to send message" }`

### `POST /newsletter`
- **Purpose:** Subscribes a user to the newsletter.
- **Request Body:**
  ```json
  {
    "email": "string",
    "_gotcha": "string?" // Honeypot field, should be empty
  }
  ```
- **Success Response (200):** `{ "success": true, "message": "Subscription successful" }`
- **Error Response (500):** `{ "success": false, "message": "Failed to subscribe" }`

---

## 5. Changed Files and Migration Impact

### Files Created
- **Service Layer (6 files):** `api-config.ts`, `api-client.ts`, `contact.service.ts`, `newsletter.service.ts`, `index.ts`, `README.md`.
- **Documentation (5 files):** The original set of migration documents.

### Files Modified
- `apps/portfolio/src/components/sections/Contact.astro`: Updated to use `contactService`.
- `apps/portfolio/src/components/organisms/CtaNewsletterSubscription.astro`: Updated to use `newsletterService`.
- `.env.example`: Added `API_URL`.

### Files to Delete
The following Astro API routes are now obsolete and can be removed after verifying the worker is fully functional:
- `apps/portfolio/src/pages/api/contact.json.ts`
- `apps/portfolio/src/pages/api/newsletter.json.ts`

---

## 6. Troubleshooting

- **"Failed to fetch" Error:**
  - Ensure the worker is running (`pnpm dev` in `apps/api`).
  - Verify the `API_URL` in your portfolio's `.env` file is correct.

- **CORS Error:**
  - The worker is configured to allow `*` for `Access-Control-Allow-Origin`. If issues persist, check the headers in `apps/api/src/index.ts`.

- **"Authentication failed" or Webhook Errors:**
  - Check that all secrets are correctly set in your Cloudflare environment using `wrangler secret list`.
  - Use `wrangler tail` to view live logs from the worker to diagnose issues.
