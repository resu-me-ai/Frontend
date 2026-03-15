import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadResumeLayout } from '@/components/templates/UploadResumeLayout';
import { LinearProgressBar } from '@/components/atoms/LinearProgressBar';
import { AnalysisStepItem } from '@/components/molecules/AnalysisStepItem';
import { useAnalysis } from '@/hooks/useAnalysis';
import { usePipeline } from '@/hooks/usePipeline';

const STAGE_LABELS: Record<string, string> = {
  processing: 'Starting Analysis',
  v01_jd_processing: 'Analyzing Job Description',
  jd_failed: 'JD Extraction Failed',
  resume_parsing: 'Reading Your Resume',
  resume_parsing_failed: 'Resume Parsing Failed',
  resume_extracting: 'Extracting Experience & Skills',
  matching: 'Matching You to the Role',
  evaluating_blueprint: 'Evaluating Resume Quality',
  generating_questions: 'Preparing Your Interview',
  error: 'Error',
};

const STAGE_MESSAGES: Record<string, string[]> = {
  processing: [
    "Initializing analysis pipeline...",
    "Connecting to AI engine...",
  ],
  v01_jd_processing: [
    "Reading your job description...",
    "Identifying key requirements...",
    "Extracting skills and qualifications...",
    "Detecting role level and seniority...",
  ],
  resume_parsing: [
    "Parsing your resume document...",
    "Extracting text and structure...",
    "Identifying sections and formatting...",
  ],
  resume_extracting: [
    "Mapping skills and achievements...",
    "Analyzing your work experience...",
    "Identifying leadership and impact...",
    "Building your professional profile...",
  ],
  matching: [
    "Comparing your profile to the role...",
    "Calculating skill match scores...",
    "Identifying gaps and strengths...",
    "Generating your match report...",
  ],
  evaluating_blueprint: [
    "Checking resume best practices...",
    "Evaluating bullet quantification...",
    "Analyzing content structure...",
    "Scoring framework compliance...",
  ],
  generating_questions: [
    "Identifying areas to strengthen...",
    "Crafting personalized questions...",
    "Preparing your optimization plan...",
  ],
};

const STAGE_PROGRESS_RANGES: Record<string, [number, number]> = {
  processing: [0, 5],
  v01_jd_processing: [5, 15],
  resume_parsing: [15, 30],
  resume_extracting: [30, 50],
  matching: [50, 95],
  v03_complete: [95, 100],
  evaluating_blueprint: [70, 85],  // Kept for future granular stages
  generating_questions: [85, 100], // Kept for future granular stages
};

