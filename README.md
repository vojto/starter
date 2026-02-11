# Starter

A starter kit monorepo for Ruby on Rails projects using Tailwind CSS, Inertia.js, and Radix UI.

## Tech Stack

- **Backend**: Ruby on Rails 8.1, PostgreSQL
- **Frontend**: React 19, TypeScript, Inertia.js 2
- **Styling**: Radix UI Themes + Tailwind CSS v4
- **Build**: Vite 7 with vite-plugin-ruby
- **Icons**: Lucide React
- **Validation**: Zod

## Structure

```
starter/
  rails/          # Rails application with Inertia.js frontend
```

## Getting Started

```bash
cd rails

# Install Ruby and Node.js versions
mise install

# Install dependencies
bundle install
pnpm install

# Ensure PostgreSQL is running locally (optional overrides: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD)

# Setup database
rails db:create db:migrate

# Start development server
bin/dev
```
