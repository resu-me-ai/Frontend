import type { Meta, StoryObj } from '@storybook/react';
import { ExitIntentPopup } from './ExitIntentPopup';

const meta = {
  title: 'Organisms/ExitIntentPopup',
  component: ExitIntentPopup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    delay: {
      control: 'number',
      description: 'Delay in ms before exit intent activates',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description',
    },
  },
} satisfies Meta<typeof ExitIntentPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    delay: 0, // instant for demo
  },
  render: (args) => {
    // Force open for storybook demo
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Move mouse to top of viewport to trigger popup</p>
        <ExitIntentPopup {...args} />
      </div>
    );
  },
};

export const QuickTrigger: Story = {
  args: {
    delay: 1000,
    title: 'Wait! Free Resume Review',
    description: 'Get a free AI-powered resume review before you leave.',
    submitText: 'Get Free Review',
  },
};
