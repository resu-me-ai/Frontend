import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { MockReviewQuestion } from '@/mocks/context-collection.mock';

export interface ReviewAnswersListProps {
  questions: MockReviewQuestion[];
  answeredCount: number;
  skippedCount: number;
  onAnswerNow?: (questionId: string) => void;
  onGenerateResume?: () => void;
  className?: string;
}

/** Review Your Answers panel: answered/skipped question cards with "Answer Now" */
export const ReviewAnswersList: React.FC<ReviewAnswersListProps> = ({
  questions,
  answeredCount,
  skippedCount,
  onAnswerNow,
  onGenerateResume,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="px-6 py-5">
        <h2 className="text-lg font-semibold text-text-heading">Review Your Answers</h2>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={16} className="text-success" />
            <span className="text-sm font-medium text-success">{answeredCount} answered</span>
          </div>
          <span className="text-border-input">&bull;</span>
          <div className="flex items-center gap-1.5">
            <AlertCircle size={16} className="text-amber-500" />
            <span className="text-sm font-medium text-amber-500">{skippedCount} skipped</span>
          </div>
        </div>
      </div>

      {/* Question list */}
      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-3">
        {questions.map((q) =>
          q.status === 'answered' ? (
            <div
              key={q.id}
              className="bg-success-light border border-green-200 rounded-[10px] px-4 py-2.5 flex items-center gap-2"
            >
              <CheckCircle size={20} className="text-success shrink-0" />
              <span className="text-sm font-semibold text-text-heading">
                Question {q.questionNumber} of {q.totalQuestions} Answered
              </span>
            </div>
          ) : (
            <div
              key={q.id}
              className="border border-border-default rounded-[10px] px-4 py-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-info">
                  Question {q.questionNumber} of {q.totalQuestions}
                </span>
                <button
                  type="button"
                  onClick={() => onAnswerNow?.(q.id)}
                  className="bg-action-primary text-white text-sm font-medium px-4 py-2 rounded-[10px] hover:bg-action-primary-hover transition-colors"
                >
                  Answer Now
                </button>
              </div>
              <p className="text-sm text-text-heading">{q.questionText}</p>
              {q.bulletReference && (
                <div className="bg-warning-subtle border-l-[3px] border-amber-500 rounded pl-4 py-2.5">
                  <p className="text-xs italic text-amber-900">&ldquo;{q.bulletReference}&rdquo;</p>
                </div>
              )}
            </div>
          )
        )}

        {/* Unanswered notice */}
        {skippedCount > 0 && (
          <div className="bg-bg-muted rounded-[10px] px-4 py-3">
            <p className="text-sm text-text-muted">
              You have{' '}
              <span className="font-semibold text-[#f54900]">{skippedCount} unanswered questions</span>.
              {' '}Click &ldquo;Answer Now&rdquo; to revisit any skipped question or proceed to generate your enhanced resume.
            </p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-6 border-t border-border-default flex justify-end">
        <button
          type="button"
          onClick={onGenerateResume}
          className="bg-action-primary text-white font-medium py-3 px-6 rounded-[10px] hover:bg-action-primary-hover transition-colors"
        >
          Generate Enhanced Resume
        </button>
      </div>
    </div>
  );
};
