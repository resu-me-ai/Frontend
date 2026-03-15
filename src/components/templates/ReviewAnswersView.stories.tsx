import type { Meta, StoryObj } from '@storybook/react';
import { ReviewAnswersView } from './ReviewAnswersView';
import { mockReviewQuestions, mockReviewSummary } from '@/mocks/context-collection.mock';
import resumeHtml from '@/assets/resume_ralph_real.html?raw';

const meta = {
  title: 'Templates/ReviewAnswersView',
  component: ReviewAnswersView,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ReviewAnswersView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSkippedQuestions: Story = {
  args: {
    questions: mockReviewQuestions,
    answeredCount: mockReviewSummary.answered,
    skippedCount: mockReviewSummary.skipped,
    resumeHtml,
  },
};

export const AllAnswered: Story = {
  args: {
    questions: mockReviewQuestions.map((q) => ({ ...q, status: 'answered' as const })),
    answeredCount: 6,
    skippedCount: 0,
    resumeHtml,
  },
};
