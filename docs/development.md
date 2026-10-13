# Development

## Start in the correct directory

The Next.js app lives in **expense/**. Copy the root **.env.example** to **expense/.env**, fill it with development-only values, then run **npm ci** and **npm run dev** from **expense/**. The root npm manifest is empty.

The current database client reads **NEXT_PUBLIC_DATABASE_URL** and is imported by client components. That makes the connection URL browser-visible. Use only disposable development data and credentials; do not use a privileged or production URL until database access is moved to server-only code.

## App Router structure

- The root route renders **expense/app/page.tsx** with the shared header and hero.
- Clerk pages are located in the **(auth)** route group at **/sign-in** and **/sign-up**.
- Dashboard pages live directly under **app/dashboard/**.
- UI and database access are mixed in client components.
- **app/(routes)/layout.tsx** is separate from dashboard pages, has a misspelled **childern** prop and incomplete client-hook code, and is not their active parent layout.

## Database and authentication boundaries

Before extending budget or expense data flows:

1. Move every database operation out of client components into server-only modules, Server Actions, or Route Handlers.
2. Authenticate each operation on the server using a verified Clerk session.
3. Use a stable Clerk user ID as the owner key and enforce ownership for every read, insert, update, and delete.
4. Validate request inputs and constrain database operations on the server.
5. Keep the database URL in a server-only **DATABASE_URL** variable; remove the **NEXT_PUBLIC_DATABASE_URL** path.
6. Align the Drizzle schema, config path, migration SQL, and snapshot before applying migrations.

A route matcher or client-side visibility check alone does not secure database access. Clerk recommends checking access at the resource that reads or mutates protected data; see the [Clerk middleware reference](https://clerk.com/docs/reference/nextjs/clerk-middleware).

## Data model

The schema source defines a budget with name, amount, icon, and createdBy fields, and an expense with name, amount, budget ID, and createdAt fields. The generated SQL and snapshot only represent budgets and differ on the amount type. The source has no explicit currency code, numeric precision policy, or timestamp type policy.

## UI and dependencies

The UI uses Next.js App Router, React, Tailwind CSS, Clerk, Neon, Drizzle, Recharts, Radix primitives, Lucide, and Sonner. Changes to image assets should preserve source and license information. Avoid logging connection strings or full financial records.

## Verification

The repository declares npm scripts for development, build, lint, and Drizzle tasks, but no test suite is documented. For each contribution, state the commands and manual checks actually performed. Do not report a build, migration, or security check as successful unless it was run.
