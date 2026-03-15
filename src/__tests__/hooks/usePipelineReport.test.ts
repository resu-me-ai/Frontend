/**
 * TDD Tests for usePipelineReport Hook
 *
 * Tests the React hook that fetches pipeline report data
 * with feature flag gating via VITE_PIPELINE_MODE.
 *
 * RED PHASE: These tests define the expected behavior.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { usePipelineReport } from '@/hooks/usePipelineReport';
import type { JDMatchReport } from '@/api/pipeline';

// Mock the pipeline API module
vi.mock('@/api/pipeline', () => ({
  getReport: vi.fn(),
}));

// Import the mocked function for controlling behavior
import { getReport } from '@/api/pipeline';
const mockGetReport = vi.mocked(getReport);

// Fixture: a valid JDMatchReport response
const mockReport: JDMatchReport = {
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
      match_type: 'exact',
      jd_importance: 'CRITICAL',
      confidence: 1.0,
    },
  ],
  missing_skills: [
    {
      jd_skill: 'Machine Learning',
      importance: 'CRITICAL',
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
      priority: 'P0',
      action: 'Add ML experience',
      reason: 'ML is CRITICAL',
      bullets_affected: [2, 5],
    },
  ],
  experience_gaps: [
    {
      gap_type: 'years',
      required: 7,
      actual: 5,
      mitigation: 'Emphasize project scope',
    },
  ],
  qualification_gaps: [
    {
      gap_type: 'certification',
      required: 'PMP',
      status: 'missing',
      importance: 'NICE_TO_HAVE',
    },
  ],
};

// Helper to set import.meta.env values
function setEnv(pipelineMode: string | undefined) {
  if (pipelineMode === undefined) {
    delete (import.meta.env as Record<string, string | undefined>).VITE_PIPELINE_MODE;
  } else {
    (import.meta.env as Record<string, string | undefined>).VITE_PIPELINE_MODE = pipelineMode;
  }
}

describe('usePipelineReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setEnv('true'); // Default: pipeline mode enabled
  });

  afterEach(() => {
    setEnv(undefined); // Clean up env
  });

  describe('Feature flag gating', () => {
    it('does not fetch when VITE_PIPELINE_MODE is not set', async () => {
      setEnv(undefined);

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      // Should not call getReport
      expect(mockGetReport).not.toHaveBeenCalled();

      // Should return idle state
      expect(result.current.report).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('does not fetch when VITE_PIPELINE_MODE is "false"', async () => {
      setEnv('false');

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      expect(mockGetReport).not.toHaveBeenCalled();
      expect(result.current.report).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('fetches when VITE_PIPELINE_MODE is "true"', async () => {
      setEnv('true');
      mockGetReport.mockResolvedValueOnce(mockReport);

      renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(mockGetReport).toHaveBeenCalledWith('analysis-123');
      });
    });
  });

  describe('Loading state', () => {
    it('sets isLoading to true while fetching', async () => {
      let resolvePromise: (value: JDMatchReport) => void;
      const pendingPromise = new Promise<JDMatchReport>((resolve) => {
        resolvePromise = resolve;
      });
      mockGetReport.mockReturnValueOnce(pendingPromise);

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      expect(result.current.isLoading).toBe(true);

      // Resolve to clean up
      await act(async () => {
        resolvePromise!(mockReport);
      });
    });

    it('sets isLoading to false after fetch completes', async () => {
      mockGetReport.mockResolvedValueOnce(mockReport);

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('Successful fetch', () => {
    it('returns the report data after successful fetch', async () => {
      mockGetReport.mockResolvedValueOnce(mockReport);

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.report).toEqual(mockReport);
      });
    });

    it('has null error on success', async () => {
      mockGetReport.mockResolvedValueOnce(mockReport);

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.report).not.toBeNull();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('Error handling', () => {
    it('sets error message when fetch fails', async () => {
      mockGetReport.mockRejectedValueOnce(new Error('Failed to fetch report: 500'));

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch report: 500');
      });
    });

    it('report is null when fetch fails', async () => {
      mockGetReport.mockRejectedValueOnce(new Error('Failed to fetch report: 404'));

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.error).not.toBeNull();
      });

      expect(result.current.report).toBeNull();
    });

    it('isLoading is false when fetch fails', async () => {
      mockGetReport.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).not.toBeNull();
      });
    });

    it('handles non-Error thrown values', async () => {
      mockGetReport.mockRejectedValueOnce('Something went wrong');

      const { result } = renderHook(() => usePipelineReport('analysis-123'));

      await waitFor(() => {
        expect(result.current.error).toBe('An unexpected error occurred');
      });
    });
  });

  describe('analysisId changes', () => {
    it('refetches when analysisId changes', async () => {
      mockGetReport.mockResolvedValue(mockReport);

      const { rerender } = renderHook(
        ({ id }) => usePipelineReport(id),
        { initialProps: { id: 'analysis-1' } }
      );

      await waitFor(() => {
        expect(mockGetReport).toHaveBeenCalledWith('analysis-1');
      });

      rerender({ id: 'analysis-2' });

      await waitFor(() => {
        expect(mockGetReport).toHaveBeenCalledWith('analysis-2');
      });
    });

    it('does not fetch when analysisId is empty string', async () => {
      const { result } = renderHook(() => usePipelineReport(''));

      expect(mockGetReport).not.toHaveBeenCalled();
      expect(result.current.report).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
