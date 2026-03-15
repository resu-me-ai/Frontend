/**
 * Analysis API Client
 *
 * Handles communication with the backend analysis engine.
 * Endpoint: POST /api/v1/analyze
 *
 * In demo mode (VITE_DEMO_MODE=true), returns mock data.
 */

import { isDemoMode, mockAnalysisResult, simulateApiDelay } from '@/mocks';

// Types for analysis API
export interface AnalyzeRequest {
  jdText: string;
  resumeFile: File;
}

export interface CategoryScore {
  score: number;
  description: string;
}

export interface MatchReport {
  overall_score: number;
  categories: {
    skills: CategoryScore;
    experience: CategoryScore;
    qualifications: CategoryScore;
    keywords: CategoryScore;
  };
}

export interface AnalysisResult {
  match_report: MatchReport;
  patterns: unknown[]; // V0.4 pattern detection results
  questions: unknown[]; // V0.5 context collection questions
}

export interface AnalysisError {
  error: string;
  details?: string;
}

/**
 * Analyzes a resume against a job description
 *
 * @param params - Job description text and resume file
 * @returns Analysis result with match score, patterns, and questions
 * @throws Error if API request fails
 */
export async function analyzeResume(params: AnalyzeRequest): Promise<AnalysisResult> {
  // Demo mode: return mock data
  if (isDemoMode()) {
    await simulateApiDelay(2000); // Simulate realistic API delay
    console.log('[DEMO] Returning mock analysis result');
    return mockAnalysisResult;
  }

  const { jdText, resumeFile } = params;

  // Build FormData payload
  const formData = new FormData();
  formData.append('jd_text', jdText);
  formData.append('resume', resumeFile);

  // /analyze is on FastAPI (analysis-engine extraction endpoints)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
  const endpoint = `${apiBaseUrl}/api/v1/analyze`;

  // Make API request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
  });

  // Handle errors
  if (!response.ok) {
    const errorData: AnalysisError = await response.json().catch(() => ({
      error: 'Unknown error occurred'
    }));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  // Parse and return result
  const result: AnalysisResult = await response.json();
  return result;
}

/**
 * Type guard to check if error is an AnalysisError
 */
export function isAnalysisError(error: unknown): error is AnalysisError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as AnalysisError).error === 'string'
  );
}
