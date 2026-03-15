/**
 * TDD Tests for usePipeline Hook
 *
 * Tests the full pipeline lifecycle management hook:
 * - JD submission
 * - Resume submission
 * - Status polling
 * - Report fetching on completion
 * - Error handling
 * - Cleanup on unmount
 * - Demo mode (when VITE_PIPELINE_MODE is not 'true')
 *
 * RED PHASE: These tests define the expected behavior.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePipeline } from '@/hooks/usePipeline';

// Helper to set import.meta.env values
function setEnv(key: string, value: string | undefined) {
  if (value === undefined) {
    delete (import.meta.env as Record<string, string | undefined>)[key];
  } else {
    (import.meta.env as Record<string, string | undefined>)[key] = value;
  }
}

// Mock report fixture
const mockReport = {
  scores: {
    overall_score: 78,
    skills_score: 85,
    experience_score: 72,
    qualifications_score: 68,
    keywords_score: 80,
  },
  matched_skills: [
    {
      resume_skill: 'Product Management',
      jd_skill: 'Product Management',
      match_type: 'exact' as const,
      jd_importance: 'CRITICAL' as const,
      confidence: 1.0,
    },
  ],
  missing_skills: [
    {
      jd_skill: 'Machine Learning',
      importance: 'CRITICAL' as const,
      source_section: 'Requirements',
      suggested_action: 'Highlight ML-adjacent experience',
    },
  ],
  keyword_analysis: {
    present: ['product strategy', 'roadmap'],
    missing: ['machine learning'],
  },
  priority_action_items: [
    {
      priority: 'P0' as const,
      action: 'Add ML experience',
      reason: 'ML is CRITICAL',
      bullets_affected: [2, 5],
    },
  ],
  experience_gaps: [],
  qualification_gaps: [],
};

describe('usePipeline', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    mockFetch = vi.fn();
    global.fetch = mockFetch as typeof fetch;
    setEnv('VITE_PIPELINE_MODE', 'true');
    setEnv('VITE_API_BASE_URL', 'http://localhost:3000/api/v1');
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    setEnv('VITE_PIPELINE_MODE', undefined);
    setEnv('VITE_API_BASE_URL', undefined);
  });

  describe('Initial state', () => {
    it('returns idle stage initially', () => {
      const { result } = renderHook(() => usePipeline());

      expect(result.current.stage).toBe('idle');
    });

    it('returns null analysisId initially', () => {
      const { result } = renderHook(() => usePipeline());

      expect(result.current.analysisId).toBeNull();
    });

    it('returns null report initially', () => {
      const { result } = renderHook(() => usePipeline());

      expect(result.current.report).toBeNull();
    });

    it('returns null error initially', () => {
      const { result } = renderHook(() => usePipeline());

      expect(result.current.error).toBeNull();
    });

    it('returns isComplete as false initially', () => {
      const { result } = renderHook(() => usePipeline());

      expect(result.current.isComplete).toBe(false);
    });
  });

  describe('submitJd flow', () => {
    it('sets stage to submitting_jd when called', async () => {
      // Create a pending promise to keep state at submitting_jd
      let resolvePromise: (value: Response) => void;
      const pendingPromise = new Promise<Response>((resolve) => {
        resolvePromise = resolve;
      });
      mockFetch.mockReturnValueOnce(pendingPromise);

      const { result } = renderHook(() => usePipeline());

      act(() => {
        result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.stage).toBe('submitting_jd');

      // Clean up by resolving
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: async () => ({ analysisId: 'test-123' }),
        } as Response);
      });
    });

    it('stores analysisId on success and sets stage to jd_submitted', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ analysisId: 'analysis-abc' }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.analysisId).toBe('analysis-abc');
      expect(result.current.stage).toBe('jd_submitted');
    });

    it('saves analysisId to localStorage on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ analysisId: 'analysis-saved' }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(localStorage.getItem('pipeline_analysis_id')).toBe('analysis-saved');
    });

    it('sends POST to /pipeline/jd with correct body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ analysisId: 'test-123' }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'Senior PM',
          companyName: 'Meta',
          jobDescription: 'Lead product strategy',
        });
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/jd',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobTitle: 'Senior PM',
            companyName: 'Meta',
            jobDescription: 'Lead product strategy',
          }),
        })
      );
    });

    it('sets error and stage to error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Server error',
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.error).toBe('Server error');
      expect(result.current.stage).toBe('error');
    });

    it('returns the analysisId from submitJd on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ analysisId: 'returned-id' }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      let returnedId: string | undefined;
      await act(async () => {
        returnedId = await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(returnedId).toBe('returned-id');
    });
  });

  describe('submitResume flow', () => {
    it('sets stage to submitting_resume when called', async () => {
      let resolvePromise: (value: Response) => void;
      const pendingPromise = new Promise<Response>((resolve) => {
        resolvePromise = resolve;
      });
      mockFetch.mockReturnValueOnce(pendingPromise);

      const { result } = renderHook(() => usePipeline());

      act(() => {
        result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      expect(result.current.stage).toBe('submitting_resume');

      // Clean up
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: async () => ({}),
        } as Response);
      });
    });

    it('sets stage to processing and starts polling on success', async () => {
      // First call: submitResume POST
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Second call: first poll
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v01_processing',
          message: 'Extracting JD data',
        }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      expect(result.current.stage).toBe('processing');

      // Advance timer to trigger first poll
      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('v01_processing');
      expect(result.current.message).toBe('Extracting JD data');
    });

    it('sends POST with JSON body when resumeId is provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/resume',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            analysisId: 'analysis-123',
            resumeId: 'resume-456',
          }),
        })
      );
    });

    it('sends POST with FormData when file is provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          file,
        });
      });

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('http://localhost:3000/api/v1/pipeline/resume');
      expect(options.method).toBe('POST');
      expect(options.body).toBeInstanceOf(FormData);
      expect((options.body as FormData).get('file')).toBe(file);
      expect((options.body as FormData).get('analysisId')).toBe('analysis-123');
    });

    it('sets error and stage to error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Resume upload failed',
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      expect(result.current.error).toBe('Resume upload failed');
      expect(result.current.stage).toBe('error');
    });
  });

  describe('Polling', () => {
    it('polls getStatus every 3 seconds after submitResume', async () => {
      // submitResume response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // First poll
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v01_processing',
          message: 'Processing JD',
        }),
      } as Response);

      // Second poll
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v02_processing',
          message: 'Processing resume',
        }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      // First poll at 3s
      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('v01_processing');
      expect(result.current.message).toBe('Processing JD');

      // Second poll at 6s
      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('v02_processing');
      expect(result.current.message).toBe('Processing resume');

      // Verify polling URL
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/analysis-123/status'
      );
    });

    it('updates stage and message from polling response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v03_matching',
          message: 'Matching skills',
          progress: 75,
        }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('v03_matching');
      expect(result.current.message).toBe('Matching skills');
    });
  });

  describe('Completion', () => {
    it('stops polling and fetches report when status returns v03_complete', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Poll returns v03_complete
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v03_complete',
          message: 'Analysis complete',
        }),
      } as Response);

      // Report fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('complete');
      expect(result.current.report).toEqual(mockReport);
      expect(result.current.isComplete).toBe(true);

      // Verify report was fetched from correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/analysis-123'
      );
    });

    it('stops polling after completion (no more fetch calls)', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Poll returns v03_complete
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v03_complete',
          message: 'Done',
        }),
      } as Response);

      // Report fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('complete');

      const callCountAfterComplete = mockFetch.mock.calls.length;

      // Advance time further - no more polls should happen
      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });

      expect(mockFetch.mock.calls.length).toBe(callCountAfterComplete);
    });

    it('still completes even if report pre-fetch fails after v03_complete', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Poll returns v03_complete
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'analysis-123',
          stage: 'v03_complete',
          message: 'Done',
        }),
      } as Response);

      // Report pre-fetch fails — should NOT block completion
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      // Stage should be 'complete' — report fetch failure is non-blocking
      expect(result.current.stage).toBe('complete');
      expect(result.current.isComplete).toBe(true);
      expect(result.current.report).toBeNull(); // Report wasn't fetched, but that's OK
      expect(result.current.error).toBeNull();
    });
  });

  describe('Error handling', () => {
    it('sets error and stops polling when status check fails', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Poll fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.error).toBe('Status check failed: 500');
      expect(result.current.stage).toBe('error');

      // No more polls after error
      const callCountAfterError = mockFetch.mock.calls.length;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(6000);
      });
      expect(mockFetch.mock.calls.length).toBe(callCountAfterError);
    });

    it('sets error when network error occurs during polling', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      // Poll throws network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.error).toBe('Network error');
      expect(result.current.stage).toBe('error');
    });

    it('sets error on submitJd network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.error).toBe('Failed to fetch');
      expect(result.current.stage).toBe('error');
    });

    it('clears previous error when new submission is made', async () => {
      // First call fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Server error',
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.error).toBe('Server error');

      // Second call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ analysisId: 'new-id' }),
      } as Response);

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('Cleanup', () => {
    it('clears polling interval on unmount', async () => {
      // submitResume
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const { result, unmount } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitResume({
          analysisId: 'analysis-123',
          resumeId: 'resume-456',
        });
      });

      const callCountBeforeUnmount = mockFetch.mock.calls.length;

      // Unmount the hook
      unmount();

      // Advance timers - no more polling should occur
      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });

      expect(mockFetch.mock.calls.length).toBe(callCountBeforeUnmount);
    });
  });

  describe('resumePolling', () => {
    it('exposes a resumePolling function', () => {
      const { result } = renderHook(() => usePipeline());

      expect(typeof result.current.resumePolling).toBe('function');
    });

    it('reads pipeline_analysis_id from localStorage and starts polling', async () => {
      localStorage.setItem('pipeline_analysis_id', 'persisted-id-123');

      // First poll response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'persisted-id-123',
          stage: 'v02_processing',
          message: 'Analyzing resume',
        }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling();
      });

      expect(result.current.analysisId).toBe('persisted-id-123');
      expect(result.current.stage).toBe('processing');

      // Advance to trigger first poll
      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('v02_processing');
      expect(result.current.message).toBe('Analyzing resume');
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/persisted-id-123/status'
      );
    });

    it('accepts an explicit analysisId parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'explicit-id',
          stage: 'v01_processing',
          message: 'Processing JD',
        }),
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling('explicit-id');
      });

      expect(result.current.analysisId).toBe('explicit-id');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/explicit-id/status'
      );
    });

    it('does nothing if no analysisId in localStorage or parameter', async () => {
      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling();
      });

      // Should stay idle — no polling started
      expect(result.current.stage).toBe('idle');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(6000);
      });

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('stops polling and fetches report on v03_complete', async () => {
      localStorage.setItem('pipeline_analysis_id', 'resume-poll-id');

      // Poll returns v03_complete
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'resume-poll-id',
          stage: 'v03_complete',
          message: 'Done',
        }),
      } as Response);

      // Report fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling();
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.stage).toBe('complete');
      expect(result.current.report).toEqual(mockReport);
      expect(result.current.isComplete).toBe(true);
    });

    it('cleans up polling on unmount after resumePolling', async () => {
      localStorage.setItem('pipeline_analysis_id', 'cleanup-id');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          analysisId: 'cleanup-id',
          stage: 'v01_processing',
          message: 'Processing',
        }),
      } as Response);

      const { result, unmount } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling();
      });

      const callCountBeforeUnmount = mockFetch.mock.calls.length;
      unmount();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(9000);
      });

      expect(mockFetch.mock.calls.length).toBe(callCountBeforeUnmount);
    });

    it('sets error when polling fails after resumePolling', async () => {
      localStorage.setItem('pipeline_analysis_id', 'error-id');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        result.current.resumePolling();
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(result.current.error).toBe('Status check failed: 500');
      expect(result.current.stage).toBe('error');
    });
  });

  describe('Demo mode', () => {
    beforeEach(() => {
      setEnv('VITE_PIPELINE_MODE', undefined);
    });

    it('returns mock data with simulated delays when VITE_PIPELINE_MODE is not true', async () => {
      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      // In demo mode, should simulate the stages
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });

      expect(result.current.analysisId).not.toBeNull();
      expect(result.current.stage).toBe('jd_submitted');
    });

    it('simulates full pipeline in demo mode when submitResume is called', async () => {
      const { result } = renderHook(() => usePipeline());

      // Submit JD in demo mode
      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });

      expect(result.current.stage).toBe('jd_submitted');

      // Submit resume in demo mode
      await act(async () => {
        result.current.submitResume({
          analysisId: result.current.analysisId!,
          resumeId: 'resume-456',
        });
      });

      // Simulate processing stages
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2000);
      });

      expect(['processing', 'v01_processing', 'v02_processing', 'v03_matching', 'complete']).toContain(
        result.current.stage
      );

      // Advance to completion
      await act(async () => {
        await vi.advanceTimersByTimeAsync(10000);
      });

      expect(result.current.stage).toBe('complete');
      expect(result.current.report).not.toBeNull();
      expect(result.current.report!.scores.overall_score).toBeGreaterThan(0);
      expect(result.current.isComplete).toBe(true);
    });

    it('does not make real fetch calls in demo mode', async () => {
      const { result } = renderHook(() => usePipeline());

      await act(async () => {
        await result.current.submitJd({
          jobTitle: 'PM',
          companyName: 'Google',
          jobDescription: 'Build products',
        });
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });
});
