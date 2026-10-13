# Budget Bloom application

This directory contains the runnable Next.js application. The repository root contains the canonical project README and detailed documentation:

- [Project overview and setup](../README.md)
- [Installation](../docs/installation.md)
- [Architecture](../docs/architecture.md)
- [Database and migration status](../docs/database.md)
- [Deployment and security prerequisites](../docs/deployment.md)
- [Security policy](../SECURITY.md)

Run npm commands from this directory. For local development, copy the root environment template to this directory as **.env**, install dependencies with **npm ci**, and start the app with **npm run dev**.

Do not connect this revision to real financial or personal data. Database operations currently run from browser-side components using a public-prefixed database URL, and ownership checks are incomplete. Read the security guidance before configuring a database.
