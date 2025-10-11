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

Before deploying, set up the required environment variables as secrets:

```bash
wrangler secret put WEBHOOK_AUTH_TOKEN
wrangler secret put WEBHOOK_FORM_TOKEN_ID
wrangler secret put NEWSLETTER_WEBHOOK_URL
wrangler secret put CONTACT_WEBHOOK_URL
```

These variables are used to securely authenticate with your webhook endpoints (e.g., n8n).

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
