## Pull Request Description

### Summary of Changes

<!-- Provide a concise explanation of what changes are introduced and why -->

### Related Issue / ADR

<!-- Link the relevant issue or Architecture Decision Record (e.g. Closes #12, Implements ADR-0003) -->

---

## Architecture & Scope Checklist

- [ ] **Working Identifier:** No permanent brand names were introduced; used `campus-emergency-platform` where technical names are required.
- [ ] **Architectural Boundaries:** Presentation (frontend), API/orchestration (backend), and simulation engines remain strictly separated.
- [ ] **Decoupled Calculations:** Shortest-path routing, crowd movement dynamics, and hazard models are separate and not conflated.
- [ ] **API Contracts:** Any new or modified endpoints adhere strictly to [docs/API_CONTRACTS.md](file:///c:/Development/Projects/Evacuate%20AI/docs/API_CONTRACTS.md).
- [ ] **No Secrets:** No API keys, credentials, or `.env` files are included in this PR.
- [ ] **No Magic Numbers:** Speeds ($m/s$), distances ($m$), times ($s$), and capacities are named constants.

---

## Verification & Quality Gates

Please check all verification commands that were **actually run** and passed locally:

- [ ] `npm run lint` / `npm run typecheck` (Frontend static checks passed with 0 errors)
- [ ] `ruff check .` && `ruff format --check .` (Python static checks passed with 0 errors)
- [ ] `pytest tests/unit` (Unit tests passed)
- [ ] `pytest tests/simulation` (All 10 mandatory simulation validation scenarios passed)
- [ ] `npm run build` (Production build succeeded without warnings)

> [!NOTE]
> If any test could not be run, explicitly state which test was omitted and why in the section below.

### Omissions or Known Limitations

<!-- List any unverified items or current limitations of this change -->
