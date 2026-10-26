# Shared API Contracts & Data Specifications

**Project Working Identifier:** `campus-emergency-platform`  
**Document:** `docs/API_CONTRACTS.md`  
**Status:** PROPOSED CONTRACTS (Requires Frontend/Backend Team Review)  
**Revision:** 1.0 (Governance Foundation)

---

## 1. Contract Change Protocol

Before modifying any existing API endpoint, data model, or shared type definition:

1. Propose the schema modification in an Architecture Decision Record (ADR) or GitHub PR.
2. Verify impact across consumers:
   - Frontend components (`frontend/src/types/`).
   - Backend validation models (`backend/app/schemas/`).
   - Simulation engine graph builders (`simulation/routing/`).
3. Maintain backward compatibility where feasible, or version the endpoint under `/api/v1/`.
4. Update this document and obtain approval before merging code changes.

---

## 2. Standard Units & Coordinate Reference System

To ensure mathematical precision across 2D rendering, 3D digital twins, and simulation calculations:

| Metric                     | Standard Unit                          | Serialization Type | Notes                                                                 |
| :------------------------- | :------------------------------------- | :----------------- | :-------------------------------------------------------------------- |
| **Distance / Coordinates** | Meters ($m$)                           | `float`            | Real-world metric scaling.                                            |
| **Walking Speed**          | Meters / second ($m/s$)                | `float`            | Standard unimpeded adult walking speed: $1.2\text{--}1.4\text{ m/s}$. |
| **Simulation Time**        | Seconds ($s$)                          | `float` or `int`   | Discrete step intervals typically $0.5\text{ s}$ or $1.0\text{ s}$.   |
| **Capacity**               | Persons                                | `int`              | Maximum safe room or corridor count.                                  |
| **Hazard Intensity**       | Normalized scale ($0.0\text{ to }1.0$) | `float`            | $0.0 = \text{clear}$, $1.0 = \text{lethal/blocked}$.                  |

### Coordinate Standard

- **2D Floor Plan:**
  - Origin $(0, 0)$ located at the South-West (bottom-left) corner of the building boundary.
  - $X$: positive East (rightwards).
  - $Y$: positive North (upwards).
- **3D Digital Twin:**
  - Origin $(0, 0, 0)$ aligns with ground floor $(X=0, Y=0, Z=0)$.
  - $X$: East, $Y$: North, $Z$: Elevation above ground in meters.
  - Floor height standard: Default $3.5\text{ m}$ per floor level unless specified in building metadata.

---

## 3. Standard API Error Format

All API errors must return the standard envelope with HTTP status codes matching RFC 9110:

```json
{
  "error": "ResourceNotFoundError",
  "code": "ROOM_NOT_FOUND",
  "message": "The requested room identifier 'rm-404' does not exist in building 'bld-science-01'.",
  "details": {
    "buildingId": "bld-science-01",
    "roomId": "rm-404"
  },
  "timestamp": "2026-10-26T10:00:00Z"
}
```

---

## 4. Core Domain Entity Schemas (Proposed)

All entities use stable, slug-prefixed identifiers (e.g., `bld-*`, `flr-*`, `rm-*`). Display labels (e.g., "Lecture Hall B") must **never** be used as primary identifiers.

### 4.1 Building (`Building`)

```typescript
interface Building {
  id: string; // e.g. "bld-science-01"
  name: string; // e.g. "Science & Engineering Complex"
  campus: string; // e.g. "Main Campus"
  dimensions: {
    widthMeters: number; // Along X axis
    lengthMeters: number; // Along Y axis
    totalFloors: number;
  };
  floors: Floor[];
  assemblyPoints: AssemblyPoint[];
}
```

### 4.2 Floor (`Floor`)

```typescript
interface Floor {
  id: string; // e.g. "flr-science-01-f01"
  buildingId: string;
  floorLevel: number; // 0 = Ground Floor, 1 = First Floor, -1 = Basement
  elevationMeters: number; // Z-axis offset (e.g. 0.0, 3.5, 7.0)
  rooms: Room[];
  corridors: Corridor[];
  stairs: Staircase[];
  exits: Exit[];
}
```

### 4.3 Room (`Room`)

