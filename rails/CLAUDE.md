# Technical Stack

## Backend

- **Framework**: Ruby on Rails 8.1.x
- **Ruby Version**: 3.4.x (managed via mise, see `.ruby-version`)
- **Database**: SQLite (development), PostgreSQL (production)
- **Background Jobs**: Solid Queue
- **Caching**: Solid Cache
- **WebSockets**: Solid Cable

## Frontend

### Build & TypeScript

- **Bundler**: Vite 7.x with `vite-plugin-ruby`
- **TypeScript**: 5.9.x with strict mode, path aliases (`@/*` → `app/frontend/*`)

### React & Routing

- **UI Library**: React 19.x
- **Router**: Inertia.js 2.x
  - Pages in `app/frontend/pages/**/*.tsx`
  - Rails controllers render Inertia responses (no API needed)

### Styling & Design System

- **Primary**: Radix UI Themes for components and design tokens
  - Theme configured in `app/frontend/entrypoints/inertia.ts`:
    - `accentColor: "indigo"` (blue accent)
    - `grayColor: "slate"` (cool neutral gray)
  - **Always use Radix design tokens** for colors, spacing, typography:
    - Colors: `var(--accent-9)`, `var(--gray-11)`, `var(--slate-2)`, etc.
    - Spacing: `var(--space-4)`, `var(--space-6)`, etc.
    - Typography: `var(--font-size-5)`, `var(--font-weight-semibold)`, etc.
    - Radius: `var(--radius-2)`, `var(--radius-3)`, etc.
  - Use Radix components: `Button`, `Box`, `Flex`, `Text`, `Heading`, `Table`, `Select`, `Checkbox`, etc.
  - **Button standard**: Always use `variant="classic"` for primary buttons
- **Secondary**: Tailwind CSS v4 for utility classes (when Radix tokens aren't suitable)
- **Icons**: Lucide React
- **Dates**: date-fns for relative time formatting

## Key Patterns

### Creating Pages

1. Create React component: `app/frontend/pages/[resource]/[action].tsx`
2. Rails controller renders Inertia: `render inertia: 'resource/show', props: { data: @data }`
3. **Always validate props with Zod**:
   - Store reusable schemas in `app/frontend/schemas/`
   - Import and compose them for page props validation
   ```typescript
   import { z } from "zod"
   import { ItemSchema } from "@/schemas"

   const PropsSchema = z.object({
     item: ItemSchema,
     items: z.array(ItemSchema),
   })

   type Props = z.infer<typeof PropsSchema>

   export default function Show(props: Props) {
     const validatedProps = PropsSchema.parse(props)
     const { item, items } = validatedProps
     // ...
   }
   ```

### Working with Forms

When implementing forms (create/edit pages), see [docs/inertia-forms.md](docs/inertia-forms.md) for complete patterns and examples using Inertia.js `useForm` hook.

### Styling Components

1. **Prefer Radix UI tokens** for colors, spacing, typography, radius
2. Use Radix components (`Button`, `Box`, `Flex`, `Text`, `Heading`, etc.)
3. Fall back to Tailwind utilities only when Radix doesn't cover it
4. Import with path alias: `import { Button } from "@radix-ui/themes"`

### Important Standards

- **CRITICAL: All React component filenames MUST use dash-case (kebab-case)**, not PascalCase
  - ✅ Correct: `column-analyzer.tsx`, `spreadsheet-preview.tsx`, `default.tsx`
  - ❌ Wrong: `ColumnAnalyzer.tsx`, `SpreadsheetPreview.tsx`, `Default.tsx`
  - This applies to all files in `app/frontend/components/`, `app/frontend/pages/`, and `app/frontend/layouts/`
  - Component exports still use PascalCase: `export function ColumnAnalyzer() { ... }`
- TypeScript for all new files (`.ts` or `.tsx`)
- Functional components with hooks only
- `variant="classic"` for primary Radix Buttons
- Use `formatDistanceToNow` from date-fns for relative times
- Inertia `Link` component for navigation (not `<a>` tags)
- Use `.nullish()` instead of `.nullable()` in Zod schemas (handles both null and undefined)

### Scripts and Automation

- **Use Rake tasks for scripts**, not bin scripts
  - Create tasks in `lib/tasks/` with `.rake` extension
  - Run with `rails namespace:task_name` or `rake namespace:task_name`
  - Add descriptive comments with `desc "Description"` for documentation

## Development Setup

### Prerequisites

- [mise](https://mise.jdx.dev/) for managing Ruby and Node.js versions
- [pnpm](https://pnpm.io/) for Node.js package management

### Quick Start

```bash
# Install Ruby and Node.js versions (reads from .ruby-version)
mise install

# Install dependencies
bundle install
pnpm install

# Setup database
rails db:create db:migrate

# Start development server
bin/dev
```

### Running the App

- `bin/dev` - Start Rails server and Vite dev server together
- `rails server` - Rails only (no hot reload for frontend)
- `pnpm dev` - Vite dev server only
