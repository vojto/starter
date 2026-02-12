# Starter Kit

Rails 8 + React 19 + Inertia.js starter kit with PostgreSQL, Kamal deployment, and Vite.

## Stack

- **Backend:** Rails 8.1, Ruby 3.4, PostgreSQL
- **Frontend:** React 19, Inertia.js 2, Vite 7, TypeScript, Radix UI Themes, Tailwind CSS v4
- **Background jobs:** Solid Queue (database-backed)
- **Caching:** Solid Cache (database-backed)
- **WebSockets:** Solid Cable (database-backed)
- **Deployment:** Kamal with Docker, GitHub Container Registry

## Local development setup

### Prerequisites

- [mise](https://mise.jdx.dev/) (manages Ruby and Node versions)
- PostgreSQL running locally
- [direnv](https://direnv.net/) (optional, for automatic .env loading)

### Steps

```bash
# 1. Install Ruby and Node
mise install

# 2. Install dependencies
bundle install
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your values (see "Environment variables" below)

# 4. Create and migrate the database
rails db:create db:migrate

# 5. Start the dev server
bin/dev
```

This starts both the Rails server (port 3000) and the Vite dev server via foreman.

## Environment variables

Secrets are managed via a `.env` file in the project root, loaded automatically by `dotenv-rails` in development and by `direnv` if you use it.

| Variable | Description | Required locally? |
|---|---|---|
| `RAILS_MASTER_KEY` | Rails master key (from `config/master.key`) | No (file is used directly) |
| `POSTGRES_PASSWORD` | PostgreSQL password | Only if your local PG requires one |
| `KAMAL_REGISTRY_USERNAME` | GitHub username for ghcr.io | Only for deploys |
| `KAMAL_REGISTRY_PASSWORD` | GitHub personal access token (with `write:packages`) | Only for deploys |

See `.env.example` for a template.

## Setting up for a new app

When using this starter kit for a new project:

1. **Rename the app.** Search and replace `starter` with your app name in:
   - `config/deploy.yml` (service name, image, volumes, POSTGRES_DB, POSTGRES_USER)
   - `config/database.yml` (database names)
   - `package.json` (name field)
   - `config/application.rb` (module name)

2. **Configure deployment.** Edit `config/deploy.yml`:
   - Set `image` to `your-github-user/your-app`
   - Set server IPs under `servers.web` and `servers.job`
   - Set `proxy.host` to your domain
   - Set `builder.cache.image` to `your-github-user/your-app-build-cache`
   - Set `env.clear.DB_HOST` to your PostgreSQL host
   - Set `env.clear.POSTGRES_DB` and `POSTGRES_USER` for your app

3. **Set up secrets.** Create your `.env` file with real values:
   ```bash
   cp .env.example .env
   ```
   Fill in `RAILS_MASTER_KEY` (from `config/master.key`), `POSTGRES_PASSWORD`, and GitHub registry credentials.

4. **Set up the database** on your server. Create the PostgreSQL user and databases for your app.

5. **Deploy.**
   ```bash
   bin/kamal setup    # first deploy
   bin/kamal deploy   # subsequent deploys
   ```

## Deployment

The app is deployed via [Kamal](https://kamal-deploy.org/) with Docker.

### Architecture

- **Web process:** Puma (via Thruster for HTTP caching/compression), exposed on port 80
- **Job process:** Solid Queue (`bin/jobs`), runs as a separate container
- **Database:** PostgreSQL (external, configured via environment variables)
- **SSL:** Let's Encrypt via Kamal proxy
- **Registry:** GitHub Container Registry (`ghcr.io`)

### How secrets flow

```
.env (local file, git-ignored)
  → loaded into shell by direnv/dotenv
  → .kamal/secrets reads $ENV_VARS
  → Kamal injects them into containers
```

### Useful Kamal commands

```bash
bin/kamal deploy          # deploy latest code
bin/kamal console         # Rails console on server
bin/kamal shell           # bash on server
bin/kamal logs            # tail production logs
bin/kamal logs -r job     # tail job worker logs
bin/kamal dbc             # database console
```

### Recurring jobs

Scheduled tasks are configured in `config/recurring.yml` using Solid Queue's built-in recurring task support. No cron or external scheduler needed.
