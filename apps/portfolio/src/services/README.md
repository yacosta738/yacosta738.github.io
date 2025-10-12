# Services Layer

This directory contains the services layer that abstracts API communication logic from the UI components.

## Overview

The services layer follows the **Single Responsibility Principle** by separating concerns:
- **API Client**: Generic HTTP client for making requests
- **Service Modules**: Domain-specific services (Contact, Newsletter)
- **Configuration**: Centralized API configuration

## Architecture

```
services/
├── api-config.ts       # API configuration and types
├── api-client.ts       # Generic HTTP client
├── contact.service.ts  # Contact form service
├── newsletter.service.ts # Newsletter subscription service
└── index.ts           # Public API exports
```

## Usage

### Contact Service

```typescript
import { contactService } from "@/services";

const result = await contactService.submitContact({
  name: "John Doe",
  email: "john@example.com",
  subject: "Hello",
  message: "This is a test message",
  _gotcha: "" // Honeypot field
});

if (result.success) {
  console.log("Message sent successfully!");
} else {
  console.error("Error:", result.message);
}
```

### Newsletter Service

```typescript
import { newsletterService } from "@/services";

const result = await newsletterService.subscribe({
  email: "john@example.com",
  _gotcha: "" // Honeypot field
});

if (result.success) {
  console.log("Subscribed successfully!");
} else {
  console.error("Error:", result.message);
}
```

### Direct API Client Usage

For custom endpoints:

```typescript
import { apiClient } from "@/services";

const response = await apiClient.post("/custom-endpoint", {
  data: "value"
});
```

## Configuration

API configuration is managed in `api-config.ts`. Set the `PUBLIC_API_URL` environment variable:

```bash
# Development
PUBLIC_API_URL=http://localhost:8787

# Production
PUBLIC_API_URL=https://api.yunielacosta.com
```

If not set, defaults are:
- Development: `http://localhost:8787`
- Production: `https://api.yunielacosta.com`

## Features

### Error Handling

All services handle errors gracefully and return consistent responses:

```typescript
interface ServiceResponse {
  success: boolean;
  message: string;
}
```

### Validation

Services include client-side validation before making API calls:
- Email format validation
- Required field checks
- Minimum length requirements

### Timeout Protection

All requests have a 10-second timeout to prevent hanging requests.

### Type Safety

Full TypeScript support with typed request/response interfaces.

## Testing

Services can be mocked for testing:

```typescript
import { ContactService } from "@/services";

const mockService = new ContactService();
// Mock the submitContact method
jest.spyOn(mockService, 'submitContact').mockResolvedValue({
  success: true,
  message: "Mocked success"
});
```

## Best Practices

1. **Always use services** instead of direct `fetch` calls in components
2. **Handle errors gracefully** - services return success/error states
3. **Validate on both client and server** - don't rely solely on client validation
4. **Use honeypot fields** to reduce spam (`_gotcha`)
5. **Keep services focused** - one service per domain/feature

## Adding New Services

To add a new service:

1. Create a new service file (e.g., `feedback.service.ts`)
2. Extend the `ApiClient` or use it directly
3. Add the endpoint to `API_CONFIG` in `api-config.ts`
4. Export the service in `index.ts`
5. Document usage in this README

Example:

```typescript
// feedback.service.ts
import { apiClient } from "./api-client";
import { API_CONFIG } from "./api-config";

export class FeedbackService {
  async submitFeedback(data: FeedbackData) {
    return apiClient.post(API_CONFIG.endpoints.feedback, data);
  }
}

export const feedbackService = new FeedbackService();
```

## Migration from Direct Fetch

Before (in component):
```typescript
const response = await fetch("/api/contact.json", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
```

After (using service):
```typescript
import { contactService } from "@/services";
const result = await contactService.submitContact(data);
```

Benefits:
- ✅ Centralized error handling
- ✅ Built-in validation
- ✅ Consistent API responses
- ✅ Easy to test and mock
- ✅ Type safety
- ✅ Configurable endpoints
