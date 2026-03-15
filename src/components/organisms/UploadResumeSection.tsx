import React, { useState } from 'react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { FileUploadArea } from '@/components/molecules/FileUploadArea';
import { ResumeOptionCard } from '@/components/molecules/ResumeOptionCard';

export interface ResumeOption {
  id: string;
  fileName: string;
  lastUpdated: string;
  fileType: 'pdf' | 'word' | 'pencil';
}

export interface UploadResumeSectionProps {
  onFileUpload?: (file: File) => void;
  onFileRemove?: () => void;
  onResumeSelect?: (resumeId: string) => void;
  selectedFile?: File | null;
  existingResumes?: ResumeOption[];
  showCheckmark?: boolean;
  className?: string;
}

export const UploadResumeSection: React.FC<UploadResumeSectionProps> = ({
  onFileUpload,
  onFileRemove,
  onResumeSelect,
  selectedFile = null,
  existingResumes = [], // Empty by default - only show if user has uploaded before
  showCheckmark = false,
  className = '',
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleResumeSelect = (resumeId: string) => {
    setSelectedOption(resumeId);
    onResumeSelect?.(resumeId);
  };

  const hasExistingResumes = existingResumes.length > 0;

  return (
    <div className={`bg-white border border-border-default rounded-2xl shadow-sm ${className}`}>
      <div className="px-8 py-8">
        <SectionHeader
          icon="upload"
          iconBgColor="#dbeafe"
          title="Upload Resume"
          step="Step 2 of 2"
          showCheckmark={showCheckmark}
          className="mb-8"
        />

        <div className="space-y-6">
          <FileUploadArea
            onFileSelect={onFileUpload}
            onFileRemove={onFileRemove}
            selectedFile={selectedFile}
          />

          {hasExistingResumes && (
            <>
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-border-default"></div>
                <span className="text-xs font-medium text-text-placeholder">OR</span>
                <div className="flex-1 border-t border-border-default"></div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-text-body mb-5">
                  Select from existing resumes
                </h4>
                <div className="space-y-3">
                  {existingResumes.map((resume) => (
                    <ResumeOptionCard
                      key={resume.id}
                      name="resume-option"
                      value={resume.id}
                      checked={selectedOption === resume.id}
                      onChange={handleResumeSelect}
                      fileName={resume.fileName}
                      lastUpdated={resume.lastUpdated}
                      fileType={resume.fileType}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
