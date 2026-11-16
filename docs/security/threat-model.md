# 🛡️ Budget Bloom Threat Model

## System being assessed

A Next.js 15 / React 18 application under `expense/`, with Clerk identity UI, Neon PostgreSQL, Drizzle ORM, and browser-side dashboard components.

## Assets

- Budget and expense records.
- User identity and email addresses.
- Neon database credentials.
- Clerk secret key and sessions.
- Deployment environment variables.
- Database backups and migration history.

## Trust boundaries

1. Visitor browser to Next.js application.
2. Client-side component to external Neon database.
3. User session to protected data.
4. CI/deployment provider to runtime environment.
5. Maintainer workstation to GitHub repository.

## Major identified risks

| Risk | Evidence in repository | Impact |
|---|---|---|
| Public database URL | Client code reads `NEXT_PUBLIC_DATABASE_URL` | Credential exposure and direct database access risk |
| Incomplete owner enforcement | Several queries/mutations use record IDs or client-side email filters | Cross-user access or modification |
| Routes not explicitly protected | Clerk middleware has no route protection callback | UI routes may be reachable without expected sign-in guard |
| Migration drift | Config points to missing `schema.ts`; migration lacks expenses table | Failed or unsafe schema changes |
| Sensitive logs | Client components log query data/errors in places | Possible disclosure through browser console |
| No verified test suites | No existing test runner/test files verified | Security regressions may go undetected |

## Attack scenarios

### A. Database URL extraction
An attacker inspects browser JavaScript or network activity, retrieves the public-prefixed URL, and attempts direct database access. If the value contains credentials with broad privileges, the database may be compromised.

### B. Record ID substitution
A signed-in user alters a budget or expense ID in a request or browser state. If the corresponding query does not also enforce the authenticated owner, another user's record may be read or changed.

### C. Unprotected dashboard entry
A visitor requests a dashboard URL directly. Client-side visibility or user hooks do not replace server-side access checks for data.

## Required mitigations before production

- Move all DB operations into server-only modules, Route Handlers, or Server Actions.
- Use a server-only DB credential with least privileges.
- Verify Clerk session on every protected operation.
- Use immutable Clerk user ID as owner key and filter every query and mutation by it.
- Add database constraints and input validation.
- Reconcile migration files and test migrations in isolation.
- Avoid sensitive client-side logs.
- Add automated cross-user authorization tests and dependency scanning.

## Residual risk

Until the above work is implemented and verified, residual risk is unacceptable for real personal financial data. This is a source-based review, not a penetration test or security audit.
