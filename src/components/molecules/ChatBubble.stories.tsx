import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta = {
  title: 'Molecules/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "Hi John! 👋 I'm your AI Resume Assistant. I'll help you create an outstanding resume that showcases your skills and experience. Let's start by understanding your background better.",
  },
};

export const ShortMessage: Story = {
  args: {
    children: 'Thank you for your response!',
  },
};

export const LongMessage: Story = {
  args: {
    children: (
      <div className="space-y-3">
        <p>
          I noticed in your first bullet point under TechFlow Solutions, you
          mentioned &quot;Led design initiatives for enterprise analytics
          platform.&quot;
        </p>
        <p>
          Can you tell me more specifically what types of design initiatives you
          led? For example, were they redesigns, new features, or improvements to
          existing workflows? And what was the timeframe for achieving that 35%
          increase?
        </p>
      </div>
    ),
  },
};
