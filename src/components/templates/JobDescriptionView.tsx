import React from 'react';
import { AppHeader } from '@/components/organisms/AppHeader';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { JobDescriptionForm } from '@/components/molecules/JobDescriptionForm';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export interface JobDescriptionViewProps {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  error?: string | null;
  isAnalyzeDisabled?: boolean;
  isSubmitting?: boolean;
  showCheckmark?: boolean;
  onJobTitleChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  onJobDescriptionChange: (value: string) => void;
  onAnalyze: () => void;
}

export const JobDescriptionView: React.FC<JobDescriptionViewProps> = ({
  jobTitle,
  companyName,
  jobDescription,
  error,
  isAnalyzeDisabled = true,
  isSubmitting = false,
  showCheckmark = false,
  onJobTitleChange,
  onCompanyNameChange,
  onJobDescriptionChange,
  onAnalyze,
}) => {
  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      <AppHeader />
      <div className="flex-1 flex justify-center pt-[25px] pb-16 px-4">
        <div className="w-full max-w-[1024px]">
          <div className="bg-white border border-border-default rounded-2xl shadow-sm">
            <div className="px-8 py-8">
              <SectionHeader
                icon="luggage"
                iconBgColor="#dcfce7"
                title="Job Description"
                step="Step 1 of 2"
                showCheckmark={showCheckmark}
                className="mb-8"
              />

              <JobDescriptionForm
                jobTitle={jobTitle}
                companyName={companyName}
                jobDescription={jobDescription}
                onJobTitleChange={onJobTitleChange}
                onCompanyNameChange={onCompanyNameChange}
                onJobDescriptionChange={onJobDescriptionChange}
                error={error || undefined}
              />

              <div className="flex justify-end pt-6">
                <Button
                  onClick={onAnalyze}
                  disabled={isAnalyzeDisabled || isSubmitting}
                  className="bg-action-primary hover:bg-action-primary-hover disabled:bg-[#a3cbfa] disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Icon name="magic-wand" size={16} className="text-white" />
                      Analyze JD
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
