# Installation

## Requirements

- Node.js 18.18 or newer and npm.
- A Clerk development application for sign-in and sign-up.
- A disposable Neon development database if you want to exercise database screens.
- PowerShell on Windows or a POSIX shell on macOS or Linux.

Do not use real financial or personal data. The current database URL is exposed to browser code and server-side ownership checks are incomplete; see [Security](../SECURITY.md).

## Install the app dependencies

Run commands from the repository root unless a command is shown after changing into **expense/**.

Copy the root environment template into the app directory:

PowerShell:

    Copy-Item .env.example expense/.env

macOS or Linux:

    cp .env.example expense/.env

Edit **expense/.env** with development-only credentials. Use the placeholders as a reminder of the required variable names; do not commit filled values.

Then install the lockfile-defined dependencies from the actual Next.js app directory:

    cd expense
    npm ci

The repository-root package manifest is empty and is not the application package. Do not run **npm install** at the repository root.

## Environment variable sources

The current code reads:

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** and **CLERK_SECRET_KEY** for Clerk.
- **NEXT_PUBLIC_DATABASE_URL** in **utils/dbConfig.jsx** for app database access. This is unsafe for a privileged URL because the prefix publishes the value to browser bundles. Use disposable local credentials only until the code is moved behind server-only operations.
- **DATABASE_URL** in **drizzle.config.mjs** for Drizzle CLI connection setup. The config imports **dotenv/config**, so run the CLI from **expense/** with an **expense/.env** file.

The app and migration CLI currently use different database variable names. The Drizzle config also references a missing TypeScript schema file, so database setup commands require schema and configuration repair and review. Do not run migration commands against a production or valuable database.

## Start the development server

From **expense/**:

    npm run dev

Open **http://localhost:3000**. Clerk development keys must match the configured Clerk application and sign-in settings.

## Available scripts

| Command | Purpose |
| --- | --- |
| **npm run dev** | Starts the Next.js development server. |
| **npm run build** | Builds the Next.js application. |
| **npm run start** | Serves a production build locally. |
| **npm run lint** | Calls the configured Next.js lint command. |
| **npm run db:push** | Runs Drizzle Kit schema push; currently blocked by schema/configuration drift. |
| **npm run db:studio** | Starts Drizzle Studio using the configured database connection. |

Commands above are declared in **expense/package.json**; they were not run during this documentation update.
