import { LinearProgressBar } from '@/components/atoms/LinearProgressBar';
import { AnalysisStepItem } from '@/components/molecules/AnalysisStepItem';

export interface AnalysisInProgressProps {
  progress: number;
  className?: string;
}

export const AnalysisInProgress: React.FC<AnalysisInProgressProps> = ({
  progress,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-border-default rounded-2xl shadow-sm w-full max-w-[768px] mx-auto ${className}`}>
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
  );
};
