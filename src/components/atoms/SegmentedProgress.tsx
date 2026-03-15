import type React from 'react';

export interface SegmentedProgressProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  totalSteps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`flex gap-1.5 w-full ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isCompleted = step <= currentStep;

        return (
          <div
            key={step}
            className={`flex-1 rounded-full h-1.5 transition-colors duration-300 ${
              isCompleted ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
};
