import React, { useState } from "react";
import type { BuildingData } from "../../types/building";
import { GroundSlab } from "./GroundSlab";
import { CorridorMesh } from "./CorridorMesh";
import { RoomMesh } from "./RoomMesh";
import { DoorMesh } from "./DoorMesh";
import { ExitMesh } from "./ExitMesh";

interface BuildingModelProps {
  building: BuildingData;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export const BuildingModel: React.FC<BuildingModelProps> = ({
  building,
  selectedRoomId,
  onSelectRoom,
}) => {
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  // We are visualizing Floor 1 for this phase
  const floor = building.floors[0];
  const { dimensions } = building;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Architectural Foundation and Ground Surface */}
      <GroundSlab width={dimensions.widthMeters} depth={dimensions.depthMeters} />

      {/* 2. Shared Central Egress Corridor */}
      <CorridorMesh corridor={floor.corridor} />

      {/* 3. Six Identifiable Rooms with Low-Wall Cutaways and Door Openings */}
      {floor.rooms.map((room) => {
        const door = floor.doors.find((d) => room.doorIds.includes(d.id));
        return (
          <RoomMesh
            key={room.id}
            room={room}
            door={door}
            isSelected={selectedRoomId === room.id}
            isHovered={hoveredRoomId === room.id}
            onSelectRoom={onSelectRoom}
            onHoverRoom={setHoveredRoomId}
          />
        );
      })}

      {/* 4. Physical Door Opening Thresholds & Jambs */}
      {floor.doors.map((door) => {
        const isSelectedRoomDoor =
          selectedRoomId !== null &&
          floor.rooms.find((r) => r.id === selectedRoomId)?.doorIds.includes(door.id) === true;

        return <DoorMesh key={door.id} door={door} isSelectedRoomDoor={isSelectedRoomDoor} />;
      })}

      {/* 5. Clearly Identifiable West and East Emergency Exits */}
      {floor.exits.map((exit) => (
        <ExitMesh key={exit.id} exit={exit} />
      ))}
    </group>
  );
};
