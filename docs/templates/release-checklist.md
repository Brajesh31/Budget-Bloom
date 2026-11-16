# 🚀 Release Checklist

## Security
- [ ] Database URL is server-only and absent from client bundles.
- [ ] Protected operations verify Clerk identity and record ownership.
- [ ] Suspected exposed credentials rotated.
- [ ] Dependencies and workflow permissions reviewed.

## Data
- [ ] Schema, SQL, snapshots, and config align.
- [ ] Migration tested using disposable database.
- [ ] Backup and restore verified.
- [ ] App and DB rollback planned separately.

## Quality
- [ ] Unit, integration, and authorization tests pass.
- [ ] Build and lint pass.
- [ ] Browser smoke tests complete.
- [ ] Accessibility and responsive review complete.
- [ ] Error states and safe logging reviewed.

## Operations
- [ ] Correct app root and environment variables configured.
- [ ] Preview deployment reviewed.
- [ ] Release notes updated.
- [ ] Monitoring and support owner known.

## Release record
Commit, deployment, reviewer, date, and known limitations.
