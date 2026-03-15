import type { Meta, StoryObj } from '@storybook/react';
import { Waitlist } from './Waitlist';

const meta = {
  title: 'Organisms/Waitlist',
  component: Waitlist,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Waitlist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (email) => console.log('Submitted:', email),
  },
};

export const CustomCopy: Story = {
  args: {
    title: 'Get Early Access',
    description: 'Join 2,000+ founders already on the waitlist for priority access to our AI-powered platform.',
    onSubmit: (email) => console.log('Submitted:', email),
  },
};

export const LaunchAnnouncement: Story = {
  args: {
    title: 'Launching Soon',
    description: 'We are putting the finishing touches on something special. Drop your email to be notified on launch day.',
    onSubmit: (email) => console.log('Submitted:', email),
  },
};
