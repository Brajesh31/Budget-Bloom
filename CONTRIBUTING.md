# Contributing

Thank you for considering a contribution to Budget Bloom. Contributions should improve the prototype's clarity, correctness, accessibility, security, or maintainability.

## Before you begin

- Read the [Code of Conduct](CODE_OF_CONDUCT.md), [Security Policy](SECURITY.md), and [License](LICENSE).
- Review the [README](README.md), [Roadmap](ROADMAP.md), and relevant docs.
- Open an issue before a large feature or architectural change.
- Do not use real financial or personal data during development. The current client-side database setup is not safe for privileged credentials or production data.

## Development setup

The actual app is under **expense/**. Copy the root **.env.example** to **expense/.env**, fill it with disposable development credentials, then run **npm ci** and **npm run dev** from **expense/**. The current database URL variable has a **NEXT_PUBLIC_** prefix and is exposed to browsers; do not place a privileged production credential there.

The repository currently lacks a reliable, complete migration workflow. Read [Database](docs/database.md) before running Drizzle commands. Do not run schema push against a production database.

## Change expectations

- Keep changes focused and explain their user impact.
- Preserve TypeScript/JavaScript conventions used by the affected area.
- Put database access behind trusted server-side operations before adding protected data flows.
- Derive identity from a verified server-side Clerk session; never trust an email or owner ID supplied by the browser.
- Scope reads, updates, and deletes to the authenticated owner's records.
- Validate and constrain amounts, names, IDs, and dates on the server.
- Add or update migration files deliberately and keep schema, snapshot, and SQL migrations aligned.
- Do not log secrets, full connection strings, or sensitive financial data.
- Verify any new image, logo, font, or icon license and attribution.

## Pull requests

Include a summary, motivation, relevant issue, and screenshots for UI changes. For data or authentication changes, describe the security boundary and ownership checks. Record the environment and commands used for verification, plus any checks not run. Explain migration and rollback steps. Keep personal data, real credentials, generated build output, and unrelated formatting changes out of the PR.
