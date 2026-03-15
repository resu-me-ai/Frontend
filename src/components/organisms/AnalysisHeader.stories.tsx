import type { Meta, StoryObj } from '@storybook/react';
import { AnalysisHeader } from './AnalysisHeader';

const meta = {
  title: 'Organisms/AnalysisHeader',
  component: AnalysisHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalysisHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { overallScore: 92 },
};

export const HighScore: Story = {
  args: { overallScore: 92 },
};

export const MediumScore: Story = {
  args: { overallScore: 68 },
};

export const LowScore: Story = {
  args: { overallScore: 34 },
};

export const CustomLabels: Story = {
  args: {
    overallScore: 78,
    title: 'Resume Report',
    subtitle: 'Your tailored analysis is ready',
    scoreLabel: 'Match %',
  },
};
