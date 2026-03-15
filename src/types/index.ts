// TypeScript type definitions

// Input types
export type { RecordingState, InputMode } from './input';

// Chat types
export type { ChatMessage } from './chat';

// Resume document types
export type {
  ParsedContact,
  ResumeOverview,
  BulletItem,
  ExperienceRoleData,
  ResumeSectionSummary,
  ResumeSectionExperience,
  ResumeSection,
  ResumeDocumentData,
} from './resume';
export { isExperienceSection, isBulletSection } from './resume';

export interface OnboardingFormData {
  // Step 1
  fullName: string;
  pronouns: string;
  // Step 2
  roles: string[];
  // Step 3
  jobTitle: string;
  // Step 4
  salaryExpectations: string;
  equityPreference: string;
  workLocation: string;
  teamSize: string;
  companyStage: string;
  // Step 5
  locations: string[];
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

