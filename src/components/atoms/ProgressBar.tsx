import React from 'react';

export interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalSteps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;
        
        return (
          <div
            key={step}
            className={`
              h-1.5 flex-1 rounded-full transition-colors duration-300
              ${isActive ? 'bg-progress-active' : 'bg-progress-inactive'}
            `}
          />
        );
      })}
    </div>
  );
};

