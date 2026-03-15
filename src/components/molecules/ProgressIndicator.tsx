import React from 'react';
import { ProgressBar } from '@/components/atoms/ProgressBar';

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onSkip?: () => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  onSkip,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="font-normal leading-5">
          {currentStep}/{totalSteps}
        </span>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="font-normal leading-5 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};

