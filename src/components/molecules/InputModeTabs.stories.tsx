import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputModeTabs } from './InputModeTabs';
import type { InputMode } from './InputModeTabs';

const meta = {
  title: 'Molecules/InputModeTabs',
  component: InputModeTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeMode: {
      control: 'radio',
      options: ['text', 'voice', 'upload'],
      description: 'Currently active input mode',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }} className="bg-white rounded-lg shadow p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputModeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveTabs = (args: React.ComponentProps<typeof InputModeTabs>) => {
  const [mode, setMode] = useState<InputMode>(args.activeMode);
  return <InputModeTabs {...args} activeMode={mode} onModeChange={setMode} />;
};

export const Default: Story = {
  args: {
    activeMode: 'text',
    onModeChange: () => {},
  },
  render: (args) => <InteractiveTabs {...args} />,
};

export const VoiceActive: Story = {
  args: {
    activeMode: 'voice',
    onModeChange: () => {},
  },
  render: (args) => <InteractiveTabs {...args} />,
};

export const UploadActive: Story = {
  args: {
    activeMode: 'upload',
    onModeChange: () => {},
  },
  render: (args) => <InteractiveTabs {...args} />,
};
