---
name: zod-4
description: >
  Zod 4 schema validation patterns.
  Trigger: When using Zod for validation - breaking changes from v3.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Zod 4 Best Practices

This document outlines best practices for using Zod 4 in Astro and Vue projects, focusing on schema
definitions, parsing, transformations, error handling, and form integration.

## Migration Guide from Zod 3 to Zod 4

```typescript
// ⚠️ Deprecated (still works in v4, will be removed in v5)
z.string().email()
z.string().uuid()
z.string().url()
z.string().nonempty()
z.string().min(5, {message: "Too short"})

// ✅ Recommended (better performance, tree-shaking)
z.email()
z.uuid()
z.url()
z.string().min(1)
z.string().min(5, {error: "Too short"})

// Note: Old patterns still work in v4 for backward compatibility
```

## Error Message Parameters

```typescript
// Both work in Zod 4, but 'error' is preferred
z.string().min(5, {message: "Too short"})  // ⚠️ Deprecated
z.string().min(5, {error: "Too short"})    // ✅ Preferred

// Error can be a function for dynamic messages
z.string({
  error: (issue) => issue.input === undefined
    ? "Field is required"
    : "Invalid string"
})
```

## Basic Schemas

```typescript
import {z} from "zod";

// Primitives
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();
const dateSchema = z.date();

// Top-level validators (Zod 4)
const emailSchema = z.email();
const uuidSchema = z.uuid();
const urlSchema = z.url();

// With constraints
const nameSchema = z.string().min(1).max(100);
const ageSchema = z.number().int().positive().max(150);
const priceSchema = z.number().min(0).multipleOf(0.01);
```

## Object Schemas

```typescript
const userSchema = z.object({
  id: z.uuid(),
  email: z.email({error: "Invalid email address"}),
  name: z.string().min(1, {error: "Name is required"}),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

type User = z.infer<typeof userSchema>;

// Parsing
const user = userSchema.parse(data);  // Throws on error
const result = userSchema.safeParse(data);  // Returns { success, data/error }

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}
```

## Arrays and Records

```typescript
// Arrays
const tagsSchema = z.array(z.string()).min(1).max(10);
const numbersSchema = z.array(z.number()).min(1);

// Records (objects with dynamic keys)
const scoresSchema = z.record(z.string(), z.number());
// { [key: string]: number }

// Tuples
const coordinatesSchema = z.tuple([z.number(), z.number()]);
// [number, number]
```

## Unions and Discriminated Unions

```typescript
// Simple union
const stringOrNumber = z.union([z.string(), z.number()]);

// Discriminated union (more efficient)
const resultSchema = z.discriminatedUnion("status", [
  z.object({status: z.literal("success"), data: z.unknown()}),
  z.object({status: z.literal("error"), error: z.string()}),
]);
```

## Transformations

```typescript
// Transform during parsing
const lowercaseEmail = z.email().transform(email => email.toLowerCase());

// Coercion (convert types)
const numberFromString = z.coerce.number();  // "42" → 42
const dateFromString = z.coerce.date();      // "2024-01-01" → Date

// Preprocessing
const trimmedString = z.preprocess(
  val => typeof val === "string" ? val.trim() : val,
  z.string()
);
```

## Refinements

```typescript
const passwordSchema = z.string()
  .min(8)
  .refine(val => /[A-Z]/.test(val), {
    message: "Must contain uppercase letter",
  })
  .refine(val => /[0-9]/.test(val), {
    message: "Must contain number",
  });

// With superRefine for multiple errors
const formSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});
```

## Optional and Nullable

```typescript
// Optional (T | undefined)
z.string().optional()

// Nullable (T | null)
z.string().nullable()

// Both (T | null | undefined)
z.string().nullish()

// Default values
z.string().default("unknown")
z.number().default(() => Math.random())
```

## Error Handling

```typescript
// Zod 4: Use 'error' param instead of 'message'
const schema = z.object({
  name: z.string({error: "Name must be a string"}),
  email: z.email({error: "Invalid email format"}),
  age: z.number().min(18, {error: "Must be 18 or older"}),
});

// Custom error map
const customSchema = z.string({
  error: (issue) => {
    if (issue.code === "too_small") {
      return "String is too short";
    }
    return "Invalid string";
  },
});
```

