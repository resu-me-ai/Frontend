import React from 'react';
import { Sparkles } from 'lucide-react';
import { ResumeSkeleton } from '@/components/atoms/ResumeSkeleton';

export interface AnalysisLoadingViewProps {
  progress?: number;
}

interface AnalysisStep {
  number: number;
  title: string;
  description: string;
}

const steps: AnalysisStep[] = [
  { number: 1, title: 'AI-Powered Analysis', description: 'Our system identifies keywords, skills, and experience matches between your resume and the job requirements.' },
  { number: 2, title: 'Generate Report', description: 'We compile a detailed report with an overall match score, strengths, and areas for improvement.' },
  { number: 3, title: 'Notification', description: "You'll be automatically redirected to your results page once the analysis is complete. Feel free to stay on this page." },
];

/** Split-panel analysis loading: resume skeleton (left) + progress card (right) */
export const AnalysisLoadingView: React.FC<AnalysisLoadingViewProps> = ({
  progress = 22,
}) => {
  return (
    <div className="flex h-full min-h-0 bg-bg-muted">
      {/* Left: Resume skeleton */}
      <div className="w-1/2 overflow-y-auto p-6">
        <ResumeSkeleton />
      </div>

      {/* Right: Progress card */}
      <div className="w-1/2 p-6 pl-0">
        <div className="bg-white rounded-2xl shadow-sm border border-border-default p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-info-light rounded-full p-5 shadow-[0_0_24px_rgba(37,99,235,0.38)]">
              <Sparkles size={30} className="text-action-primary" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-text-body text-center mb-2">
            Analysis in Progress
          </h2>
          <p className="text-base text-text-muted text-center mb-6 max-w-md mx-auto">
            Our AI is meticulously comparing your resume with the job description. This may take a few moments.
          </p>

          {/* Progress bar */}
          <div className="bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-action-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="border-t border-border-default pt-8">
            <h3 className="text-lg font-semibold text-text-body mb-6">What Happens Next?</h3>
            <div className="flex flex-col gap-5">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="bg-info-light rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                    <span className="text-base font-bold text-action-primary">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-text-body">{step.title}</h4>
                    <p className="text-sm text-text-muted mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
