import React from 'react';
import { DimensionScoreBar } from '@/components/atoms/DimensionScoreBar';
import type { DimensionScore } from '@/types/enhancement-review';

export interface DimensionScoreBarsProps {
  scores: DimensionScore[];
}

export const DimensionScoreBars: React.FC<DimensionScoreBarsProps> = ({
  scores,
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {scores.map((s) => (
        <DimensionScoreBar key={s.label} label={s.label} delta={s.delta} />
      ))}
    </div>
  );
};
