import GhostOverlay from './GhostOverlay';
import WorkflowExplorer from './WorkflowExplorer.tsx';

export default function WorkflowStackPreview() {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <GhostOverlay />
      <WorkflowExplorer />
    </div>
  );
}