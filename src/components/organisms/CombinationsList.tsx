import React from 'react';
import { Plus } from 'lucide-react';
import { CombinationRow } from '@/components/molecules/CombinationRow';
import type { MockCombination } from '@/mocks/dashboard.mock';

export interface CombinationsListProps {
  combinations: MockCombination[];
  onCombinationClick?: (id: string) => void;
  onCreateNewCombo?: () => void;
  className?: string;
}

/** Header + list of resume/JD combinations */
export const CombinationsList: React.FC<CombinationsListProps> = ({
  combinations,
  onCombinationClick,
  onCreateNewCombo,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-[14px] border border-border-default ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-default">
        <div>
          <h3 className="text-xl font-bold text-text-heading">
            Resume + Job Description Combinations
          </h3>
          <p className="text-sm text-text-muted mt-0.5">
            Your saved resume and job description pairs with match analysis
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateNewCombo}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] border border-accent-purple text-sm font-medium text-accent-purple hover:bg-bg-accent-purple transition-colors"
        >
          <Plus size={16} />
          Create New Combo
        </button>
      </div>

      {/* Rows */}
      <div>
        {combinations.map((combo) => (
          <CombinationRow
            key={combo.id}
            jobTitle={combo.jobTitle}
            company={combo.company}
            matchPercentage={combo.matchPercentage}
            status={combo.status}
            lastAnalyzed={combo.lastAnalyzed}
            resumeVersion={combo.resumeVersion}
            evidenceFiles={combo.evidenceFiles}
            appliedDate={combo.appliedDate}
            interviewDate={combo.interviewDate}
            onClick={() => onCombinationClick?.(combo.id)}
          />
        ))}
      </div>
    </div>
  );
};
