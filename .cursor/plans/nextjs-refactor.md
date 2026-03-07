# Next.js Refactor Plan

Refactor disaster-relief-platform in two stages: (1) Front-end with placeholders, (2) Supabase backend integration.

## Stack

- Next.js 16, React 19, TypeScript 5.1+
- Tailwind v4 (CSS-first, @theme)
- Motion (motion/react)
- React Hook Form + Zod (Stage 1)
- Supabase (Stage 2 only)

## Stage 1: Front-end with Placeholders

- All pages: landing, relief-request, volunteer, donate, sign-in, sign-up, contact
- Placeholder Server Actions return `{ success: true }` or mock errors
- No Supabase; no @supabase/supabase-js

## Stage 2: Backend Integration

- Supabase project, tables, RLS, Storage
- Replace placeholders with real Supabase calls

## Project Structure

```
src/
  app/
    (marketing)/page.tsx
    (forms)/relief-request/, volunteer/, donate/
    (auth)/sign-in/, sign-up/
    contact/
  components/
  lib/
    actions/     # Server Actions (placeholders -> Supabase)
    supabase/    # Stage 2 only
  types/
```

## Rules

See `.cursor/rules/` for nextjs, tailwindcss, typescript, motion, accessibility, error-handling, form-validation, supabase standards.
