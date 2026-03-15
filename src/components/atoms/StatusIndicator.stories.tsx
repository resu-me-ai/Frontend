import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from '@/components/atoms/StatusIndicator';

const CircleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="6" />
  </svg>
);

const ShieldIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const meta = {
  title: 'Atoms/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info'],
      description: 'The color variant of the status indicator',
    },
    label: {
      control: 'text',
      description: 'The text label for the status',
    },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: CircleIcon,
    label: 'Status message',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    icon: ShieldIcon,
    label: 'Encrypted & Secure',
    variant: 'success',
  },
};

export const Info: Story = {
  args: {
    icon: ClockIcon,
    label: 'Auto-saved 2 min ago',
    variant: 'info',
  },
};
