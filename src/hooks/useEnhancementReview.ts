import { useEffect, useState } from 'react';
import { useResumeDocument } from '@/hooks/useResumeDocument';
import {
  getEnhancedBullets,
  rescoreLight,
} from '@/api/pipeline';
import {
  mapEnhancedBulletsToReviews,
  mapToDimensionScores,
} from '@/utils/mapEnhancementData';
import type {
  BulletReview,
  DimensionScore,
  RescoreDeepResponse,
} from '@/types/enhancement-review';
import type { ResumeDocumentData } from '@/types/resume';

export type EnhancementStage = 'loading' | 'done' | 'error';

export interface UseEnhancementReviewResult {
  stage: EnhancementStage;
  error: string | null;
  resumeData: ResumeDocumentData | null;
  isLoadingResume: boolean;
  bulletReviews: BulletReview[];
  dimensionScores: DimensionScore[];
  originalScore: number;
  enhancedScore: number;
  rescoreData: RescoreDeepResponse | null;
}

/**
 * Fetches enhancement review data (post-finalize).
 *
 * Assumes finalize has already completed (handled by GeneratingPage).
 * Fetches in parallel:
 * 1. GET /enhanced-bullets — per-bullet before/after
 * 2. GET /rescore — light rescore using existing session data (no LLM cost)
 * 3. GET /resume-document — via useResumeDocument
 */
export function useEnhancementReview(sessionId: string): UseEnhancementReviewResult {
  const [stage, setStage] = useState<EnhancementStage>('loading');
  const [error, setError] = useState<string | null>(null);
  const [bulletReviews, setBulletReviews] = useState<BulletReview[]>([]);
  const [dimensionScores, setDimensionScores] = useState<DimensionScore[]>([]);
  const [originalScore, setOriginalScore] = useState(0);
  const [enhancedScore, setEnhancedScore] = useState(0);
  const [rescoreData, setRescoreData] = useState<RescoreDeepResponse | null>(null);

  // Resume document — enabled immediately since finalize already ran
  const { resumeData, isLoading: isLoadingResume } = useResumeDocument(sessionId);

  useEffect(() => {
    if (!sessionId) return;

    const abort = new AbortController();

    const run = async () => {
      try {
        setStage('loading');

        // Fetch enhanced bullets + light rescore in parallel
        const [bulletsResponse, rData] = await Promise.all([
          getEnhancedBullets(sessionId, abort.signal),
          rescoreLight(sessionId, abort.signal),
        ]);
        if (abort.signal.aborted) return;

        // Map API responses to UI prop shapes
        setBulletReviews(mapEnhancedBulletsToReviews(bulletsResponse.bullets));
        setRescoreData(rData);
        setDimensionScores(
          mapToDimensionScores(rData, bulletsResponse.gaps_by_pattern),
        );

        // Scores are 0-100 from the API; convert to 0-10 for display
        setOriginalScore(rData.original.overall / 10);
        setEnhancedScore(rData.enhanced.overall / 10);

        setStage('done');
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setStage('error');
      }
    };

    run();
    return () => abort.abort();
  }, [sessionId]);

  return {
    stage,
    error,
    resumeData,
    isLoadingResume,
    bulletReviews,
    dimensionScores,
    originalScore,
    enhancedScore,
    rescoreData,
  };
}
