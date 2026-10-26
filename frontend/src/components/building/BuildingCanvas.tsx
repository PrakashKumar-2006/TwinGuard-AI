import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { BuildingData } from "../../types/building";
import { BuildingModel } from "./BuildingModel";
import { RotateCcw } from "lucide-react";

interface BuildingCanvasProps {
  building: BuildingData;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export const BuildingCanvas: React.FC<BuildingCanvasProps> = ({
  building,
  selectedRoomId,
  onSelectRoom,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      // Ensure target is centered
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(12, 14, 14);
      controlsRef.current.update();
    }
  };

  return (
    <div className="canvas-wrapper">
      <Canvas
        shadows
        camera={{ position: [12, 14, 14], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Background styling for dark digital twin */}
        <color attach="background" args={["#0a0f1d"]} />

        {/* Studio Architectural 3-Point Lighting */}
        <ambientLight intensity={1.3} />
        <directionalLight
          position={[10, 16, 12]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-10, 8, -8]} intensity={0.8} color="#94a3b8" />

        {/* 3D Building Architectural Model */}
        <BuildingModel
          building={building}
          selectedRoomId={selectedRoomId}
          onSelectRoom={onSelectRoom}
        />

        {/* Orbit, Rotation, and Zoom Controls with Boundaries */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          minDistance={7}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.15}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>

      {/* Floating Canvas Quick Controls & Reset View */}
      <div className="canvas-overlay-controls">
        <button
          className="btn-reset-view"
          onClick={handleResetCamera}
          title="Reset to default isometric camera view"
        >
          <RotateCcw size={14} />
          <span>Reset View</span>
        </button>
      </div>

      <div className="canvas-interaction-hint">
        <span>Left-click + drag to Orbit</span>
        <span className="dot">•</span>
        <span>Right-click + drag to Pan</span>
        <span className="dot">•</span>
        <span>Scroll to Zoom</span>
        <span className="dot">•</span>
        <span>Click Room to Inspect</span>
      </div>
    </div>
  );
};
