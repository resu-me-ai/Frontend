/**
 * useAnalysis Hook
 *
 * Manages analysis state for the resume analysis flow.
 * Handles API calls, loading states, errors, and result storage.
 */

import { useState, useCallback } from 'react';
import { analyzeResume } from '@/api/analysis';
import type { AnalysisResult, AnalyzeRequest } from '@/api/analysis';

export interface UseAnalysisState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

export interface UseAnalysisActions {
  analyze: (params: AnalyzeRequest) => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
}

export type UseAnalysisReturn = UseAnalysisState & UseAnalysisActions;

/**
 * Hook for managing resume analysis workflow
 *
 * @returns Analysis state and actions
 *
 * @example
 * ```tsx
 * const { analyze, isLoading, error, result } = useAnalysis();
 *
 * const handleAnalyze = async () => {
 *   await analyze({
 *     jdText: jobDescription,
 *     resumeFile: file
 *   });
 * };
 * ```
 */
export function useAnalysis(): UseAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [lastRequest, setLastRequest] = useState<AnalyzeRequest | null>(null);

  /**
   * Analyze resume against job description
   */
  const analyze = useCallback(async (params: AnalyzeRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setLastRequest(params);

    try {
      const analysisResult = await analyzeResume(params);
      setResult(analysisResult);

      // Store result in localStorage for persistence across navigation
      localStorage.setItem('analysis_result', JSON.stringify(analysisResult));
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Reset analysis state
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
    setError(null);
    setResult(null);
    setLastRequest(null);
    localStorage.removeItem('analysis_result');
  }, []);

  /**
   * Retry last analysis request
   */
  const retry = useCallback(async () => {
    if (!lastRequest) {
      setIsError(true);
      setError('No previous request to retry');
      return;
    }

    await analyze(lastRequest);
  }, [lastRequest, analyze]);

  return {
    isLoading,
    isError,
    error,
    result,
    analyze,
    reset,
    retry,
  };
}

/**
 * Load analysis result from localStorage
 * Useful for restoring state after navigation
 */
export function loadAnalysisResult(): AnalysisResult | null {
  try {
    const stored = localStorage.getItem('analysis_result');
    if (!stored) return null;

    return JSON.parse(stored) as AnalysisResult;
  } catch (err) {
    console.error('Failed to load analysis result from localStorage:', err);
    return null;
  }
}
