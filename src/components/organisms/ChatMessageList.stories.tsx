import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './ChatMessageList';
import type { ChatMessage } from './ChatMessageList';

const mockMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    content:
      "Hi Ralph! \u{1F44B} I'm your AI Resume Assistant. I'll help you create an outstanding resume that showcases your skills and experience. Let's start by understanding your background better.",
    timestamp: '9:41 AM',
  },
  {
    id: 'msg-2',
    sender: 'ai',
    content: (
      <div className="space-y-3">
        <p>
          I noticed in your first bullet point under The Princeton Review, you
          mentioned &quot;Led Identity &amp; Access Management (IAM) integrations
          such as LTI/SSO, SAML protocols, deep linking, and Snowflake APIs.&quot;
        </p>
        <p>
          Can you tell me more specifically what types of design initiatives you
          led? For example, were they redesigns, new features, or improvements to
          existing workflows? And what was the timeframe for achieving that 30%
          reduction?
        </p>
      </div>
    ),
    timestamp: '9:42 AM',
  },
];

const meta = {
  title: 'Organisms/ChatMessageList',
  component: ChatMessageList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '560px', height: '500px' }} className="flex flex-col overflow-hidden bg-white rounded-lg shadow">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatMessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: mockMessages,
    userAvatarFallback: 'RB',
  },
};

export const WithUserReply: Story = {
  args: {
    messages: [
      ...mockMessages,
      {
        id: 'msg-3',
        sender: 'user' as const,
        content:
          'I led the full IAM integration project over 8 months. We implemented LTI/SSO for 15 institutional clients, which directly reduced support call volume by 30% within the first quarter after launch.',
        timestamp: '9:45 AM',
      },
    ],
    userAvatarFallback: 'RB',
  },
};

export const SingleMessage: Story = {
  args: {
    messages: [mockMessages[0]],
  },
};

export const Empty: Story = {
  args: {
    messages: [],
  },
};