## Form Validation in Vue

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
});

type LoginForm = z.infer<typeof loginSchema>;

const formData = ref<Partial<LoginForm>>({
  email: '',
  password: '',
});

const errors = ref<Partial<Record<keyof LoginForm, string>>>({});

const validateField = (field: keyof LoginForm) => {
  const schema = loginSchema.pick({ [field]: true });
  const result = schema.safeParse({ [field]: formData.value[field] });

  if (!result.success) {
    errors.value[field] = result.error.issues[0]?.message;
  } else {
    delete errors.value[field];
  }
};

const handleSubmit = async () => {
  const result = loginSchema.safeParse(formData.value);

  if (!result.success) {
    errors.value = {};
    result.error.issues.forEach(issue => {
      const field = issue.path[0] as keyof LoginForm;
      errors.value[field] = issue.message;
    });
    return;
  }

  console.log('Form submitted:', result.data);
  // Send to API
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <input
        v-model="formData.email"
        type="email"
        placeholder="Email"
        @blur="validateField('email')"
        :class="{ 'border-red-500': errors.email }"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <div>
      <input
        v-model="formData.password"
        type="password"
        placeholder="Password"
        @blur="validateField('password')"
        :class="{ 'border-red-500': errors.password }"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>

    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
      Login
    </button>
  </form>
</template>
```

## Form Validation in Astro

```astro
---
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ error: 'Invalid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
});

type LoginForm = z.infer<typeof loginSchema>;

let errors: Partial<Record<keyof LoginForm, string>> = {};
let submittedData: LoginForm | null = null;

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach(issue => {
      const field = issue.path[0] as keyof LoginForm;
      errors[field] = issue.message;
    });
  } else {
    submittedData = result.data;
    // Process form: send to API, create session, etc.
  }
}
---

{submittedData && (
  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
    Successfully logged in as {submittedData.email}
  </div>
)}

<form method="POST" class="space-y-4">
  <div>
    <input
      name="email"
      type="email"
      placeholder="Email"
      defaultValue=""
      class={errors.email ? 'border-red-500' : ''}
    />
    {errors.email && <span class="text-red-500 text-sm">{errors.email}</span>}
  </div>

  <div>
    <input
      name="password"
      type="password"
      placeholder="Password"
      defaultValue=""
      class={errors.password ? 'border-red-500' : ''}
    />
    {errors.password && <span class="text-red-500 text-sm">{errors.password}</span>}
  </div>

  <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
    Login
  </button>
</form>
```

## Server-side Validation (Shared)

For both Vue and Astro, validate on server before processing:

```typescript
// Shared validation utility
import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginData = z.infer<typeof loginSchema>;

export async function validateLogin(data: unknown) {
  return loginSchema.safeParse(data);
}

// Usage in API endpoint or action
export async function POST({request}) {
  const data = await request.json();
  const result = await validateLogin(data);

  if (!result.success) {
    // Use flattenError for better form handling
    // Returns: { formErrors: string[], fieldErrors: Record<string, string[]> }
    return new Response(
      JSON.stringify({errors: z.flattenError(result.error)}),
      {status: 400}
    );
  }

  // Process validated data
  return new Response(JSON.stringify({success: true}));
}
```

## Client-side Validation with Fetch (Vue)

```vue
<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errors = ref<Record<string, string>>({});
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  errors.value = {};

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      const { errors: serverErrors } = await response.json();
      if (serverErrors?.fieldErrors) {
        Object.entries(serverErrors.fieldErrors).forEach(([field, messages]) => {
          const firstMessage = Array.isArray(messages) ? messages[0] : messages;
          if (firstMessage) {
            errors.value[field] = firstMessage;
          }
        });
      }
      return;
    }

    // Success: redirect or update state
    window.location.href = '/dashboard';
  } catch (error) {
    errors.value.submit = 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="errors.submit" class="text-red-600 text-sm">{{ errors.submit }}</div>

    <div>
      <input v-model="email" type="email" placeholder="Email" />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <div>
      <input v-model="password" type="password" placeholder="Password" />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>

    <button :disabled="loading" type="submit" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>
```
