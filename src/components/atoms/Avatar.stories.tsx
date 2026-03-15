import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    fallback: {
      control: 'text',
      description: 'Fallback initials when no image',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'RB',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ralph',
    alt: 'Ralph Bautista',
    fallback: 'RB',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="JD" />
      <Avatar fallback="AB" />
      <Avatar fallback="RB" />
    </div>
  ),
};
