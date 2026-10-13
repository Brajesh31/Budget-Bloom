# Database and persistence

## Intended database

The app uses PostgreSQL through Neon and Drizzle ORM. Runtime database access is configured in **expense/utils/dbConfig.jsx** with **@neondatabase/serverless**. Data is persisted in database tables; the browser UI queries and mutates those tables directly in the current implementation.

## Declared schema

**expense/utils/schema.js** declares:

| Table | Columns |
| --- | --- |
| **budgets** | **id** serial primary key; **name** varchar, required; **amount** numeric, required; **icon** nullable varchar; **createdBy** varchar, required. |
| **expenses** | **id** serial primary key; **name** varchar, required; **amount** numeric, required; **budgetId** nullable integer referencing **budgets.id**; **createdAt** varchar, required. |

The schema has no explicit unique owner constraint, currency, timezone-aware timestamp, amount precision policy, or database-level user identity relation. The budget-to-expense foreign key does not declare an on-delete action.

## Migration drift

The tracked initial SQL migration and Drizzle snapshot contain only the **budgets** table. In that migration, **amount** is varchar, not numeric. They do not create **expenses**. In addition, **expense/drizzle.config.mjs** points to **./utils/schema.ts**, which is not tracked; the actual schema file is **utils/schema.js**.

The migration configuration reads **DATABASE_URL**, while the runtime client reads **NEXT_PUBLIC_DATABASE_URL**. The former is loaded through **dotenv/config** when Drizzle commands run from **expense/**. The latter is public-prefixed and must not contain a privileged database secret. Because of the path and schema drift, do not assume **npm run db:push** will work or that the generated schema matches the checked-in SQL. Review and reconcile all files before applying any change.

## Security and ownership

Client components import the database client and issue queries and mutations in the browser. Some operations filter by a client-visible email; detail and delete/update operations often filter only by row or budget ID. These checks can be altered or bypassed by a client and do not provide owner isolation.

Before storing real financial records, move data access to server-only code, derive the owner from a verified Clerk session, enforce ownership in every operation, keep credentials server-only, and add appropriate database constraints and validation. See [Security](../SECURITY.md).

## Data lifecycle

There is no documented production database, retention policy, backup process, account deletion flow, or privacy notice in the repository. The app should use disposable development data until these controls and the access boundary are implemented. Never commit connection strings or real user records.
