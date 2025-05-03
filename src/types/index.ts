export type AdoptionState = 'adopted' | 'planned' | 'evaluation' | 'submitted' | 'rejected';

export interface Technology {
  id: string;
  name: string;
  description?: string;
  useCase?: string;
  decisionDetails?: string;
  icon: string;
  logoUrl?: string;
  quadrant: Quadrant;
  state: AdoptionState;
}

export type Quadrant = 'techniques' | 'tools' | 'platforms' | 'languages';

export interface RadarData {
  technologies: Technology[];
  lastUpdated: string;
  companyName: string;
}