import type { Meta, StoryObj } from '@storybook/react';
import { SkippedBadge } from './SkippedBadge';

const meta = {
  title: 'Atoms/SkippedBadge',
  component: SkippedBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of skipped questions',
    },
  },
} satisfies Meta<typeof SkippedBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 1,
    onClick: () => console.log('Badge clicked'),
  },
};

export const Multiple: Story = {
  args: {
    count: 3,
    onClick: () => console.log('Badge clicked'),
  },
};

export const Zero: Story = {
  args: {
    count: 0,
    onClick: () => console.log('Badge clicked'),
  },
};
