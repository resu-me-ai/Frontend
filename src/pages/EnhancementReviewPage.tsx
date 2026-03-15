import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';
import { EnhancementReviewView } from '@/components/templates/EnhancementReviewView';
import { ExportSuccessModal } from '@/components/organisms/ExportSuccessModal';
import { useEnhancementReview } from '@/hooks/useEnhancementReview';
import { downloadDocx } from '@/api/pipeline';

export const EnhancementReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [showExportModal, setShowExportModal] = useState(false);

  const {
    stage,
    error,
    resumeData,
    isLoadingResume,
    bulletReviews,
    dimensionScores,
    originalScore,
    enhancedScore,
  } = useEnhancementReview(sessionId ?? '');

  const handleApply = () => {
    navigate(`/customize/${sessionId}`);
  };

  const handleDownload = async () => {
    if (!sessionId) return;
    try {
      await downloadDocx(sessionId);
      setShowExportModal(true);
    } catch {
      setShowExportModal(true);
    }
  };

  const stageMessages: Record<string, string> = {
    loading: 'Loading enhancement results...',
  };

  const isLoading = stage !== 'done' && stage !== 'error';

  return (
    <div className="min-h-screen bg-bg-surface">
      <OnboardingHeader showAuthButtons={false} />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="animate-spin h-8 w-8 border-4 border-action-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-text-muted text-sm">
              {stageMessages[stage] ?? 'Preparing...'}
            </p>
          </div>
        </div>
      ) : (
        <EnhancementReviewView
          resumeData={resumeData}
          originalScore={originalScore}
          enhancedScore={enhancedScore}
          dimensionScores={dimensionScores}
          bulletReviews={bulletReviews}
          onApply={handleApply}
          onDownload={handleDownload}
          isLoading={isLoadingResume}
          error={error}
        />
      )}
      <ExportSuccessModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
};
