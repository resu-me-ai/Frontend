import React from 'react';
import { ResumeDocument } from '@/components/organisms/ResumeDocument';
import { EnhancementReviewPanel } from '@/components/organisms/EnhancementReviewPanel';
import type { ResumeDocumentData } from '@/types/resume';
import type { DimensionScore, BulletReview } from '@/types/enhancement-review';

export interface EnhancementReviewViewProps {
  resumeData: ResumeDocumentData | null;
  originalScore: number;
  enhancedScore: number;
  dimensionScores: DimensionScore[];
  bulletReviews: BulletReview[];
  onApply?: () => void;
  onDownload?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const EnhancementReviewView: React.FC<EnhancementReviewViewProps> = ({
  resumeData,
  originalScore,
  enhancedScore,
  dimensionScores,
  bulletReviews,
  onApply,
  onDownload,
  isLoading,
  error,
}) => {
  if (error) {
    return (
      <div className="px-8 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !resumeData) {
    return (
      <div className="px-8 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="animate-spin h-8 w-8 border-4 border-action-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-text-muted text-sm">Preparing your enhanced resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start">
        {/* Left rail — enhanced resume document */}
        <ResumeDocument data={resumeData} />

        {/* Right rail — enhancement review panel */}
        <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] overflow-hidden">
          <EnhancementReviewPanel
            originalScore={originalScore}
            enhancedScore={enhancedScore}
            dimensionScores={dimensionScores}
            bulletReviews={bulletReviews}
            onApply={onApply}
            onDownload={onDownload}
          />
        </div>
      </div>
    </div>
  );
};
