import React from "react";

interface GroundSlabProps {
  width: number;
  depth: number;
}

export const GroundSlab: React.FC<GroundSlabProps> = ({ width, depth }) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Exterior Campus Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, 0]} receiveShadow>
        <planeGeometry args={[28, 20]} />
        <meshStandardMaterial color="#090d16" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Subtle Ground Grid Coordinate Helper */}
      <gridHelper args={[28, 28, "#1e293b", "#111827"]} position={[0, -0.15, 0]} />

      {/* Building Base Foundation Slab */}
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <boxGeometry args={[width + 0.6, 0.14, depth + 0.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Building Perimeter Bevel / Ground Trim */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[width + 0.2, 0.02, depth + 0.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
    </group>
  );
};
