import type { Meta, StoryObj } from '@storybook/react';
import { ContextProcessingLoadingView } from './ContextProcessingLoadingView';

const meta = {
  title: 'MVP Flow/6 - Generate Enhancements/GenerateEnhancementProgressPage',
  component: ContextProcessingLoadingView,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContextProcessingLoadingView>;

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
