import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConversationPanel } from './ConversationPanel';
import { fn } from 'storybook/test';
import type { ChatMessage } from '@/components/organisms/ChatMessageList';

const sharedInputArgs = {
  onSubmitText: fn(),
  onSkip: fn(),
  onHint: fn(),
  onStartRecording: fn(),
  onStopRecording: fn(),
  onPauseRecording: fn(),
  onResumeRecording: fn(),
  onFilesSelected: fn(),
  recordingState: 'idle' as const,
  maxCharacters: 2000,
  placeholder: 'Type your response here...',
};

const aiQuestion1: ChatMessage = {
  id: 'msg-1',
  sender: 'ai',
  content:
    'Tell me about a time you led a cross-functional team. What was the project, and what challenges did you face?',
  timestamp: '10:01 AM',
};

const userReply1: ChatMessage = {
  id: 'msg-2',
  sender: 'user',
  content:
    'I led a team of 8 engineers to deliver a payment integration for our e-commerce platform. The main challenge was coordinating across 3 time zones while keeping a tight 6-week deadline.',
  timestamp: '10:03 AM',
};

const aiFollowUp: ChatMessage = {
  id: 'msg-3',
  sender: 'ai',
  content:
    'Great example! Can you quantify the impact? For instance, how much revenue did the payment integration generate, or how much time did it save?',
  timestamp: '10:04 AM',
};

const meta = {
  title: 'Organisms/ConversationPanel',
  component: ConversationPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '700px', width: '560px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...sharedInputArgs,
    title: 'AI Enhancement Conversation',
    currentQuestion: 1,
    totalQuestions: 5,
    autoSavedText: 'Auto-saved 2 min ago',
  },
} satisfies Meta<typeof ConversationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** AI has asked the first question; no user reply yet. */
export const Default: Story = {
  args: {
    messages: [aiQuestion1],
  },
};

/** Full back-and-forth: AI question, user reply, AI follow-up. */
export const WithUserReply: Story = {
  args: {
    currentQuestion: 2,
    messages: [aiQuestion1, userReply1, aiFollowUp],
    autoSavedText: 'Auto-saved just now',
  },
};

/** Voice mode active -- recording in progress. */
export const VoiceMode: Story = {
  args: {
    messages: [aiQuestion1],
    recordingState: 'recording',
    elapsedSeconds: 14,
  },
};

/** Empty conversation -- no messages at all. */
export const Empty: Story = {
  args: {
    messages: [],
    questionLabel: 'Waiting for first question...',
  },
};

/** After user answered — Next Question button shown (#214). */
export const NextQuestionFlow: Story = {
  args: {
    currentQuestion: 1,
    messages: [aiQuestion1, userReply1],
    buttonLabel: 'Next Question',
    buttonVariant: 'next',
    inputDisabled: true,
    onNextQuestion: fn(),
  },
};

/** Submitting state — buttons disabled, input locked. */
export const Submitting: Story = {
  args: {
    messages: [aiQuestion1],
    isSubmitting: true,
  },
};

/** Submit error displayed below input. */
export const SubmitError: Story = {
  args: {
    messages: [aiQuestion1, userReply1],
    submitError: 'Failed to submit your response. Please try again.',
  },
};

/** Text-only mode — voice/upload tabs hidden (#252). */
export const TextOnly: Story = {
  args: {
    messages: [aiQuestion1],
    enabledModes: ['text'],
  },
};
