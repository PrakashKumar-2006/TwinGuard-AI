---
description: "Core AI Development Governance and Coding Standards for Team Nexus"
globs: ["*"]
alwaysApply: true
---

# Team Nexus AI Development Rules

All AI agents working on this workspace must strictly adhere to the canonical rules established in:

1. [AGENTS.md](file:///c:/Development/Projects/Evacuate%20AI/AGENTS.md) (Root Single Source of Truth)
2. [docs/DEVELOPMENT_RULES.md](file:///c:/Development/Projects/Evacuate%20AI/docs/DEVELOPMENT_RULES.md) (Team Development Constitution)
3. [docs/API_CONTRACTS.md](file:///c:/Development/Projects/Evacuate%20AI/docs/API_CONTRACTS.md) (Data and Schema Contracts)
4. [docs/TESTING.md](file:///c:/Development/Projects/Evacuate%20AI/docs/TESTING.md) (Testing & 10 Mandatory Simulation Scenarios)

### Non-Negotiable Core Rules:

- Working identifier is `campus-emergency-platform`. Never hardcode an unapproved brand name.
- Do NOT implement digital twin or simulation features until the governance setup milestone is reviewed.
- Decouple graph routing, crowd dynamics, and hazard spread models.
- Never fake tests, suppress lint/type errors, or bypass data validation.
- Never commit `.env` or credentials.
