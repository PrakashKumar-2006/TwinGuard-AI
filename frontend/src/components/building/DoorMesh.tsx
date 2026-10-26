import React from "react";
import type { DoorData } from "../../types/building";

interface DoorMeshProps {
  door: DoorData;
  isSelectedRoomDoor: boolean;
}

export const DoorMesh: React.FC<DoorMeshProps> = ({ door, isSelectedRoomDoor }) => {
  const { position, widthMeters } = door;
  const jambWidth = 0.08;
  const wallHeight = 0.65;
  const wallThickness = 0.12;

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Door Threshold Floor Plate */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[widthMeters, 0.008, 0.24]} />
        <meshStandardMaterial
          color={isSelectedRoomDoor ? "#0284c7" : "#3b82f6"}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Left Door Jamb Pillar */}
      <mesh position={[-widthMeters / 2 - jambWidth / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[jambWidth, wallHeight, wallThickness]} />
        <meshStandardMaterial color={isSelectedRoomDoor ? "#38bdf8" : "#64748b"} roughness={0.5} />
      </mesh>

      {/* Right Door Jamb Pillar */}
      <mesh position={[widthMeters / 2 + jambWidth / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[jambWidth, wallHeight, wallThickness]} />
        <meshStandardMaterial color={isSelectedRoomDoor ? "#38bdf8" : "#64748b"} roughness={0.5} />
      </mesh>
    </group>
  );
};
