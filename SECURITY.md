# Security Policy

## Scope

Budget Bloom is a prototype that handles account and budget data. Security reports are welcome for application code, dependencies, configuration, and accidental exposure of credentials or personal information.

## Known deployment blockers

The current database client reads **NEXT_PUBLIC_DATABASE_URL** from modules used by client-side components. Next.js publishes **NEXT_PUBLIC_** values in browser JavaScript bundles. A privileged database connection string placed there is exposed to visitors. Several queries and mutations are also run directly from browser components; some filter by an ID or budget ID without verifying ownership. The Clerk middleware initializes Clerk but does not call a route protection check, and the current route layout is not an effective server-side data authorization boundary.

Do not deploy this revision with real financial or personal data. Move database access to server-only modules and protected route handlers or server actions, use a server-only database URL, derive the user identity from a verified Clerk session, and enforce ownership for every read and mutation. If a privileged URL was built into a public client bundle, rotate it immediately. See [Deployment](docs/deployment.md) and [Database](docs/database.md).

## Reporting a vulnerability

Do not post unpatched vulnerability details, credentials, or private data in a public issue. Use GitHub's private vulnerability reporting for this repository if enabled: [Report a vulnerability](https://github.com/Brajesh31/Budget-Bloom/security/advisories/new). If unavailable, contact the maintainer through [@brajesh31](https://github.com/brajesh31) and request a private channel.

Include affected files, the conditions needed to reproduce the issue, likely impact, and a suggested mitigation. Never include real account credentials or private financial records.

## Response

The maintainer will acknowledge reports when reasonably able, investigate the affected revision, and coordinate a fix and disclosure with the reporter. This individual project does not promise a response-time or service-level commitment.
