import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BulletVersionCard } from '@/components/molecules/BulletVersionCard';
import type { BulletReview } from '@/types/enhancement-review';

export interface BulletReviewSectionProps {
  review: BulletReview;
  onSelectVersion: (bulletId: string, version: number) => void;
}

export const BulletReviewSection: React.FC<BulletReviewSectionProps> = ({
  review,
  onSelectVersion,
}) => {
  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-heading tracking-wide">
          BULLET {review.bulletNumber}
        </span>
        <span className="text-[10px] font-semibold text-text-muted tracking-wider uppercase">
          • {review.dimension}
        </span>
        <div className="flex items-center gap-1 text-success">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">+{review.deltaPercent}%</span>
        </div>
      </div>

      {/* Company name on its own line */}
      <span className="block text-[10px] text-text-placeholder">{review.company}</span>

      {/* Original bullet — mint/teal style */}
      <div className="border-l-4 border-green-500 bg-success-light rounded-r-lg p-3">
        <p className="text-xs font-semibold text-text-placeholder uppercase tracking-wider mb-1">
          Original:
        </p>
        <p className="text-sm italic line-through text-amber-600 leading-relaxed">
          {review.originalText}
        </p>
      </div>

      {/* Version cards */}
      <div className="space-y-2">
        {review.versions.map((v) => (
          <BulletVersionCard
            key={v.version}
            version={v.version}
            text={v.text}
            score={v.score}
            selected={review.selectedVersion === v.version}
            isBest={v.isBest}
            onSelect={() => onSelectVersion(review.id, v.version)}
          />
        ))}
      </div>
    </div>
  );
};
