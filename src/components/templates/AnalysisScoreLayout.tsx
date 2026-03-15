import React from 'react';
import { AppHeader } from '@/components/organisms/AppHeader';

export interface AnalysisScoreLayoutProps {
  children: React.ReactNode;
}

export const AnalysisScoreLayout: React.FC<AnalysisScoreLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-surface">
      <AppHeader />
      <div className="max-w-[1120px] mx-auto px-8 py-16">
        {children}
      </div>
    </div>
  );
};
