import React from "react";
import { Html } from "@react-three/drei";
import type { ExitData } from "../../types/building";

interface ExitMeshProps {
  exit: ExitData;
}

export const ExitMesh: React.FC<ExitMeshProps> = ({ exit }) => {
  const { position, widthMeters, depthMeters, label, isAvailable } = exit;
  const portalHeight = 0.75;
  const columnWidth = 0.12;

  return (
    <group position={[position.x, 0, position.z]}>
      {/* Safety Exit Discharge Floor Plate */}
      <mesh position={[0, 0.022, 0]} receiveShadow>
        <boxGeometry args={[widthMeters, 0.015, depthMeters]} />
        <meshStandardMaterial
          color={isAvailable ? "#059669" : "#dc2626"}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Exterior Step Landing */}
      <mesh
        position={[
          exit.direction === "west" ? -widthMeters / 2 - 0.2 : widthMeters / 2 + 0.2,
          -0.04,
          0,
        ]}
      >
        <boxGeometry args={[0.5, 0.08, depthMeters]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      {/* Exit Portal Side Columns */}
      <mesh position={[0, portalHeight / 2, -depthMeters / 2 + columnWidth / 2]}>
        <boxGeometry args={[columnWidth, portalHeight, columnWidth]} />
        <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, portalHeight / 2, depthMeters / 2 - columnWidth / 2]}>
        <boxGeometry args={[columnWidth, portalHeight, columnWidth]} />
        <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Exit Header Beam */}
      <mesh position={[0, portalHeight + 0.04, 0]}>
        <boxGeometry args={[columnWidth * 1.2, 0.08, depthMeters]} />
        <meshStandardMaterial color="#065f46" roughness={0.3} />
      </mesh>

      {/* Floating 3D Exit Marker Label */}
      <Html position={[0, portalHeight + 0.25, 0]} center distanceFactor={16}>
        <div className={`exit-badge ${isAvailable ? "available" : "blocked"}`}>
          <span className="exit-icon">🚪</span>
          <span className="exit-text">{label}</span>
        </div>
      </Html>
    </group>
  );
};
