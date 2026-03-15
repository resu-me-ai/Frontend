import React from 'react';
import { AnalysisScoreLayout } from '@/components/templates/AnalysisScoreLayout';
import { AnalysisHeader } from '@/components/organisms/AnalysisHeader';
import { MatchCategoriesSection } from '@/components/organisms/MatchCategoriesSection';
import { SkillsBreakdownSection } from '@/components/organisms/SkillsBreakdownSection';
import { ATSOptimizationSection } from '@/components/organisms/ATSOptimizationSection';
import { PriorityActionsSection } from '@/components/organisms/PriorityActionsSection';
import { ResumeOptimizationCTA } from '@/components/organisms/ResumeOptimizationCTA';
import { PaywallOverlay } from '@/components/organisms/PaywallOverlay';
import type { AnalysisReportProps } from '@/utils/mapReportToProps';

export interface AnalysisScoreViewProps extends AnalysisReportProps {
  isLoading?: boolean;
  error?: string | null;
  showPaywall?: boolean;
  onRetry?: () => void;
  onOptimizeClick?: () => void;
  onDownloadClick?: () => void;
  onUpgradeClick?: () => void;
  /** Disable the optimize button until questions are ready */
  optimizeDisabled?: boolean;
}

export const AnalysisScoreView: React.FC<AnalysisScoreViewProps> = ({
  isLoading,
  error,
  showPaywall,
  onRetry,
  onOptimizeClick,
  onDownloadClick,
  onUpgradeClick,
  optimizeDisabled,
  overallScore,
  categories,
  matchingSkills,
  missingSkills,
  keywordsPresent,
  keywordsMissing,
  actionItems,
  rubricAnalysis,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <AnalysisScoreLayout>
        <div data-testid="analysis-loading" className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 text-lg">Analyzing your resume...</p>
        </div>
      </AnalysisScoreLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AnalysisScoreLayout>
        <div data-testid="analysis-error" className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-gray-900 text-lg font-medium">Something went wrong</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </AnalysisScoreLayout>
    );
  }

  // Success state - full analysis report
  return (
    <AnalysisScoreLayout>
      <div className="flex flex-col gap-6">
        <AnalysisHeader overallScore={overallScore} />
        <MatchCategoriesSection categories={categories} />
        <SkillsBreakdownSection
          matchingSkills={matchingSkills}
          missingSkills={missingSkills}
        />
        {rubricAnalysis && (
          <div data-testid="rubric-analysis-section" className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Competency Analysis</h3>
              <span className="text-sm text-gray-500">
                {rubricAnalysis.competenciesMet}/{rubricAnalysis.competenciesTotal} competencies met
              </span>
            </div>
            {rubricAnalysis.competencyGaps.filter(g => g.gapType === 'missing' || g.gapType === 'level_below').length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Competency Gaps</h4>
                <div className="space-y-2">
                  {rubricAnalysis.competencyGaps
                    .filter(g => g.gapType === 'missing' || g.gapType === 'level_below')
                    .slice(0, 5)
                    .map((gap, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                          gap.gapType === 'missing' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {gap.gapType === 'missing' ? 'Missing' : 'Below Level'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{gap.skill}</p>
                          <p className="text-xs text-gray-500">Required: {gap.jdLevel} | Found: {gap.resumeLevel}</p>
                          {gap.action && <p className="text-xs text-gray-600 mt-1">{gap.action}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {rubricAnalysis.patternGaps.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern Gaps</h4>
                <div className="space-y-2">
                  {rubricAnalysis.patternGaps.slice(0, 4).map((gap, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">
                        {gap.pattern}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{gap.patternName}</p>
                        <p className="text-xs text-gray-600">{gap.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rubricAnalysis.summary && (
              <p className="mt-4 text-sm text-gray-600 italic">{rubricAnalysis.summary}</p>
            )}
          </div>
        )}
        <ATSOptimizationSection
          keywordsPresent={keywordsPresent}
          keywordsMissing={keywordsMissing}
          proTip={
            keywordsMissing.length > 0
              ? `Consider adding these keywords naturally: ${keywordsMissing.slice(0, 3).join(', ')}`
              : 'Your keyword coverage looks solid. Focus on quantifying your achievements.'
          }
        />
        <div className="relative">
          <PriorityActionsSection actionItems={actionItems} />
          {showPaywall && <PaywallOverlay onUpgradeClick={onUpgradeClick} />}
        </div>
        <ResumeOptimizationCTA
          onOptimizeClick={onOptimizeClick}
          onDownloadClick={onDownloadClick}
          optimizeDisabled={optimizeDisabled}
        />
      </div>
    </AnalysisScoreLayout>
  );
};
