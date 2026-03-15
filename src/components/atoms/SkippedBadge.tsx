import React from 'react';

export interface SkippedBadgeProps {
  count: number;
  onClick: () => void;
}

export const SkippedBadge: React.FC<SkippedBadgeProps> = ({ count, onClick }) => {
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-warm text-amber-600 border border-amber-400 hover:bg-warning-subtle transition-colors cursor-pointer"
    >
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {count} Skipped
    </button>
  );
};