```typescript
interface Room {
  id: string; // e.g. "rm-science-101"
  floorId: string;
  label: string; // "Lecture Hall 101"
  polygon2D: Array<[number, number]>; // Boundary vertices in meters [[x, y], ...]
  doorIds: string[]; // References to connecting doors/corridors
  capacity: number; // Max safe occupancy
  currentOccupancy: number; // Current simulated occupants
  type: "classroom" | "lab" | "office" | "auditorium" | "utility";
}
```

### 4.4 Corridor (`Corridor`) & Staircase (`Staircase`)

```typescript
interface Corridor {
  id: string; // e.g. "cor-science-101-main"
  floorId: string;
  waypoints: Array<[number, number]>; // Centerline path in meters
  widthMeters: number; // Width for capacity/flow calculations
  isBlocked: boolean; // True if blocked by hazard
}

interface Staircase {
  id: string; // e.g. "str-science-north"
  buildingId: string;
  connectsFloorIds: string[]; // Ordered floor IDs connected by stair
  capacityPerMinute: number; // Maximum evacuation throughput
  isBlocked: boolean;
}
```

### 4.5 Exit (`Exit`) & Assembly Point (`AssemblyPoint`)

```typescript
interface Exit {
  id: string; // e.g. "exit-science-north-ground"
  floorId: string;
  label: string; // "North Perimeter Exit"
  location: [number, number]; // [x, y] coordinates in meters
  dischargeCapacityPerMin: number;
  isAvailable: boolean; // False if blocked or unsafe
  connectsToAssemblyPointId?: string;
}

interface AssemblyPoint {
  id: string; // e.g. "ap-science-quad"
  name: string; // "East Quad Lawn"
  location: [number, number]; // Exterior campus coordinates [x, y]
  safeCapacity: number;
}
```

### 4.6 Hazard Zone (`HazardZone`)

```typescript
interface HazardZone {
  id: string; // e.g. "hz-chem-lab-fire"
  type: "fire" | "smoke" | "debris" | "structural_damage";
  floorId: string;
  origin: [number, number]; // [x, y] location in meters
  radiusMeters: number; // Current propagation radius
  spreadRateMps: number; // Expansion speed in meters/second
  intensity: number; // 0.0 to 1.0
  startedAtSeconds: number;
}
```

### 4.7 Simulation Run & Results (`SimulationRun`, `RouteResult`)

```typescript
interface SimulationRunRequest {
  scenarioId: string;
  buildingId: string;
  randomSeed?: number; // For deterministic reproducibility
  hazardZones: HazardZone[];
  initialOccupancyOverride?: Record<string, number>; // roomId -> count
}

interface RouteResult {
  roomId: string;
  isReachable: boolean;
  assignedExitId: string | null;
  pathWaypoints: Array<[number, number, number]>; // [x, y, z] in meters
  estimatedTravelTimeSeconds: number;
  congestionDelaySeconds: number;
  hazardRiskScore: number; // 0.0 (safe) to 1.0 (critical danger)
}

interface SimulationMetrics {
  totalOccupants: number;
  evacuatedOccupants: number;
  trappedOccupants: number;
  totalEvacuationTimeSeconds: number;
  peakCongestionBottlenecks: Array<{
    corridorOrDoorId: string;
    maxQueueLength: number;
    delaySeconds: number;
  }>;
}
```

---

## 5. Proposed REST Endpoints Overview

| Method | Endpoint                            | Description                                      | Status   |
| :----- | :---------------------------------- | :----------------------------------------------- | :------- |
| `GET`  | `/api/v1/health`                    | Service health check                             | Proposed |
| `GET`  | `/api/v1/buildings`                 | List available building models                   | Proposed |
| `GET`  | `/api/v1/buildings/{id}`            | Get building floor plan, geometry, exits         | Proposed |
| `POST` | `/api/v1/scenarios`                 | Create or validate emergency scenario            | Proposed |
| `POST` | `/api/v1/simulations/run`           | Execute simulation and return full route metrics | Proposed |
| `GET`  | `/api/v1/simulations/{id}/playback` | Fetch time-series playback frames                | Proposed |

> [!WARNING]
> Endpoints listed above represent the target API design. They must be implemented and tested before frontend integration begins. No frontend component may assume an endpoint is live without a passing integration test in `tests/api/`.
