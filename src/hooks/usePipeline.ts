/**
 * usePipeline Hook
 *
 * Manages the entire pipeline lifecycle:
 * - JD submission (submitJd)
 * - Resume submission (submitResume)
 * - Status polling (every 3 seconds)
 * - Report fetching on completion (v03_complete)
 * - Error handling
 * - Cleanup on unmount
 * - Demo mode (when VITE_PIPELINE_MODE is not 'true')
 *
 * Uses useState/useEffect/useCallback/useRef (no external dependencies).
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { JDMatchReport, PipelineStatus } from '@/api/pipeline';
import { getApiBase } from '@/lib/api';

export type { JDMatchReport, PipelineStatus };

// Mock report for demo mode
const DEMO_REPORT: JDMatchReport = {
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
    {
      resume_skill: 'Agile Methodology',
      jd_skill: 'Agile',
      match_type: 'synonym',
      jd_importance: 'IMPORTANT',
      confidence: 0.92,
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
    present: ['product strategy', 'roadmap', 'stakeholder management'],
    missing: ['machine learning', 'data science'],
  },
  priority_action_items: [
    {
      priority: 'P0',
      action: 'Add ML experience',
      reason: 'ML is listed as CRITICAL requirement',
      bullets_affected: [2, 5],
    },
  ],
  experience_gaps: [],
  qualification_gaps: [],
};

// Demo mode stage sequence with delays (ms)
const DEMO_STAGES = [
  { stage: 'processing', message: 'Starting analysis...', delay: 500 },
  { stage: 'v01_processing', message: 'Extracting JD requirements...', delay: 2000 },
  { stage: 'v02_processing', message: 'Analyzing resume content...', delay: 2500 },
  { stage: 'v03_matching', message: 'Matching skills and experience...', delay: 2000 },
  { stage: 'complete', message: 'Analysis complete', delay: 1500 },
];

export interface UsePipelineReturn {
  analysisId: string | null;
  stage: string;
  message: string;
  report: JDMatchReport | null;
  error: string | null;
  submitJd: (params: { jobTitle: string; companyName: string; jobDescription: string }) => Promise<string | undefined>;
  submitResume: (params: { analysisId: string; file?: File; resumeId?: string }) => Promise<void>;
  resumePolling: (id?: string) => void;
  isComplete: boolean;
}

/**
 * React hook for managing the full pipeline lifecycle.
 *
 * In live mode (VITE_PIPELINE_MODE=true), it submits to the real API
 * and polls for status updates every 3 seconds.
 *
 * In demo mode (VITE_PIPELINE_MODE is not 'true'), it simulates the
 * pipeline stages with delays and returns mock data.
 *
 * @returns Pipeline state and action functions
 *
 * @example
 * ```tsx
 * const { analysisId, stage, message, report, isComplete, submitJd, submitResume } = usePipeline();
 * ```
 */
