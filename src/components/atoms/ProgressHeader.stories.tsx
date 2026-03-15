import type { Meta, StoryObj } from '@storybook/react';
import { ProgressHeader } from './ProgressHeader';

const meta = {
  title: 'Atoms/ProgressHeader',
  component: ProgressHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentQuestion: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'The current question number being displayed',
    },
    totalQuestions: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Total number of questions in the set',
    },
    completedQuestions: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Number of questions already completed',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentQuestion: 5,
    totalQuestions: 10,
    completedQuestions: 4,
  },
};

export const EarlyProgress: Story = {
  args: {
    currentQuestion: 1,
    totalQuestions: 10,
    completedQuestions: 0,
  },
};

export const NearComplete: Story = {
  args: {
    currentQuestion: 9,
    totalQuestions: 10,
    completedQuestions: 8,
  },
};

export const Complete: Story = {
  args: {
    currentQuestion: 10,
    totalQuestions: 10,
    completedQuestions: 10,
  },
};
