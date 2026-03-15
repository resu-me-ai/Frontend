/**
 * usePipelineReport Hook
 *
 * Fetches a JDMatchReport from the pipeline API.
 * Gated behind the VITE_PIPELINE_MODE environment variable.
 *
 * Only fetches when:
 * - VITE_PIPELINE_MODE === 'true'
 * - analysisId is a non-empty string
 *
 * Uses useState/useEffect (no external dependencies like react-query).
 */

import { useState, useEffect } from 'react';
import { getReport } from '@/api/pipeline';
import type { JDMatchReport } from '@/api/pipeline';

export interface UsePipelineReportReturn {
  report: JDMatchReport | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * React hook to fetch a pipeline analysis report.
 *
 * @param analysisId - The unique identifier for the analysis run
 * @returns Object containing report data, loading state, and error state
 *
 * @example
 * ```tsx
 * const { report, isLoading, error } = usePipelineReport('analysis-123');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * if (report) return <ReportView data={report} />;
 * ```
 */
export function usePipelineReport(analysisId: string): UsePipelineReportReturn {
  const [report, setReport] = useState<JDMatchReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Gate: only fetch when pipeline mode is enabled
    const pipelineMode = import.meta.env.VITE_PIPELINE_MODE;
    if (pipelineMode !== 'true') {
      return;
    }

    // Gate: only fetch when analysisId is non-empty
    if (!analysisId) {
      return;
    }

    let cancelled = false;

    const fetchReport = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getReport(analysisId);
        if (!cancelled) {
          setReport(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'An unexpected error occurred'
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchReport();

    return () => {
      cancelled = true;
    };
  }, [analysisId]);

  return { report, isLoading, error };
}
