import type { Meta, StoryObj } from '@storybook/react';
import { EnhancementReviewView } from './EnhancementReviewView';
import { mockResumeDocument } from '@/mocks/resume-document.mock';
import {
  mockDimensionScores,
  mockBulletReviews,
  mockOriginalScore,
  mockEnhancedScore,
} from '@/mocks/enhancement-review.mock';

const meta = {
  title: 'Templates/EnhancementReviewView',
  component: EnhancementReviewView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof EnhancementReviewView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resumeData: mockResumeDocument,
    originalScore: mockOriginalScore,
    enhancedScore: mockEnhancedScore,
    dimensionScores: mockDimensionScores,
    bulletReviews: mockBulletReviews,
    onApply: () => alert('Apply Changes to Resume'),
  },
};
