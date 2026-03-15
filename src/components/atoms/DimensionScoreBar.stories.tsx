import type { Meta, StoryObj } from '@storybook/react';
import { DimensionScoreBar } from './DimensionScoreBar';

const meta = {
  title: 'Atoms/DimensionScoreBar',
  component: DimensionScoreBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DimensionScoreBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Impact: Story = {
  args: { label: 'IMPACT', delta: 3.3 },
};

export const Leadership: Story = {
  args: { label: 'LEADERSHIP', delta: 2.3 },
};

export const SmallDelta: Story = {
  args: { label: 'CLARITY', delta: 0.8 },
};

export const LargeDelta: Story = {
  args: { label: 'QUANTIFICATION', delta: 4.9 },
};
