import type { Meta, StoryObj } from '@storybook/react';
import { MessageTimestamp } from './MessageTimestamp';

const meta = {
  title: 'Atoms/MessageTimestamp',
  component: MessageTimestamp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'text',
      description: 'Formatted time string',
    },
  },
} satisfies Meta<typeof MessageTimestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    time: '9:41 AM',
  },
};

export const Afternoon: Story = {
  args: {
    time: '2:15 PM',
  },
};
