import type { Meta, StoryObj } from '@storybook/react';
import { ChatAvatar } from './ChatAvatar';

const meta = {
  title: 'Atoms/ChatAvatar',
  component: ChatAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['ai', 'user'],
      description: 'AI assistant or user avatar',
    },
    src: {
      control: 'text',
      description: 'Image URL for user avatar',
    },
    fallback: {
      control: 'text',
      description: 'Fallback initials when no image provided',
    },
  },
} satisfies Meta<typeof ChatAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'ai',
  },
};

export const AI: Story = {
  args: {
    variant: 'ai',
  },
};

export const UserWithImage: Story = {
  args: {
    variant: 'user',
    src: 'https://i.pravatar.cc/40?u=ralph',
  },
};

export const UserWithFallback: Story = {
  args: {
    variant: 'user',
    fallback: 'RB',
  },
};
