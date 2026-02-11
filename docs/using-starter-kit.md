# Using This Starter Kit

This starter is intentionally minimal. Before using it for a real project, work through this checklist.

## 1) Project Identity (do first)

- Set app name and product copy across frontend and Rails metadata.
- Replace favicon/app icons and basic branding assets.
- Configure canonical app URL(s) for each environment.
- Add legal pages: privacy policy, terms, contact/support.

## 2) Security and Auth Hardening

- Replace starter auth assumptions with production-ready flows:
  - email verification
  - password reset
  - session expiration and remember-me policy
- Add rate limiting for login/signup endpoints.
- Ensure secure cookie settings in production (`secure`, `httponly`, `same_site`).
- Review CSP and CORS policies for your domains.
- Rotate and store secrets correctly (`RAILS_MASTER_KEY`, API tokens, OAuth secrets).

## 3) Data Model and Business Logic

- Replace starter entities with real domain models and associations.
- Add DB constraints and indexes for all critical columns.
- Enforce validation rules in both model layer and Zod schemas.
- Add seed data suitable for local/staging environments.

## 4) Frontend Contracts and UX

- Define Zod schemas for all Inertia props.
- Move reusable schemas into `app/frontend/schemas/`; keep one-off schemas inline.
- Replace placeholder pages and navigation with real IA and user flows.
- Add empty/loading/error states for every important screen.

## 5) Operational Readiness

- Set up error tracking (Sentry, Bugsnag, etc.).
- Add structured logging strategy and request tracing where needed.
- Configure background jobs and queue monitoring.
- Add database backup and restore procedures.
- Confirm `/up` health endpoint works in deployed environments.

## 6) Testing and CI

- Add model, controller, and integration tests for core flows.
- Add end-to-end tests for critical user journeys (auth + core value path).
- Enforce CI gates: `bundle exec rspec`, `pnpm run check`, `pnpm run lint`, security scans.
- Add automated checks for migrations and schema consistency.

## 7) Deployment and Environments

- Define environment variable matrix (development/staging/production).
- Verify production DB adapter/settings and migration process.
- Set up TLS, domain, and asset hosting/CDN strategy.
- Document rollback and incident response basics.

## 8) Product Launch Minimum

Ship only when these are true:

- Core user flow works end-to-end in staging.
- Auth has verification/reset/rate limits.
- Error tracking and alerts are live.
- Backups are configured and tested.
- CI is green and required checks are enforced.
- Basic legal/compliance pages are published.

## Suggested first week plan

1. Lock product scope and domain model.
2. Harden auth/security and environment setup.
3. Build core feature flow with tests.
4. Add observability + CI gates.
5. Run staging QA and ship.
