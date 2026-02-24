# hCaptcha Integration Fix - Astro

## Problema Original

El widget de hCaptcha no se renderizaba correctamente en Astro, mostrando el error:
```
hCaptcha has failed to initialize. Please see the developer tools console for more information.
Missing sitekey - https://docs.hcaptcha.com/configuration#javascript-api
```

## Causa Raíz

El problema tenía dos aspectos principales:

1. **Auto-renderizado vs. Renderizado Explícito**: El modo auto-renderizado de hCaptcha (`data-sitekey` en el div) no funciona bien con el sistema de hidratación de Astro, causando que el widget intente renderizarse antes de que el script esté completamente cargado.

2. **Timing de Inicialización**: Los scripts de Astro se ejecutan en un orden específico que puede causar condiciones de carrera con bibliotecas externas como hCaptcha.

## Solución Implementada

### 1. Renderizado Explícito con Widget IDs

En lugar del auto-renderizado, ahora usamos el API de JavaScript de hCaptcha para renderizar explícitamente cada widget:

```javascript
// Cargar script con renderizado explícito
<script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>

// Renderizar manualmente cuando el API esté listo
const widgetId = window.hcaptcha.render(container, {
  sitekey: siteKey,
  theme: theme,
  size: size,
  callback: (token) => { /* ... */ }
});
```

### 2. Gestión de Widget IDs

Implementamos un mapa global para rastrear los widget IDs por container ID:

```javascript
window.hcaptchaWidgets = new Map();
window.hcaptchaWidgets.set(captchaId, widgetId);
```

Esto permite:
- Múltiples widgets hCaptcha en la misma página
- Resetear widgets específicos por su container ID
- Obtener respuestas de widgets específicos

### 3. Callbacks y Eventos Personalizados

Agregamos callbacks para todos los eventos del ciclo de vida:

```javascript
{
  callback: (token) => {
    // Token almacenado en dataset
    container.dataset.token = token;
    // Evento personalizado para el formulario
    container.dispatchEvent(new CustomEvent('hcaptcha-success', {
      detail: { token, widgetId }
    }));
  },
  'expired-callback': () => { /* ... */ },
  'error-callback': (error) => { /* ... */ }
}
```

### 4. Funciones Helper Globales

Se mantienen funciones helper simples para los formularios:

```javascript
// Obtener token por container ID
window.getCaptchaToken(containerId);

// Resetear widget por container ID  
window.resetCaptcha(containerId);
```

### 5. Tipos TypeScript Centralizados

Creamos `src/types/hcaptcha.d.ts` con todas las definiciones de tipos:

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

## Archivos Modificados

### 1. `/packages/shared/src/components/atoms/HCaptcha.astro`
- **Cambio principal**: Implementación completa de renderizado explícito
- **Mejoras**:
  - Renderizado manual con `hcaptcha.render()`
  - Gestión de widget IDs en mapa global
  - Callbacks para todos los eventos del ciclo de vida
  - Prevención de layout shift con `min-height`
  - Mejor manejo de errores y timeouts

### 2. `/packages/shared/src/components/organisms/CtaNewsletterSubscription.astro`
- **Cambio**: Removidas declaraciones de tipos duplicadas
- **Motivo**: Los tipos ahora están centralizados en `hcaptcha.d.ts`

### 3. `/packages/shared/src/components/sections/Contact.astro`
- **Cambio**: Removidas declaraciones de tipos duplicadas
- **Motivo**: Los tipos ahora están centralizados en `hcaptcha.d.ts`

### 4. `/apps/portfolio/src/types/hcaptcha.d.ts` (NUEVO)
- **Propósito**: Definiciones de tipos centralizadas para hCaptcha
- **Beneficios**:
  - IntelliSense completo en toda la aplicación
  - Previene conflictos de tipos
  - Documentación inline de la API

## Uso en Formularios

### Template (Astro)
```astro
<form id="my-form">
  <input type="email" name="email" required />
  
  <!-- Widget hCaptcha -->
  <HCaptcha id="my-captcha" theme="light" size="normal" />
  
  <button type="submit">Submit</button>
</form>
```

### Script del Formulario
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Obtener token
  const token = window.getCaptchaToken('my-captcha');
  
  if (!token) {
    alert('Please complete the captcha');
    return;
  }
  
  // Enviar formulario con token
  await submitForm({ email, hcaptchaToken: token });
  
  // Resetear captcha después del envío
  window.resetCaptcha('my-captcha');
});
```

## Ventajas de Esta Implementación

1. ✅ **Compatible con Astro**: Funciona correctamente con el sistema de hidratación
2. ✅ **Múltiples Widgets**: Soporta múltiples captchas en la misma página
3. ✅ **Type-Safe**: TypeScript completo con IntelliSense
4. ✅ **Mejor UX**: Callbacks para feedback inmediato al usuario
5. ✅ **Sin Layout Shift**: `min-height` previene saltos de contenido
6. ✅ **Manejo de Errores**: Callbacks de error para mejor debugging
7. ✅ **Eventos Personalizados**: Los formularios pueden escuchar eventos específicos

## Testing

### 1. Test con hCaptcha Test Keys

Para desarrollo y testing, usar las claves de prueba de hCaptcha:

```bash
# .env
HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
```

```bash
# apps/api/.dev.vars
HCAPTCHA_SECRET_KEY=0x0000000000000000000000000000000000000000
```

Estas claves siempre pasan la validación.

### 2. Verificar en Consola del Navegador

```javascript
// Ver widgets registrados
console.log(window.hcaptchaWidgets);

// Probar obtener token
console.log(window.getCaptchaToken('newsletter-captcha'));

// Verificar si hCaptcha API está cargada
console.log(window.hcaptcha ? 'Loaded' : 'Not loaded');
```

### 3. Eventos para Debugging

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

## Referencias

- [hCaptcha Configuration Docs](https://docs.hcaptcha.com/configuration/)
- [hCaptcha JavaScript API](https://docs.hcaptcha.com/configuration/#javascript-api)
- [hCaptcha Test Keys](https://docs.hcaptcha.com/#integration-testing-test-keys)
- [Astro Client-Side Scripts](https://docs.astro.build/en/guides/client-side-scripts/)

## Próximos Pasos (Opcional)

1. **Temas Dinámicos**: Detectar el tema del sistema y ajustar el tema de hCaptcha
2. **Modo Invisible**: Implementar modo invisible para mejor UX
3. **Analytics**: Trackear tasa de éxito/fallo de captcha
4. **Retry Logic**: Implementar reintentos automáticos en caso de error de red
