import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedProgressBar } from './SegmentedProgressBar';

const meta = {
  title: 'Atoms/SegmentedProgressBar',
  component: SegmentedProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of filled segments',
    },
    total: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of segments',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SegmentedProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    total: 6,
  },
};

export const Halfway: Story = {
  args: {
    current: 3,
    total: 6,
  },
};

export const Complete: Story = {
  args: {
    current: 6,
    total: 6,
  },
};

export const Empty: Story = {
  args: {
    current: 0,
    total: 6,
  },
};
