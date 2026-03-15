import { useRef, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

export interface Subquestion {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  bulletId: string;
  resumeQuote: string;
  mainQuestion: string;
  /** Specific excerpt for the blockquote display (more targeted than resumeQuote) */
  quoteText?: string;
  /** Text to highlight in resume preview (same as quoteText) */
  highlightedText?: string;
  /** Variable placeholder the answer will fill (e.g., [$dollar_context]) - metadata */
  targetVariable?: string;
  /** Variation type (e.g., results_first, efforts_first, oirc) - metadata */
  targetVariation?: string;
  /** List of specific sub-prompts displayed as bullet points under the main question */
  subquestions?: Subquestion[];
  /** Example showing expected answer format */
  answerFills?: string;
}

export interface ProgressState {
  currentQuestion: number;
  totalQuestions: number;
  completedQuestions: number[];
  resumeData: {
    name: string;
    email: string;
    experiences: Array<{
      id: string;
      company: string;
      role: string;
      duration: string;
      bullets: Array<{
        id: string;
        text: string;
        isAnswered: boolean;
      }>;
    }>;
  };
}

export interface CurrentQuestionResponse {
  question: Question | null;
  progress: ProgressState;
  questionsReady?: boolean;
}

export interface SubmitAnswerResponse {
  question: Question | null;
  progress: ProgressState;
  questionsReady?: boolean;
}

export const useContextCollection = (sessionId: string) => {
  const queryClient = useQueryClient();

  // Ref-based in-flight flag to prevent race conditions on rapid skip clicks.
  // React state updates are async, so isPending may not reflect the true state
  // when multiple clicks happen in quick succession.
  const isSkipInFlightRef = useRef(false);
  const [questionsReadyLocal, setQuestionsReadyLocal] = useState(false);

  // Fetch current question
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<CurrentQuestionResponse>({
    queryKey: ['context-collection', sessionId, 'current'],
    queryFn: async () => {
      console.log('[useContextCollection] Fetching current question for session:', sessionId);
      const result = await apiClient.request<CurrentQuestionResponse>(
        `/context-collection/${sessionId}/current`
      );
      console.log('[useContextCollection] Current question:', {
        questionId: result?.question?.id,
        bulletId: result?.question?.bulletId,
        progress: `${result?.progress?.completedQuestions?.length}/${result?.progress?.totalQuestions}`,
      });
      if (result?.questionsReady) setQuestionsReadyLocal(true);
      return result;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // Poll for questionsReady without overwriting the displayed question
  useEffect(() => {
    if (questionsReadyLocal || !sessionId) return;
    const interval = setInterval(async () => {
      try {
        const result = await apiClient.request<CurrentQuestionResponse>(
          `/context-collection/${sessionId}/current`
        );
        if (result?.questionsReady) {
          setQuestionsReadyLocal(true);
        }
      } catch (err) {
        console.warn('[useContextCollection] Polling failed:', err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [sessionId, questionsReadyLocal]);

  // Submit answer mutation
  const submitMutation = useMutation<SubmitAnswerResponse, Error, { answer: string; questionId?: string }>({
    mutationFn: async ({ answer, questionId }) => {
      console.log('[useContextCollection] Submitting answer:', { sessionId, answer: answer.slice(0, 80) });
      const result = await apiClient.request<SubmitAnswerResponse>(
        `/context-collection/${sessionId}/answer`,
        {
          method: 'POST',
          body: JSON.stringify({
            answer,
            inputType: 'text',
            ...(questionId && { questionId }),
          }),
        }
      );
      console.log('[useContextCollection] Answer submitted, next question:', result?.question?.id);
      return result;
    },
    // Don't update cache here — the next question should only appear when the user
    // clicks "Next Question", which calls refetch(). This prevents Q2 from appearing
    // in the chat immediately after answering Q1.
  });

  // Skip question mutation
  const skipMutation = useMutation<SubmitAnswerResponse, Error, void>({
    mutationFn: async () => {
      console.log('[useContextCollection] Skipping question for session:', sessionId);
      const result = await apiClient.request<SubmitAnswerResponse>(
        `/context-collection/${sessionId}/skip`,
        {
          method: 'POST',
        }
      );
      console.log('[useContextCollection] Question skipped, next question:', result?.question?.id);
      return result;
    },
    onSuccess: (response) => {
      queryClient.setQueryData<CurrentQuestionResponse>(
        ['context-collection', sessionId, 'current'],
        response
      );
    },
  });

  const submitAnswer = async (answer: string, questionId?: string) => {
    return submitMutation.mutateAsync({ answer, questionId });
  };

  const skipQuestion = async () => {
    // Prevent concurrent skip requests (race condition fix for #319)
    if (isSkipInFlightRef.current) {
      console.log('[useContextCollection] Skip request blocked - already in flight');
      return;
    }

    isSkipInFlightRef.current = true;
    try {
      return await skipMutation.mutateAsync();
    } finally {
      isSkipInFlightRef.current = false;
    }
  };

  const currentQuestion = data?.question ?? null;
  const progress = data?.progress ?? null;
  const currentBulletId = currentQuestion?.bulletId ?? null;
  const questionsReady = questionsReadyLocal || (data?.questionsReady ?? false);

  // Only truly complete when no question AND backend confirms all questions are done
  const isComplete = currentQuestion === null && progress !== null && questionsReady;
  const completionPercentage = progress
    ? Math.round((progress.completedQuestions.length / progress.totalQuestions) * 100)
    : 0;

  return {
    currentQuestion,
    progress,
    currentBulletId,
    questionsReady,
    isLoading,
    isFetching,
    error,
    isSubmitting: submitMutation.isPending,
    isSkipping: skipMutation.isPending,
    submitError: submitMutation.error,
    isComplete,
    completionPercentage,
    submitAnswer,
    skipQuestion,
    refetch,
  };
};
