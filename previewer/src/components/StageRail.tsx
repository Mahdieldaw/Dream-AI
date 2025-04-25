import React, { useState } from 'react';

interface Stage {
  id: number;
  title: string;
  summary: string;
  prompt?: string;
}

interface StageRailProps {
  selectedStageId?: number;
  onSelectStage: (stage: Stage) => void;
  onHoverStage: (stage: Stage | null) => void;
}

const mockStages: Stage[] = [
  { id: 1, title: 'Ideation', summary: 'Brainstorm and collect ideas.', prompt: 'Describe your main idea.' },
  { id: 2, title: 'Drafting', summary: 'Create the first draft.', prompt: 'Write a rough draft of your content.' },
  { id: 3, title: 'Editing', summary: 'Refine and improve.', prompt: 'Edit your draft for clarity and style.' },
  { id: 4, title: 'Review', summary: 'Peer or AI review.', prompt: 'Request feedback and make changes.' },
  { id: 5, title: 'Publishing', summary: 'Finalize and publish.', prompt: 'Prepare for publishing and share.' }
];

const StageRail: React.FC<StageRailProps> = ({ selectedStageId, onSelectStage, onHoverStage }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <nav style={{ width: 80, background: '#f0f5ff', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minHeight: 360 }}>
      {mockStages.map((stage) => (
        <div
          key={stage.id}
          onClick={() => onSelectStage(stage)}
          onMouseEnter={() => { setHoveredId(stage.id); onHoverStage(stage); }}
          onMouseLeave={() => { setHoveredId(null); onHoverStage(null); }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: selectedStageId === stage.id ? '#1890ff' : hoveredId === stage.id ? '#bae7ff' : '#fff',
            border: selectedStageId === stage.id ? '2px solid #1890ff' : '1px solid #d6e4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: hoveredId === stage.id ? '0 2px 8px rgba(24,144,255,0.08)' : undefined,
            transition: 'all 0.15s'
          }}
          aria-label={stage.title}
        >
          <span style={{ fontWeight: 700, color: selectedStageId === stage.id ? '#fff' : '#1890ff', fontSize: 18 }}>{stage.title[0]}</span>
        </div>
      ))}
    </nav>
  );
};

export default StageRail;