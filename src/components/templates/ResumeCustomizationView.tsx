import React from 'react';
import { ResumeDocument } from '@/components/organisms/ResumeDocument';
import { CustomizationPanel } from '@/components/organisms/CustomizationPanel';
import type { ResumeDocumentData } from '@/types/resume';

export interface ResumeCustomizationViewProps {
  resumeData: ResumeDocumentData | null;
  isLoadingResume?: boolean;
  onDownloadPdf?: () => void;
  onDownloadWord?: () => void;
  onCopyText?: () => void;
}

/** Split layout: live resume preview (left) + customization panel (right) */
export const ResumeCustomizationView: React.FC<ResumeCustomizationViewProps> = ({
  resumeData,
  isLoadingResume,
  onDownloadPdf,
  onDownloadWord,
  onCopyText,
}) => {
  return (
    <div className="px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start">
        {/* Left: Resume preview */}
        {isLoadingResume || !resumeData ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin h-8 w-8 border-4 border-action-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <ResumeDocument data={resumeData} />
        )}

        {/* Right: Customization panel */}
        <CustomizationPanel
          onDownloadPdf={onDownloadPdf}
          onDownloadWord={onDownloadWord}
          onCopyText={onCopyText}
        />
      </div>
    </div>
  );
};
