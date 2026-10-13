# API and external services

## Project-owned API

The repository does not define any **app/api/** Route Handlers, REST endpoints, GraphQL schema, or explicit Server Actions. The dashboard components call Drizzle and Neon directly from browser-side code; that is a database network request, not a protected application API boundary.

## External services and requests

| Service | Use in the current source |
| --- | --- |
| Clerk | Sign-in and sign-up UI, current-user state, and Clerk middleware integration. |
| Neon PostgreSQL | SQL queries and writes sent by client-side components through the Neon serverless HTTP driver. |
| Next.js host | Serves the application pages and static assets. |
| npm registry | Used when installing the app's dependencies; not an application runtime dependency. |

The runtime database URL is read from **NEXT_PUBLIC_DATABASE_URL** in **expense/utils/dbConfig.jsx**. Because the database client is imported by client components, this URL is exposed to the browser bundle. Do not put a privileged database credential there. See [Deployment](deployment.md).

## Current operations

Budget and expense screens issue select, insert, update, and delete operations directly using Drizzle. Some list queries filter budgets by the signed-in user's primary email. Other operations filter by a budget or expense ID without an owner check. These client-side operations do not constitute a secure multi-user API.

## Future boundary

Move data access behind server-only Route Handlers or Server Actions, require a verified Clerk identity in each operation, and enforce row ownership in every query. Validate input and return only the minimum required fields. Document any new endpoint's method, path, auth, request/response shape, failure behavior, and data sensitivity here.
