import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { OnboardingHeader } from '@/components/organisms/OnboardingHeader';
import { ResumeCustomizationView } from '@/components/templates/ResumeCustomizationView';
import { ExportSuccessModal } from '@/components/organisms/ExportSuccessModal';
import { useResumeDocument } from '@/hooks/useResumeDocument';
import { downloadDocx, downloadPdf } from '@/api/pipeline';
import { exportResumePdf } from '@/utils/exportResumePdf';

export const ResumeCustomizationPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { resumeData, isLoading: isLoadingResume } = useResumeDocument(sessionId ?? '');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleDownloadWord = async () => {
    if (!sessionId) return;
    try {
      setExportError(null);
      await downloadDocx(sessionId);
      setShowExportModal(true);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Download failed');
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setExportError(null);
      if (sessionId) {
        // Prefer server-side PDF for DOCX-parity (bold-opening, anti-pattern filtering)
        await downloadPdf(sessionId);
      } else if (resumeData) {
        // Fallback to client-side rendering
        await exportResumePdf(resumeData, 'enhanced_resume.pdf');
      }
      setShowExportModal(true);
    } catch {
      // If server-side fails (endpoint not ready), fall back to client-side
      if (resumeData) {
        try {
          await exportResumePdf(resumeData, 'enhanced_resume.pdf');
          setShowExportModal(true);
          return;
        } catch (fallbackErr) {
          setExportError(fallbackErr instanceof Error ? fallbackErr.message : 'PDF export failed');
          return;
        }
      }
      setExportError('PDF export failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg-muted flex flex-col">
      <OnboardingHeader showAuthButtons={false} />
      <div className="flex-1">
        {exportError && (
          <div className="mx-8 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {exportError}
          </div>
        )}
        <ResumeCustomizationView
          resumeData={resumeData}
          isLoadingResume={isLoadingResume}
          onDownloadPdf={handleDownloadPdf}
          onDownloadWord={handleDownloadWord}
        />
      </div>
      <ExportSuccessModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
};
