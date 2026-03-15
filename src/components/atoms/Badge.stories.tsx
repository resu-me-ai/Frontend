import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['strong', 'moderate', 'critical', 'important', 'nice-to-have', 'low-priority'],
      description: 'Badge variant/color scheme',
    },
    children: {
      control: 'text',
      description: 'Badge text content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'strong',
    children: 'Badge',
  },
};

export const Strong: Story = {
  args: {
    variant: 'strong',
    children: 'STRONG',
  },
};

export const Moderate: Story = {
  args: {
    variant: 'moderate',
    children: 'MODERATE',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    children: 'CRITICAL',
  },
};

export const Important: Story = {
  args: {
    variant: 'important',
    children: 'IMPORTANT',
  },
};

export const NiceToHave: Story = {
  args: {
    variant: 'nice-to-have',
    children: 'NICE TO HAVE',
  },
};

export const LowPriority: Story = {
  args: {
    variant: 'low-priority',
    children: 'LOW PRIORITY',
  },
};

export const AllVariants: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-4">
      <Badge variant="strong">STRONG</Badge>
      <Badge variant="moderate">MODERATE</Badge>
      <Badge variant="critical">CRITICAL</Badge>
      <Badge variant="important">IMPORTANT</Badge>
      <Badge variant="nice-to-have">NICE TO HAVE</Badge>
      <Badge variant="low-priority">LOW PRIORITY</Badge>
    </div>
  ),
};
