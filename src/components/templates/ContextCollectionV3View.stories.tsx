import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { composeStories } from '@storybook/react-vite';
import { ContextCollectionV3View } from './ContextCollectionV3View';
import { fn } from 'storybook/test';
import type { ChatMessage } from '@/types';
import type { RecordingState } from '@/types';
import { QuestionCard } from '@/components/organisms/QuestionCard';
import { SkippedQuestionsModal } from '@/components/molecules/SkippedQuestionsModal';
import type { SkippedQuestion } from '@/components/molecules/SkippedQuestionsModal';
import resumeHtml from '@/assets/resume_ralph_real.html?raw';
import mockQuestionsData from '@/assets/mock_context_questions.json';
import * as MultiModeInputPanelStories from '@/components/organisms/MultiModeInputPanel.stories';

// Compose MultiModeInputPanel stories to inherit their voice-related args
const ComposedMultiModeInputPanel = composeStories(MultiModeInputPanelStories);

/**
 * Maps MultiModeInputPanel story args to conversationPanelProps voice settings.
 * This enables designer changes in atomic stories to cascade to template stories.
 */
function toVoiceConversationProps(
  story: (typeof ComposedMultiModeInputPanel)[keyof typeof ComposedMultiModeInputPanel]
) {
  const args = story.args;
  return {
    recordingState: (args?.recordingState ?? 'idle') as RecordingState,
    elapsedSeconds: args?.elapsedSeconds,
    maxRecordingSeconds: args?.maxRecordingSeconds,
  };
}

// ---------------------------------------------------------------------------
// Question interface (Saturday demo — 4 fields)
// ---------------------------------------------------------------------------
interface Question {
  id: string;
  bulletId: string;
  resumeQuote: string;
  mainQuestion: string;
}

const mockQuestions: Question[] = mockQuestionsData;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const getTimestamp = (): string =>
  new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

const makeQuestionMessage = (q: Question, index: number): ChatMessage => ({
  id: `msg-q-${index}`,
  sender: 'ai',
  content: <QuestionCard question={q} />,
  timestamp: getTimestamp(),
});

const introMessage: ChatMessage = {
  id: 'msg-intro',
  sender: 'ai',
  content:
    "Hi Ralph! I've analyzed your resume against the job description. I have a few questions that will help me strengthen specific bullets. Let's get started.",
  timestamp: getTimestamp(),
};

const completionMessage: ChatMessage = {
  id: 'msg-complete',
  sender: 'ai',
  content:
    "Thanks Ralph! I've collected all the context I need. I'm now generating your enhanced resume bullets with stronger quantification and impact statements. This will just take a moment...",
  timestamp: getTimestamp(),
};

// ---------------------------------------------------------------------------
// Shared static props (for non-interactive stories)
// ---------------------------------------------------------------------------
const initialMessages: ChatMessage[] = [
  introMessage,
  makeQuestionMessage(mockQuestions[0], 0),
];

