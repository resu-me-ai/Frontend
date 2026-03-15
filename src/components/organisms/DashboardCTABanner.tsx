import React from 'react';
import { FileText } from 'lucide-react';

export interface DashboardCTABannerProps {
  onStartNewAnalysis?: () => void;
  className?: string;
}

/** Purple gradient banner with "Start New Analysis" CTA */
export const DashboardCTABanner: React.FC<DashboardCTABannerProps> = ({
  onStartNewAnalysis,
  className = '',
}) => {
  return (
    <div
      className={`bg-gradient-to-b from-accent-purple to-violet-400 rounded-[16px] px-8 py-6 flex items-center justify-between ${className}`}
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Ready to improve your resume?</h2>
        <p className="text-base text-white/90">
          Start a new analysis session with your improved resume and target job description
        </p>
      </div>
      <button
        type="button"
        onClick={onStartNewAnalysis}
        className="bg-white text-accent-purple font-semibold px-5 py-2.5 rounded-[10px] flex items-center gap-2 hover:bg-purple-50 transition-colors shrink-0"
      >
        <FileText size={18} />
        Start New Analysis
      </button>
    </div>
  );
};
