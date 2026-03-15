import type { Meta, StoryObj } from '@storybook/react';
import { ChatInputPanel } from './ChatInputPanel';

const meta = {
  title: 'Organisms/ChatInputPanel',
  component: ChatInputPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSubmitting: {
      control: 'boolean',
      description: 'Whether the form is currently submitting',
    },
    maxCharacters: {
      control: { type: 'number', min: 100, max: 5000 },
      description: 'Maximum character limit',
    },
    encryptedLabel: {
      control: 'text',
      description: 'Label for encrypted indicator',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '560px' }} className="bg-white rounded-lg shadow">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatInputPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (answer) => console.log('Submitted:', answer),
    onSkip: () => console.log('Skipped'),
    onHint: () => console.log('Hint requested'),
    onVoiceInput: () => console.log('Voice input'),
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: (answer) => console.log('Submitted:', answer),
    onSkip: () => console.log('Skipped'),
    onHint: () => console.log('Hint requested'),
    isSubmitting: true,
  },
};

export const NoHintOrVoice: Story = {
  args: {
    onSubmit: (answer) => console.log('Submitted:', answer),
    onSkip: () => console.log('Skipped'),
  },
};
