# 🧪 Testing Strategy

## Current baseline

The repository does not currently include a verified automated unit, integration, end-to-end, or authorization test suite. The app declares development, build, lint, and Drizzle scripts in `expense/package.json`. A command's presence is not proof it runs successfully with the installed framework version.

## Required test layers

### 1. Unit tests
- Budget and expense amount parsing.
- Currency formatting and rounding policy.
- Total spend and remaining budget calculations.
- Date parsing and ordering.
- Input validation and error mapping.

### 2. Integration tests
- Create, read, update, and delete budgets.
- Create, read, update, and delete expenses.
- Reject an expense whose budget belongs to another user.
- Reject missing, malformed, negative, or out-of-range amounts.
- Ensure database failures return safe errors.

### 3. Authorization and security tests
- Anonymous users cannot access protected records.
- User A cannot list, read, update, or delete User B's data.
- Changing a record ID cannot bypass ownership.
- Owner identity comes from the verified server session, never request input.
- Production database credentials are absent from client bundles.
- Error responses do not expose connection strings or SQL internals.

### 4. Browser and accessibility checks
- Sign-in and sign-up navigation.
- Dashboard and budget route navigation.
- Form labels, validation, and keyboard submission.
- Dialog focus management and Escape behavior.
- Mobile navigation, zoom, contrast, chart alternatives.
- Empty, loading, error, and populated states.

## Verification matrix

| Layer | Expected evidence | Current status |
|---|---|---|
| Unit | Test runner and test files | Not configured/verified |
| Integration | Disposable test database and isolated fixtures | Not configured/verified |
| Authorization | Cross-account isolation tests | Not configured/verified |
| Browser | Playwright or equivalent suite | Not configured/verified |
| Accessibility | Automated scan plus manual review | Not configured/verified |
| Build | Successful `npm run build` from `expense/` | Not executed in this documentation change |

## Test data safety

Use synthetic records and isolated disposable databases. Do not copy real bank statements, account balances, emails, or personal transactions into fixtures or screenshots.

## Test report template

Record commit SHA, runtime versions, test command, environment type, result, failure details, and tests not run. Never report a pass based only on code inspection.
