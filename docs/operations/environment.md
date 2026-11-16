# ⚙️ Environment Configuration

## App root

The active Next.js application and dependency manifest are under `expense/`. Copy the repository root `.env.example` to `expense/.env`. Keep the populated file untracked.

## Current variables

| Variable | Current consumer | Sensitivity |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client setup | Public identifier |
| `CLERK_SECRET_KEY` | Clerk server integration | Secret |
| `NEXT_PUBLIC_DATABASE_URL` | `expense/utils/dbConfig.jsx` | **Critical: browser-exposed** |
| `DATABASE_URL` | `expense/drizzle.config.mjs` | Secret; CLI-only intent |

## 🚨 Database variable warning

Do not use a privileged Neon connection string in `NEXT_PUBLIC_DATABASE_URL`. The variable prefix intentionally makes its value public to browser code. This repo imports the runtime database client into client components. Before production use, move database access to server-only code, switch to a server-only `DATABASE_URL`, remove the public-prefixed runtime path, and rotate any leaked credentials.

## Local commands

From repository root, copy the template, then run:

```bash
cp .env.example expense/.env
cd expense
npm ci
npm run dev
```

PowerShell users can use `Copy-Item .env.example expense/.env` instead of `cp`.

## Deployment environments

Use separate development, preview, and production Clerk instances and database credentials. Configure secrets in the deployment provider, never in tracked files. Limit access by environment and rotate credentials after personnel changes or suspected exposure.

## Change control

When adding or renaming a variable, update `.env.example`, installation docs, hosting configuration, and affected code in one change. Never paste actual environment values into documentation or logs.
