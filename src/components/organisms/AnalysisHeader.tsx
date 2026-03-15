import React from 'react';

export interface AnalysisHeaderProps {
  overallScore: number;
  title?: string;
  subtitle?: string;
  scoreLabel?: string;
  className?: string;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  overallScore,
  title = 'Analysis Complete!',
  subtitle = "Here's how your resume matches with the job description",
  scoreLabel = 'Overall Match Score',
  className = '',
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-action-primary to-violet-900 rounded-2xl p-8 relative ${className}`}
      style={{ height: '184px' }}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col">
          <h1 className="text-[30px] font-bold text-white mb-2">{title}</h1>
          <p className="text-base font-normal text-info-subtle">
            {subtitle}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg px-8 py-6 min-w-[200px]">
          <p className="text-sm font-semibold text-action-primary text-center mb-2">{scoreLabel}</p>
          <p className="text-[48px] font-bold text-action-primary text-center leading-none">{overallScore}%</p>
        </div>
      </div>
    </div>
  );
};
