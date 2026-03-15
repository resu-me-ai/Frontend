/**
 * Pipeline API Client
 *
 * Provides typed access to the pipeline analysis endpoints:
 * - submitJd: Submit a job description for analysis
 * - submitResume: Submit a resume against an existing JD analysis
 * - getStatus: Poll for pipeline processing status
 * - getReport: Fetch the completed JDMatchReport (V0.3 output)
 * - finalizePipeline: Wait for in-flight enhancements and build final resume
 * - getEnhancedBullets: Fetch per-bullet before/after comparisons
 * - rescoreDeep: Re-run rubric scoring on enhanced resume
 * - downloadDocx: Download the finalized resume as DOCX
 */

// All functions in this file target the FastAPI AI service (port 8000 by default).
// CRUD operations (jobs, resumes, subscriptions) go to the NestJS backend (port 3000)
// via api/client.ts + getBackendBase(). Auth headers are injected by Clerk's
// middleware on the NestJS side; the FastAPI service accepts unauthenticated
// requests in local dev and relies on session IDs (analysisId) for isolation.
import { getApiBase } from '@/lib/api';
import type {
  FinalizeResponse,
  EnhancedBulletsResponse,
  RescoreDeepResponse,
} from '@/types/enhancement-review';

const API_BASE_URL = getApiBase();

// --- Request/Response Types ---

