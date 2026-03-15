import React from 'react';
import { ReviewAnswersList } from '@/components/organisms/ReviewAnswersList';
import { ResumePreviewPanel } from '@/components/organisms/ResumePreviewPanel';
import type { MockReviewQuestion } from '@/mocks/context-collection.mock';

export interface ReviewAnswersViewProps {
  questions: MockReviewQuestion[];
  answeredCount: number;
  skippedCount: number;
  onAnswerNow?: (questionId: string) => void;
  onGenerateResume?: () => void;
  /** Raw resume HTML for the left panel. Falls back to placeholder when omitted. */
  resumeHtml?: string;
}

/** Split layout: resume preview (left) + review answers (right) */
export const ReviewAnswersView: React.FC<ReviewAnswersViewProps> = ({
  questions,
  answeredCount,
  skippedCount,
  onAnswerNow,
  onGenerateResume,
  resumeHtml,
}) => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Nav bar — 63px (matches ContextCollectionV3View) */}
      <nav className="shrink-0 h-[63px] bg-white border-b border-border-default flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-dark to-progress-active flex items-center justify-center">
            <span className="text-white text-sm font-bold">Ri</span>
          </div>
          <span className="text-text-heading font-semibold text-base">Resu-ME AI</span>
        </div>
        <div className="w-[35px] h-[35px] rounded-full bg-gray-200 overflow-hidden">
          <div className="w-full h-full bg-gray-300" />
        </div>
      </nav>

      {/* Main content — gray bg, two panels */}
      <main className="flex-1 flex min-h-0 bg-bg-muted">
        {/* Left panel (~50.2%) */}
        <div className="w-[50.2%] pt-6 px-6 flex flex-col min-h-0">
          {resumeHtml ? (
            <ResumePreviewPanel
              resumeHtml={resumeHtml}
              className="flex-1 min-h-0"
            />
          ) : (
            <div className="bg-white px-[30px] py-[38px] min-h-full" />
          )}
        </div>

        {/* Right panel (~49.8%) */}
        <div className="w-[49.8%] pt-6 pl-6 pr-8 flex flex-col min-h-0">
          <ReviewAnswersList
            questions={questions}
            answeredCount={answeredCount}
            skippedCount={skippedCount}
            onAnswerNow={onAnswerNow}
            onGenerateResume={onGenerateResume}
          />
        </div>
      </main>

      {/* Footer — 64px (matches ContextCollectionV3View) */}
      <footer className="shrink-0 h-[64px] bg-white border-t border-border-default flex items-center px-6">
        <div className="flex items-center gap-2 text-sm text-text-subtle">
          <span>&copy; 2026 Resu-ME AI</span>
          <span>&bull;</span>
          <span>Privacy Policy</span>
          <span>&bull;</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
};
