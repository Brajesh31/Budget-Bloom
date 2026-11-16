# 💾 Backup and Recovery

## Current state

The repository does not document or verify a production Neon database, scheduled backup policy, point-in-time recovery setting, retention window, or tested restore. Do not imply that backups are configured just because the provider may offer backup features.

## Before using valuable data

- Select a database backup and point-in-time recovery configuration appropriate to the provider plan.
- Define recovery point objective (RPO) and recovery time objective (RTO).
- Assign a person responsible for backup review.
- Keep application and schema migration revisions traceable.
- Restrict backup access and protect exports as sensitive financial data.
- Test restoration into an isolated database.
- Record retention and deletion requirements.

## Recovery procedure

1. Declare the incident and stop writes if ongoing writes could compound damage.
2. Identify a known-good backup/restore point.
3. Restore to a separate database first.
4. Verify tables, row counts, ownership relations, and representative synthetic records.
5. Reconcile the schema version and migrations.
6. Confirm server-side authorization and credentials before reconnecting the app.
7. Switch the application only after validation and explicit approval.
8. Preserve the original database for investigation according to policy.

## Verification record

Record backup timestamp, provider/region, database/schema revision, restore point, operator, validation checks, and outcome. Do not store credentials or real exported records in Git.

## Important

An application rollback does not reverse database writes. A schema downgrade is not automatically safe. Plan data migration and rollback independently.