export function usePipeline(): UsePipelineReturn {
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [stage, setStage] = useState<string>('idle');
  const [message, setMessage] = useState<string>('');
  const [report, setReport] = useState<JDMatchReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completingRef = useRef(false);
  const pollingStartRef = useRef<number>(0);
  const demoTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isPipelineMode = import.meta.env.VITE_PIPELINE_MODE === 'true';

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const clearDemoTimeouts = useCallback(() => {
    demoTimeoutsRef.current.forEach((t) => clearTimeout(t));
    demoTimeoutsRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
      clearDemoTimeouts();
    };
  }, [stopPolling, clearDemoTimeouts]);

  // Stages that indicate a pipeline failure — stop polling and show error
  const FAILURE_STAGES = new Set(['jd_failed', 'resume_parsing_failed', 'error']);
  const POLLING_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

  // State machine (stage values):
  //   idle → submitting_jd → jd_submitted → submitting_resume
  //   → processing → v01_processing → v02_processing → v03_matching
  //   → v03_complete → complete
  //   Any stage may transition to: error | jd_failed | resume_parsing_failed
  const startPolling = useCallback((id: string) => {
    completingRef.current = false; // Reset guard for new polling session
    pollingStartRef.current = Date.now();
    stopPolling(); // Clear any existing interval before starting a new one
    pollingRef.current = setInterval(async () => {
      // Timeout guard: stop polling after 5 minutes
      if (Date.now() - pollingStartRef.current > POLLING_TIMEOUT_MS) {
        stopPolling();
        setError('Analysis timed out. Please try again.');
        setStage('error');
        return;
      }
      try {
        const res = await fetch(`${getApiBase()}/pipeline/${id}/status`);
        if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
        const status: PipelineStatus = await res.json();
        setStage(status.stage);
        setMessage(status.message);

        // Detect failure stages
        if (FAILURE_STAGES.has(status.stage)) {
          stopPolling();
          setError(status.message || 'Pipeline failed.');
          setStage('error');
          return;
        }

        if (status.stage === 'v03_complete') {
          // completingRef prevents a race where two overlapping interval ticks
          // both detect v03_complete and trigger duplicate report fetches/navigation.
          if (completingRef.current) return; // Guard: already handling completion
          completingRef.current = true;
          stopPolling();
          setStage('complete'); // Navigate immediately — score page fetches its own report
          // Non-blocking: pre-fetch report for cache/convenience
          try {
            const reportRes = await fetch(`${getApiBase()}/pipeline/${id}`);
            if (reportRes.ok) {
              const reportData = await reportRes.json();
              setReport(reportData);
            }
          } catch {
            // Ignore — score page fetches its own report independently
          }
        }
      } catch (err: any) {
        setError(err.message);
        stopPolling();
        setStage('error');
      }
    }, 3000);
  }, [stopPolling]);

  const submitJd = useCallback(async (params: { jobTitle: string; companyName: string; jobDescription: string }): Promise<string | undefined> => {
    if (!isPipelineMode) {
      // Demo mode (VITE_PIPELINE_MODE != 'true'): generates a local fake ID so
      // downstream hooks that depend on analysisId still receive a value.
      setStage('submitting_jd');
      setError(null);
      const demoId = `demo-${Date.now()}`;
      const timeout = setTimeout(() => {
        setAnalysisId(demoId);
        setStage('jd_submitted');
        localStorage.setItem('pipeline_analysis_id', demoId);
      }, 800);
      demoTimeoutsRef.current.push(timeout);
      return demoId;
    }

    setStage('submitting_jd');
    setError(null);
    try {
      // Carry over a sessionId created by the /pipeline/role step so the API
      // can reuse the same session object instead of creating a new one.
      const existingSessionId = localStorage.getItem('pipeline_session_id');
      console.log('[usePipeline] submitJd: sending JD to API', { ...params, existingSessionId });
      const res = await fetch(`${getApiBase()}/pipeline/jd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          ...(existingSessionId ? { sessionId: existingSessionId } : {}),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log('[usePipeline] submitJd: response', data);
      setAnalysisId(data.analysisId);
      setStage('jd_submitted');
      localStorage.setItem('pipeline_analysis_id', data.analysisId);
      return data.analysisId;
    } catch (err: any) {
      setError(err.message);
      setStage('error');
      return undefined;
    }
  }, [isPipelineMode]);

  const submitResume = useCallback(async (params: { analysisId: string; file?: File; resumeId?: string }): Promise<void> => {
    if (!isPipelineMode) {
      // Demo mode: simulate processing stages
      setStage('submitting_resume');
      setError(null);

      let cumulativeDelay = 0;
      for (const step of DEMO_STAGES) {
        cumulativeDelay += step.delay;
        const timeout = setTimeout(() => {
          setStage(step.stage);
          setMessage(step.message);
          if (step.stage === 'complete') {
            setReport(DEMO_REPORT);
          }
        }, cumulativeDelay);
        demoTimeoutsRef.current.push(timeout);
      }
      return;
    }

    setStage('submitting_resume');
    setError(null);
    try {
      console.log('[usePipeline] submitResume: uploading', { analysisId: params.analysisId, hasFile: !!params.file });
      let res: Response;
      if (params.file) {
        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('analysisId', params.analysisId);
        res = await fetch(`${getApiBase()}/pipeline/resume`, { method: 'POST', body: formData });
      } else {
        res = await fetch(`${getApiBase()}/pipeline/resume`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
      }
      if (!res.ok) throw new Error(await res.text());
      console.log('[usePipeline] submitResume: success, starting polling');
      setStage('processing');
      startPolling(params.analysisId);
    } catch (err: any) {
      setError(err.message);
      setStage('error');
    }
  }, [isPipelineMode, startPolling]);

  const resumePolling = useCallback((id?: string) => {
    const resolvedId = id || localStorage.getItem('pipeline_analysis_id');
    if (!resolvedId) {
      return;
    }

    setAnalysisId(resolvedId);
    setStage('processing');
    setError(null);
    startPolling(resolvedId);
  }, [startPolling, isPipelineMode]);

  const isComplete = stage === 'complete';

  return { analysisId, stage, message, report, error, submitJd, submitResume, resumePolling, isComplete };
}
