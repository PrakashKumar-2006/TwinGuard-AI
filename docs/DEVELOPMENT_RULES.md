# Team Nexus Development Constitution & Project Rules

**Project Working Identifier:** `campus-emergency-platform`  
**Document:** `docs/DEVELOPMENT_RULES.md`  
**Authority:** Canonical Team Constitution for Developers and AI Agents  
**Revision:** 1.0 (Governance Setup)

---

## 1. Core Mission & Scope

Team Nexus is building an AI-powered Digital Twin and Emergency Simulation platform for academic buildings and university campuses.

The system encompasses:

- Interactive 2D floor plans with live occupancy and hazard overlays.
- Synchronized 3D digital twins providing spatial situational awareness.
- Hazard propagation simulation (smoke, fire, blockages).
- Graph-based evacuation route optimization with dynamic edge weights.
- Agent-based crowd movement and corridor congestion dynamics.
- Emergency command center dashboard and explainable response recommendations.

> [!NOTE]
> The final product name has not been chosen. All technical identifiers, package names, configuration files, and documentation must use the neutral working identifier `campus-emergency-platform`.

---

## 2. Fundamental Engineering Laws

1. **Safety Prototype Distinction:** The software is an educational, research, and planning simulation tool. It is **never** a substitute for certified life-safety systems (NFPA, EN 54, IBC). All UI displays and simulation outputs must be explicitly labeled as simulated or experimental.
2. **Deterministic Simulation:** When provided with a fixed pseudo-random generator seed, simulation runs must yield 100% reproducible results for regression testing and academic audit.
3. **Traceability of Metrics:** Evacuation times, congestion indices, and risk scores must be directly traceable to documented mathematical models and simulation events. Never fabricate or hardcode simulated results.
4. **Zero Silent Failures:** No system component may swallow exceptions or substitute fabricated success data when an error occurs. Failures must return structured, machine-readable error responses.
5. **Contract Precedence:** No developer or AI agent may alter a shared data model or API route without updating [docs/API_CONTRACTS.md](file:///c:/Development/Projects/Evacuate%20AI/docs/API_CONTRACTS.md) and obtaining approval from affected module owners.

---

## 3. Technology Stack & Module Responsibilities

### 3.1 Frontend (`frontend/`)

- **Core:** React 18/19, TypeScript (strict mode), Vite.
- **2D Rendering:** HTML5 Canvas / SVG with coordinate transformation layers.
- **3D Digital Twin:** Three.js, optionally via React Three Fiber (R3F) and Drei.
- **State Management:** Lightweight React state (Zustand or React Context) ensuring fast re-renders during 60 FPS simulation playback.
- **Boundary:** Frontend is purely a presentation, telemetry, and control layer. It must **never** run authoritative evacuation calculations or graph shortest-path searches.

### 3.2 Backend & Orchestration (`backend/`)

- **Core:** Python 3.14+, FastAPI, Uvicorn.
- **Validation:** Pydantic v2 schemas for all requests, responses, and internal models.
- **Logging:** Structured JSON logging with request correlation IDs.
- **Boundary:** Endpoints orchestrate requests, validate parameters, invoke simulation engines, and serialize responses. Business calculations live in isolated, testable service modules.

### 3.3 Simulation & Optimization Engine (`simulation/`)

- **Graph Engine:** NetworkX for building topology representation, Dijkstra / A* routing with dynamic hazard cost penalties, and blocked corridor edge removals.
- **Crowd Engine:** Agent-based cellular automata or social force approximations for occupant movement and bottleneck tracking.
- **Hazard Model:** Spatial hazard propagation across rooms and corridors based on documented dispersal rules.
- **Boundary:** The graph route engine, crowd simulator, and hazard model are decoupled modules with explicit interfaces. Shortest path is strictly distinguished from crowd congestion.

### 3.4 Data Layer (`backend/data/` or database)

- **Status:** File-based, schema-validated JSON building models during the initial prototype phase.
- **Future Persistence:** PostgreSQL (with PostGIS or JSONB) or Supabase PostgreSQL is documented as **PROPOSED** in [docs/DECISIONS.md](file:///c:/Development/Projects/Evacuate%20AI/docs/DECISIONS.md) (ADR-0004). Database migration will only occur after explicit team sign-off.

---

## 4. Coding & Clean Architecture Standards

### 4.1 General Clean Code Rules

- Follow the Single Responsibility Principle: each module, function, or class has one reason to change.
- Maximize readability over clever brevity.
- Keep functions concise (aim under 50 lines).
- Self-documenting code with meaningful identifiers:
  - Good: `calculate_corridor_traversal_time(length_meters: float, walking_speed_mps: float) -> float`
  - Bad: `calc(l, s)`
- Document non-obvious algorithms, safety assumptions, coordinate systems, and units.
- Clean up unused imports, dead code, and temporary debugging statements before committing.

### 4.2 TypeScript & React Standards

- `"strict": true` in `tsconfig.json` is mandatory.
- Banned: `any`, `@ts-ignore` (unless accompanied by a documented issue tracking number and explanation).
- Explicit interfaces for all props, API responses, and shared domain models.
- Handle all UI lifecycle states: loading spinner, empty states, error boundaries, and interactive playback states.
- Separation of concerns: Keep API client code in `services/api/`, hooks in `hooks/`, UI components in `components/`, and state stores in `stores/`.

### 4.3 Python Standards

- Strict type hints on all public functions, methods, and return values.
- Formatted and linted with Ruff (`pyproject.toml`).
- Use Pydantic v2 models for domain data validation.
- All simulation functions must accept an optional `seed: int | None = None` parameter.
- Never use broad exception catches:
  - Allowed: `except (KeyError, ValueError) as err:`
  - Prohibited: `except Exception:` (without logging and re-raising), `except: pass`

### 4.4 Coordinate System & Units Standard

All modules must adhere to the unified coordinate standard defined in [docs/API_CONTRACTS.md](file:///c:/Development/Projects/Evacuate%20AI/docs/API_CONTRACTS.md):

- **Distance:** Meters ($m$)
- **Speed:** Meters per second ($m/s$)
- **Time:** Seconds ($s$)
- **Capacity:** Persons (integer count)
- **2D Coordinates:** Origin $(0, 0)$ at building bottom-left (South-West) corner. $X$ axis positive to East (right), $Y$ axis positive to North (up).
- **3D Coordinates:** Origin $(0, 0, 0)$ corresponding to ground floor $(X=0, Y=0, Z=0)$, where $Z$ is vertical elevation above ground level.

---

## 5. Security & Sensitive Data Handling

1. **Zero Secret Leaks:** No API keys, passwords, database credentials, or secret tokens may exist in Git repositories.
2. **Environment Separation:** All configuration is injected via environment variables. Use [.env.example](file:///c:/Development/Projects/Evacuate%20AI/.env.example) as the authoritative reference. Actual `.env` files are ignored by Git.
3. **No Privileged Keys in Frontend:** Frontend Vite bundles must never contain server-side secret keys, database master credentials, or administration keys.
4. **Data Minimization:** No personal identifying information (PII) of real university staff, students, or occupants will be stored or simulated. All occupant profiles use synthetic identifiers (e.g., `agent-001`, `group-east-hall`).
5. **Secret Exposure Protocol:** If a secret is committed accidentally, it must be invalidated/revoked immediately at the provider level. Simply deleting the commit line does not mitigate exposure.

---

## 6. Git Workflow, Branching & Code Review

### 6.1 Branching Strategy

- `main`: Production/demo-ready branch. Protected.
- `feature/<description>`: New functional features.
- `fix/<description>`: Bug fixes and performance patches.
- `docs/<description>`: Pure documentation updates.
- `refactor/<description>`: Non-functional internal restructuring.

### 6.2 Commit Messages

Must adhere to Conventional Commits:

```
<type>(<scope>): <short imperative description>

[optional body explaining problem and solution]
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

### 6.3 Pull Request Acceptance Checklist

A PR cannot be merged into `main` without:

- [ ] At least one peer review approval.
- [ ] Passing all automated checks (TypeScript, Ruff, Unit tests, 10 Simulation tests).
- [ ] No merge conflicts with `main`.
- [ ] No secrets or `.env` files committed.
- [ ] Updated API documentation if contracts were modified.

---

## 7. Approval Matrix for Developers & AI Agents

| Activity                                           | Autonomous Action Allowed | Formal Team Sign-off Required |
| :------------------------------------------------- | :-----------------------: | :---------------------------: |
| Routine bug fixes & refactoring                    |            ✅             |               —               |
| Writing unit, contract, & simulation tests         |            ✅             |               —               |
| Writing or clarifying documentation                |            ✅             |               —               |
| Running linters, formatters, and test suites       |            ✅             |               —               |
| Introducing new external dependencies              |            ❌             |          ✅ Required          |
| Modifying shared API contracts or entity schemas   |            ❌             |          ✅ Required          |
| Adding or migrating database systems               |            ❌             |          ✅ Required          |
| Deleting or restructuring core directories         |            ❌             |          ✅ Required          |
| Changing technology stack or major framework       |            ❌             |          ✅ Required          |
| Deploying public endpoints or cloud infrastructure |            ❌             |          ✅ Required          |
