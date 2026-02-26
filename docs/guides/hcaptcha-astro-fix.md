# hCaptcha Integration Fix - Astro

## Original Problem

The hCaptcha widget was not rendering correctly in Astro, showing the error:
```
hCaptcha has failed to initialize. Please see the developer tools console for more information.
Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api
```

## Root Cause

The problem had two main aspects:

1. **Auto-rendering vs. Explicit Rendering**: hCaptcha's auto-render mode (`data-sitekey` on the div) doesn't work well with Astro's hydration system, causing the widget to try to render before the script is fully loaded.

2. **Initialization Timing**: Astro scripts run in a specific order that can cause race conditions with external libraries like hCaptcha.

## Implemented Solution

### 1. Explicit Rendering with Widget IDs

Instead of auto-rendering, we now use hCaptcha's JavaScript API to explicitly render each widget:

```javascript
// Load script with explicit rendering
<script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>

// Manually render when API is ready
const widgetId = window.hcaptcha.render(container, {
  sitekey: siteKey,
  theme: theme,
  size: size,
  callback: (token) => { /* ... */ }
});
```

### 2. Widget ID Management

We implement a global map to track widget IDs by container ID:

```javascript
window.hcaptchaWidgets = new Map();
window.hcaptchaWidgets.set(captchaId, widgetId);
```

This enables:
- Multiple hCaptcha widgets on the same page
- Reset specific widgets by their container ID
- Get responses from specific widgets

### 3. Custom Callbacks and Events

We add callbacks for all lifecycle events:

```javascript
{
  callback: (token) => {
    // Token stored in dataset
    container.dataset.token = token;
    // Custom event for the form
    container.dispatchEvent(new CustomEvent('hcaptcha-success', {
      detail: { token, widgetId }
    }));
  },
  'expired-callback': () => { /* ... */ },
  'error-callback': (error) => { /* ... */ }
}
```

### 4. Global Helper Functions

Simple helper functions are maintained for forms:

```javascript
// Get token by container ID
window.getCaptchaToken(containerId);

// Reset widget by container ID  
window.resetCaptcha(containerId);
```

### 5. Centralized TypeScript Types

We created `src/types/hcaptcha.d.ts` with all type definitions:

```typescript
interface HCaptchaAPI {
  render: (container: string | HTMLElement, config: HCaptchaConfig) => string;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string;
  // ...
}

declare global {
  interface Window {
    hcaptcha?: HCaptchaAPI;
    hcaptchaWidgets?: Map<string, string>;
    getCaptchaToken?: (containerId: string) => string | null;
    resetCaptcha?: (containerId: string) => void;
  }
}
```

## Modified Files

### 1. `/packages/shared/src/components/atoms/HCaptcha.astro`
- **Main change**: Complete explicit render implementation
- **Improvements**:
  - Manual rendering with `hcaptcha.render()`
  - Widget ID management in global map
  - Callbacks for all lifecycle events
  - Layout shift prevention with `min-height`
  - Better error handling and timeouts

### 2. `/packages/shared/src/components/organisms/CtaNewsletterSubscription.astro`
- **Change**: Removed duplicate type declarations
- **Reason**: Types are now centralized in `hcaptcha.d.ts`

### 3. `/packages/shared/src/components/sections/Contact.astro`
- **Change**: Removed duplicate type declarations
- **Reason**: Types are now centralized in `hcaptcha.d.ts`

### 4. `/apps/portfolio/src/types/hcaptcha.d.ts` (NEW)
- **Purpose**: Centralized hCaptcha type definitions
- **Benefits**:
  - Full IntelliSense across the application
  - Prevents type conflicts
  - Inline API documentation

## Usage in Forms

### Template (Astro)
```astro
<form id="my-form">
  <input type="email" name="email" required />
  
  <!-- hCaptcha Widget -->
  <HCaptcha id="my-captcha" theme="light" size="normal" />
  
  <button type="submit">Submit</button>
</form>
```

### Form Script
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get token
  const token = window.getCaptchaToken('my-captcha');
  
  if (!token) {
    alert('Please complete the captcha');
    return;
  }
  
  // Submit form with token
  await submitForm({ email, hcaptchaToken: token });
  
  // Reset captcha after submission
  window.resetCaptcha('my-captcha');
});
```

## Advantages of This Implementation

1. ✅ **Astro Compatible**: Works correctly with the hydration system
2. ✅ **Multiple Widgets**: Supports multiple captchas on the same page
3. ✅ **Type-Safe**: Full TypeScript with IntelliSense
4. ✅ **Better UX**: Callbacks for immediate user feedback
5. ✅ **No Layout Shift**: `min-height` prevents content jumping
6. ✅ **Error Handling**: Error callbacks for better debugging
7. ✅ **Custom Events**: Forms can listen for specific events

## Testing

### 1. Test with hCaptcha Test Keys

For development and testing, use hCaptcha test keys:

```bash
# .env
HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
```

```bash
# apps/api/.dev.vars
HCAPTCHA_SECRET_KEY=0x0000000000000000000000000000000000000000
```

These keys always pass validation.

### 2. Verify in Browser Console

```javascript
// Check registered widgets
console.log(window.hcaptchaWidgets);

// Test getting token
console.log(window.getCaptchaToken('newsletter-captcha'));

// Check if hCaptcha API is loaded
console.log(window.hcaptcha ? 'Loaded' : 'Not loaded');
```

### 3. Events for Debugging

```javascript
const container = document.getElementById('my-captcha');

container.addEventListener('hcaptcha-success', (e) => {
  console.log('Success:', e.detail.token);
});

container.addEventListener('hcaptcha-error', (e) => {
  console.error('Error:', e.detail.error);
});

container.addEventListener('hcaptcha-expired', () => {
  console.warn('Token expired');
});
```

## References

- [hCaptcha Configuration Docs](https://docs.hcaptcha.com/configuration/)
- [hCaptcha JavaScript API](https://docs.hcaptcha.com/configuration/#javascript-api)
- [hCaptcha Test Keys](https://docs.hcaptcha.com/#integration-testing-test-keys)
- [Astro Client-Side Scripts](https://docs.astro.build/en/guides/client-side-scripts/)

## Next Steps (Optional)

1. **Dynamic Themes**: Detect system theme and adjust hCaptcha theme
2. **Invisible Mode**: Implement invisible mode for better UX
3. **Analytics**: Track captcha success/failure rate
4. **Retry Logic**: Implement automatic retries on network errors
