import React from "react";
import type { BuildingData, RoomData } from "../../types/building";
import {
  Box,
  Users,
  Maximize2,
  DoorClosed,
  Route,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

interface SelectedRoomPanelProps {
  building: BuildingData;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export const SelectedRoomPanel: React.FC<SelectedRoomPanelProps> = ({
  building,
  selectedRoomId,
  onSelectRoom,
}) => {
  const floor = building.floors[0];
  const selectedRoom: RoomData | undefined = floor.rooms.find((r) => r.id === selectedRoomId);

  const getNearestExit = (room: RoomData) => {
    // If room is on West side (x < 0), nearest is West Exit; else East Exit
    return room.position.x <= 0 ? "West Emergency Exit" : "East Emergency Exit";
  };

  return (
    <aside className="sidebar-panel">
      {/* 1. Panel Header */}
      <div className="panel-header">
        <div className="panel-title-group">
          <Box className="panel-title-icon" size={18} />
          <h3>SPATIAL INSPECTOR</h3>
        </div>
        <span className="badge-live">INTERACTIVE</span>
      </div>

      {/* 2. Room Directory / Fast Selector */}
      <div className="section-block">
        <label className="section-label">SELECT ROOM (6 CONFIGURED)</label>
        <div className="room-selector-grid">
          {floor.rooms.map((room) => {
            const isSelected = room.id === selectedRoomId;
            return (
              <button
                key={room.id}
                className={`room-chip-btn ${isSelected ? "active" : ""}`}
                onClick={() => onSelectRoom(room.id)}
              >
                <span className="room-chip-id">{room.label}</span>
                <span className="room-chip-cap">{room.capacity}p</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Room Detailed Metadata */}
      {selectedRoom ? (
        <div className="selected-room-card">
          <div className="card-top">
            <div>
              <span className="room-id-tag">{selectedRoom.id}</span>
              <h4 className="room-title">{selectedRoom.label}</h4>
              <p className="room-subtitle">{selectedRoom.subtitle}</p>
            </div>
            <div className="room-type-badge">{selectedRoom.type}</div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">
                <Layers size={13} /> Active Floor
              </span>
              <strong className="detail-val">Floor 01 (Ground)</strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                <Users size={13} /> Safe Capacity
              </span>
              <strong className="detail-val highlight-blue">{selectedRoom.capacity} persons</strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                <Maximize2 size={13} /> Dimensions
              </span>
              <strong className="detail-val">
                {selectedRoom.dimensions.widthMeters}m × {selectedRoom.dimensions.depthMeters}m
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                <Maximize2 size={13} /> Floor Area
              </span>
              <strong className="detail-val">
                {(
                  selectedRoom.dimensions.widthMeters * selectedRoom.dimensions.depthMeters
                ).toFixed(1)}{" "}
                m²
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                <DoorClosed size={13} /> Door Connection
              </span>
              <strong className="detail-val">{selectedRoom.doorIds[0] ?? "None"}</strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                <Route size={13} /> Primary Corridor
              </span>
              <strong className="detail-val">{floor.corridor.id}</strong>
            </div>

            <div className="detail-item full-width">
              <span className="detail-label">
                <CheckCircle2 size={13} className="text-green" /> Egress Alignment
              </span>
              <strong className="detail-val text-green">
                Direct access to {getNearestExit(selectedRoom)}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-selection-box">
          <Box size={32} className="text-muted" />
          <p>
            Click any room in the 3D scene or from the list above to inspect its spatial geometry.
          </p>
        </div>
      )}

      {/* 4. TwinGuard Spatial Engine Status */}
      <div className="readiness-card">
        <div className="readiness-header">
          <Sparkles size={16} className="text-cyan" />
          <strong>TwinGuard Spatial Engine</strong>
        </div>
        <p className="readiness-desc">
          Interactive digital twin with metric geometry, door portals, and exit paths configured for spatial simulation.
        </p>
      </div>

      {/* 5. Simulation Notice */}
      <div className="safety-disclaimer">
        <AlertTriangle size={14} className="disclaimer-icon" />
        <small>
          TwinGuard AI simulation environment. Digital twin model for scenario evaluation.
        </small>
      </div>
    </aside>
  );
};
