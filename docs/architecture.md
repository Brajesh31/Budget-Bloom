# Architecture

## Repository shape

The Git repository root is not the Next.js application root. The active app and its npm manifest are under **expense/**. The root **package.json** is empty and the root lockfile contains no dependencies.

## Application pieces

- **expense/app/** uses the Next.js App Router for the landing page, Clerk sign-in and sign-up pages, dashboard pages, and UI components.
- **expense/app/layout.tsx** wraps the app with ClerkProvider and global styles.
- **expense/middleware.ts** invokes Clerk middleware for matching requests but does not define a route protection callback.
- **expense/utils/schema.js** defines Drizzle tables for budgets and expenses.
- **expense/utils/dbConfig.jsx** creates a Neon HTTP client using **NEXT_PUBLIC_DATABASE_URL**.
- Dashboard components marked **use client** import Drizzle and the Neon client and issue database queries and mutations in the browser.
- **expense/drizzle/** contains an initial budgets migration and metadata snapshot.

## Request and data flow today

    Browser
      |-- Next.js pages and assets --> Next.js application
      |-- Clerk sign-in UI ----------> Clerk
      |-- Drizzle/Neon queries ------> Neon PostgreSQL
                                      (connection URL is public-prefixed)

The current implementation has no project-owned Route Handler or Server Action layer around database access. Budget and expense components issue direct Neon operations from the client. Many queries filter by the Clerk user's primary email, but browser-side filters are user-controlled and are not an authorization boundary.

Because the database URL variable is prefixed **NEXT_PUBLIC_**, Next.js makes it available in browser JavaScript when used by client code. Do not supply a privileged database credential or use real financial data with this arrangement. See [Security](../SECURITY.md) and [Deployment](deployment.md).

## Pages and routes

| Route | Current source | Purpose |
| --- | --- | --- |
| **/** | **expense/app/page.tsx** | Landing page. |
| **/sign-in** | **expense/app/(auth)/sign-in/[[...sign-in]]/page.tsx** | Clerk sign-in. |
| **/sign-up** | **expense/app/(auth)/sign-up/[[...sign-up]]/page.tsx** | Clerk sign-up. |
| **/dashboard** | **expense/app/dashboard/page.tsx** | Summary cards, chart, and latest expenses. |
| **/dashboard/budgets** | **expense/app/dashboard/budgets/page.jsx** | Budget list and creation UI. |
| **/dashboard/expensesdashboard** | **expense/app/dashboard/expensesdashboard/page.tsx** | Expense listing. |
| **/dashboard/expenses/[id]** | **expense/app/dashboard/expenses/[id]/page.tsx** | Budget detail and expense controls. |
| **/dashboard/about** | **expense/app/dashboard/about/page.tsx** | About content. |

The route group **expense/app/(routes)/** does not contain these dashboard pages, so its layout is not a parent layout for them. The routes themselves do not become protected merely because Clerk middleware matches them.

## Persistence and schema

Neon PostgreSQL is the intended persistent store. The current Drizzle schema declares **budgets** and **expenses**, but the checked-in SQL migration and snapshot describe only **budgets**, with **amount** stored as varchar instead of the schema's numeric type. The Drizzle configuration points to **utils/schema.ts**, but the tracked schema is **utils/schema.js**. Review [Database](database.md) before using migration commands.

## Limitations

- No server-side authorization boundary exists for the direct client database operations.
- Several detail reads and delete/update calls filter by record ID or budget ID without checking owner identity.
- A client's email address is used as the **createdBy** owner key in multiple queries.
- The source does not implement real-time subscriptions or synchronization.
- The actual framework app is nested under **expense/**; package and deployment commands must use that root.
