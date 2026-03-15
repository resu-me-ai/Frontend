import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/components/atoms/IconButton';

const PaperclipIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
  </svg>
);

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the button is in active/selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the button',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: PaperclipIcon,
    ariaLabel: 'Attach file',
  },
};

export const Active: Story = {
  args: {
    icon: PaperclipIcon,
    ariaLabel: 'Attach file',
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: PaperclipIcon,
    ariaLabel: 'Attach file',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    icon: PaperclipIcon,
    ariaLabel: 'Attach file',
    size: 'sm',
  },
};
