import React from "react";
import type { BuildingData } from "../../types/building";
import { Building2, DoorOpen, Users, Compass, Layers } from "lucide-react";

interface BuildingSummaryBarProps {
  building: BuildingData;
  activeFloorLevel: number;
}

export const BuildingSummaryBar: React.FC<BuildingSummaryBarProps> = ({
  building,
  activeFloorLevel,
}) => {
  const floor =
    building.floors.find((f) => f.floorLevel === activeFloorLevel) ?? building.floors[0];
  const totalCapacity = floor.rooms.reduce((acc, r) => acc + r.capacity, 0);

  return (
    <section className="summary-bar">
      <div className="building-identity">
        <Building2 size={20} className="icon-building" />
        <div>
          <h2>{building.name}</h2>
          <p>{building.facilityType || building.campus || "Multi-Zone Spatial Environment"}</p>
        </div>
      </div>

      <div className="floor-tabs">
        <button className="floor-tab active">
          <Layers size={14} />
          <span>Floor 01 (Ground Level)</span>
        </button>
      </div>

      <div className="quick-metrics">
        <div className="metric-chip">
          <span className="metric-label">Rooms</span>
          <strong className="metric-value">{floor.rooms.length}</strong>
        </div>

        <div className="metric-chip">
          <span className="metric-label">Corridors</span>
          <strong className="metric-value">1 Central</strong>
        </div>

        <div className="metric-chip">
          <DoorOpen size={14} className="metric-icon green" />
          <span className="metric-label">Exits</span>
          <strong className="metric-value green">{floor.exits.length} Available</strong>
        </div>

        <div className="metric-chip">
          <Users size={14} className="metric-icon blue" />
          <span className="metric-label">Total Capacity</span>
          <strong className="metric-value blue">{totalCapacity} persons</strong>
        </div>

        <div className="metric-chip">
          <Compass size={14} className="metric-icon" />
          <span className="metric-label">Footprint</span>
          <strong className="metric-value">
            {building.dimensions.widthMeters}m × {building.dimensions.depthMeters}m
          </strong>
        </div>
      </div>
    </section>
  );
};
