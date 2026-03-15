import React from 'react';

export interface LinearProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  progress,
  className = '',
}) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-[10px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-action-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
