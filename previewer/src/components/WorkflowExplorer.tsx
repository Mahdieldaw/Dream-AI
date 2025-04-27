// c:\Users\Mahdi\Dream AI\previewer\src\components\WorkflowExplorer.tsx
import React, { useState } from "react";
import StageBox from "./StageBox"; // Assuming './StageBox' exists relative to this file
import StagePreviewOverlay from "./StagePreviewOverlay"; // Assuming './StagePreviewOverlay' exists
import StageDetailView from "./StageDetailView"; // Assuming './StageDetailView' exists
import { WorkflowExplorerProvider, useWorkflowExplorer } from "./WorkflowExplorerContext"; // Assuming './WorkflowExplorerContext' exists

// --- Existing WorkflowExplorerShell component ---
function WorkflowExplorerShell() {
  const {
    stages,
    currentStageId,
    overviewMode,
    // setCurrentStageId, // Removed: Not directly used; handled by onStageSelect from context
    onStageSelect,
    restorePromptFromSnapshot,
    toggleOverviewMode
  } = useWorkflowExplorer();

  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);
  // Removed unused setPreviewPosition state setter
  const [previewPosition] = useState<{ x: number; y: number }>({ x: 200, y: 120 }); // Example position
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);

  // Dummy handlers for dropdown actions
  const handleRestore = (stageId: string) => restorePromptFromSnapshot(stageId, "snap-1");
  const handleInject = (stageId: string) => restorePromptFromSnapshot(stageId, "snap-1"); // Assuming inject uses same mechanism for demo
  const handleCompare = (stageId: string) => alert("Compare history for " + stageId);

  // Dropdown menu
  const renderDropdown = (stageId: string) => (
    showDropdownId === stageId && (
      <div style={{ position: "absolute", top: 38, right: 8, background: "#fff", border: "1px solid #eee", borderRadius: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 10 }}>
        {/* Use the dropdownBtnStyle object directly */}
        <button style={dropdownBtnStyle} onClick={() => handleRestore(stageId)}>Restore</button>
        <button style={dropdownBtnStyle} onClick={() => handleInject(stageId)}>Inject</button>
        <button style={dropdownBtnStyle} onClick={() => handleCompare(stageId)}>Compare History</button>
      </div>
    )
  );

  // Overview Mode: horizontal rail of stage boxes
  if (overviewMode) {
    return (
      <div style={{ padding: 32, fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Workflow Explorer</h1>
        <p style={{ color: "#555", marginBottom: 32 }}>
          Navigate, inspect, and interact with your staged AI workflows.
        </p>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <button onClick={toggleOverviewMode} style={{ background: "#1890ff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 18px", fontWeight: 600, cursor: "pointer", marginRight: 16 }}>
            Toggle Detail Mode
          </button>
          {/* Add other overview controls here if needed */}
        </div>
        <div style={{ display: "flex", overflowX: "auto", paddingBottom: 12 }}>
          {stages.map((stage) => (
            <div key={stage.id} style={{ position: "relative" }}>
              <StageBox
                stage={stage}
                selected={currentStageId === stage.id}
                onClick={() => { onStageSelect(stage.id); }}
                onHover={(hovered) => {
                  setHoveredStageId(hovered ? stage.id : null);
                  // Update preview position based on hover if needed (setPreviewPosition would be used here if kept)
                }}
                onEllipsis={(e) => {
                  e.preventDefault(); // Prevent context menu if needed
                  e.stopPropagation(); // Prevent triggering onClick
                  setShowDropdownId(showDropdownId === stage.id ? null : stage.id);
                }}
              />
              {renderDropdown(stage.id)}
              {hoveredStageId === stage.id && (
                <StagePreviewOverlay
                  stage={{ // Pass necessary data for preview
                    id: stage.id,
                    name: stage.name,
                    prompt: stage.prompt,
                    output: stage.output,
                    metadata: stage.metadata
                  }}
                  visible={true}
                  position={previewPosition} // Use state for position
                />
              )}
            </div>
          ))}
        </div>
        {/* Close dropdown if clicking outside */}
        {showDropdownId && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }} onClick={() => setShowDropdownId(null)} />}
      </div>
    );
  }

  // Stage Detail Mode
  const selectedStage = stages.find((s) => s.id === currentStageId);
  return (
    <div style={{ padding: 32, fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
      <button onClick={toggleOverviewMode} style={{ background: "#eee", color: "#333", border: "none", borderRadius: 4, padding: "6px 18px", fontWeight: 600, cursor: "pointer", marginBottom: 18 }}>
        &larr; Back to Overview
      </button>
      {selectedStage ? ( // Check if selectedStage exists before rendering StageDetailView
        <StageDetailView
          stage={selectedStage}
          onRetry={() => alert("Retry stage " + selectedStage.id)}
          onInjectSnapshot={() => handleInject(selectedStage.id)}
          onRestorePrompt={() => handleRestore(selectedStage.id)}
          onBack={toggleOverviewMode}
        />
      ) : (
         <p>No stage selected or stage not found.</p> // Handle case where stage isn't found
      )}
    </div>
  );
}

// --- Style for dropdown buttons ---
const dropdownBtnStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px 18px",
  background: "none",
  border: "none",
  textAlign: "left", // Ensure text aligns left
  fontSize: 15,
  color: "#333",
  cursor: "pointer",
  whiteSpace: 'nowrap' // Prevent wrapping
};
// Note: The following line is invalid for standard inline styles and has been removed.
// dropdownBtnStyle[':hover'] = { background: '#f5f5f5' };
// To add hover styles, use CSS Modules, styled-components, Tailwind, or plain CSS with classNames.
// Example: <button className="dropdown-button" style={dropdownBtnStyle} ...>
// In CSS: .dropdown-button:hover { background: #f5f5f5; }


// --- Main WorkflowExplorer component (wraps Shell with Provider) ---
export default function WorkflowExplorer() {
  return (
    <WorkflowExplorerProvider>
      <WorkflowExplorerShell />
    </WorkflowExplorerProvider>
  );
}


/*
 * ==========================================================================
 * ATTENTION: The following component 'StandaloneWorkflowDashboard' is defined
 * but not used or exported in this file. This triggers the ts(6133) warning.
 * Consider moving it to its own file and exporting it, using it within this
 * file, or removing it if it's obsolete.
 * ==========================================================================
 */