const sharedConversationProps = {
  messages: initialMessages,
  title: 'AI Enhancement Conversation',
  currentQuestion: 1,
  totalQuestions: 6,
  autoSavedText: 'Auto-saved 2 min ago',
  onSubmitText: fn(),
  onSkip: fn(),
  onHint: fn(),
  onStartRecording: fn(),
  onStopRecording: fn(),
  onPauseRecording: fn(),
  onResumeRecording: fn(),
  onReviewRecording: fn(),
  onDiscardRecording: fn(),
  onSubmitRecording: fn(),
  onFilesSelected: fn(),
  recordingState: 'idle' as const,
  maxCharacters: 2000,
  placeholder: "Type your response to the AI's question...",
  warningText: 'You can only respond to questions one time',
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: 'Templates/ContextCollectionV3View',
  component: ContextCollectionV3View,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextCollectionV3View>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Full 6-question interactive flow with question progression, highlight changes, skipped questions badge/modal, and completion. */
export const InteractiveFlow: Story = {
  args: {
    resumeHtml,
  },
  render: function InteractiveFlowStory() {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [awaitingNext, setAwaitingNext] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState<SkippedQuestion[]>([]);
    const [skippedModalOpen, setSkippedModalOpen] = useState(false);
    const [answeringSkipped, setAnsweringSkipped] = useState<SkippedQuestion | null>(null);
    const isComplete = questionIndex >= mockQuestions.length;

    const currentQ = mockQuestions[Math.min(questionIndex, mockQuestions.length - 1)];

    const handleSubmitText = (text: string) => {
      if (isComplete || awaitingNext) return;

      // 1. Append user message
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${answeringSkipped ? answeringSkipped.id : questionIndex}`,
          sender: 'user' as const,
          content: text,
          timestamp: getTimestamp(),
        },
      ]);

      if (answeringSkipped) {
        // Remove from skipped list and clear answering state
        setSkippedQuestions((prev) => prev.filter((q) => q.id !== answeringSkipped.id));
        setAnsweringSkipped(null);
      } else {
        // 2. Transition to awaitingNext state
        setAwaitingNext(true);
      }
    };

    const handleNextQuestion = () => {
      const nextIndex = questionIndex + 1;

      if (nextIndex < mockQuestions.length) {
        // Clear panel → intro + next question only
        setMessages([introMessage, makeQuestionMessage(mockQuestions[nextIndex], nextIndex)]);
        setQuestionIndex(nextIndex);
      } else {
        // Final — show completion message
        setMessages([introMessage, completionMessage]);
        setQuestionIndex(nextIndex);
      }

      setAwaitingNext(false);
    };

    const handleSkip = () => {
      if (isComplete || awaitingNext) return;

      // Track skipped question
      const q = mockQuestions[questionIndex];
      setSkippedQuestions((prev) => [
        ...prev,
        {
          id: q.id,
          bulletId: q.bulletId,
          questionNumber: questionIndex + 1,
          mainQuestion: q.mainQuestion,
          resumeQuote: q.resumeQuote,
        },
      ]);

      // Skip indicator message
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-skip-${questionIndex}`,
          sender: 'user' as const,
          content: <span className="text-text-placeholder italic">Skipped</span>,
          timestamp: getTimestamp(),
        },
      ]);

      // Advance immediately
      const nextIndex = questionIndex + 1;
      if (nextIndex < mockQuestions.length) {
        setMessages((prev) => [
          ...prev,
          makeQuestionMessage(mockQuestions[nextIndex], nextIndex),
        ]);
        setQuestionIndex(nextIndex);
      } else {
        setMessages((prev) => [...prev, completionMessage]);
        setQuestionIndex(nextIndex);
      }
    };

    const handleAnswerNow = (question: SkippedQuestion) => {
      setSkippedModalOpen(false);
      setAnsweringSkipped(question);

      // Inject skipped question back into chat
      const aiMessage: ChatMessage = {
        id: `msg-retry-${question.id}`,
        sender: 'ai',
        content: (
          <QuestionCard
            question={{
              id: question.id,
              bulletId: question.bulletId,
              resumeQuote: question.resumeQuote,
              mainQuestion: question.mainQuestion,
            }}
          />
        ),
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    };

    const highlightedBulletId = answeringSkipped?.bulletId ?? currentQ.bulletId;
    const highlightedText = answeringSkipped?.resumeQuote ?? currentQ.resumeQuote;

    return (
      <>
        <ContextCollectionV3View
          resumeHtml={resumeHtml}
          highlightedBulletId={highlightedBulletId}
          highlightedText={highlightedText}
          conversationPanelProps={{
            ...sharedConversationProps,
            messages,
            currentQuestion: Math.min(questionIndex + 1, mockQuestions.length),
            totalQuestions: mockQuestions.length,
            onSubmitText: handleSubmitText,
            onSkip: handleSkip,
            isSubmitting: false,
            skippedCount: skippedQuestions.length,
            onSkippedClick: () => setSkippedModalOpen(true),
            skippedSegments: skippedQuestions.map((q) => q.questionNumber),
            ...(awaitingNext && !answeringSkipped && {
              buttonLabel: 'Next Question',
              buttonVariant: 'next' as const,
              inputDisabled: true,
              onNextQuestion: handleNextQuestion,
            }),
          }}
        />
        <SkippedQuestionsModal
          open={skippedModalOpen}
          onClose={() => setSkippedModalOpen(false)}
          skippedQuestions={skippedQuestions}
          totalQuestions={mockQuestions.length}
          onAnswerNow={handleAnswerNow}
        />
      </>
    );
  },
};

