import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';

const meta = {
  title: 'Molecules/ChatHeader',
  component: ChatHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title',
    },
    autoSavedText: {
      control: 'text',
      description: 'Auto-save status text',
    },
    questionLabel: {
      control: 'text',
      description: 'Override for question label text',
    },
    currentQuestion: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current question number',
    },
    totalQuestions: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of questions',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }} className="bg-white rounded-lg shadow">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentQuestion: 1,
    totalQuestions: 6,
    autoSavedText: 'Auto-saved 2 min ago',
  },
};

export const Midway: Story = {
  args: {
    currentQuestion: 3,
    totalQuestions: 6,
    autoSavedText: 'Auto-saved just now',
  },
};

export const LastQuestion: Story = {
  args: {
    currentQuestion: 6,
    totalQuestions: 6,
    autoSavedText: 'Auto-saved 1 min ago',
  },
};

export const NoAutoSave: Story = {
  args: {
    currentQuestion: 1,
    totalQuestions: 6,
  },
};

export const WithSkippedBadge: Story = {
  args: {
    currentQuestion: 4,
    totalQuestions: 6,
    autoSavedText: 'Auto-saved just now',
    skippedCount: 2,
    onSkippedClick: () => console.log('Skipped badge clicked'),
    skippedSegments: [2, 3],
  },
};
