import type {
  EnhancedBulletResponse,
  RescoreDeepResponse,
  BulletReview,
  DimensionScore,
} from '@/types/enhancement-review';

// ── Label Mappings ──────────────────────────────────────

/** Maps P1-P4 gap/pattern IDs to human-readable dimension labels */
const PATTERN_LABELS: Record<string, string> = {
  P1: 'QUANTIFICATION',
  P2: 'HIGH-PRESSURE',
  P3: 'ACTION VERBS',
  P4: 'STRATEGIC IMPACT',
  P1_quantification: 'QUANTIFICATION',
  P2_high_pressure: 'HIGH-PRESSURE',
  P3_cpet_verbs: 'ACTION VERBS',
  P4_strategic_reframe: 'STRATEGIC IMPACT',
};

/** Maps frameworks_applied values (OLD schema) to dimension labels */
const FRAMEWORK_LABELS: Record<string, string> = {
  quantification: 'QUANTIFICATION',
  high_pressure_circumstances: 'HIGH-PRESSURE',
  cpet_verbs: 'ACTION VERBS',
  strategic_business_activities: 'STRATEGIC IMPACT',
  results_first: 'STRUCTURE',
  efforts_first: 'STRUCTURE',
  noise_reduction: 'CLARITY',
};

/** Meta-flags in frameworks_applied that are NOT dimensions */
const META_FLAGS = new Set([
  'llm_enhanced',
  'user_context_incorporated',
  'pattern_addressed',
]);

// ── Bullet Mapping ──────────────────────────────────────

/**
 * Derives the dimension label for a bullet from enriched fields,
 * falling back through framework labels and ultimately to 'ENHANCEMENT'.
 */
function deriveDimension(bullet: EnhancedBulletResponse): string {
  // Prefer gaps_resolved (enriched, post-unification)
  if (bullet.gaps_resolved?.length) {
    const first = bullet.gaps_resolved[0];
    if (PATTERN_LABELS[first]) return PATTERN_LABELS[first];
  }

  // Fallback to first non-meta framework_applied
  const framework = bullet.frameworks_applied?.find(
    (f) => !META_FLAGS.has(f),
  );
  if (framework && FRAMEWORK_LABELS[framework]) {
    return FRAMEWORK_LABELS[framework];
  }
  if (framework) return framework.toUpperCase();

  return 'ENHANCEMENT';
}

/**
 * Derives the bullet score (0-10 scale) from enriched fields,
 * falling back to gaps ratio or confidence.
 */
function deriveScore(bullet: EnhancedBulletResponse): number {
  // Prefer framework_scores.overall (from BulletPatternScorer)
  if (bullet.framework_scores?.overall != null) {
    return bullet.framework_scores.overall / 10; // 0-100 → 0-10
  }

  // Fallback: gap resolution ratio
  const resolved = bullet.gaps_resolved?.length ?? 0;
  const remaining = bullet.gaps_remaining?.length ?? 0;
  const total = resolved + remaining;
  if (total > 0) {
    return (resolved / total) * 10;
  }

  // Final fallback: confidence (0-1 → 0-10)
  return bullet.confidence * 10;
}

/**
 * Derives deltaPercent from enriched fields, falling back to confidence.
 */
function deriveDelta(bullet: EnhancedBulletResponse): number {
  // Prefer average of framework_scores deltas
  const scores = bullet.framework_scores;
  if (scores) {
    const deltas = ['P1_delta', 'P2_delta', 'P3_delta', 'P4_delta']
      .map((k) => scores[k])
      .filter((v): v is number => v != null);
    if (deltas.length > 0) {
      return Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length);
    }
  }

  // Fallback: gap resolution percentage
  const resolved = bullet.gaps_resolved?.length ?? 0;
  const remaining = bullet.gaps_remaining?.length ?? 0;
  const total = resolved + remaining;
  if (total > 0) {
    return Math.round((resolved / total) * 100);
  }

  // Final fallback: confidence as percentage
  return Math.round(bullet.confidence * 100);
}

/**
 * Maps the ai-service enhanced-bullets response to the BulletReview[] shape
 * consumed by EnhancementReviewPanel.
 *
 * Uses enriched fields (gaps_resolved, framework_scores, company) when
 * available, with graceful fallbacks to the basic fields.
 */
export function mapEnhancedBulletsToReviews(
  bullets: EnhancedBulletResponse[],
): BulletReview[] {
  return bullets.map((bullet, index) => ({
    id: `bullet-${index}`,
    bulletNumber: index + 1,
    dimension: deriveDimension(bullet),
    deltaPercent: deriveDelta(bullet),
    company: bullet.company || bullet.role_title || '',
    originalText: bullet.before,
    versions: [
      {
        version: 1,
        text: bullet.after,
        score: deriveScore(bullet),
        isBest: true,
      },
    ],
    selectedVersion: 1,
  }));
}

// ── Dimension Score Mapping ─────────────────────────────

/**
 * Builds the hybrid 6-bar DimensionScore[] from two data sources:
 * - 4 bars from gaps_by_pattern (P1-P4 gap resolution rates)
 * - 2 bars from rescore deltas (skills fit + ATS match)
 *
 * Falls back to rescore-only 4-bar display when gaps_by_pattern is unavailable.
 */
export function mapToDimensionScores(
  rescore: RescoreDeepResponse,
  gapsByPattern?: Record<string, { resolved: number; remaining: number }>,
): DimensionScore[] {
  const scores: DimensionScore[] = [];

  if (gapsByPattern) {
    // 4 bars from per-principle gap resolution
    const principleMap: [string, string][] = [
      ['P1', 'QUANTIFICATION'],
      ['P2', 'HIGH-PRESSURE'],
      ['P3', 'ACTION VERBS'],
      ['P4', 'STRATEGIC IMPACT'],
    ];
    for (const [key, label] of principleMap) {
      // Check both short and long key forms
      const gaps =
        gapsByPattern[key] ??
        gapsByPattern[`${key}_${label.toLowerCase().replace(/[- ]/g, '_')}`];
      if (gaps) {
        const total = gaps.resolved + gaps.remaining;
        const rate = total > 0 ? gaps.resolved / total : 0;
        scores.push({ label, delta: Math.round(rate * 100) / 10 }); // 0-10 scale
      }
    }

    // 2 bars from rescore deltas
    if (rescore.deltas.competency !== 0) {
      scores.push({ label: 'SKILLS FIT', delta: rescore.deltas.competency / 10 });
    }
    if (rescore.deltas.keywords !== 0) {
      scores.push({ label: 'ATS MATCH', delta: rescore.deltas.keywords / 10 });
    }
  } else {
    // Fallback: 4-bar display from rescore deltas only
    const dimensionMap: [keyof RescoreDeepResponse['deltas'], string][] = [
      ['competency', 'SKILLS FIT'],
      ['pattern', 'PATTERN FIT'],
      ['qualifications', 'QUALIFICATIONS'],
      ['keywords', 'ATS MATCH'],
    ];
    for (const [key, label] of dimensionMap) {
      const delta = rescore.deltas[key];
      if (delta !== 0) {
        scores.push({ label, delta: delta / 10 }); // API returns 0-100, display 0-10
      }
    }
  }

  return scores;
}

/**
 * @deprecated Use mapToDimensionScores instead (supports hybrid 6-bar scoring).
 * Kept for backward compatibility during migration.
 */
export function mapRescoreToDimensionScores(
  rescore: RescoreDeepResponse,
): DimensionScore[] {
  return mapToDimensionScores(rescore);
}
