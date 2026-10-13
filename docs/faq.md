# Frequently asked questions

## Which directory is the app?

The Next.js application is under **expense/**. The root npm manifest is empty. Run install, development, build, and lint scripts from **expense/**.

## What services does the app use?

It uses Clerk for authentication UI, Neon PostgreSQL for storage, and Drizzle ORM for SQL access. Those integrations are not currently arranged behind a secure server-side data boundary.

## Is the current database setup safe for real financial records?

No. Client components import a Neon database client configured from **NEXT_PUBLIC_DATABASE_URL**, which makes that value browser-visible. Several data operations do not verify record ownership on a trusted server. Use only disposable development data until those issues are corrected.

## Why is NEXT_PUBLIC_DATABASE_URL risky?

Next.js publishes environment variables with the **NEXT_PUBLIC_** prefix into browser JavaScript. A database connection string placed there can be read by visitors. Use a server-only environment variable after moving database operations to server code. See [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).

## Does Clerk middleware protect the dashboard automatically?

No. The current middleware initializes **clerkMiddleware({})** without a protection callback. Clerk middleware does not protect routes by default; each protected resource needs an authorization check. See [Clerk middleware documentation](https://clerk.com/docs/reference/nextjs/clerk-middleware).

## Why might Drizzle migrations fail?

The CLI config points to **utils/schema.ts**, while the tracked schema is **utils/schema.js**. The checked-in SQL and snapshot also omit the **expenses** table and differ on the budget amount type. Review [Database](database.md) before running migration commands.

## Does the app provide real-time updates or dark mode?

The old README claimed these features, but the checked-in source does not configure database subscriptions or a theme provider/toggle. Do not assume live synchronization or dark/light mode is implemented.

## Is the project ready to deploy?

Not with real data. Fix server-side credential handling, authentication, per-record ownership checks, and schema/migration consistency first. See [Deployment](deployment.md).

## Where do I get help?

See [Support](../SUPPORT.md). Report vulnerabilities privately using the process in [Security](../SECURITY.md).
