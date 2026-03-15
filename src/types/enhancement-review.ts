// Types for the Enhancement Review flow
// Maps to ai-service endpoints: /enhanced-bullets, /rescore/deep

// ── API Response Types (from ai-service) ──────────────────

/** Single bullet from GET /pipeline/{id}/enhanced-bullets */
export interface EnhancedBulletResponse {
  location: string;
  before: string;
  after: string;
  confidence: number;
  frameworks_applied: string[];
  // Enriched fields (available after backend schema unification, null before finalize)
  gaps_resolved?: string[];
  gaps_remaining?: string[];
  framework_scores?: Record<string, number> | null;
  company?: string;
  role_title?: string;
  structure?: string | null;
  answer_used?: string | null;
}

/** Full response from GET /pipeline/{id}/enhanced-bullets */
export interface EnhancedBulletsResponse {
  bullets: EnhancedBulletResponse[];
  overall_improvement: number;
  summary: string;
  gaps_by_pattern?: Record<string, { resolved: number; remaining: number }>;
}

/** Score breakdown (used for both original and enhanced) */
export interface ScoreBreakdown {
  overall: number;
  competency: number;
  pattern: number;
  qualifications: number;
  keywords: number;
}

/** Full response from POST /pipeline/{id}/rescore/deep or GET /pipeline/{id}/rescore */
export interface RescoreDeepResponse {
  original: ScoreBreakdown;
  enhanced: ScoreBreakdown;
  deltas: ScoreBreakdown;
  improved: boolean;
  gap_resolution?: {
    total_gaps: number;
    resolved_gaps: number;
  };
  warnings?: string[];
  extraction_quality?: {
    competencies_fresh: boolean;
    patterns_fresh: boolean;
    advanced_patterns_fresh: boolean;
  };
  sanity_warning?: string;
}

/** Response from POST /pipeline/{id}/finalize */
export interface FinalizeResponse {
  status: string;
  bulletCount: number;
  enhancedCount: number;
  summaryGenerated?: boolean;
  summaryBulletCount?: number;
  averageConfidence?: number;
}

// ── UI Prop Types (consumed by components) ────────────────

/** Dimension score bar data */
export interface DimensionScore {
  label: string;
  delta: number;
}

/** A single enhanced version of a bullet */
export interface BulletVersion {
  version: number;
  text: string;
  score: number;
  isBest: boolean;
}

/** A bullet with its original text and enhanced versions */
export interface BulletReview {
  id: string;
  bulletNumber: number;
  dimension: string;
  deltaPercent: number;
  company: string;
  originalText: string;
  versions: BulletVersion[];
  selectedVersion: number;
}
