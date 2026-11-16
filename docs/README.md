# 📚 Budget Bloom Documentation Hub

Welcome to the engineering and product documentation for Budget Bloom. This repository is a **prototype expense and budget tracker**, not a production financial application. Documentation distinguishes current behavior from planned work and records known security and database limitations.

> 🚨 **Critical warning:** Do not use real financial or personal data with the current implementation. The browser-side database connection uses a `NEXT_PUBLIC_DATABASE_URL` variable, and ownership checks are incomplete. Read [Security](../SECURITY.md) before configuring services.

## 🧭 Documentation map

| Area | Documents |
|---|---|
| 🌱 Product | [Project brief](product/project-brief.md), [Feature inventory](product/features.md), [User journeys](product/user-journeys.md), [Glossary](product/glossary.md) |
| 🏛️ Engineering | [Architecture](architecture.md), [System context](diagrams/system-context.mmd), [Data flow](diagrams/data-flow.mmd), [Database](database.md), [API and integrations](api.md) |
| 🧑‍💻 Development | [Installation](installation.md), [Development](development.md), [Troubleshooting](troubleshooting.md), [Testing strategy](quality/testing-strategy.md), [QA checklist](quality/qa-checklist.md) |
| 🚀 Operations | [Deployment](deployment.md), [Environment configuration](operations/environment.md), [Incident response](operations/incident-response.md), [Backup and recovery](operations/backup-recovery.md), [Rollback](operations/rollback.md) |
| 🔐 Security and privacy | [Threat model](security/threat-model.md), [Data handling](security/data-handling.md), [Security policy](../SECURITY.md) |
| 🧩 Templates | [Template index](templates/README.md), [ADR](templates/adr.md), [Feature spec](templates/feature.md), [Bug report](templates/bug-report.md), [Test plan](templates/test-plan.md), [Incident report](templates/incident.md), [Risk register](templates/risk-register.md), [Release checklist](templates/release-checklist.md) |

## 🧱 Repository structure at a glance

```text
Budget-Bloom/
├── expense/                 # Actual Next.js app root
│   ├── app/                 # App Router routes and page components
│   ├── components/          # UI components
│   ├── utils/               # Drizzle schema and current DB client
│   ├── drizzle/             # Existing initial migration metadata
│   ├── public/              # Static images and icons
│   ├── package.json         # App dependencies and scripts
│   └── package-lock.json    # App lockfile
├── docs/                    # Project documentation
├── .env.example             # Placeholder configuration template
├── README.md                # Main project entry point
└── package.json             # Empty root placeholder, not app manifest
```

## 🧭 Recommended reading order

1. Read the [root README](../README.md) for the project summary and security warning.
2. Read the [Product brief](product/project-brief.md) and [Feature inventory](product/features.md).
3. Follow [Installation](installation.md) using the `expense/` directory.
4. Review [Architecture](architecture.md), [Database](database.md), and the [Threat model](security/threat-model.md).
5. Before deployment, follow [Deployment](deployment.md) and [Operations](operations/environment.md).

## 📌 Documentation rules

- Say **implemented** only when the source demonstrates the behavior.
- Mark unknowns and incomplete work explicitly.
- Do not invent test results, audit completion, uptime, integrations, or metrics.
- Update docs in the same change as implementation.
- Use diagrams as editable source files and keep diagrams aligned with the application.
