import React from 'react';
import { UploadResumeLayout } from '@/components/templates/UploadResumeLayout';
import { UploadResumeSection } from '@/components/organisms/UploadResumeSection';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { ResumeOption } from '@/components/organisms/UploadResumeSection';

export interface UploadResumeViewProps {
  selectedFile?: File | null;
  existingResumes?: ResumeOption[];
  showCheckmark?: boolean;
  error?: string | null;
  isAnalyzeDisabled?: boolean;
  isUploading?: boolean;
  onFileUpload?: (file: File) => void;
  onFileRemove?: () => void;
  onResumeSelect?: (resumeId: string) => void;
  onAnalyze?: () => void;
}

export const UploadResumeView: React.FC<UploadResumeViewProps> = ({
  selectedFile,
  existingResumes,
  showCheckmark = false,
  error,
  isAnalyzeDisabled = true,
  isUploading = false,
  onFileUpload,
  onFileRemove,
  onResumeSelect,
  onAnalyze,
}) => {
  return (
    <UploadResumeLayout>
      <div className="space-y-6">
        <UploadResumeSection
          onFileUpload={onFileUpload}
          onFileRemove={onFileRemove}
          onResumeSelect={onResumeSelect}
          selectedFile={selectedFile}
          existingResumes={existingResumes}
          showCheckmark={showCheckmark}
        />

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end pt-4">
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzeDisabled || isUploading}
            className="bg-action-primary hover:bg-action-primary-hover disabled:bg-[#a3cbfa] disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Icon name="magic-wand" size={16} className="text-white" />
                Analyze Resume Match
              </>
            )}
          </Button>
        </div>
      </div>
    </UploadResumeLayout>
  );
};
