# 🔏 Data Handling and Privacy Notes

## Data categories

The current schema and UI can process budget names, budget amounts, expense names, expense amounts, budget associations, dates/timestamps, and Clerk account identity fields. These values may reveal personal financial behavior and must be treated as sensitive.

## Data minimization

Collect only fields required for the budgeting workflow. Do not store bank account numbers, card data, credentials, government identifiers, or unnecessary personal information. Use synthetic examples in documentation and tests.

## Ownership and access

The current implementation does not enforce data ownership consistently on a trusted server. Client-side filters by email or ID are not sufficient. Real records must not be used until each operation verifies the Clerk session and constrains the query by the verified owner's stable user ID.

## Retention and deletion

The repository does not define a data retention policy, account deletion process, backup expiry schedule, or user data export workflow. These must be designed before production use. Deletion must cover primary records, dependent records, backups where feasible, and any external processors according to applicable obligations.

## Logs and screenshots

Never put real transaction details, email addresses, credentials, or connection strings into issues, commits, screenshots, telemetry, or public documentation. Sanitize diagnostic output.

## Transparency

A production deployment requires a clear privacy notice describing data collected, purpose, providers, storage region, retention, deletion, support contact, and any analytics or third-party processing. This document is engineering guidance, not a legal privacy policy.
