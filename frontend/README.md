# Emergency Scenario Lab — Prototype v0.1.0

React + TypeScript + Vite starter for Team Nexus's Emergency Scenario Lab.

## Included
- Interactive 3D cutaway demo building using Three.js / React Three Fiber.
- Six selectable rooms and two illustrative exits.
- Initial configuration: 50 occupants, balanced distribution, fire at Room 101, no obstruction, playback speed 1×.
- Controls for occupant count, distribution, emergency, event location, obstruction, playback speed, and reset.
- Scenario inspector and clearly labelled prototype limitations.

## Important limitation
This is **not a working evacuation simulation**. Occupants are static 3D markers. There is no route calculation, animated evacuation, fire propagation, earthquake damage model, clearance-time estimate, or validated safety prediction. The validate button only validates the current UI setup.

## Run locally
Requires Node.js 20+ recommended.

```bash
npm install
npm run dev
```

To build: `npm run build`

## Structure
- `src/model.ts` — typed building and scenario data model
- `src/BuildingScene.tsx` — 3D building and static visual markers
- `src/App.tsx` — interactive configuration UI
- `src/styles.css` — responsive dark dashboard styling

## Suggested next milestones
1. Define a proper building geometry and walkability graph.
2. Add agent state and simulation clock.
3. Implement route planning and animated movement.
4. Add congestion, hazard constraints, and transparent metrics.
5. Validate models before any real-world safety use.
