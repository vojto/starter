# Rails App

Rails 8.1 + Inertia.js + React starter app.

## Requirements

- Ruby 3.4.x (`mise` recommended)
- Node.js + pnpm
- PostgreSQL

## Setup

```bash
mise install
bundle install
pnpm install
```

## Database

This app uses PostgreSQL in all environments.

Connection overrides (all optional, from `config/database.yml`):

- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`

Create and migrate:

```bash
bin/rails db:create db:migrate
```

## Run

```bash
bin/dev
```

## Quality checks

```bash
bundle exec rspec
pnpm run check
pnpm run lint
```
