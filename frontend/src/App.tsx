import { useState } from "react";
import { Header } from "./components/ui/Header";
import { BuildingSummaryBar } from "./components/ui/BuildingSummaryBar";
import { BuildingCanvas } from "./components/building/BuildingCanvas";
import { SelectedRoomPanel } from "./components/ui/SelectedRoomPanel";
import { DEMO_BUILDING } from "./data/demoBuilding";

export default function App() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("rm-101");

  return (
    <div className="app-container">
      {/* 1. Platform Global Header */}
      <Header />

      {/* 2. Building Model & Floor Summary Bar */}
      <BuildingSummaryBar building={DEMO_BUILDING} activeFloorLevel={1} />

      {/* 3. Main Workspace: 3D Visualization + Spatial Inspector Panel */}
      <main className="workspace-layout">
        <section className="viewport-section">
          <BuildingCanvas
            building={DEMO_BUILDING}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />
        </section>

        <section className="sidebar-section">
          <SelectedRoomPanel
            building={DEMO_BUILDING}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />
        </section>
      </main>

      {/* 4. Platform Status Footer */}
      <footer className="app-footer">
        <div>
          <span>TWINGUARD AI</span>
          <span className="dot">•</span>
          <span>DIGITAL TWIN & EMERGENCY SIMULATION PLATFORM</span>
        </div>
        <div className="footer-right">
          <span>Coordinate Reference: Metric (1 unit = 1 meter)</span>
        </div>
      </footer>
    </div>
  );
}
