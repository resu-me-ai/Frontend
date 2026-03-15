import type { Meta, StoryObj } from '@storybook/react';
import { AnalysisInProgress } from './AnalysisInProgress';

const meta = {
  title: 'Organisms/AnalysisInProgress',
  component: AnalysisInProgress,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalysisInProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 45,
  },
};

export const JustStarted: Story = {
  args: {
    progress: 5,
  },
};

export const Halfway: Story = {
  args: {
    progress: 50,
  },
};

export const AlmostComplete: Story = {
  args: {
    progress: 90,
  },
};

export const Complete: Story = {
  args: {
    progress: 100,
  },
};
