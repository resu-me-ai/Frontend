import React from 'react';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxCharacters?: number;
  warningText?: string;
  onHint?: () => void;
  onVoiceInput?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  placeholder = "Type your response to the AI's question...",
  maxCharacters = 2000,
  warningText = 'You can only respond to questions one time',
  onHint,
  onVoiceInput,
  disabled = false,
  className = '',
}) => {
  const characterCount = value.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Warning text */}
      {warningText && (
        <div className="flex items-center gap-2 pl-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span className="text-sm text-text-subtle">{warningText}</span>
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Your response"
        rows={3}
        className="w-full px-3 py-2 text-sm text-text-heading placeholder:text-[#717182] bg-[#f3f3f5] border border-transparent rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent"
      />

      {/* Helper buttons + character count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onHint && (
            <button
              type="button"
              onClick={onHint}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-subtle transition-colors"
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
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              Need a hint?
            </button>
          )}
          {onVoiceInput && (
            <button
              type="button"
              onClick={onVoiceInput}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-subtle transition-colors"
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
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
              Voice Input
            </button>
          )}
        </div>
        <span className="text-sm text-text-muted" aria-live="polite" aria-atomic="true">
          {characterCount} / {maxCharacters} characters
        </span>
      </div>
    </div>
  );
};
