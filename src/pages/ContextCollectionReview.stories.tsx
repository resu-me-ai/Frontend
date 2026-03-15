import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ContextCollectionV3View } from '@/components/templates/ContextCollectionV3View';
import { QuestionCard } from '@/components/organisms/QuestionCard';
import { SkippedQuestionsModal } from '@/components/molecules/SkippedQuestionsModal';
import type { SkippedQuestion } from '@/components/molecules/SkippedQuestionsModal';
import type { ChatMessage } from '@/types';
import type { RecordingState } from '@/types';
import resumeHtml from '@/assets/resume_ralph_real.html?raw';
import mockQuestionsData from '@/assets/mock_context_questions.json';

// ---------------------------------------------------------------------------
// Question interface (matches mock_context_questions.json)
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

// ---------------------------------------------------------------------------
// Shared conversation props (non-interactive stories)
// ---------------------------------------------------------------------------
const sharedConversationProps = {
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
  recordingState: 'idle' as RecordingState,
  maxCharacters: 2000,
  placeholder: "Type your response to the AI's question...",
  warningText: 'You can only respond to questions one time',
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: 'MVP Flow/5 - Context Collection/ContextCollectionPage',
  component: ContextCollectionV3View,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContextCollectionV3View>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default — Q1/6 initial state (Figma 5540:5158)
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: mockQuestions[0].bulletId,
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [introMessage, makeQuestionMessage(mockQuestions[0], 0)],
      currentQuestion: 1,
    },
  },
};

// ---------------------------------------------------------------------------
// WithUserAnswer — Q1/6 after answering, "Next Question" button (Figma 5551:8734)
// ---------------------------------------------------------------------------
export const WithUserAnswer: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: mockQuestions[0].bulletId,
    highlightedText: mockQuestions[0].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [
        introMessage,
        makeQuestionMessage(mockQuestions[0], 0),
        {
          id: 'user-answer-1',
          sender: 'user' as const,
          content:
            'We tracked support tickets before and after the IAM integration launch. The baseline was 2,400 tickets/month, which dropped to 1,680 tickets/month within the first quarter — a 30% reduction.',
          timestamp: getTimestamp(),
        },
      ],
      currentQuestion: 1,
      buttonLabel: 'Next Question',
      buttonVariant: 'next' as const,
      inputDisabled: true,
      onNextQuestion: fn(),
    },
  },
};

// ---------------------------------------------------------------------------
// MidFlowWithSkipped — Q3/6, "1 Skipped" badge (Figma 5551:8539 / 5570:10259)
// ---------------------------------------------------------------------------
export const MidFlowWithSkipped: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: mockQuestions[2].bulletId,
    highlightedText: mockQuestions[2].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [
        introMessage,
        makeQuestionMessage(mockQuestions[2], 2),
      ],
      currentQuestion: 3,
      skippedCount: 1,
      skippedSegments: [2],
      onSkippedClick: fn(),
    },
  },
};

// ---------------------------------------------------------------------------
// SkippedQuestionsModal — Q3/6 with modal overlay (Figma 5567:9747)
// ---------------------------------------------------------------------------
const skippedForModal: SkippedQuestion[] = [
  {
    id: mockQuestions[1].id,
    bulletId: mockQuestions[1].bulletId,
    questionNumber: 2,
    mainQuestion: mockQuestions[1].mainQuestion,
    resumeQuote: mockQuestions[1].resumeQuote,
  },
];

export const SkippedQuestionsModalStory: Story = {
  name: 'Skipped Questions Modal',
  args: {
    resumeHtml,
    highlightedBulletId: mockQuestions[2].bulletId,
    highlightedText: mockQuestions[2].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [introMessage, makeQuestionMessage(mockQuestions[2], 2)],
      currentQuestion: 3,
      skippedCount: 1,
      skippedSegments: [2],
      onSkippedClick: fn(),
    },
  },
  render: function SkippedModalStory(args) {
    return (
      <>
        <ContextCollectionV3View {...args} />
        <SkippedQuestionsModal
          open={true}
          onClose={fn()}
          skippedQuestions={skippedForModal}
          totalQuestions={6}
          onAnswerNow={fn()}
        />
      </>
    );
  },
};

