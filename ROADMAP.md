# Roadmap

This roadmap lists possible project work. It is not a delivery schedule or a statement that an item is already implemented.

## Current baseline

The repository contains a Next.js app under **expense/** with Clerk UI, client-side Drizzle/Neon database calls, budget and expense screens, and an initial migration. The database URL uses a public-prefixed variable, database mutations are not consistently scoped to an authenticated owner, Clerk middleware does not explicitly protect routes, and migration metadata does not match the current schema.

## Priority 1: security and data ownership

- Move every database read and write into server-only code.
- Use a server-only database URL and remove the **NEXT_PUBLIC_DATABASE_URL** credential path.
- Protect dashboard resources and mutations with server-side Clerk authentication.
- Enforce ownership using a verified Clerk user ID for every read, update, and delete.
- Add validation, safe error handling, and a small security review before storing any personal financial data.
- Rotate any database credentials that were ever included in a public client build.

## Priority 2: schema and setup reliability

- Align the Drizzle schema file path, TypeScript/JavaScript format, generated snapshots, SQL migrations, and live schema.
- Add a versioned environment example and a reproducible dependency setup.
- Document a safe local database bootstrap and migration rollback process.
- Replace the nested starter README and remove stale or misleading setup steps.

## Priority 3: application quality

- Complete budget and expense flows with clear loading, empty, validation, and failure states.
- Add tests for per-user isolation, CRUD operations, calculations, and authorization.
- Review responsive behavior, keyboard accessibility, and form labeling.
- Clarify date, currency, and timezone handling.
- Add observability without logging secrets or sensitive financial details.

## Proposing work

Open an issue describing the user need, implementation boundary, acceptance criteria, and validation. Security and ownership changes should be prioritized before additional features.
