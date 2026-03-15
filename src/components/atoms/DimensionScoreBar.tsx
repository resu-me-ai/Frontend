import React from 'react';

export interface DimensionScoreBarProps {
  label: string;
  delta: number;
}

export const DimensionScoreBar: React.FC<DimensionScoreBarProps> = ({
  label,
  delta,
}) => {
  // Base segment width (original score portion) — fixed at ~30%
  const baseWidth = 30;
  // Delta segment width normalized from 0–5 range to fill remaining space
  const deltaWidth = Math.min(70, Math.max(10, (delta / 5) * 70));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-widest text-text-muted uppercase">
          {label}
        </span>
        <span className="text-xs font-semibold text-success">
          +{delta.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center h-2 w-full rounded-full bg-bg-muted overflow-hidden">
        {/* Original score segment (red/orange) */}
        <div
          className="h-full bg-error rounded-l-full"
          style={{ width: `${baseWidth}%` }}
        />
        {/* Arrow separator */}
        <div className="relative w-0 h-full">
          <div className="absolute top-1/2 -translate-y-1/2 -left-[3px] w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px] border-l-error" />
        </div>
        {/* Improvement segment (green) */}
        <div
          className="h-full bg-green-500 rounded-r-full"
          style={{ width: `${deltaWidth}%` }}
        />
      </div>
    </div>
  );
};
