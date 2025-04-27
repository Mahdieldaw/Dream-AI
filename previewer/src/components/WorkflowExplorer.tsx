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
function StandaloneWorkflowDashboard() { // Renamed for clarity, assuming it's a separate concept
  // Dummy data/state needed for this block (replace with actual logic or context)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const inProgress: any[] = [{ id: 'wf-abc', progress: 'Stage 2/5' }]; // Example
  const workflowTemplates: any[] = [ // Example
      { id: 'wf-1', title: 'Blog Post Generator', description: 'Generate a draft blog post.', estimate: '15m', aiTools: ['LLM'], stages: [{title: 'Outline'}, {title: 'Draft'}] },
      { id: 'wf-2', title: 'Code Review Helper', description: 'Get AI feedback on code.', estimate: '10m', aiTools: ['LLM', 'Static Analysis'], stages: [{title: 'Analyze'}, {title: 'Suggest'}] },
      { id: 'wf-abc', title: 'Marketing Campaign Plan', description: 'Plan a new campaign.', estimate: '30m', aiTools: ['LLM'], stages: [{title: 'Goals'}, {title: 'Audience'}, {title: 'Channels'}, {title: 'Content'}, {title: 'Budget'}] }
  ];
  const recommendedIds = ['wf-1']; // Example

  const handleSelect = (wf: any) => setSelectedWorkflow(wf);
  const handleBack = () => setSelectedWorkflow(null);

  return (
    // Added wrapping div here to fix the adjacent elements error
    <div style={{ padding: 32, fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Workflow Explorer</h1>
      <p style={{ color: "#555", marginBottom: 32 }}>
        Your hub for launching, exploring, and resuming AI-powered workflows.
      </p>

      {/* In-progress workflows */}
      {inProgress.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Continue Where You Left Off</h2>
          <div style={{ display: "flex", gap: 16 }}>
            {inProgress.map((item) => {
              const wf = workflowTemplates.find((w) => w.id === item.id);
              return (
                <div key={item.id} style={{ background: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 8, padding: 16, minWidth: 220 }}>
                  <strong>{wf?.title}</strong>
                  <div style={{ fontSize: 14, color: "#b8860b", margin: "8px 0" }}>{item.progress}</div>
                  <button
                    onClick={() => wf && handleSelect(wf)} // Use handleSelect for consistency? Or a dedicated resume handler?
                    style={{ background: "#ffd700", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}
                  >
                    Resume
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recommended workflows */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Recommended for You</h2>
        <div style={{ display: "flex", gap: 16, overflowX: 'auto', paddingBottom: 12 }}> {/* Added scroll */}
          {workflowTemplates.filter((wf) => recommendedIds.includes(wf.id)).map((wf) => (
            <div key={wf.id} style={{ background: "#e6f7ff", border: "1px solid #91d5ff", borderRadius: 8, padding: 16, minWidth: 220, flexShrink: 0 }}> {/* Added flexShrink */}
              <strong>{wf.title}</strong>
              <div style={{ fontSize: 14, color: "#1890ff", margin: "8px 0" }}>{wf.description}</div>
              <div style={{ fontSize: 13, color: "#555" }}>Est: {wf.estimate}</div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>AI Tools: {wf.aiTools.join(", ")}</div>
              <button
                onClick={() => handleSelect(wf)}
                style={{ background: "#40a9ff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Browse all workflows */}
      <section>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Browse All Workflows</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {workflowTemplates.map((wf) => (
            <div key={wf.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 16, minWidth: 220, marginBottom: 16 }}>
              <strong>{wf.title}</strong>
              <div style={{ fontSize: 14, color: "#555", margin: "8px 0" }}>{wf.description}</div>
              <div style={{ fontSize: 13, color: "#888" }}>Est: {wf.estimate}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>AI Tools: {wf.aiTools.join(", ")}</div>
              <button
                onClick={() => handleSelect(wf)}
                style={{ background: "#1890ff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow modal preview */}
      {selectedWorkflow && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, minWidth: 340, maxWidth: '90%', maxHeight: '90%', overflowY: 'auto', boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}> {/* Added max sizes and scroll */}
            <h2 style={{ marginBottom: 8, marginTop: 0 }}>{selectedWorkflow.title} Workflow</h2> {/* Added marginTop 0 */}
            <div style={{ color: "#555", marginBottom: 12 }}>{selectedWorkflow.description}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              Estimated time: <strong>{selectedWorkflow.estimate}</strong>
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              AI Tools: <strong>{selectedWorkflow.aiTools.join(", ")}</strong>
            </div>
            <div style={{ fontSize: 14, marginBottom: 16 }}>
              <strong>Stages:</strong>
              <ol style={{ margin: "8px 0 0 20px", paddingLeft: 0 }}> {/* Adjusted list style */}
                {selectedWorkflow.stages.map((stage: any, idx: number) => ( // Added types
                  <li key={idx}>{stage.title}</li>
                ))}
              </ol>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: 'flex-end' }}> {/* Aligned buttons */}
              <button
                onClick={handleBack} // Close button should call handleBack
                style={{ background: "#eee", color: "#333", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}
              >
                Back
              </button>
              <button
                // Add onClick handler for starting the workflow
                onClick={() => alert(`Starting workflow: ${selectedWorkflow.title}`)}
                style={{ background: "#52c41a", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 700, cursor: "pointer" }}
              >
                Start Workflow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding fallback */}
      {inProgress.length === 0 && (
        <div style={{ marginTop: 32, background: "#f0f5ff", border: "1px solid #adc6ff", borderRadius: 8, padding: 24, textAlign: "center" }}>
          <h3 style={{ marginBottom: 8, marginTop: 0 }}>New here?</h3> {/* Added marginTop 0 */}
          <p style={{ color: "#555", marginBottom: 16, marginTop: 0 }}> {/* Added marginTop 0 */}
            Start your first workflow in seconds. Select a template above to begin!
          </p>
          {/* Maybe add a primary action button here? */}
        </div>
      )}
    </div> // Closing tag for the added wrapper div
  );
}
