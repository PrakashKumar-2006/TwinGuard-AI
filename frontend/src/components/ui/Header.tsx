import React from "react";
import { Shield } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-badge-icon">
          <Shield size={20} />
        </div>
        <div>
          <div className="brand-title">
            TWINGUARD <span className="brand-tag">AI</span>
          </div>
          <div className="brand-subtitle">DIGITAL TWIN & EMERGENCY SIMULATION</div>
        </div>
      </div>

      <div className="header-meta">
        <span className="meta-version">v0.1.0</span>
      </div>
    </header>
  );
};