/** Interactive full layout — submit text, record voice, or upload files. All modes are functional. */
export const FullLayout: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: sharedConversationProps,
  },
  render: function InteractiveFullLayout(args) {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused' | 'stopped'>('idle');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleStartRecording = () => {
      setRecordingState('recording');
      setElapsedSeconds(0);
      startTimer();
    };

    const handleStopRecording = () => {
      stopTimer();
      // Go to stopped state - ready for review/submit
      setRecordingState('stopped');
    };

    const handlePauseRecording = () => {
      stopTimer();
      setRecordingState('paused');
    };

    const handleResumeRecording = () => {
      setRecordingState('recording');
      startTimer();
    };

    const handleReviewRecording = () => {
      alert('Playing back recording...');
    };

    const handleDiscardRecording = () => {
      setRecordingState('idle');
      setElapsedSeconds(0);
    };

    const handleSubmitRecording = () => {
      // Add a message showing the recording was submitted
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-voice-${prev.length}`,
          sender: 'user' as const,
          content: `🎤 Voice recording (${elapsedSeconds}s)`,
          timestamp: getTimestamp(),
        },
      ]);
      setRecordingState('idle');
      setElapsedSeconds(0);
    };

    const handleSubmitText = (text: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${prev.length}`,
          sender: 'user' as const,
          content: text,
          timestamp: getTimestamp(),
        },
      ]);
    };

    const handleFilesSelected = (files: File[]) => {
      if (files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    return (
      <ContextCollectionV3View
        {...args}
        conversationPanelProps={{
          ...sharedConversationProps,
          messages,
          onSubmitText: handleSubmitText,
          recordingState,
          elapsedSeconds,
          maxRecordingSeconds: 120,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
          onPauseRecording: handlePauseRecording,
          onResumeRecording: handleResumeRecording,
          onReviewRecording: handleReviewRecording,
          onDiscardRecording: handleDiscardRecording,
          onSubmitRecording: handleSubmitRecording,
          selectedFile: selectedFile ?? undefined,
          onFilesSelected: handleFilesSelected,
          supportedFormats: ['PDF', 'DOCX', 'TXT'],
          maxFileSizeMB: 10,
        }}
      />
    );
  },
};

/** Right panel only — left panel empty. */
export const RightPanelWired: Story = {
  args: {
    conversationPanelProps: sharedConversationProps,
  },
};

/** Empty shell — both panels empty. */
export const EmptyShell: Story = {
  args: {},
};

// ---------------------------------------------------------------------------
// Voice Mode Stories
// ---------------------------------------------------------------------------

/** Voice mode — actively recording. Composed from MultiModeInputPanel.VoiceRecording args. */
export const VoiceModeRecording: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      ...toVoiceConversationProps(ComposedMultiModeInputPanel.VoiceRecording),
    },
  },
};

/** Voice mode — recording paused. Composed from MultiModeInputPanel.VoicePaused args. */
export const VoiceModePaused: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      ...toVoiceConversationProps(ComposedMultiModeInputPanel.VoicePaused),
    },
  },
};

/** Voice mode — recording stopped, ready to review/submit. Composed from MultiModeInputPanel.VoiceStopped args. */
export const VoiceModeStopped: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      ...toVoiceConversationProps(ComposedMultiModeInputPanel.VoiceStopped),
    },
  },
};

// ---------------------------------------------------------------------------
// Upload File Stories
// ---------------------------------------------------------------------------

/** Upload file tab — file selected and ready to submit. */
export const UploadFileSelected: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      selectedFile: new File(['sample content'], 'project_metrics.pdf', {
        type: 'application/pdf',
      }),
      supportedFormats: ['PDF', 'DOCX', 'TXT'],
      maxFileSizeMB: 10,
    },
  },
};

/** Upload file tab — file currently uploading. */
export const UploadFileUploading: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      selectedFile: new File(['sample content'], 'quarterly_report.pdf', {
        type: 'application/pdf',
      }),
      isUploading: true,
      supportedFormats: ['PDF', 'DOCX', 'TXT'],
      maxFileSizeMB: 10,
    },
  },
};

// ---------------------------------------------------------------------------
// Loading & Error States
// ---------------------------------------------------------------------------

/** Submitting state — buttons disabled, input locked. */
export const Submitting: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      isSubmitting: true,
    },
  },
};

/** Submit error — error message displayed below input. */
export const SubmitError: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      submitError: 'Failed to submit your response. Please try again.',
    },
  },
};

// ---------------------------------------------------------------------------
// Mode Filtering Stories
// ---------------------------------------------------------------------------

/** Text-only mode — voice and upload tabs hidden. */
export const TextOnlyMode: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      enabledModes: ['text'],
    },
  },
};

/** Text and voice only — upload tab hidden. */
export const TextAndVoiceOnly: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      enabledModes: ['text', 'voice'],
    },
  },
};

// ---------------------------------------------------------------------------
// Next Question Flow
// ---------------------------------------------------------------------------

/** After answering — Next Question button shown. */
export const NextQuestionFlow: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: 'role_0.bullet_0',
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [
        introMessage,
        makeQuestionMessage(mockQuestions[0], 0),
        {
          id: 'user-answer-1',
          sender: 'user' as const,
          content: 'We tracked support tickets before and after the IAM integration launch. The baseline was 2,400 tickets/month, which dropped to 1,680 tickets/month within the first quarter.',
          timestamp: getTimestamp(),
        },
      ],
      buttonLabel: 'Next Question',
      buttonVariant: 'next' as const,
      inputDisabled: true,
      onNextQuestion: fn(),
    },
  },
};
