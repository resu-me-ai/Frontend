import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextCollectionV3View } from '@/components/templates/ContextCollectionV3View';
import type { ChatMessage } from '@/components/organisms/ChatMessageList';
import { SkippedQuestionsModal } from '@/components/molecules/SkippedQuestionsModal';
import type { SkippedQuestion } from '@/components/molecules/SkippedQuestionsModal';
import { useContextCollection } from '@/hooks/useContextCollection';
import { useResumeHtml } from '@/hooks/useResumeHtml';

export const ContextCollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { resumeHtml } = useResumeHtml(sessionId || '');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [answeredQuestionId, setAnsweredQuestionId] = useState<string | null>(null);
  const [skippedQuestions, setSkippedQuestions] = useState<SkippedQuestion[]>([]);
  const [skippedModalOpen, setSkippedModalOpen] = useState(false);
  const [answeringSkipped, setAnsweringSkipped] = useState<SkippedQuestion | null>(null);
  const {
    currentQuestion,
    progress,
    isLoading,
    isFetching,
    isSubmitting,
    isSkipping,
    submitError,
    isComplete,
    questionsReady,
    error,
    submitAnswer,
    skipQuestion,
    refetch,
  } = useContextCollection(sessionId || '');

  // Derive answered state — not in "answered" mode when answering a skipped question
  const answered = !answeringSkipped && answeredQuestionId !== null && answeredQuestionId === currentQuestion?.id;

  // Redirect when all questions are complete
  useEffect(() => {
    if (isComplete && sessionId) {
      navigate(`/generating/${sessionId}`);
    }
  }, [isComplete, sessionId, navigate]);

  // Build chat messages from current question + history
  // Runs when currentQuestion changes OR when chat is cleared (chatHistory.length === 0)
  useEffect(() => {
    if (!currentQuestion) return;
    if (answeringSkipped) return; // Don't rebuild while answering a skipped question

    // Check if we already have a message for this question
    const questionMsgId = `ai-${currentQuestion.id}`;
    const alreadyExists = chatHistory.some(m => m.id === questionMsgId);
    if (alreadyExists) return;

    // Prefer quoteText over resumeQuote for display
    const displayQuote = currentQuestion.quoteText || currentQuestion.resumeQuote;

    const aiMessage: ChatMessage = {
      id: questionMsgId,
      sender: 'ai',
      content: (
        <div>
          {displayQuote && (
            <blockquote className="border-l-2 border-action-primary pl-3 mb-3 text-sm text-text-subtle italic">
              &ldquo;{displayQuote}&rdquo;
            </blockquote>
          )}
          <p className="text-sm text-text-heading">{currentQuestion.mainQuestion}</p>
          {currentQuestion.subquestions && currentQuestion.subquestions.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-text-subtle space-y-1 pl-2">
              {currentQuestion.subquestions.map((sq) => (
                <li key={sq.id}>{sq.text}</li>
              ))}
            </ul>
          )}
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory([aiMessage]);
  }, [currentQuestion?.id, answeringSkipped]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (text: string) => {
    const targetId = answeringSkipped?.id ?? currentQuestion?.id;
    const userMessage: ChatMessage = {
      id: `user-${targetId}-answer`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      await submitAnswer(text, answeringSkipped ? targetId : undefined);

      if (answeringSkipped) {
        setSkippedQuestions(prev => prev.filter(q => q.id !== answeringSkipped.id));
        setAnsweringSkipped(null);
        // Reset chat to show the real current question again
        setChatHistory([]);
      } else {
        setAnsweredQuestionId(currentQuestion?.id ?? null);
      }
    } catch {
      // submitError is surfaced via useContextCollection hook state
    }
  };

  const handleNextQuestion = async () => {
    setChatHistory([]);
    await refetch();
    setAnsweredQuestionId(null);
  };

  const handleSkip = async () => {
    if (currentQuestion && progress) {
      setSkippedQuestions(prev => [...prev, {
        id: currentQuestion.id,
        bulletId: currentQuestion.bulletId,
        questionNumber: progress.currentQuestion,
        mainQuestion: currentQuestion.mainQuestion,
        resumeQuote: currentQuestion.resumeQuote,
        quoteText: currentQuestion.quoteText,
        subquestions: currentQuestion.subquestions,
      }]);
    }

    setChatHistory([]);
    await skipQuestion();
    setAnsweredQuestionId(null);
  };

  const handleAnswerNow = (question: SkippedQuestion) => {
    setSkippedModalOpen(false);
    setAnsweringSkipped(question);

    // Prefer quoteText over resumeQuote for display
    const displayQuote = question.quoteText || question.resumeQuote;

    const aiMessage: ChatMessage = {
      id: `ai-${question.id}-retry`,
      sender: 'ai',
      content: (
        <div>
          {displayQuote && (
            <blockquote className="border-l-2 border-action-primary pl-3 mb-3 text-sm text-text-subtle italic">
              &ldquo;{displayQuote}&rdquo;
            </blockquote>
          )}
          <p className="text-sm text-text-heading">{question.mainQuestion}</p>
          {question.subquestions && question.subquestions.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-text-subtle space-y-1 pl-2">
              {question.subquestions.map((sq) => (
                <li key={sq.id}>{sq.text}</li>
              ))}
            </ul>
          )}
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatHistory([aiMessage]);
  };

  if (isLoading) {
    return (
      <div
        data-testid="context-collection-page"
        className="flex flex-col h-screen bg-gray-50"
      >
        <div data-testid="context-collection-skeleton" className="w-full p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div
        data-testid="context-collection-page"
        className="flex flex-col h-screen bg-gray-50"
      >
        <div className="flex-1 flex items-center justify-center">
          <div data-testid="fetch-error-banner" role="alert" className="text-center space-y-3">
            <p className="text-red-600 text-sm">Failed to load questions. Please try again.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !progress) {
    return (
      <div
        data-testid="context-collection-page"
        className="flex flex-col h-screen bg-gray-50"
      >
        <div className="flex-1 flex items-center justify-center">
          {!questionsReady ? (
            <div className="text-center space-y-3">
              <div className="animate-spin h-8 w-8 border-4 border-action-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-500">Generating your personalized questions...</p>
            </div>
          ) : (
            <p className="text-gray-500">No questions available</p>
          )}
        </div>
      </div>
    );
  }

  // Append a typing indicator when fetching the next question
  const displayMessages: ChatMessage[] = isFetching && answered
    ? [
        ...chatHistory,
        {
          id: 'typing-indicator',
          sender: 'ai' as const,
          content: (
            <span className="inline-flex items-center gap-1 text-sm text-text-placeholder">
              <span className="animate-pulse">...</span>
              Preparing next question
            </span>
          ),
          timestamp: '',
        },
      ]
    : chatHistory;

  return (
    <div data-testid="context-collection-page">
      <ContextCollectionV3View
        resumeHtml={resumeHtml}
        highlightedBulletId={answeringSkipped?.bulletId ?? currentQuestion.bulletId}
        highlightedText={currentQuestion.highlightedText || currentQuestion.quoteText || currentQuestion.resumeQuote || undefined}
        conversationPanelProps={{
          title: 'AI Enhancement Conversation',
          currentQuestion: answeringSkipped ? answeringSkipped.questionNumber : progress.currentQuestion,
          totalQuestions: progress.totalQuestions,
          messages: displayMessages,
          onSubmitText: handleSubmit,
          maxCharacters: 2000,
          placeholder: 'Share your experience...',
          onSkip: handleSkip,
          isSubmitting: isSubmitting || isSkipping || isFetching,
          submitError: submitError ? 'Failed to submit your response. Please try again.' : null,
          buttonLabel: answered ? (isFetching ? 'Loading...' : questionsReady ? 'Next Question' : 'Preparing questions...') : undefined,
          buttonVariant: answered ? 'next' : 'primary',
          nextDisabled: answered && !questionsReady,
          inputDisabled: answered,
          onNextQuestion: handleNextQuestion,
          recordingState: 'idle' as const,
          onStartRecording: () => {},
          onStopRecording: () => {},
          onPauseRecording: () => {},
          onResumeRecording: () => {},
          onFilesSelected: () => {},
          enabledModes: ['text', 'voice', 'upload'],
          skippedCount: skippedQuestions.filter(q => q.id !== answeringSkipped?.id).length,
          onSkippedClick: () => setSkippedModalOpen(true),
          skippedSegments: skippedQuestions.filter(q => q.id !== answeringSkipped?.id).map(q => q.questionNumber),
        }}
      />
      <SkippedQuestionsModal
        open={skippedModalOpen}
        onClose={() => setSkippedModalOpen(false)}
        skippedQuestions={skippedQuestions}
        totalQuestions={progress.totalQuestions}
        onAnswerNow={handleAnswerNow}
      />
    </div>
  );
};