// ---------------------------------------------------------------------------
// LastQuestionWithFeedback — Q6/6, AI "Fantastic!" + Continue (Figma 5838:6437)
// ---------------------------------------------------------------------------
export const LastQuestionWithFeedback: Story = {
  args: {
    resumeHtml,
    highlightedBulletId: mockQuestions[5].bulletId,
    highlightedText: mockQuestions[5].resumeQuote,
    conversationPanelProps: {
      ...sharedConversationProps,
      messages: [
        introMessage,
        makeQuestionMessage(mockQuestions[5], 5),
        {
          id: 'user-answer-6',
          sender: 'user' as const,
          content:
            'We used automated regression testing with Selenium for the question bank. After migrating to the new CMS, I set up a nightly job that validated all 77,000 questions against source PDFs, catching 340 formatting errors before they hit production.',
          timestamp: getTimestamp(),
        },
        {
          id: 'ai-feedback-6',
          sender: 'ai' as const,
          variant: 'feedback' as const,
          content: (
            <>
              <span className="font-semibold text-success">Fantastic!</span>{' '}
              <span className="text-text-body">
                That demonstrates both technical rigor and proactive quality management at scale. I now have everything I need to enhance your resume bullets.
              </span>
            </>
          ),
          timestamp: getTimestamp(),
        },
      ],
      currentQuestion: 6,
      skippedCount: 0,
      buttonLabel: 'Continue',
      buttonVariant: 'continue' as const,
      inputDisabled: true,
      onNextQuestion: fn(),
    },
  },
};

// ---------------------------------------------------------------------------
// InteractiveFlow — Full 6-question interactive walkthrough
// ---------------------------------------------------------------------------
const completionMessage: ChatMessage = {
  id: 'msg-complete',
  sender: 'ai',
  content:
    "Thanks Ralph! I've collected all the context I need. I'm now generating your enhanced resume bullets with stronger quantification and impact statements. This will just take a moment...",
  timestamp: getTimestamp(),
};

export const InteractiveFlow: Story = {
  args: { resumeHtml },
  render: function InteractiveFlowStory() {
    const [messages, setMessages] = useState<ChatMessage[]>([
      introMessage,
      makeQuestionMessage(mockQuestions[0], 0),
    ]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [awaitingNext, setAwaitingNext] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState<SkippedQuestion[]>([]);
    const [skippedModalOpen, setSkippedModalOpen] = useState(false);
    const [answeringSkipped, setAnsweringSkipped] = useState<SkippedQuestion | null>(null);
    const isComplete = questionIndex >= mockQuestions.length;
    const isLastAnswered = questionIndex === mockQuestions.length - 1 && awaitingNext;

    const currentQ = mockQuestions[Math.min(questionIndex, mockQuestions.length - 1)];

    const handleSubmitText = (text: string) => {
      if (isComplete || awaitingNext) return;

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
        setSkippedQuestions((prev) => prev.filter((q) => q.id !== answeringSkipped.id));
        setAnsweringSkipped(null);
      } else {
        setAwaitingNext(true);
      }
    };

    const handleNextQuestion = () => {
      const nextIndex = questionIndex + 1;

      if (nextIndex < mockQuestions.length) {
        setMessages([introMessage, makeQuestionMessage(mockQuestions[nextIndex], nextIndex)]);
        setQuestionIndex(nextIndex);
      } else {
        setMessages([introMessage, completionMessage]);
        setQuestionIndex(nextIndex);
      }

      setAwaitingNext(false);
    };

    const handleSkip = () => {
      if (isComplete || awaitingNext) return;

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

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-skip-${questionIndex}`,
          sender: 'user' as const,
          content: <span className="text-text-placeholder italic">Skipped</span>,
          timestamp: getTimestamp(),
        },
      ]);

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

    // Button variant logic
    const getButtonProps = () => {
      if (isLastAnswered) {
        return {
          buttonLabel: 'Continue',
          buttonVariant: 'continue' as const,
          inputDisabled: true,
          onNextQuestion: handleNextQuestion,
        };
      }
      if (awaitingNext && !answeringSkipped) {
        return {
          buttonLabel: 'Next Question',
          buttonVariant: 'next' as const,
          inputDisabled: true,
          onNextQuestion: handleNextQuestion,
        };
      }
      return {};
    };

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
            ...getButtonProps(),
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