/** Parameters for submitting a job description */
export interface SubmitJdParams {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

/** Response from submitting a job description */
export interface SubmitJdResponse {
  analysisId: string;
}

/** Parameters for submitting a resume */
export interface SubmitResumeParams {
  analysisId: string;
  resumeId?: string;
  file?: File;
}

/** Response from submitting a resume */
export interface SubmitResumeResponse {
  status: string;
}

/** Pipeline processing status from the status endpoint */
export interface PipelineStatus {
  analysisId: string;
  stage: string;
  message: string;
  progress?: number;
  questionOneReady?: boolean;    // At least 1 question available (company context)
  questionsAllReady?: boolean;   // All LLM questions generated + consolidated
  questionsReady?: boolean;      // Backwards compat
}

// --- Report Types ---

/**
 * Complete match report from the JD analysis pipeline (V0.3 output).
 *
 * Contains:
 * - Dimension scores (skills, experience, qualifications, keywords)
 * - Matched and missing skills with confidence/importance
 * - Keyword presence analysis
 * - Priority action items for resume improvement
 * - Experience and qualification gap analysis
 */
export interface JDMatchReport {
  scores: {
    overall_score: number;
    skills_score: number;
    experience_score: number;
    qualifications_score: number;
    keywords_score: number;
  };
  matched_skills: Array<{
    resume_skill: string;
    jd_skill: string;
    match_type: "exact" | "synonym" | "semantic";
    jd_importance: "CRITICAL" | "IMPORTANT" | "NICE_TO_HAVE";
    confidence: number;
  }>;
  missing_skills: Array<{
    jd_skill: string;
    importance: "CRITICAL" | "IMPORTANT" | "NICE_TO_HAVE";
    source_section: string;
    suggested_action: string;
  }>;
  keyword_analysis: {
    present: string[];
    missing: string[];
  };
  priority_action_items: Array<{
    priority: "P0" | "P1" | "P2" | "P3";
    action: string;
    reason: string;
    impact_estimate?: string;
    bullets_affected: number[];
  }>;
  experience_gaps: Array<{
    gap_type: "years" | "domain" | "seniority";
    required: string | number;
    actual: string | number;
    mitigation: string;
  }>;
  qualification_gaps: Array<{
    gap_type: "education" | "certification" | "license";
    required: string;
    status: "missing" | "partial" | "exceeded";
    importance: "CRITICAL" | "IMPORTANT" | "NICE_TO_HAVE";
  }>;
  rubric_analysis?: {
    scores: {
      overall: number;
      competency: number;
      pattern: number;
      qualifications: number;
      keywords: number;
    };
    weights: Record<string, number>;
    competency_gaps: Array<{
      skill: string;
      category: string;
      gap_type: "exceeds" | "meets" | "level_below" | "missing";
      jd_level: string;
      resume_level: string;
      importance: "CRITICAL" | "IMPORTANT" | "NICE_TO_HAVE";
      level_delta: number;
      action: string | null;
    }>;
    pattern_gaps: Array<{
      pattern: string;
      pattern_name: string;
      gap_description: string | null;
      action: string | null;
    }>;
    competencies_met: number;
    competencies_total: number;
    critical_gaps: string[];
    summary: string | null;
  };
  rubric_summaries?: Record<string, unknown>;
}

// --- API Functions ---

/**
 * Submits a job description to begin pipeline analysis.
 *
 * @param params - Job title, company name, and full JD text
 * @returns Object containing the assigned analysisId
 * @throws Error if the API response is not OK
 */
export async function submitJd(params: SubmitJdParams): Promise<SubmitJdResponse> {
  const response = await fetch(`${API_BASE_URL}/pipeline/jd`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to submit JD: ${response.status}`);
  }
  return response.json();
}

/**
 * Submits a resume for analysis against an existing JD analysis.
 * Supports file upload (FormData) or resume ID reference (JSON).
 *
 * @param params - analysisId plus either a file or resumeId
 * @returns Object containing the submission status
 * @throws Error if the API response is not OK
 */
export async function submitResume(params: SubmitResumeParams): Promise<SubmitResumeResponse> {
  let response: Response;

  if (params.file) {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('analysisId', params.analysisId);
    response = await fetch(`${API_BASE_URL}/pipeline/resume`, {
      method: 'POST',
      body: formData,
    });
  } else {
    response = await fetch(`${API_BASE_URL}/pipeline/resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to submit resume: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetches the current pipeline processing status.
 *
 * @param analysisId - The unique identifier for the analysis run
 * @returns Current pipeline status with stage and message
 * @throws Error if the API response is not OK
 */
export async function getStatus(analysisId: string): Promise<PipelineStatus> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${analysisId}/status`);
  if (!response.ok) {
    throw new Error(`Status check failed: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetches a completed pipeline analysis report by ID.
 *
 * @param analysisId - The unique identifier for the analysis run
 * @returns The typed JDMatchReport containing all analysis dimensions
 * @throws Error if the API response is not OK (includes status code in message)
 * @throws TypeError if the network request fails entirely
 */
export async function getReport(analysisId: string): Promise<JDMatchReport> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${analysisId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.status}`);
  }
  return response.json();
}

// --- Enhancement Review API Functions ---
// These endpoints complete the pipeline after V0.5 context collection:
//   finalize → getEnhancedBullets → rescoreDeep → downloadDocx

export async function finalizePipeline(
  sessionId: string,
  signal?: AbortSignal,
): Promise<FinalizeResponse> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${sessionId}/finalize`, {
    method: 'POST',
    signal,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Finalization failed: ${response.status}`);
  }
  return response.json();
}

export async function getEnhancedBullets(
  sessionId: string,
  signal?: AbortSignal,
): Promise<EnhancedBulletsResponse> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${sessionId}/enhanced-bullets`, {
    signal,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch enhanced bullets: ${response.status}`);
  }
  return response.json();
}

/**
 * Re-score the enhanced resume against the JD.
 *
 * Previously called /rescore/deep (LLM re-extraction). Now routes to the
 * heuristic GET /rescore endpoint which covers P14-P19 structural checks +
 * keyword matching — sufficient for before/after comparison with no extra LLM cost.
 */
export async function rescoreDeep(
  sessionId: string,
  signal?: AbortSignal,
): Promise<RescoreDeepResponse> {
  return rescoreLight(sessionId, signal);
}

export async function rescoreLight(
  sessionId: string,
  signal?: AbortSignal,
): Promise<RescoreDeepResponse> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${sessionId}/rescore`, {
    signal,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Rescore failed: ${response.status}`);
  }
  return response.json();
}

export async function downloadPdf(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${sessionId}/download/pdf`);
  if (!response.ok) {
    throw new Error(`PDF download failed: ${response.status}`);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'enhanced_resume.pdf';
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadDocx(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/pipeline/${sessionId}/download`);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'enhanced_resume.docx';
  a.click();
  URL.revokeObjectURL(url);
}
