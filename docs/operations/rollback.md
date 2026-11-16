# ↩️ Rollback Guide

## Application rollback

1. Stop additional deployments.
2. Identify the last known good commit and deployment.
3. Re-deploy using the hosting provider's supported rollback process.
4. Verify sign-in behavior, protected routes, budget and expense reads, and static assets.
5. Inspect logs for renewed failures.
6. Record the restored version and incident details.

## Database rollback

Database rollback must be handled separately. A previous frontend revision may not be compatible with a newer or partially migrated database. Never reverse a migration by guessing SQL.

Before schema changes, capture a restorable backup, record the current schema version, review the migration, and define a recovery path. Test rollback on a disposable database.

## Security incident

If a credential was exposed, rotation is mandatory even if the application is rolled back. Old code or old builds may still contain the credential. Review deployment artifacts and provider access logs.

## Post-rollback checks

- [ ] Known-good commit identified.
- [ ] Application restored and reachable.
- [ ] Database compatibility verified.
- [ ] User ownership checks still enforced.
- [ ] Credentials rotated where necessary.
- [ ] Incident and follow-up actions documented.
