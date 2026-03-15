import React from 'react';

export interface SegmentedProgressBarProps {
  current: number;
  total: number;
  skippedSegments?: number[];
  className?: string;
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  current,
  total,
  skippedSegments,
  className = '',
}) => {
  const getSegmentColor = (index: number): string => {
    if (skippedSegments?.includes(index + 1)) return 'bg-amber-400';
    if (index < current) return 'bg-action-primary';
    return 'bg-gray-200';
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progress: ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded-full ${getSegmentColor(i)}`}
        />
      ))}
    </div>
  );
};
