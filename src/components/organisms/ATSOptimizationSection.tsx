import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { KeywordSection } from '@/components/molecules/KeywordSection';
import { ProTipBanner } from '@/components/molecules/ProTipBanner';

export interface ATSOptimizationSectionProps {
  keywordsPresent: string[];
  keywordsMissing: string[];
  proTip: string;
  title?: string;
  subtitle?: string;
  keywordsPresentLabel?: string;
  keywordsMissingLabel?: string;
  className?: string;
}

export const ATSOptimizationSection: React.FC<ATSOptimizationSectionProps> = ({
  keywordsPresent,
  keywordsMissing,
  proTip,
  title = 'ATS Keyword Optimization',
  subtitle = 'Improve your chances of passing Applicant Tracking Systems',
  keywordsPresentLabel = 'Keywords Present',
  keywordsMissingLabel = 'Keywords Missing',
  className = '',
}) => {
  return (
    <div className={`bg-white border border-border-default rounded-2xl p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-lg bg-info-subtle flex items-center justify-center">
          <Icon name="ats" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-heading">{title}</h3>
          <p className="text-sm font-normal text-text-subtle">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <KeywordSection
          title={keywordsPresentLabel}
          count={keywordsPresent.length}
          keywords={keywordsPresent}
          variant="present"
        />
        <KeywordSection
          title={keywordsMissingLabel}
          count={keywordsMissing.length}
          keywords={keywordsMissing}
          variant="missing"
        />
      </div>

      <ProTipBanner tip={proTip} />
    </div>
  );
};
