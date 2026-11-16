# 🌱 Product Brief: Budget Bloom

## 1. Product summary

Budget Bloom is a web application prototype for organizing personal budgets and tracking expenses. The interface provides a landing page, Clerk sign-in and sign-up screens, a dashboard, budget creation/listing, expense listing and budget-linked expense controls.

The project is built with Next.js App Router and React. It uses Clerk for identity UI and Neon PostgreSQL with Drizzle ORM for persistence. The current persistence integration is not safely isolated from the browser, so this brief describes a prototype and its intended product direction, not a production-ready financial service.

## 2. Problem statement

People often record spending and budget limits across notes, spreadsheets, and disconnected apps. A focused budget tracker can make it easier to group spending against planned amounts and review progress.

## 3. Intended users

- Individuals learning to plan monthly or category-based spending.
- Students who want to track routine expenses.
- Prototype reviewers evaluating a simple budgeting workflow.

These are intended audiences, not validated market segments.

## 4. Product goals

1. Make budget creation understandable.
2. Keep expense records associated with a budget.
3. Show a high-level view of spending.
4. Make the interface navigable on common screen sizes.
5. Establish a trustworthy data model and privacy boundary before real use.

## 5. Current scope

- Public landing page.
- Clerk sign-in and sign-up pages.
- Dashboard summary and chart components.
- Budget listing and creation interface.
- Expense listing and budget detail controls.
- About page.
- Neon/Drizzle persistence code in the current frontend implementation.

## 6. Out of scope or not verified

There is no verified banking integration, bank transaction import, financial advice, recurring payment engine, invoice processing, multi-currency support, budget alerts, CSV export, audit history, subscription billing, or real-time synchronization documented by the current source. These must not be represented as available features without implementation.

## 7. Non-functional requirements

- 🔐 Confidentiality: private connection strings and personal financial details must never ship to the browser.
- 🧾 Ownership: every server operation must authorize access to the current user's records.
- ♿ Accessibility: forms, charts, dialogs, and navigation must support keyboard and assistive technology.
- ⚡ Performance: dashboard queries and charts should remain responsive with larger record sets.
- 🧪 Reliability: validation and automated tests must cover calculations, CRUD behavior, and record isolation.
- 📖 Transparency: clearly explain data handling, retention, and limitations.

## 8. Current release assessment

<badge>Prototype, not production-ready</badge>

The current code exposes a database URL through a `NEXT_PUBLIC_` variable referenced by client components, and not every query verifies owner identity on a trusted server. Do not use real financial data until the security boundary, migration workflow, privacy controls, and verification process are fixed.

## 9. Success measures for future releases

Define and measure task completion rate for creating a budget and recording an expense, validation error rate, authorization test pass rate, dashboard latency, accessibility defect count, and support issue trends. No baseline or target is claimed until collected.
