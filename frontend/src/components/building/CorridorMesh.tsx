import React from "react";
import type { CorridorData } from "../../types/building";

interface CorridorMeshProps {
  corridor: CorridorData;
}

export const CorridorMesh: React.FC<CorridorMeshProps> = ({ corridor }) => {
  const { dimensions, position } = corridor;

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Central Corridor Floor Surface */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[dimensions.widthMeters, 0.02, dimensions.depthMeters]} />
        <meshStandardMaterial color="#1e293b" roughness={0.65} metalness={0.2} />
      </mesh>

      {/* Corridor Floor Edge Borders */}
      <mesh position={[0, 0.022, -dimensions.depthMeters / 2]}>
        <boxGeometry args={[dimensions.widthMeters, 0.005, 0.04]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.022, dimensions.depthMeters / 2]}>
        <boxGeometry args={[dimensions.widthMeters, 0.005, 0.04]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Central Egress Path Line (Dashed visual indicator connecting West & East Exits) */}
      {[-4.5, -3.0, -1.5, 0, 1.5, 3.0, 4.5].map((xOffset) => (
        <mesh key={xOffset} position={[xOffset, 0.023, 0]}>
          <boxGeometry args={[0.8, 0.002, 0.08]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};
