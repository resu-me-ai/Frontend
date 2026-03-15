import type { Meta, StoryObj } from '@storybook/react';
import { AnalysisLoadingView } from './AnalysisLoadingView';

const meta = {
  title: 'Templates/AnalysisLoadingView',
  component: AnalysisLoadingView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalysisLoadingView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EarlyProgress: Story = {
  args: { progress: 22 },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};

export const MidProgress: Story = {
  args: { progress: 55 },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};

export const NearComplete: Story = {
  args: { progress: 90 },
  decorators: [(Story) => <div className="h-screen"><Story /></div>],
};
