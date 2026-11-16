# ⚠️ Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R-01 | Public database credential | High | Critical | Server-only DB access and credential rotation | | Open |
| R-02 | Cross-user record access | High | Critical | Server-side owner check on every operation | | Open |
| R-03 | Migration drift | Medium | High | Align schema/config/SQL and test migrations | | Open |
| R-04 | Missing security tests | High | High | Add authorization regression suite | | Open |

## Review
Use evidence, assign an owner, and re-evaluate after architecture or deployment changes. Do not close a risk merely because it is documented.
