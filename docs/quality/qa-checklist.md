# ✅ Quality Assurance Checklist

Use this checklist for feature changes and release candidates. A checked box means the reviewer actually performed the check.

## 🧭 Functionality
- [ ] Acceptance criteria are explicit.
- [ ] Correct route and navigation behavior verified.
- [ ] Loading, empty, success, and error states reviewed.
- [ ] Form submission and reset behavior verified.
- [ ] Budget totals and expense calculations validated.
- [ ] Pagination/filtering behavior reviewed where present.

## 🔐 Authentication and authorization
- [ ] Anonymous access to protected data is denied server-side.
- [ ] Every operation verifies the Clerk identity on the server.
- [ ] Reads, updates, and deletes enforce record ownership.
- [ ] Owner identity is not accepted from browser-supplied email/user ID.
- [ ] No privileged credentials are included in browser code or source maps.
- [ ] Logs and error messages contain no sensitive details.

## 🧾 Data integrity
- [ ] Amounts are validated and use a documented precision/currency policy.
- [ ] Budget and expense relationships are valid.
- [ ] Database schema and migrations agree.
- [ ] Migration is tested against a disposable database.
- [ ] Backup and rollback steps are known before schema changes.

## ♿ Accessibility and responsive design
- [ ] All controls have accessible names.
- [ ] Forms have visible labels and useful errors.
- [ ] Keyboard navigation and focus order work.
- [ ] Dialogs manage focus correctly.
- [ ] Charts have textual alternatives.
- [ ] Layout is checked at mobile, tablet, and desktop sizes.

## 🚀 Release readiness
- [ ] Dependencies install from the lockfile.
- [ ] Lint/build/test commands actually pass.
- [ ] Environment variables are documented and scoped correctly.
- [ ] No local secrets or test data are committed.
- [ ] User-facing copy describes limitations honestly.
- [ ] Release notes and rollback plan are prepared.
