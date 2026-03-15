import React from 'react';

export interface ProgressHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  completedQuestions: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  completedQuestions,
}) => {
  const percentage = totalQuestions > 0
    ? Math.round((completedQuestions / totalQuestions) * 100)
    : 0;

  return (
    <nav
      role="navigation"
      aria-label="Question progress"
      className="flex items-center gap-4 px-4 py-3 border-b border-gray-200"
    >
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap" data-testid="question-counter">
        Question {currentQuestion} of {totalQuestions}
      </span>

      <div className="flex items-center gap-1" data-testid="progress-dots">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const questionNum = i + 1;
          const isCompleted = questionNum <= completedQuestions;
          const isCurrent = questionNum === currentQuestion;
          return (
            <span
              key={i}
              aria-label={`Question ${questionNum}${isCompleted ? ' completed' : isCurrent ? ' current' : ' pending'}`}
              className={`w-2 h-2 rounded-full ${
                isCompleted
                  ? 'bg-green-500'
                  : isCurrent
                    ? 'bg-blue-500 ring-2 ring-blue-200'
                    : 'bg-gray-300'
              }`}
            />
          );
        })}
      </div>

      <div className="flex-1 flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% complete`}
          className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap" data-testid="progress-percentage">
          {percentage}%
        </span>
      </div>
    </nav>
  );
};
