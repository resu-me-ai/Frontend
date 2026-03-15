import type { Meta, StoryObj } from '@storybook/react';
import { ReviewAnswersList } from './ReviewAnswersList';
import { mockReviewQuestions, mockReviewSummary } from '@/mocks/context-collection.mock';

const meta = {
  title: 'Organisms/ReviewAnswersList',
  component: ReviewAnswersList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewAnswersList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSkippedQuestions: Story = {
  args: {
    questions: mockReviewQuestions,
    answeredCount: mockReviewSummary.answered,
    skippedCount: mockReviewSummary.skipped,
  },
  decorators: [(Story) => <div className="max-w-[800px] h-[900px]"><Story /></div>],
};

export const AllAnswered: Story = {
  args: {
    questions: mockReviewQuestions.map((q) => ({ ...q, status: 'answered' as const })),
    answeredCount: 6,
    skippedCount: 0,
  },
  decorators: [(Story) => <div className="max-w-[800px] h-[900px]"><Story /></div>],
};
