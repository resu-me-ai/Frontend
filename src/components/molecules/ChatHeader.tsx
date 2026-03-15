import React from 'react';
import { SegmentedProgressBar } from '@/components/atoms/SegmentedProgressBar';
import { SkippedBadge } from '@/components/atoms/SkippedBadge';

export interface ChatHeaderProps {
  title?: string;
  autoSavedText?: string;
  questionLabel?: string;
  currentQuestion: number;
  totalQuestions: number;
  skippedCount?: number;
  onSkippedClick?: () => void;
  skippedSegments?: number[];
  className?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = 'AI Enhancement Conversation',
  autoSavedText,
  questionLabel,
  currentQuestion,
  totalQuestions,
  skippedCount,
  onSkippedClick,
  skippedSegments,
  className = '',
}) => {
  const label = questionLabel || `Current: Question ${currentQuestion} of ${totalQuestions}`;

  return (
    <div className={`border-b border-border-default px-5 py-3 space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-heading tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {autoSavedText && (
            <span className="text-sm text-text-muted">
              {autoSavedText}
            </span>
          )}
          {skippedCount != null && onSkippedClick && (
            <SkippedBadge count={skippedCount} onClick={onSkippedClick} />
          )}
        </div>
      </div>
      <p className="text-sm text-text-subtle">{label}</p>
      <SegmentedProgressBar
        current={currentQuestion}
        total={totalQuestions}
        skippedSegments={skippedSegments}
      />
    </div>
  );
};
