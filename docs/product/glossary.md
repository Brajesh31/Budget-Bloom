# 📖 Product and Engineering Glossary

| Term | Meaning in this project |
|---|---|
| Budget | A planned spending amount grouped as a record in the budgets table |
| Expense | A spending entry associated with a budget where a budget ID is supplied |
| Owner | The authenticated person who should control a record; currently enforced inconsistently |
| Clerk | External identity provider used for sign-in/sign-up and user state |
| Neon | Hosted PostgreSQL service used by the current database client |
| Drizzle ORM | TypeScript/JavaScript ORM used to express SQL queries and schema |
| App Router | Next.js routing model based on the `app/` directory |
| Client Component | React component rendered with client-side interactivity, marked with `"use client"` |
| Server-only code | Code executed on the server and not bundled into browser JavaScript |
| Public environment variable | A Next.js variable prefixed with `NEXT_PUBLIC_`, which is exposed to browser code |
| Owner isolation | Ensuring a user can only read or mutate records assigned to their verified identity |
| Migration | Version-controlled database schema change |
| Schema drift | Difference between declared schema, migration files, snapshots, and actual database |
| Prototype | A development-stage product not yet proven safe or reliable for real users |

## Naming notes

The schema exports `Budgets` and `Expenses`, while SQL table names are lowercase `budgets` and `expenses`. `createdBy` currently stores an email-like owner value in several paths. A future secure design should use a stable identity provider user ID.
