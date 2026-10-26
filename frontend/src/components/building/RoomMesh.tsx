import React from "react";
import { Html } from "@react-three/drei";
import type { RoomData, DoorData } from "../../types/building";

interface RoomMeshProps {
  room: RoomData;
  door?: DoorData;
  isSelected: boolean;
  isHovered: boolean;
  onSelectRoom: (roomId: string) => void;
  onHoverRoom: (roomId: string | null) => void;
}

export const RoomMesh: React.FC<RoomMeshProps> = ({
  room,
  door,
  isSelected,
  isHovered,
  onSelectRoom,
  onHoverRoom,
}) => {
  const { widthMeters, depthMeters } = room.dimensions;
  const wallHeight = 0.65;
  const wallThickness = 0.12;
  const doorWidth = door?.widthMeters ?? 1.0;
  const sideSegmentWidth = (widthMeters - doorWidth) / 2;

  // North rooms face corridor to South (+Z relative); South rooms face corridor to North (-Z relative)
  const isNorthRoom = room.position.z < 0;
  const corridorWallZ = isNorthRoom ? depthMeters / 2 : -depthMeters / 2;
  const exteriorWallZ = isNorthRoom ? -depthMeters / 2 : depthMeters / 2;

  // Material colors
  const floorColor = isSelected ? "#0c4a6e" : isHovered ? "#1e3a5f" : "#142032";
  const floorEmissive = isSelected ? "#0284c7" : isHovered ? "#075985" : "#000000";
  const floorEmissiveIntensity = isSelected ? 0.35 : isHovered ? 0.2 : 0;
  const wallColor = isSelected ? "#7dd3fc" : isHovered ? "#94a3b8" : "#64748b";
  const trimColor = isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#334155";

  return (
    <group
      position={[room.position.x, 0, room.position.z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectRoom(room.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverRoom(room.id);
      }}
      onPointerOut={() => {
        onHoverRoom(null);
      }}
    >
      {/* 1. Walkable Room Floor Surface */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[widthMeters, 0.03, depthMeters]} />
        <meshStandardMaterial
          color={floorColor}
          emissive={floorEmissive}
          emissiveIntensity={floorEmissiveIntensity}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* 2. Room Floor Perimeter Accent Trim */}
      <mesh position={[0, 0.031, exteriorWallZ]}>
        <boxGeometry args={[widthMeters, 0.005, 0.03]} />
        <meshStandardMaterial color={trimColor} />
      </mesh>
      <mesh position={[-widthMeters / 2, 0.031, 0]}>
        <boxGeometry args={[0.03, 0.005, depthMeters]} />
        <meshStandardMaterial color={trimColor} />
      </mesh>
      <mesh position={[widthMeters / 2, 0.031, 0]}>
        <boxGeometry args={[0.03, 0.005, depthMeters]} />
        <meshStandardMaterial color={trimColor} />
      </mesh>

      {/* 3. Exterior Low Wall */}
      <mesh position={[0, wallHeight / 2, exteriorWallZ]} castShadow receiveShadow>
        <boxGeometry args={[widthMeters, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* 4. Left Dividing Low Wall (West) */}
      <mesh position={[-widthMeters / 2, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, depthMeters]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* 5. Right Dividing Low Wall (East) */}
      <mesh position={[widthMeters / 2, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, depthMeters]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* 6. Corridor-Facing Low Wall With Door Opening */}
      {/* Left Wall Segment */}
      <mesh
        position={[-(widthMeters + doorWidth) / 4, wallHeight / 2, corridorWallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[sideSegmentWidth, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* Right Wall Segment */}
      <mesh
        position={[(widthMeters + doorWidth) / 4, wallHeight / 2, corridorWallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[sideSegmentWidth, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* 7. Centered Readable Room Label Marker */}
      <Html position={[0, 0.22, 0]} center distanceFactor={14}>
        <div
          className={`room-label-tag ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
        >
          <div className="room-label-title">{room.label}</div>
          <div className="room-label-capacity">Cap: {room.capacity}</div>
        </div>
      </Html>
    </group>
  );
};
