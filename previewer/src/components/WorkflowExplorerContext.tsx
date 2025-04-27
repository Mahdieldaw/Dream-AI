import React, { createContext, useContext, useState } from "react";

export type WorkflowStage = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  status: "pending" | "in-progress" | "complete" | "failed";
  validatorStatus?: "pass" | "fail" | null;
  isGeneration?: boolean;
  restoredFromSnapshot?: boolean;
  summary?: string;
  prompt: string;
  output?: string;
  metadata?: Record<string, any>;
};

export type WorkflowExplorerContextType = {
  stages: WorkflowStage[];
  currentStageId: string | null;
  overviewMode: boolean;
  injectedPrompt: string | null;
  setCurrentStageId: (id: string | null) => void;
  setOverviewMode: (mode: boolean) => void;
  setInjectedPrompt: (prompt: string | null) => void;
  getWorkflowStages: () => WorkflowStage[];
  getSnapshotForStage: (stageId: string) => any;
  onStageSelect: (stageId: string) => void;
  restorePromptFromSnapshot: (stageId: string, snapshotId: string) => void;
  toggleOverviewMode: () => void;
};

const dummyStages: WorkflowStage[] = [
  {
    id: "1",
    name: "Ideate",
    icon: "💡",
    status: "complete",
    validatorStatus: "pass",
    isGeneration: true,
    summary: "Brainstorm ideas",
    prompt: "Suggest 5 creative startup ideas.",
    output: "1. AI Tutor...",
    metadata: { time: "2m" }
  },
  {
    id: "2",
    name: "Generate",
    icon: "⚙️",
    status: "in-progress",
    validatorStatus: null,
    summary: "Generate draft",
    prompt: "Draft a pitch for idea #1.",
    output: "Our startup...",
    metadata: { time: "3m" }
  },
  {
    id: "3",
    name: "Validate",
    icon: "✅",
    status: "pending",
    validatorStatus: null,
    summary: "Check feasibility",
    prompt: "List risks for idea #1.",
    output: "Risk 1: ...",
    metadata: { time: "-" }
  }
];

const WorkflowExplorerContext = createContext<WorkflowExplorerContextType | undefined>(undefined);

export const WorkflowExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stages, setStages] = useState<WorkflowStage[]>(dummyStages);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [overviewMode, setOverviewMode] = useState<boolean>(true);
  const [injectedPrompt, setInjectedPrompt] = useState<string | null>(null);

  // Handler stubs for future backend integration
  const getWorkflowStages = () => stages;
  const getSnapshotForStage = (stageId: string) => ({ id: "snap-1", prompt: "Snapshot prompt", output: "Snapshot output", validatorStatus: "pass" });
  const onStageSelect = (stageId: string) => { setCurrentStageId(stageId); setOverviewMode(false); };
  const restorePromptFromSnapshot = (stageId: string, snapshotId: string) => { setInjectedPrompt("Restored prompt from snapshot"); };
  const toggleOverviewMode = () => setOverviewMode((prev) => !prev);

  return (
    <WorkflowExplorerContext.Provider value={{
      stages,
      currentStageId,
      overviewMode,
      injectedPrompt,
      setCurrentStageId,
      setOverviewMode,
      setInjectedPrompt,
      getWorkflowStages,
      getSnapshotForStage,
      onStageSelect,
      restorePromptFromSnapshot,
      toggleOverviewMode
    }}>
      {children}
    </WorkflowExplorerContext.Provider>
  );
};

export const useWorkflowExplorer = () => {
  const ctx = useContext(WorkflowExplorerContext);
  if (!ctx) throw new Error("useWorkflowExplorer must be used within WorkflowExplorerProvider");
  return ctx;
};