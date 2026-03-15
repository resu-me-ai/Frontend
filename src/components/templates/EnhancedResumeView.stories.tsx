import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedResumeView } from './EnhancedResumeView';
import { mockResumeDocument } from '@/mocks/resume-document.mock';
import type { RescoreResult } from '@/pages/EnhancedResumeOutputPage';
import type { EnhancementMap } from '@/types/resume';

const mockRescoreData: RescoreResult = {
  original: { overall: 68, skills: 65, experience: 70, qualifications: 68, keywords: 62 },
  enhanced: { overall: 89, skills: 88, experience: 90, qualifications: 87, keywords: 85 },
  deltas: { overall: 21, skills: 23, experience: 20, qualifications: 19, keywords: 23 },
  improved: true,
  gap_resolution: {
    total_gaps: 7,
    resolved_gaps: 5,
  },
};

const meta = {
  title: 'Templates/EnhancedResumeView',
  component: EnhancedResumeView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EnhancedResumeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {
  args: {
    resumeData: mockResumeDocument,
    stage: 'done',
    enhancedCount: 6,
    bulletCount: 14,
    rescoreData: mockRescoreData,
    onDownload: () => alert('DOCX download triggered'),
    onDownloadPdf: () => alert('PDF download triggered'),
  },
};

export const DoneWithoutRescore: Story = {
  args: {
    resumeData: mockResumeDocument,
    stage: 'done',
    enhancedCount: 6,
    bulletCount: 14,
    rescoreData: null,
    onDownload: () => alert('Download triggered'),
    onDownloadPdf: () => alert('PDF download triggered'),
  },
};

export const Finalizing: Story = {
  args: {
    resumeData: null,
    stage: 'finalizing',
    onDownload: () => {},
  },
};

export const Rescoring: Story = {
  args: {
    resumeData: null,
    stage: 'rescoring',
    onDownload: () => {},
  },
};

export const Error: Story = {
  args: {
    resumeData: null,
    stage: 'error',
    error: 'Failed to generate enhanced resume. Please try again.',
    onDownload: () => {},
  },
};

export const NoResumeData: Story = {
  args: {
    resumeData: null,
    stage: 'done',
    enhancedCount: 6,
    bulletCount: 14,
    onDownload: () => alert('Download triggered'),
  },
};

export const LoadingResume: Story = {
  args: {
    resumeData: null,
    isLoadingResume: true,
    stage: 'done',
    enhancedCount: 6,
    bulletCount: 14,
    onDownload: () => {},
  },
};

// ---------------------------------------------------------------------------
// Story 10 (#459): Phase 1b — before/after bullet enhancement data
// ---------------------------------------------------------------------------

const mockEnhancements: EnhancementMap = {
  'role_0_bullet_0': {
    original: 'Managed a team of 5 engineers.',
    enhanced: 'Led cross-functional squad of 5 engineers, shipping 3 critical features 2 weeks ahead of schedule.',
    score_before: 58,
    score_after: 84,
  },
  'role_0_bullet_1': {
    original: 'Worked on product roadmap.',
    enhanced: 'Owned quarterly product roadmap for $25M revenue platform, aligning 8 cross-functional teams.',
    score_before: 52,
    score_after: 79,
  },
  'role_0_bullet_2': {
    original: 'Reduced customer complaints.',
    enhanced: 'Reduced customer complaint rate by 8× YoY by introducing proactive defect detection framework.',
    score_before: 65,
    score_after: 91,
  },
};

/**
 * Story 10 (#459): Phase 1b enhancement data — shows before/after bullet comparisons.
 * Demonstrates the BulletEnhancementPanel inside the right-rail of EnhancedResumeView.
 */
export const WithPhase1bEnhancements: Story = {
  args: {
    resumeData: {
      ...mockResumeDocument,
      _enhancements: mockEnhancements,
    },
    stage: 'done',
    enhancedCount: 3,
    bulletCount: 10,
    rescoreData: mockRescoreData,
    onDownload: () => alert('DOCX download triggered'),
    onDownloadPdf: () => alert('PDF download triggered'),
  },
};

/**
 * Story 10 (#459): Phase 1b — empty enhancements map shows graceful fallback.
 */
export const WithNoEnhancements: Story = {
  args: {
    resumeData: {
      ...mockResumeDocument,
      _enhancements: {},
    },
    stage: 'done',
    enhancedCount: 0,
    bulletCount: 10,
    rescoreData: null,
    onDownload: () => alert('Download triggered'),
    onDownloadPdf: () => alert('PDF download triggered'),
  },
};
