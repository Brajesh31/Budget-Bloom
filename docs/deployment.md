# Deployment

## Current deployment status

Do not deploy this revision with real financial or personal data. The database URL is accessed in code imported by client components under **NEXT_PUBLIC_DATABASE_URL**. Next.js bundles **NEXT_PUBLIC_** values into JavaScript sent to the browser. The database query and mutation code also lacks consistent server-side ownership checks. A public URL plus client-controlled query filters does not provide tenant isolation.

Clerk middleware is configured but exports **clerkMiddleware({})** without an explicit protection callback. Clerk documents that middleware does not protect routes by default and recommends guarding access at the resource that reads or mutates protected data. The dashboard's client-side use of a signed-in user does not secure the database.

Before a real deployment:

1. Move all database operations into trusted server-side code.
2. Use a server-only **DATABASE_URL** and remove the public-prefixed database URL.
3. Authenticate every read and mutation from a verified Clerk session.
4. Enforce per-user ownership for all budget and expense access, including nested expense IDs.
5. Validate inputs and add database constraints appropriate to the data.
6. Align and review migrations, schema snapshots, and the live database.
7. Rotate any privileged URL that may have been included in a client bundle.
8. Review privacy, data retention, backups, account deletion, and security operations.

See [Next.js environment variable guidance](https://nextjs.org/docs/app/guides/environment-variables), [Clerk middleware guidance](https://clerk.com/docs/reference/nextjs/clerk-middleware), and the project [Security Policy](../SECURITY.md).

## Hosting configuration after remediation

The framework project root for a host such as Vercel is **expense/**, not the repository root. Configure deployment commands from that directory:

- Install: **npm ci**
- Build: **npm run build**
- Start: **npm run start** where the host requires a start command

Configure the host root directory as **expense/** and store private variables in the provider's server-side environment settings. Do not add a privileged database URL as **NEXT_PUBLIC_DATABASE_URL**. Keep Clerk development and production instances and keys separate.

## Database migrations

The current Drizzle config points to a missing **utils/schema.ts**, while the tracked schema is **utils/schema.js**. The initial migration and snapshot cover only budgets and use a different amount type from the current schema; the expenses table is not in that migration. Do not run **db:push** or promote a database change until the schema path and intended migration plan have been reviewed and backed up.

## Rollback

Maintain a known-good application revision and a database backup before schema changes. Application rollback alone may not reverse a database migration. Plan and test a migration rollback separately before storing valuable data.
