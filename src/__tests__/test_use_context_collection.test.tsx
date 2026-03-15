/**
 * useContextCollection Hook Tests - Track B (Frontend V0.5)
 *
 * TDD failing tests for the context collection custom hook.
 * This hook manages:
 * - Fetching current question from API
 * - Submitting answers and getting next question
 * - Tracking progress state
 *
 * These tests will FAIL until useContextCollection is implemented.
 *
 * @see Linear: Track B Frontend V0.5
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useContextCollection } from '@/hooks/useContextCollection';

// Mock API responses
const mockQuestion = {
  id: 'q1',
  bulletId: 'role_0.bullet_0',
  resumeQuote: 'Led cross-functional team of 8 engineers',
  mainQuestion: 'Can you tell me more about this experience?',
};

const mockNextQuestion = {
  id: 'q2',
  bulletId: 'role_0.bullet_1',
  resumeQuote: 'Implemented CI/CD pipeline reducing deployment time by 60%',
  mainQuestion: 'Tell me about this technical achievement.',
};

const mockProgressState = {
  currentQuestion: 1,
  totalQuestions: 10,
  completedQuestions: [],
  resumeData: {
    name: 'Test User',
    email: 'test@example.com',
    experiences: [],
  },
};

// Create wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useContextCollection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as ReturnType<typeof vi.fn>).mockReset();
  });

  describe('Initial State', () => {
    it('starts in loading state', () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() =>
        new Promise(() => {}) // Never resolves
      );

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('question is null while loading', () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() =>
        new Promise(() => {})
      );

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      expect(result.current.currentQuestion).toBeNull();
    });

    it('progress is null while loading', () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() =>
        new Promise(() => {})
      );

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      expect(result.current.progress).toBeNull();
    });
  });

  describe('Fetching Current Question', () => {
    it('fetches current question from API', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/context-collection/session-123/current'),
        expect.any(Object)
      );
    });

    it('populates currentQuestion after fetch', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.currentQuestion).toEqual(mockQuestion);
      });
    });

    it('populates progress state after fetch', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.progress).toEqual(mockProgressState);
      });
    });

    it('handles fetch error', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Network error')
      );

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });
    });

    it('handles API error response', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Session not found' }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('Submitting Answers', () => {
    it('submits answer and gets next question', async () => {
      // Initial fetch
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        // Submit answer
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockNextQuestion,
            progress: {
              ...mockProgressState,
              currentQuestion: 2,
              completedQuestions: [1],
            },
          }),
        });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.currentQuestion).toEqual(mockQuestion);
      });

      // Submit answer
      await act(async () => {
        await result.current.submitAnswer('My detailed answer about the experience');
      });

      // Should call API with answer
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/context-collection/session-123/answer'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('My detailed answer about the experience'),
        })
      );

      // Submit no longer auto-updates cache (#227) — question stays the same
      expect(result.current.currentQuestion).toEqual(mockQuestion);

      // Mock the refetch response (next /current call returns next question)
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockNextQuestion,
          progress: {
            ...mockProgressState,
            currentQuestion: 2,
            completedQuestions: [1],
          },
        }),
      });

      // Calling refetch advances to next question (simulates "Next Question" click)
      await act(async () => {
        await result.current.refetch();
      });

      await waitFor(() => {
        expect(result.current.currentQuestion).toEqual(mockNextQuestion);
      });
    });

    it('updates progress state only after refetch, not after submission (#227)', async () => {
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockNextQuestion,
            progress: {
              currentQuestion: 2,
              totalQuestions: 10,
              completedQuestions: [1],
            },
          }),
        });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.submitAnswer('Answer');
      });

      // Progress should NOT have updated yet (submit no longer auto-updates cache)
      expect(result.current.progress?.completedQuestions).toEqual([]);

      // Mock refetch response
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockNextQuestion,
          progress: {
            currentQuestion: 2,
            totalQuestions: 10,
            completedQuestions: [1],
          },
        }),
      });

      // Refetch advances to next question
      await act(async () => {
        await result.current.refetch();
      });

      await waitFor(() => {
        expect(result.current.progress?.completedQuestions).toContain(1);
        expect(result.current.progress?.currentQuestion).toBe(2);
      });
    });

    it('sets isSubmitting to true during submission', async () => {
      let resolveSubmit: (value: unknown) => void;
      const submitPromise = new Promise((resolve) => {
        resolveSubmit = resolve;
      });

      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockImplementationOnce(() => submitPromise);

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Start submission
      act(() => {
        result.current.submitAnswer('Answer');
      });

      // Should be submitting (may need a tick for React Query to update)
      await waitFor(() => {
        expect(result.current.isSubmitting).toBe(true);
      });

      // Resolve submission
      resolveSubmit!({
        ok: true,
        json: async () => ({
          question: mockNextQuestion,
          progress: mockProgressState,
        }),
      });

      await waitFor(() => {
        expect(result.current.isSubmitting).toBe(false);
      });
    });

    it('handles submission error', async () => {
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockRejectedValueOnce(new Error('Submission failed'));

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        try {
          await result.current.submitAnswer('Answer');
        } catch {
          // Expected error
        }
      });

      await waitFor(() => {
        expect(result.current.submitError).toBeTruthy();
      });
    });
  });

  describe('Skip Question', () => {
    it('provides skipQuestion function', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(typeof result.current.skipQuestion).toBe('function');
    });

    it('should prevent concurrent skip requests (race condition fix)', async () => {
      let skipCallCount = 0;
      const skipPromises: Array<(value: unknown) => void> = [];

      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockImplementation(() => {
          skipCallCount++;
          return new Promise((resolve) => {
            skipPromises.push(resolve);
          });
        });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Rapid fire skip clicks (simulating race condition)
      // Don't await - we want them to fire concurrently
      act(() => {
        result.current.skipQuestion();
        result.current.skipQuestion();
        result.current.skipQuestion();
      });

      // Wait for any pending state updates
      await waitFor(() => {
        expect(result.current.isSkipping).toBe(true);
      });

      // Should only make ONE request (others blocked by in-flight check)
      expect(skipCallCount).toBe(1);

      // Resolve all pending skip promises
      skipPromises.forEach((resolve) => {
        resolve({
          ok: true,
          json: async () => ({
            question: mockNextQuestion,
            progress: {
              currentQuestion: 2,
              totalQuestions: 10,
              completedQuestions: [],
            },
          }),
        });
      });

      await waitFor(() => {
        expect(result.current.isSkipping).toBe(false);
      });
    });

    it('calls API to skip and gets next question', async () => {
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockNextQuestion,
            progress: {
              currentQuestion: 2,
              totalQuestions: 10,
              completedQuestions: [], // Skipped questions not added to completed
            },
          }),
        });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.skipQuestion();
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/context-collection/session-123/skip'),
        expect.any(Object)
      );
    });
  });

  describe('Progress Tracking', () => {
    it('tracks progress state', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: {
            currentQuestion: 3,
            totalQuestions: 10,
            completedQuestions: [1, 2],
            resumeData: mockProgressState.resumeData,
          },
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.progress?.currentQuestion).toBe(3);
        expect(result.current.progress?.totalQuestions).toBe(10);
        expect(result.current.progress?.completedQuestions).toEqual([1, 2]);
      });
    });

    it('provides resume data from progress', async () => {
      const resumeData = {
        name: 'John Doe',
        email: 'john@example.com',
        experiences: [
          {
            id: 'exp1',
            company: 'Tech Corp',
            role: 'Engineer',
            duration: '2020-2022',
            bullets: [{ id: 'b1', text: 'Did something', isAnswered: false }],
          },
        ],
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: {
            ...mockProgressState,
            resumeData,
          },
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.progress?.resumeData).toEqual(resumeData);
      });
    });

    it('provides currentBulletId for highlighting', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: { ...mockQuestion, bulletId: 'b3' },
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.currentBulletId).toBe('b3');
      });
    });
  });

  describe('Session Completion', () => {
    it('detects when all questions are answered', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: null, // No more questions
          questionsReady: true, // Backend confirms all questions generated
          progress: {
            currentQuestion: 10,
            totalQuestions: 10,
            completedQuestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isComplete).toBe(true);
      });
    });

    it('provides completion percentage', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: {
            currentQuestion: 5,
            totalQuestions: 10,
            completedQuestions: [1, 2, 3, 4],
          },
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.completionPercentage).toBe(40); // 4/10 = 40%
      });
    });
  });

  describe('Refetch', () => {
    it('provides refetch function', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          question: mockQuestion,
          progress: mockProgressState,
        }),
      });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(typeof result.current.refetch).toBe('function');
    });

    it('refetch gets fresh data from API', async () => {
      (global.fetch as ReturnType<typeof vi.fn>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockQuestion,
            progress: mockProgressState,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            question: mockNextQuestion,
            progress: {
              ...mockProgressState,
              currentQuestion: 2,
            },
          }),
        });

      const { result } = renderHook(() => useContextCollection('session-123'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.currentQuestion?.id).toBe('q1');
      });

      await act(async () => {
        await result.current.refetch();
      });

      await waitFor(() => {
        expect(result.current.currentQuestion?.id).toBe('q2');
      });
    });
  });
});
