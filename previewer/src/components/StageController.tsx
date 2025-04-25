import React from 'react';

interface StageControllerProps {
  stage: {
    title: string;
    description: string;
    summary: string;
  };
}

const StageController: React.FC<StageControllerProps> = ({ stage }) => (
  <div>
    <h2>{stage.title}</h2>
    <p>{stage.summary}</p>
  </div>
);

export default StageController;
