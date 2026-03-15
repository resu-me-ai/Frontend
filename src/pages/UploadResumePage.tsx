import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadResumeView } from '@/components/templates/UploadResumeView';
import { useResume } from '@/contexts/ResumeContext';
import { usePipeline } from '@/hooks/usePipeline';

export const UploadResumePage: React.FC = () => {
  const navigate = useNavigate();
  const { setResumeFile } = useResume();
  const { submitResume } = usePipeline();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isPipelineMode = import.meta.env.VITE_PIPELINE_MODE === 'true';

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setSelectedResumeId('');
    setError(null);
    // Store in ResumeContext for use in other pages
    await setResumeFile(file);
  };

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    setUploadedFile(null);
    setError(null);
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    setError(null);
  };

  // Check if Upload Resume section is complete
  const isUploadResumeComplete = uploadedFile !== null || selectedResumeId !== '';

  const handleAnalyze = async () => {
    // Validate that either a file is uploaded or a resume is selected
    if (!uploadedFile && !selectedResumeId) {
      setError('Please upload a resume or select an existing resume.');
      return;
    }

    setError(null);

    if (isPipelineMode) {
      // Pipeline mode: submit resume via pipeline hook
      const analysisId = localStorage.getItem('pipeline_analysis_id') || '';
      try {
        await submitResume({
          analysisId,
          file: uploadedFile || undefined,
          resumeId: selectedResumeId || undefined,
        });
        navigate('/analyzing');
      } catch {
        // Error is handled by the hook; do not navigate
      }
    } else {
      // Demo mode: store data and navigate
      const jdData = JSON.parse(localStorage.getItem('job_description_data') || '{}');

      localStorage.setItem('resume_data', JSON.stringify({
        uploadedFileName: uploadedFile?.name,
        selectedResumeId,
      }));

      console.log('Analyzing resume match:', {
        uploadedFile: uploadedFile?.name,
        selectedResumeId,
        ...jdData,
      });

      navigate('/analyzing');
    }
  };

  return (
    <UploadResumeView
      selectedFile={uploadedFile}
      showCheckmark={isUploadResumeComplete}
      error={error}
      isAnalyzeDisabled={!isUploadResumeComplete}
      onFileUpload={handleFileUpload}
      onFileRemove={handleFileRemove}
      onResumeSelect={handleResumeSelect}
      onAnalyze={handleAnalyze}
    />
  );
};
