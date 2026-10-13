# Troubleshooting

## npm cannot find a package manifest

The actual Next.js package is in **expense/**. Change into that directory before running npm commands. The root **package.json** is empty.

## Clerk or database configuration is missing

Copy **.env.example** to **expense/.env**, set development keys, and run the app from **expense/**. The Next.js app uses Clerk variables and the runtime code expects **NEXT_PUBLIC_DATABASE_URL**. Drizzle CLI configuration reads **DATABASE_URL**. Do not use a privileged database URL for the public-prefixed variable.

## Database connection fails

Check that the disposable Neon database is reachable and that the connection strings match the expected environment variable names. Run Drizzle commands only after reviewing the configuration: it points to **utils/schema.ts**, but the tracked schema is **utils/schema.js**. The initial SQL and metadata also do not include the current **expenses** table or its numeric schema. Do not push schema changes to an important database as a troubleshooting experiment.

## A browser exposes the database connection URL

This is a known design issue: the client imports a Neon client configured from **NEXT_PUBLIC_DATABASE_URL**. Next.js bundles public-prefixed variables for browser use. Do not deploy with a privileged URL. Rotate any privileged credential that was included in a public build, move database access server-side, and use a server-only variable before deployment.

## Dashboard routes load without a sign-in redirect

The checked-in Clerk middleware calls **clerkMiddleware({})** without an explicit protection callback. Middleware does not protect routes by default. Add server-side authorization at the page/resource and each database operation; a client-side sign-in check is insufficient.

## A user can access another record by changing an ID

Several reads, updates, and deletes constrain operations by row or budget ID without verifying ownership from a trusted server-side Clerk identity. Do not use this app with real user data until all operations enforce owner checks on the server.

## Migration or build errors

Run package commands from **expense/** and inspect the first error. Review the installed Next.js and Drizzle versions in **expense/package-lock.json**. The app has a schema file path mismatch and generated migration drift. This documentation update did not run build or migration commands.

## Where do I report a vulnerability?

Follow the private reporting instructions in [Security](../SECURITY.md). For ordinary support, see [SUPPORT.md](../SUPPORT.md).
