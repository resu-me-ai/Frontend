import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';

const meta = {
  title: 'Molecules/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for textarea',
    },
    maxCharacters: {
      control: { type: 'number', min: 100, max: 5000 },
      description: 'Maximum character limit',
    },
    warningText: {
      control: 'text',
      description: 'Warning text shown above textarea',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }} className="bg-white p-4 rounded-lg shadow">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const ChatInputWithState = (args: React.ComponentProps<typeof ChatInput>) => {
  const [value, setValue] = useState(args.value || '');
  return <ChatInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    onHint: () => console.log('Hint clicked'),
    onVoiceInput: () => console.log('Voice input clicked'),
  },
  render: (args) => <ChatInputWithState {...args} />,
};

export const WithText: Story = {
  args: {
    value: 'I led a complete redesign of the enterprise analytics dashboard, focusing on data visualization and user workflows. The project spanned 6 months and involved 3 design sprints.',
    onChange: () => {},
    onHint: () => console.log('Hint clicked'),
    onVoiceInput: () => console.log('Voice input clicked'),
  },
  render: (args) => <ChatInputWithState {...args} />,
};

export const NearLimit: Story = {
  args: {
    value: 'A'.repeat(1950),
    onChange: () => {},
    maxCharacters: 2000,
    onHint: () => console.log('Hint clicked'),
  },
  render: (args) => <ChatInputWithState {...args} />,
};

export const NoHelpers: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: (args) => <ChatInputWithState {...args} />,
};
