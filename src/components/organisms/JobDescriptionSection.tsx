import React from 'react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { JobDescriptionForm } from '@/components/molecules/JobDescriptionForm';

export interface JobDescriptionSectionProps {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  onJobTitleChange?: (value: string) => void;
  onCompanyNameChange?: (value: string) => void;
  onJobDescriptionChange?: (value: string) => void;
  error?: string;
  showCheckmark?: boolean;
  className?: string;
}

export const JobDescriptionSection: React.FC<JobDescriptionSectionProps> = ({
  jobTitle,
  companyName,
  jobDescription,
  onJobTitleChange,
  onCompanyNameChange,
  onJobDescriptionChange,
  error,
  showCheckmark = false,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-border-default rounded-2xl shadow-sm ${className}`}>
      <div className="px-8 py-8">
        <SectionHeader
          icon="luggage"
          iconBgColor="#dcfce7"
          title="Job Description"
          step="Step 2 of 2"
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
          error={error}
        />
      </div>
    </div>
  );
};
