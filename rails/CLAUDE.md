# Project Rules

## Architecture and rendering

- User-facing screens must be Inertia pages in `app/frontend/pages/**`.
- Rails controllers must render app screens with `render inertia: ...`.
- Do not create ERB templates for app pages.
- ERB is allowed only for Rails infrastructure (layouts, mailers, PWA files).

## Data contracts and schemas

- Inertia props are schema-first: validate backend-provided props with Zod before use.
- Do not define manual TypeScript interfaces for Inertia props.
- Define prop types from schemas with `z.infer`.
- Schema placement:
  - reusable schemas (used in multiple files), e.g. `SharedProps`, go in `app/frontend/schemas/`
  - single-use schemas stay inline at the top of the `.tsx` file that uses them
- Prefer `.nullish()` over `.nullable()` in Zod schemas.

### Inertia + Zod pattern

```tsx
import { z } from "zod"

const PropsSchema = z.object({
  item: z.object({ id: z.number() }),
})

type Props = z.infer<typeof PropsSchema>

export default function Show(rawProps: Props) {
  const props = PropsSchema.parse(rawProps)
  return <div>{props.item.id}</div>
}
```

## Frontend conventions

- Use TypeScript for new frontend files (`.ts` / `.tsx`).
- Use functional React components with hooks.
- Frontend filenames must be dash-case (`kebab-case`) in:
  - `app/frontend/components/`
  - `app/frontend/pages/`
  - `app/frontend/layouts/`
- Use Inertia `Link` for navigation instead of raw `<a>` tags.
- Use sentence case for UI text (avoid title case).
- Use `formatDistanceToNow` from `date-fns` for relative times.
- For form patterns with `useForm`, see `../docs/inertia-forms.md`.

## UI and styling

- Prefer Radix UI Themes components and design tokens first.
- Primary buttons use `variant="classic"`.
- Use Tailwind CSS only as fallback when Radix does not cover the need.
- Theme defaults are configured in `app/frontend/entrypoints/inertia.ts`.
- Keep the existing theme system unless a task explicitly requires redesign.

## Backend and database conventions

- Start Ruby files with `# frozen_string_literal: true`.
- Boolean DB columns must use `is_` or `wants_` prefixes (example: `is_active`, `wants_notifications`).
- Use Rake tasks (`lib/tasks/*.rake`) for scripts/automation instead of custom bin scripts.

### Database field change checklist

- Add or update migration(s).
- Update model validations/logic.
- Update affected controllers and strong params.
- Update affected Inertia pages.
- Update Zod schemas (reusable in `app/frontend/schemas/`, one-off inline).
- Run `pnpm run check`.

## Required checks

- After TypeScript/frontend changes, run `pnpm run check`.

## Stack reference

### Backend

- Rails 8.1.x
- Ruby 3.4.x (mise, see `.ruby-version`)
- PostgreSQL
- Solid Queue, Solid Cache, Solid Cable

### Frontend

- React 19.x
- Inertia.js 2.x
- Vite 7.x with `vite-plugin-ruby`
- TypeScript 5.9.x (`@/*` -> `app/frontend/*`)
- Radix UI Themes + Tailwind CSS v4
- Lucide React
- date-fns

## Local setup

```bash
mise install
bundle install
pnpm install
rails db:create db:migrate
bin/dev
```