export const AnalysisInProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { analyze, isLoading: _isLoading, isError, error } = useAnalysis();
  const { stage, message, isComplete, error: pipelineError, analysisId: pipelineAnalysisId, resumePolling } = usePipeline();

  const isPipelineMode = import.meta.env.VITE_PIPELINE_MODE === 'true';

  // Resume polling on mount if in pipeline mode — picks up pipeline_analysis_id from localStorage
  useEffect(() => {
    if (isPipelineMode) {
      resumePolling();
    }
  }, [isPipelineMode, resumePolling]);

  // Flash messages: rotate through stage-specific messages
  const [messageIndex, setMessageIndex] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  const prevStageRef = useRef(stage);

  // Reset message index when stage changes
  useEffect(() => {
    if (stage !== prevStageRef.current) {
      setMessageIndex(0);
      setFadeOpacity(1);
      prevStageRef.current = stage;
    }
  }, [stage]);

  // Rotate messages every 3500ms with fade transition
  useEffect(() => {
    if (!isPipelineMode || !stage) return;

    const messages = STAGE_MESSAGES[stage];
    if (!messages || messages.length <= 1) return;

    const interval = setInterval(() => {
      setFadeOpacity(0);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setFadeOpacity(1);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPipelineMode, stage]);

  // Compute progress based on stage and message index
  const pipelineProgress = React.useMemo(() => {
    if (!stage || !STAGE_PROGRESS_RANGES[stage]) return 0;
    const [min, max] = STAGE_PROGRESS_RANGES[stage];
    const messages = STAGE_MESSAGES[stage] || [];
    const stageProgress = messages.length > 1 ? messageIndex / (messages.length - 1) : 0;
    return min + (max - min) * stageProgress;
  }, [stage, messageIndex]);

  const currentFlashMessage = stage && STAGE_MESSAGES[stage]
    ? STAGE_MESSAGES[stage][messageIndex] || message
    : message;

  // Pipeline mode: navigate when complete or v03_complete
  useEffect(() => {
    if (isPipelineMode && (isComplete || stage === 'v03_complete')) {
      const id = pipelineAnalysisId || localStorage.getItem('pipeline_analysis_id') || '';
      navigate(`/analysis-score/${id}`);
    }
  }, [isPipelineMode, isComplete, stage, pipelineAnalysisId, navigate]);

  // Demo mode: run fake analysis
  useEffect(() => {
    if (isPipelineMode) return;

    // Get data from previous steps
    const jdData = localStorage.getItem('job_description_data');
    const resumeData = localStorage.getItem('resume_data');

    if (!jdData || !resumeData) {
      setHasError(true);
      setErrorMessage('Missing job description or resume data. Please start over.');
      return;
    }

    const { jobDescription } = JSON.parse(jdData);
    const { uploadedFileName } = JSON.parse(resumeData);

    const runAnalysis = async () => {
      try {
        const mockFile = new File(['mock resume content'], uploadedFileName || 'resume.pdf', {
          type: 'application/pdf'
        });

        await analyze({
          jdText: jobDescription,
          resumeFile: mockFile
        });

        navigate('/analysis-score');
      } catch (err) {
        setHasError(true);
        setErrorMessage(err instanceof Error ? err.message : 'Analysis failed');
      }
    };

    runAnalysis();

    // Start progress animation
    const totalDuration = 12000; // 12 seconds
    const interval = 100;
    const increment = (100 / totalDuration) * interval;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += increment;

      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [navigate, analyze, isPipelineMode]);

  // Show error state if analysis fails (demo or pipeline)
  if (hasError || isError || (isPipelineMode && pipelineError)) {
    return (
      <UploadResumeLayout>
        <div className="bg-white border border-border-default rounded-2xl shadow-sm w-full max-w-[768px] mx-auto">
          <div className="px-10 py-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-[30px] font-bold text-text-body mb-4">
              Something Went Wrong
            </h2>
            <p className="text-base text-text-muted mb-6">
              {pipelineError || errorMessage || error || 'An unexpected error occurred during analysis.'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/job-description')}
                className="px-6 py-3 bg-action-primary text-white rounded-lg hover:bg-action-primary-hover transition-colors"
              >
                Start Over
              </button>
              <button
                onClick={() => navigate('/upload-resume')}
                className="px-6 py-3 border border-border-default text-text-body rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </UploadResumeLayout>
    );
  }

  // Pipeline mode: show real-time stage/message from the pipeline hook
  if (isPipelineMode) {
    return (
      <UploadResumeLayout>
        <div className="bg-white border border-border-default rounded-2xl shadow-sm w-full max-w-[768px] mx-auto">
          <div className="px-10 py-10">
            {/* Icon Circle */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-info-light flex items-center justify-center shadow-[0px_0px_23.774px_0px_rgba(37,99,235,0.38)]">
                <svg width="34" height="32" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33437 1.33438L6.15625 1.775C6.0625 1.80937 6 1.9 6 2C6 2.1 6.0625 2.19062 6.15625 2.225L7.33437 2.66563L7.775 3.84375C7.80938 3.9375 7.9 4 8 4C8.1 4 8.19063 3.9375 8.225 3.84375L8.66562 2.66563L9.84375 2.225C9.9375 2.19062 10 2.1 10 2C10 1.9 9.9375 1.80937 9.84375 1.775L8.66562 1.33438L8.225 0.15625C8.19063 0.0625 8.1 0 8 0C7.9 0 7.80938 0.0625 7.775 0.15625L7.33437 1.33438ZM1.44062 12.3562C0.85625 12.9406 0.85625 13.8906 1.44062 14.4781L2.52187 15.5594C3.10625 16.1437 4.05625 16.1437 4.64375 15.5594L16.5594 3.64062C17.1438 3.05625 17.1438 2.10625 16.5594 1.51875L15.4781 0.440625C14.8937 -0.14375 13.9437 -0.14375 13.3562 0.440625L1.44062 12.3562ZM15.1438 2.58125L11.8625 5.8625L11.1344 5.13438L14.4156 1.85312L15.1438 2.58125ZM0.234375 3.6625C0.09375 3.71562 0 3.85 0 4C0 4.15 0.09375 4.28438 0.234375 4.3375L2 5L2.6625 6.76562C2.71562 6.90625 2.85 7 3 7C3.15 7 3.28438 6.90625 3.3375 6.76562L4 5L5.76562 4.3375C5.90625 4.28438 6 4.15 6 4C6 3.85 5.90625 3.71562 5.76562 3.6625L4 3L3.3375 1.23438C3.28438 1.09375 3.15 1 3 1C2.85 1 2.71562 1.09375 2.6625 1.23438L2 3L0.234375 3.6625ZM11.2344 11.6625C11.0938 11.7156 11 11.85 11 12C11 12.15 11.0938 12.2844 11.2344 12.3375L13 13L13.6625 14.7656C13.7156 14.9062 13.85 15 14 15C14.15 15 14.2844 14.9062 14.3375 14.7656L15 13L16.7656 12.3375C16.9062 12.2844 17 12.15 17 12C17 11.85 16.9062 11.7156 16.7656 11.6625L15 11L14.3375 9.23438C14.2844 9.09375 14.15 9 14 9C13.85 9 13.7156 9.09375 13.6625 9.23438L13 11L11.2344 11.6625Z" fill="#2563eb"/>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-[30px] font-bold text-text-body text-center mb-4">
              Analysis in Progress
            </h2>

            {/* Pipeline Stage and Message */}
            <div className="text-center mb-8">
              <p data-testid="pipeline-stage" className="text-sm font-medium text-action-primary uppercase tracking-wide mb-2">
                {STAGE_LABELS[stage] || stage?.replace(/_/g, ' ')}
              </p>
              <p
                data-testid="pipeline-message"
                className="text-base font-normal text-text-muted leading-6"
                style={{ opacity: fadeOpacity, transition: 'opacity 300ms ease-in-out' }}
              >
                {currentFlashMessage}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
              <LinearProgressBar progress={pipelineProgress} />
            </div>

            {/* What Happens Next Section */}
            <div className="pt-8 border-t border-border-default">
              <h3 className="text-lg font-semibold text-text-body mb-6">
                What Happens Next?
              </h3>
              <div className="flex flex-col gap-6">
                <AnalysisStepItem
                  stepNumber={1}
                  title="AI-Powered Analysis"
                  description="Our system identifies keywords, skills, and experience matches between your resume and the job requirements."
                />
                <AnalysisStepItem
                  stepNumber={2}
                  title="Generate Report"
                  description="We compile a detailed report with an overall match score, strengths, and areas for improvement."
                />
                <AnalysisStepItem
                  stepNumber={3}
                  title="Notification"
                  description="You'll be automatically redirected to your results page once the analysis is complete."
                />
              </div>
            </div>
          </div>
        </div>
      </UploadResumeLayout>
    );
  }

  return (
    <UploadResumeLayout>
      <div className="bg-white border border-border-default rounded-2xl shadow-sm w-full max-w-[768px] mx-auto">
        <div className="px-10 py-10">
          {/* Icon Circle */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-info-light flex items-center justify-center shadow-[0px_0px_23.774px_0px_rgba(37,99,235,0.38)]">
              <svg width="34" height="32" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33437 1.33438L6.15625 1.775C6.0625 1.80937 6 1.9 6 2C6 2.1 6.0625 2.19062 6.15625 2.225L7.33437 2.66563L7.775 3.84375C7.80938 3.9375 7.9 4 8 4C8.1 4 8.19063 3.9375 8.225 3.84375L8.66562 2.66563L9.84375 2.225C9.9375 2.19062 10 2.1 10 2C10 1.9 9.9375 1.80937 9.84375 1.775L8.66562 1.33438L8.225 0.15625C8.19063 0.0625 8.1 0 8 0C7.9 0 7.80938 0.0625 7.775 0.15625L7.33437 1.33438ZM1.44062 12.3562C0.85625 12.9406 0.85625 13.8906 1.44062 14.4781L2.52187 15.5594C3.10625 16.1437 4.05625 16.1437 4.64375 15.5594L16.5594 3.64062C17.1438 3.05625 17.1438 2.10625 16.5594 1.51875L15.4781 0.440625C14.8937 -0.14375 13.9437 -0.14375 13.3562 0.440625L1.44062 12.3562ZM15.1438 2.58125L11.8625 5.8625L11.1344 5.13438L14.4156 1.85312L15.1438 2.58125ZM0.234375 3.6625C0.09375 3.71562 0 3.85 0 4C0 4.15 0.09375 4.28438 0.234375 4.3375L2 5L2.6625 6.76562C2.71562 6.90625 2.85 7 3 7C3.15 7 3.28438 6.90625 3.3375 6.76562L4 5L5.76562 4.3375C5.90625 4.28438 6 4.15 6 4C6 3.85 5.90625 3.71562 5.76562 3.6625L4 3L3.3375 1.23438C3.28438 1.09375 3.15 1 3 1C2.85 1 2.71562 1.09375 2.6625 1.23438L2 3L0.234375 3.6625ZM11.2344 11.6625C11.0938 11.7156 11 11.85 11 12C11 12.15 11.0938 12.2844 11.2344 12.3375L13 13L13.6625 14.7656C13.7156 14.9062 13.85 15 14 15C14.15 15 14.2844 14.9062 14.3375 14.7656L15 13L16.7656 12.3375C16.9062 12.2844 17 12.15 17 12C17 11.85 16.9062 11.7156 16.7656 11.6625L15 11L14.3375 9.23438C14.2844 9.09375 14.15 9 14 9C13.85 9 13.7156 9.09375 13.6625 9.23438L13 11L11.2344 11.6625Z" fill="#2563eb"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[30px] font-bold text-text-body text-center mb-4">
            Analysis in Progress
          </h2>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-base font-normal text-text-muted leading-6">
              Our AI is meticulously comparing your resume with the job
            </p>
            <p className="text-base font-normal text-text-muted leading-6">
              description. This may take a few moments.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <LinearProgressBar progress={progress} />
          </div>

          {/* What Happens Next Section */}
          <div className="pt-8 border-t border-border-default">
            <h3 className="text-lg font-semibold text-text-body mb-6">
              What Happens Next?
            </h3>
            <div className="flex flex-col gap-6">
              <AnalysisStepItem
                stepNumber={1}
                title="AI-Powered Analysis"
                description="Our system identifies keywords, skills, and experience matches between your resume and the job requirements."
              />
              <AnalysisStepItem
                stepNumber={2}
                title="Generate Report"
                description="We compile a detailed report with an overall match score, strengths, and areas for improvement."
              />
              <AnalysisStepItem
                stepNumber={3}
                title="Notification"
                description="You'll be automatically redirected to your results page once the analysis is complete. Feel free to stay on this page."
              />
            </div>
          </div>
        </div>
      </div>
    </UploadResumeLayout>
  );
};
