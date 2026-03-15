import React from 'react';

export interface SkippedSubquestion {
  id: string;
  text: string;
}

export interface SkippedQuestion {
  id: string;
  bulletId: string;
  questionNumber: number;
  mainQuestion: string;
  resumeQuote: string;
  /** Specific excerpt for display (more targeted than resumeQuote) */
  quoteText?: string;
  /** List of specific sub-prompts */
  subquestions?: SkippedSubquestion[];
}

export interface SkippedQuestionsModalProps {
  open: boolean;
  onClose: () => void;
  skippedQuestions: SkippedQuestion[];
  totalQuestions: number;
  onAnswerNow: (question: SkippedQuestion) => void;
}

export const SkippedQuestionsModal: React.FC<SkippedQuestionsModalProps> = ({
  open,
  onClose,
  skippedQuestions,
  totalQuestions,
  onAnswerNow,
}) => {
  if (!open) return null;

  const count = skippedQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        data-testid="modal-backdrop"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-border-default">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-200">
                <svg
                  className="h-4.5 w-4.5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-text-heading">
                  Skipped Questions
                </h2>
                <p className="text-sm text-text-muted">
                  {count} question{count !== 1 ? 's' : ''} skipped
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-placeholder hover:text-text-body transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {skippedQuestions.map((q) => (
            <div
              key={q.id}
              className="border border-border-default rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-action-primary">
                  Question {q.questionNumber} of {totalQuestions}
                </span>
                <button
                  type="button"
                  onClick={() => onAnswerNow(q)}
                  className="text-xs font-medium px-3 py-1 rounded-md bg-amber-warm text-amber-600 border border-amber-400 hover:bg-warning-subtle transition-colors"
                >
                  Answer Now
                </button>
              </div>
              <p className="text-sm text-text-heading">{q.mainQuestion}</p>
              {q.subquestions && q.subquestions.length > 0 && (
                <ul className="list-disc list-inside text-xs text-text-muted space-y-0.5 pl-1">
                  {q.subquestions.map((sq) => (
                    <li key={sq.id}>{sq.text}</li>
                  ))}
                </ul>
              )}
              <div className="bg-amber-warm border-l-4 border-amber-400 p-2.5 rounded">
                <p className="text-xs text-amber-800 italic">
                  &ldquo;{q.quoteText || q.resumeQuote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — help text for single skip */}
        {count === 1 && (
          <div className="px-5 py-3 border-t border-border-default">
            <p className="text-xs text-text-placeholder text-center">
              Click &ldquo;Answer Now&rdquo; to revisit this question and provide your response.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
