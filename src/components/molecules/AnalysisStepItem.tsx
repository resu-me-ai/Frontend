import React from 'react';

export interface AnalysisStepItemProps {
  stepNumber: number;
  title: string;
  description: string;
  className?: string;
}

export const AnalysisStepItem: React.FC<AnalysisStepItemProps> = ({
  stepNumber,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center flex-shrink-0">
        <span className="text-base font-bold text-action-primary">{stepNumber}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-text-body mb-1">{title}</h4>
        <p className="text-sm font-normal text-text-muted leading-5">{description}</p>
      </div>
    </div>
  );
};
