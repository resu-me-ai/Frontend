import React from 'react';
import { Input } from '@/components/atoms/Input';
import { RichTextArea } from '@/components/atoms/RichTextArea';

export interface JobDescriptionFormProps {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  onJobTitleChange?: (value: string) => void;
  onCompanyNameChange?: (value: string) => void;
  onJobDescriptionChange?: (value: string) => void;
  error?: string;
  className?: string;
  /** Show the Job Title field (default: true) */
  showJobTitle?: boolean;
  /** Show the Company Name field (default: true) */
  showCompanyName?: boolean;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  jobTitle,
  companyName,
  jobDescription,
  onJobTitleChange,
  onCompanyNameChange,
  onJobDescriptionChange,
  error,
  className = '',
  showJobTitle = true,
  showCompanyName = true,
}) => {
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onJobTitleChange?.(e.target.value);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompanyNameChange?.(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Job Title Field */}
      {showJobTitle && (
        <div className="w-full">
          <label htmlFor="job-title" className="block text-sm font-medium text-text-subtle mb-1">
            Job Title
          </label>
          <Input
            id="job-title"
            type="text"
            placeholder="Senior Product Designer"
            value={jobTitle}
            onChange={handleJobTitleChange}
            className="w-full"
          />
        </div>
      )}

      {/* Company Name Field */}
      {showCompanyName && (
        <div className="w-full">
          <label htmlFor="company-name" className="block text-sm font-medium text-text-subtle mb-1">
            Company Name (Optional)
          </label>
          <Input
            id="company-name"
            type="text"
            placeholder="Google"
            value={companyName}
            onChange={handleCompanyNameChange}
            className="w-full"
          />
        </div>
      )}

      {/* Job Description Rich Text Area */}
      <div className="w-full">
        <RichTextArea
          label="Paste Job Description"
          placeholder="Copy and paste the complete job description here..."
          value={jobDescription}
          onChange={onJobDescriptionChange}
          error={error}
          hint="Include requirements, responsibilities, and qualifications for best results. Formatting (bold, lists) from the source is preserved."
          className=""
        />
      </div>
    </div>
  );
};
