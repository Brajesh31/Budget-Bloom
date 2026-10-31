# Budget Bloom

Budget Bloom is an expense and budget tracking application prototype. The Next.js app is in **expense/**; the repository root contains a placeholder npm manifest and the project documentation. The app combines a Next.js App Router interface, Clerk sign-in UI, Neon PostgreSQL connectivity, and Drizzle queries.

## Security status — read before using

**Do not deploy this repository with real financial or personal data in its current state.** Database access is performed in browser-side components through **NEXT_PUBLIC_DATABASE_URL**. Next.js bundles values with the **NEXT_PUBLIC_** prefix into JavaScript delivered to the browser, so a database connection string containing credentials is exposed to visitors. Several read and write operations also lack server-side ownership checks, and the Clerk middleware does not explicitly protect routes. Client-side filtering by the displayed user's email is not an authorization boundary.

Use disposable development data only until database operations are moved to a trusted server, credentials are server-only, and every operation authenticates the user and verifies ownership. If a privileged connection string has been used in a deployed build, rotate it. See [Security](SECURITY.md) and [Deployment](docs/deployment.md).

## What is implemented

The nested app includes a public landing page, Clerk sign-in and sign-up pages, a dashboard overview, budget listing and creation/editing UI, expense listing and add/delete UI, charts, and an about page. It uses:

- Next.js 15 and React 18 with the App Router.
- Clerk for sign-in UI and user state.
- Neon serverless PostgreSQL and Drizzle ORM.
- Tailwind CSS 4, Radix UI components, Lucide icons, Recharts, and Sonner notifications.

The repository does not currently provide a verified production-ready authorization layer, a tested migration workflow, or evidence of real-time synchronization. The checked-in migration and Drizzle schema are out of sync, and the Drizzle config points to a TypeScript schema file that is not present.

## Repository layout

- **expense/** — the actual Next.js project and its npm scripts.
- **expense/app/** — landing page, Clerk auth pages, dashboard routes, and UI components.
- **expense/utils/schema.js** — Drizzle table definitions for budgets and expenses.
- **expense/utils/dbConfig.jsx** — Neon and Drizzle client configuration currently imported by client components.
- **expense/drizzle/** — an initial migration and metadata snapshot that do not yet represent the complete current schema.
- **docs/** — architecture, installation, development, deployment, API, database, troubleshooting, and FAQ guides.

The root **package.json** is empty. Run npm commands from **expense/**, not from the repository root.

## Setup

Requirements: Node.js 18.18 or newer, npm, a Clerk development application, and a disposable Neon development database.

1. Copy the example environment file into the app directory: **Copy-Item .env.example expense/.env** in PowerShell, or **cp .env.example expense/.env** in a POSIX shell.
2. Edit **expense/.env** with development-only Clerk and database values. See [Installation](docs/installation.md).
3. Change into the app directory and install its lockfile-defined dependencies:

       cd expense
       npm ci

4. Start the development server:

       npm run dev

5. Open **http://localhost:3000**.

The current **NEXT_PUBLIC_DATABASE_URL** variable is unsafe for a privileged database credential because it is exposed in the browser bundle. Do not add a production credential to it. The setup guide explains this code limitation and the separate **DATABASE_URL** read by the Drizzle CLI.

## Routes

| Path | Purpose |
| --- | --- |
| **/** | Landing page. |
| **/sign-in** | Clerk sign-in component. |
| **/sign-up** | Clerk sign-up component. |
| **/dashboard** | Overview cards, chart, latest expenses, and budgets. |
| **/dashboard/budgets** | Budget list and creation UI. |
| **/dashboard/expensesdashboard** | Expense list. |
| **/dashboard/expenses/[id]** | Budget detail, expense list, add/edit/delete controls. |
| **/dashboard/about** | About page. |

Route availability does not imply that access control is correctly enforced.

## Documentation

- [Architecture](docs/architecture.md)
- [Installation](docs/installation.md)
- [Development](docs/development.md)
- [Deployment and security prerequisites](docs/deployment.md)
- [API and external services](docs/api.md)
- [Database schema and migrations](docs/database.md)
- [Troubleshooting](docs/troubleshooting.md)
- [FAQ](docs/faq.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Support](SUPPORT.md)
- [Roadmap](ROADMAP.md)

## License and assets

Original project code and documentation are licensed under MIT; see [LICENSE](LICENSE). Bundled images and framework/vendor assets may have separate rights. Their source and license records are incomplete, so verify reuse rights before redistribution.

## Maintainer

Brajesh Kumar — GitHub [@brajesh31](https://github.com/brajesh31).

Last updated: 2026-10-31 07:38 UTC
