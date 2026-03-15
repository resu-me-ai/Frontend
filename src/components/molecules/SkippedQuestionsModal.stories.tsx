import type { Meta, StoryObj } from '@storybook/react';
import { SkippedQuestionsModal } from './SkippedQuestionsModal';
import type { SkippedQuestion } from './SkippedQuestionsModal';

const singleSkipped: SkippedQuestion[] = [
  {
    id: 'q2',
    bulletId: 'role_0.bullet_1',
    questionNumber: 2,
    mainQuestion: 'Can you tell me more about leading the cross-functional team?',
    resumeQuote: 'Led cross-functional team of 8 engineers to deliver platform migration on schedule',
  },
];

const multipleSkipped: SkippedQuestion[] = [
  {
    id: 'q2',
    bulletId: 'role_0.bullet_1',
    questionNumber: 2,
    mainQuestion: 'Can you tell me more about leading the cross-functional team?',
    resumeQuote: 'Led cross-functional team of 8 engineers to deliver platform migration on schedule',
  },
  {
    id: 'q4',
    bulletId: 'role_1.bullet_0',
    questionNumber: 4,
    mainQuestion: 'What specific metrics did you use to measure the revenue increase?',
    resumeQuote: 'Increased annual recurring revenue by 40% through strategic product positioning',
  },
  {
    id: 'q5',
    bulletId: 'role_1.bullet_2',
    questionNumber: 5,
    mainQuestion: 'How did you implement the automated deployment pipeline and what tools did you use?',
    resumeQuote: 'Built automated CI/CD pipeline reducing deployment time from 4 hours to 15 minutes',
  },
];

const meta = {
  title: 'Molecules/SkippedQuestionsModal',
  component: SkippedQuestionsModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkippedQuestionsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSkipped: Story = {
  args: {
    open: true,
    skippedQuestions: singleSkipped,
    totalQuestions: 6,
    onClose: () => console.log('Close'),
    onAnswerNow: (q) => console.log('Answer now:', q.id),
  },
};

export const MultipleSkipped: Story = {
  args: {
    open: true,
    skippedQuestions: multipleSkipped,
    totalQuestions: 6,
    onClose: () => console.log('Close'),
    onAnswerNow: (q) => console.log('Answer now:', q.id),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    skippedQuestions: singleSkipped,
    totalQuestions: 6,
    onClose: () => {},
    onAnswerNow: () => {},
  },
};
