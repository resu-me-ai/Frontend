import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { DimensionScoreBars } from '@/components/organisms/DimensionScoreBars';
import { BulletReviewSection } from '@/components/organisms/BulletReviewSection';
import type { DimensionScore, BulletReview } from '@/types/enhancement-review';

export interface EnhancementReviewPanelProps {
  originalScore: number;
  enhancedScore: number;
  dimensionScores: DimensionScore[];
  bulletReviews: BulletReview[];
  onApply?: () => void;
  onDownload?: () => void;
}

export const EnhancementReviewPanel: React.FC<EnhancementReviewPanelProps> = ({
  originalScore,
  enhancedScore,
  dimensionScores,
  bulletReviews,
  onApply,
  onDownload,
}) => {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const b of bulletReviews) {
      initial[b.id] = b.selectedVersion;
    }
    return initial;
  });

  const handleSelectVersion = (bulletId: string, version: number) => {
    setSelections((prev) => ({ ...prev, [bulletId]: version }));
  };

  const reviewsWithSelections = bulletReviews.map((b) => ({
    ...b,
    selectedVersion: selections[b.id] ?? b.selectedVersion,
  }));

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Score header — horizontal layout */}
      <div className="p-6 border-b border-border-default">
        <div className="flex items-start justify-between mb-6">
          {/* Left: title + subtitle */}
          <div>
            <h2 className="text-xl font-bold text-text-heading">
              Enhancement Review
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Review optimized bullets &bull; Select preferred versions
            </p>
          </div>

          {/* Right: score display */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-text-placeholder uppercase tracking-wider">Overall Score</p>
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-sm text-text-placeholder line-through">
                  {originalScore.toFixed(1)}
                </span>
                <span className="text-2xl font-bold text-success">
                  {enhancedScore.toFixed(1)}/10
                </span>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </div>
          </div>
        </div>

        <DimensionScoreBars scores={dimensionScores} />
      </div>

      {/* Scrollable bullet reviews */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {reviewsWithSelections.map((review) => (
          <BulletReviewSection
            key={review.id}
            review={review}
            onSelectVersion={handleSelectVersion}
          />
        ))}
      </div>

      {/* Sticky footer — inline layout */}
      <div className="border-t border-border-default px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">
              {bulletReviews.length} bullets optimized &bull; Score: {enhancedScore.toFixed(1)}/10
            </p>
            <p className="text-xs text-text-placeholder">
              {bulletReviews.length} best versions selected
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onDownload}
              className="border border-border-input text-text-body px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-bg-surface transition-colors whitespace-nowrap"
            >
              Download
            </button>
            <button
              onClick={onApply}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Apply Changes to Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
