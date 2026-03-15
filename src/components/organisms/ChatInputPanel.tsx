import React, { useState } from 'react';
import { ChatInput } from '@/components/molecules/ChatInput';

export interface ChatInputPanelProps {
  onSubmit: (answer: string) => void;
  onSkip: () => void;
  onHint?: () => void;
  onVoiceInput?: () => void;
  isSubmitting?: boolean;
  maxCharacters?: number;
  placeholder?: string;
  warningText?: string;
  encryptedLabel?: string;
  className?: string;
}

export const ChatInputPanel: React.FC<ChatInputPanelProps> = ({
  onSubmit,
  onSkip,
  onHint,
  onVoiceInput,
  isSubmitting = false,
  maxCharacters = 2000,
  placeholder,
  warningText,
  encryptedLabel = 'Encrypted & Secure',
  className = '',
}) => {
  const [value, setValue] = useState('');
  const isEmpty = value.trim().length === 0;

  const handleSubmit = () => {
    if (!isEmpty && !isSubmitting) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div
      className={`border-t border-border-default px-6 py-6 space-y-3 ${className}`}
      onKeyDown={handleKeyDown}
    >
      <ChatInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        maxCharacters={maxCharacters}
        warningText={warningText}
        onHint={onHint}
        onVoiceInput={onVoiceInput}
      />

      {/* Action row */}
      <div className="flex items-center justify-between">
        {/* Encrypted indicator */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-sm text-success">{encryptedLabel}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSkip}
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-text-muted bg-white border border-border-input rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip Question
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isEmpty || isSubmitting}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
            Send Response
          </button>
        </div>
      </div>
    </div>
  );
};
