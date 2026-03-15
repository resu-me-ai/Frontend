import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobDescriptionView } from '@/components/templates/JobDescriptionView';
import { usePipeline } from '@/hooks/usePipeline';

export const JobDescriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { submitJd } = usePipeline();
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isPipelineMode = import.meta.env.VITE_PIPELINE_MODE === 'true';
  const isFormComplete = jobTitle.trim() !== '' && jobDescription.trim() !== '';

  const handleAnalyze = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setError(null);

    if (isPipelineMode) {
      // Pipeline mode: submit JD via the pipeline hook
      try {
        await submitJd({ jobTitle, companyName, jobDescription });
        navigate('/upload-resume');
      } catch {
        // Error is handled by the hook; do not navigate
      }
    } else {
      // Demo mode: store JD data in localStorage and navigate
      localStorage.setItem('job_description_data', JSON.stringify({
        jobTitle,
        companyName,
        jobDescription,
      }));
      navigate('/upload-resume');
    }
  };

  return (
    <JobDescriptionView
      jobTitle={jobTitle}
      companyName={companyName}
      jobDescription={jobDescription}
      error={error}
      isAnalyzeDisabled={!isFormComplete}
      showCheckmark={isFormComplete}
      onJobTitleChange={setJobTitle}
      onCompanyNameChange={setCompanyName}
      onJobDescriptionChange={setJobDescription}
      onAnalyze={handleAnalyze}
    />
  );
};
