export interface Workflow {
  id: string;
  title: string;
  description: string;
  estimate: string;
  aiTools: string[];
  stages: Stage[];
}

export interface Stage {
  title: string;
  description: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
}