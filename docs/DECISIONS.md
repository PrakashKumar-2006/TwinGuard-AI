# Architecture Decision Records (ADR)

**Project Working Identifier:** `campus-emergency-platform`  
**Document:** `docs/DECISIONS.md`  
**Status:** Active Decision Log  
**Team:** Team Nexus

This log tracks all architectural decisions, foundational choices, and design trade-offs made during the lifecycle of the project.

---

## Decision Record Index

| ID           | Title                                                              | Date       | Status       |
| :----------- | :----------------------------------------------------------------- | :--------- | :----------- |
| **ADR-0001** | Use Neutral Working Identifier (`campus-emergency-platform`)       | 2026-10-26 | **Approved** |
| **ADR-0002** | Adopt Modular Monolith Repository Structure                        | 2026-10-26 | **Proposed** |
| **ADR-0003** | Core Technology Stack (React+TS, FastAPI, NetworkX)                | 2026-10-26 | **Proposed** |
| **ADR-0004** | Defer Persistent Database; Use Validated JSON Building Models      | 2026-10-26 | **Proposed** |
| **ADR-0005** | Decouple Graph Route Engine from Crowd Simulation & Hazard Physics | 2026-10-26 | **Approved** |

---

## ADR-0001: Use Neutral Working Identifier (`campus-emergency-platform`)

- **Date:** 2026-10-26
- **Status:** **Approved** (Mandatory Governance Rule)
- **Context:** The final project brand name has not been finalized by Team Nexus. Developers or AI agents could inadvertently hardcode provisional names into package manifests, domain paths, or documentation.
- **Options Considered:**
  1. Pick a temporary brand name like `EvacuateAI` or `SafeCampus`.
  2. Use a generic, neutral technical identifier `campus-emergency-platform`.
- **Selected Approach:** Option 2. Use `campus-emergency-platform` everywhere a technical or project identifier is required.
- **Consequences:** Avoids painful renaming refactors across documentation, package manifests, and imports when the permanent name is officially announced.

---

## ADR-0002: Adopt Modular Monolith Repository Structure

- **Date:** 2026-10-26
- **Status:** **Proposed** (Pending Final Team Review)
- **Context:** The project requires coordinated development across 2D/3D visualization (`frontend/`), an API layer (`backend/`), and simulation calculation engines (`simulation/`).
- **Options Considered:**
  1. Multi-repo (separate git repos for frontend, backend, simulation).
  2. Microservices with container orchestration (Docker Compose / Kubernetes).
  3. Modular Monolith in a single monorepo with strict package boundaries.
- **Selected Approach:** Option 3 (Modular Monolith).
- **Reasoning & Trade-offs:** Microservices introduce excessive network, serialization, and deployment overhead for a prototype team. A single repository allows shared type synchronisation, atomic end-to-end testing, and unified CI/CD while preserving independent module execution.
- **Consequences:** If individual services require independent scaling in production, boundaries are already cleanly decoupled to allow extraction into microservices later.

---

## ADR-0003: Core Technology Stack

- **Date:** 2026-10-26
- **Status:** **Proposed** (Pending Final Team Review)
- **Context:** The system needs real-time 2D/3D browser rendering, rapid mathematical graph optimization, and strict API data validation.
- **Options Considered:**
  - _Frontend:_ React + Vite + Three.js vs Vue vs Angular vs Pure WebGL.
  - _Backend:_ Python FastAPI vs Node.js Express/NestJS vs Go.
  - _Graph Routing:_ Python NetworkX vs Rust custom graph engine vs C++ Boost.Graph.
- **Selected Approach:**
  - Frontend: React 18/19, TypeScript (strict), Vite, Three.js / React Three Fiber.
  - Backend: Python 3.14+, FastAPI, Pydantic v2.
  - Graph Engine: Python NetworkX.
- **Reasoning & Trade-offs:** React + Three.js provides the premier ecosystem for 2D/3D browser twins. FastAPI offers native Pydantic v2 validation and async support. NetworkX provides mathematically robust graph algorithms (Dijkstra, A*, Yen's k-shortest paths) with transparent edge weight manipulation.
- **Consequences:** High developer velocity; strong typing across both frontend and backend.

---

## ADR-0004: Defer Persistent Database; Use Validated JSON Building Models

- **Date:** 2026-10-26
- **Status:** **Proposed** (Pending Final Team Review)
- **Context:** Prototype evacuation testing requires building floor plans, room geometries, and egress graphs. Introducing PostgreSQL or cloud databases early requires connection pooling, local DB services, and migration management.
- **Options Considered:**
  1. Require PostgreSQL with PostGIS from Day 1.
  2. Use SQLite for local development.
  3. Use schema-validated JSON files for building models during Phase 1 prototype, deferring PostgreSQL/Supabase to Phase 2.
- **Selected Approach:** Option 3.
- **Reasoning & Trade-offs:** Eliminates prerequisite setup blockers for teammates. Building floor plans are static structures that easily serialize to validated JSON matching Pydantic schemas.
- **Trigger for Migration:** Introduce PostgreSQL when multi-tenant user authentication, historical run telemetry (>1,000 runs), or live IoT sensor logging is required.

---

## ADR-0005: Decouple Graph Route Engine from Crowd Simulation & Hazard Physics

- **Date:** 2026-10-26
- **Status:** **Approved** (Mandatory Governance Rule)
- **Context:** Evacuation simulations risk confusing geometric shortest paths with realistic crowd evacuation times and fire hazards.
- **Options Considered:**
  1. Single monolithic calculation function doing routing, crowd delay, and fire spread.
  2. Three decoupled modules: (a) Graph Route Engine, (b) Crowd Congestion Engine, (c) Hazard Propagation Model.
- **Selected Approach:** Option 2.
- **Reasoning & Trade-offs:** Prevents deceptive claims. Graph shortest path answers: _"Is there an unobstructed physical path from Room A to Exit B?"_ Crowd simulation answers: _"How long does it take $N$ people to traverse corridor $C$ given doorway bottleneck $D$?"_ Hazard model answers: _"At what timestamp $t$ does corridor $C$ become impassable due to smoke density?"_
- **Consequences:** Code is independently testable, mathematically explainable, and compliant with academic rigor.

---

## ADR Template for Future Decisions

To record a new architectural decision, copy the template below into this file:

```markdown
## ADR-XXXX: [Short Title of Decision]

- **Date:** YYYY-MM-DD
- **Status:** [Proposed | Approved | Rejected | Superseded by ADR-YYYY]
- **Context & Problem Statement:** [Describe the problem, context, and forces influencing the decision]
- **Options Considered:**
  1. [Option 1]
  2. [Option 2]
  3. [Option 3]
- **Selected Approach:** [Option X: Title and summary]
- **Reasoning & Trade-offs:** [Why this option won; what pros and cons were accepted]
- **Approval Status:** [Author and team reviewers]
- **Consequences & Migration Considerations:** [Positive and negative consequences; changes required]
```
