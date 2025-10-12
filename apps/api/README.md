# Cloudflare Workers OpenAPI 3.1

This is a Cloudflare Worker with OpenAPI 3.1 using [chanfana](https://github.com/cloudflare/chanfana) and [Hono](https://github.com/honojs/hono).

This API provides secure endpoints for:

- **Contact Form**: Send messages through a contact form with spam protection
- **Newsletter**: Subscribe emails to a newsletter with validation

## Get started

1. Sign up for [Cloudflare Workers](https://workers.dev). The free tier is more than enough for most use cases.
2. Clone this project and install dependencies with `pnpm install`
3. Run `wrangler login` to login to your Cloudflare account in wrangler
4. Configure environment variables (see Configuration section)
5. Run `wrangler deploy` to publish the API to Cloudflare Workers

## Configuration

### Environment Variables

This worker uses two types of environment variables:

#### 1. Plaintext Variables (in `wrangler.jsonc`)

These are non-sensitive values that can be committed to version control:

```jsonc
{
  "vars": {
    "CONTACT_WEBHOOK_URL": "https://your-webhook-domain.com/webhook/v1/contact",
    "NEWSLETTER_WEBHOOK_URL": "https://your-webhook-domain.com/webhook/v1/newsletter"
  }
}
```

#### 2. Secrets (for sensitive data)

**For Production:**

Set secrets using Wrangler CLI (these are encrypted and never visible in code):

```bash
# Set hCaptcha secret key
wrangler secret put HCAPTCHA_SECRET_KEY

# Set webhook authentication token
wrangler secret put WEBHOOK_AUTH_TOKEN

# Set webhook form token ID
wrangler secret put WEBHOOK_FORM_TOKEN_ID
```

**For Local Development:**

Create a `.dev.vars` file in the `apps/api` directory:

```bash
# Copy the example file
cp .dev.vars.example .dev.vars

# Edit .dev.vars with your actual values
```

Example `.dev.vars` content:

```bash
HCAPTCHA_SECRET_KEY=0x0000000000000000000000000000000000000000
WEBHOOK_AUTH_TOKEN=your_auth_token_here
WEBHOOK_FORM_TOKEN_ID=your_form_token_id_here
```

> **⚠️ Important:** Never commit `.dev.vars` to version control! It's already in `.gitignore`.

### Required Variables Summary

| Variable | Type | Description |
|----------|------|-------------|
| `CONTACT_WEBHOOK_URL` | Plaintext | Webhook URL for contact form submissions |
| `NEWSLETTER_WEBHOOK_URL` | Plaintext | Webhook URL for newsletter subscriptions |
| `HCAPTCHA_SECRET_KEY` | Secret | hCaptcha secret key for validation |
| `WEBHOOK_AUTH_TOKEN` | Secret | Authentication token for webhook requests |
| `WEBHOOK_FORM_TOKEN_ID` | Secret | Form-specific token for validation |

For more details, see the [Cloudflare Workers Environment Variables documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables).

## Project structure

1. Your main router is defined in `src/index.ts`.
2. Each endpoint has its own file in `src/endpoints/`.
   - `contact.ts` - Contact form endpoint
   - `newsletter.ts` - Newsletter subscription endpoint
3. Type definitions are in `src/types.ts`.
4. For more information read the [chanfana documentation](https://chanfana.pages.dev/) and [Hono documentation](https://hono.dev/docs).

## Development

1. Run `wrangler dev` to start a local instance of the API.
2. Open `http://localhost:8787/` in your browser to see the Swagger interface where you can try the endpoints.
3. Changes made in the `src/` folder will automatically trigger the server to reload, you only need to refresh the Swagger interface.

## Testing

This project includes comprehensive unit and integration tests using Vitest.

### Run tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Test coverage

- **32 tests** covering both endpoints and integration
- Contact endpoint: 10 tests
- Newsletter endpoint: 15 tests
- Integration: 7 tests

See [TESTING.md](./TESTING.md) for detailed testing documentation and [TEST-SUMMARY.md](./TEST-SUMMARY.md) for the latest test results.

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about your service",
  "message": "I would like to know more about...",
  "_gotcha": ""
}
```

### POST /api/newsletter

Subscribe to the newsletter.

**Request body:**

```json
{
  "email": "subscriber@example.com",
  "_gotcha": ""
}
```

**Note:** The `_gotcha` field is a honeypot for spam protection. Leave it empty for legitimate requests.

## Security Features

- ✅ **Honeypot protection**: Bot detection via `_gotcha` field
- ✅ **Email validation**: RFC-compliant with ReDoS protection
- ✅ **Secure authentication**: Custom headers for webhook authentication
- ✅ **Environment-based secrets**: Sensitive data stored as Cloudflare secrets
- ✅ **Input validation**: Zod schema validation for all inputs

## License

See the main repository for license information.
