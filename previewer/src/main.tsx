import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import WorkflowStackPreview from './components/WorkflowStackPreview';
import WorkflowExplorerPreview from './components/WorkflowExplorerPreview';
import StageControllerPreview from './components/StageControllerPreview';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workflow-stack" element={<WorkflowStackPreview />} />
        <Route path="/workflow-explorer" element={<WorkflowExplorerPreview />} />
        <Route path="/stage-controller" element={<StageControllerPreview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
