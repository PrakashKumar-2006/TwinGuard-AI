/**
 * Building and Spatial Data Types
 * Aligned with docs/API_CONTRACTS.md standard
 *
 * Coordinate Convention (Three.js standard):
 * - X: East-West axis (meters). Positive = East (Right).
 * - Y: Vertical elevation above floor level (meters). Positive = Up.
 * - Z: North-South axis (meters). Positive = South (Forward/Down in isometric plan).
 */

export type RoomType = "classroom" | "lab" | "office" | "auditorium" | "seminar" | "utility";

export interface Dimensions2D {
  widthMeters: number; // Dimension along X axis
  depthMeters: number; // Dimension along Z axis
}

export interface Dimensions3D extends Dimensions2D {
  heightMeters: number; // Dimension along Y axis
}

export interface Position2D {
  x: number;
  z: number;
}

export interface Position3D extends Position2D {
  y: number;
}

export interface DoorData {
  id: string; // e.g. "door-101"
  roomId: string; // Reference to connected Room ID
  corridorId: string; // Reference to connected Corridor ID
  position: Position2D; // Center coordinates on the floor plane
  widthMeters: number; // Standard doorway clear width (e.g. 1.0m)
  wallFacing: "north" | "south" | "east" | "west"; // Which room wall the door is located on
}

export interface ExitData {
  id: string; // e.g. "exit-west-01"
  floorId: string;
  label: string; // "West Emergency Exit"
  position: Position2D; // Center coordinates of the exit portal
  widthMeters: number;
  depthMeters: number;
  direction: "west" | "east" | "north" | "south";
  isAvailable: boolean; // False if blocked or unsafe
  connectsToAssemblyPoint?: string; // e.g. "ap-west-courtyard"
}

export interface RoomData {
  id: string; // Stable identifier, e.g. "rm-101"
  floorId: string; // Reference to Floor ID
  label: string; // Display name, e.g. "Room 101"
  subtitle: string; // e.g. "Computer Systems Lab"
  type: RoomType;
  position: Position2D; // Center [x, z] coordinates in meters
  dimensions: Dimensions2D; // Width (X) and Depth (Z) in meters
  capacity: number; // Demonstration safe occupant capacity
  doorIds: string[]; // Explicit array of connected door IDs
}

export interface CorridorData {
  id: string; // e.g. "cor-100-main"
  floorId: string;
  label: string; // e.g. "Central Egress Corridor"
  position: Position2D; // Center [x, z] coordinates in meters
  dimensions: Dimensions2D; // Width (X) and Depth (Z) in meters
  connectedRoomIds: string[]; // All rooms accessible via this corridor
  connectedExitIds: string[]; // All exits accessible via this corridor
}

export interface FloorData {
  id: string; // e.g. "flr-01"
  buildingId: string;
  floorLevel: number; // 1 for Ground Floor
  label: string; // "Floor 01 (Ground Level)"
  elevationMeters: number; // 0.0 for ground floor
  rooms: RoomData[];
  corridor: CorridorData;
  doors: DoorData[];
  exits: ExitData[];
}

export interface BuildingData {
  id: string; // e.g. "bld-twinguard-01"
  name: string; // e.g. "Facility Digital Twin Alpha"
  facilityType?: string; // e.g. "Commercial / Industrial / Enterprise"
  campus?: string; // Optional legacy or campus descriptor
  dimensions: {
    widthMeters: number; // Total building footprint along X
    depthMeters: number; // Total building footprint along Z
    totalFloors: number;
  };
  floors: FloorData[];
}
