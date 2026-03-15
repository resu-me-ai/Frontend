import React, { useState, useRef, useEffect } from 'react';
import type { InputMode, RecordingState } from '@/types';
import { InputModeTabs } from '@/components/molecules/InputModeTabs';
import { ChatInput } from '@/components/molecules/ChatInput';
import { VoiceRecorder } from '@/components/molecules/VoiceRecorder';
import { FileDropzone } from '@/components/molecules/FileDropzone';

export interface MultiModeInputPanelProps {
  /** Text mode */
  onSubmitText: (text: string) => void;
  maxCharacters?: number;
  placeholder?: string;
  warningText?: string;
  onHint?: () => void;

  /** Voice mode */
  recordingState: RecordingState;
  elapsedSeconds?: number;
  maxRecordingSeconds?: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onReviewRecording?: () => void;
  onDiscardRecording?: () => void;
  onSubmitRecording?: () => void;

  /** Upload mode */
  onFilesSelected: (files: File[]) => void;
  supportedFormats?: string[];
  maxFileSizeMB?: number;
  selectedFile?: File | null;
  isUploading?: boolean;

  /** Shared */
  onSkip: () => void;
  isSubmitting?: boolean;
  encryptedLabel?: string;

  /** Submit error message to display below the input */
  submitError?: string | null;

  /** Mode filtering — which input modes to show (default: all three) */
  enabledModes?: InputMode[];

  /** "Next Question" flow (#214) */
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'next' | 'continue';
  inputDisabled?: boolean;
  nextDisabled?: boolean;
  onNextQuestion?: () => void;

  className?: string;
}

export const MultiModeInputPanel: React.FC<MultiModeInputPanelProps> = ({
  onSubmitText,
  maxCharacters = 2000,
  placeholder,
  warningText,
  onHint,

  recordingState,
  elapsedSeconds = 0,
  maxRecordingSeconds = 120,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onReviewRecording,
  onDiscardRecording,
  onSubmitRecording,

  onFilesSelected,
  supportedFormats,
  maxFileSizeMB,
  selectedFile = null,
  isUploading = false,

  onSkip,
  isSubmitting = false,
  encryptedLabel = 'Encrypted & Secure',

  submitError = null,
  enabledModes = ['text', 'voice', 'upload'],

  buttonLabel,
  buttonVariant = 'primary',
  inputDisabled = false,
  nextDisabled = false,
  onNextQuestion,

  className = '',
}) => {
  const [activeMode, setActiveMode] = useState<InputMode>('text');
  const [textValue, setTextValue] = useState('');
  // Local ref to prevent rapid multiple submissions (synchronous guard)
  const isSubmittingRef = useRef(false);

  // Reset the local guard when parent's isSubmitting becomes false
  useEffect(() => {
    if (!isSubmitting) {
      isSubmittingRef.current = false;
    }
  }, [isSubmitting]);

  const isTextEmpty = textValue.trim().length === 0;
  const isVoiceStopped = recordingState === 'stopped';

  const canSubmit =
    !isSubmitting &&
    ((activeMode === 'text' && !isTextEmpty) ||
      (activeMode === 'voice' && isVoiceStopped) ||
      (activeMode === 'upload' && selectedFile !== null));

  const handleSubmit = () => {
    // Use ref for synchronous guard to prevent race conditions
    if (activeMode === 'text' && !isTextEmpty && !isSubmitting && !isSubmittingRef.current) {
      isSubmittingRef.current = true; // Set immediately, synchronously
      onSubmitText(textValue);
      setTextValue('');
    }
    // Voice and upload submissions are handled by their own callbacks
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && activeMode === 'text') {
      handleSubmit();
    }
  };

  return (
    <div
      className={`border-t border-border-default px-5 py-2 space-y-1.5 ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Tab switcher — hidden when only one mode enabled */}
      {enabledModes.length > 1 && (
        <InputModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
      )}

      {/* Mode content */}
      <div className="min-h-[150px]">
        {activeMode === 'text' && (
          <ChatInput
            value={textValue}
            onChange={setTextValue}
            placeholder={placeholder}
            maxCharacters={maxCharacters}
            warningText={warningText}
            onHint={onHint}
            disabled={inputDisabled}
          />
        )}

        {activeMode === 'voice' && (
          <VoiceRecorder
            state={recordingState}
            elapsedSeconds={elapsedSeconds}
            maxSeconds={maxRecordingSeconds}
            onStart={onStartRecording}
            onStop={onStopRecording}
            onPause={onPauseRecording}
            onResume={onResumeRecording}
            onReview={onReviewRecording}
            onDiscard={onDiscardRecording}
          />
        )}

        {activeMode === 'upload' && (
          <FileDropzone
            onFilesSelected={onFilesSelected}
            supportedFormats={supportedFormats}
            maxSizeMB={maxFileSizeMB}
            selectedFile={selectedFile}
            isUploading={isUploading}
          />
        )}
      </div>

      {/* Submit error */}
      {submitError && (
        <p data-testid="submit-error" role="alert" className="text-xs text-red-600">{submitError}</p>
      )}

      {/* Action row */}
      <div className="flex items-center justify-between">
        {/* Encrypted indicator */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-sm text-success">{encryptedLabel}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {buttonVariant !== 'continue' && (
            <button
              type="button"
              onClick={onSkip}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-text-muted bg-white border border-border-input rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip Question
            </button>
          )}

          {buttonVariant === 'next' && (
            <button
              type="button"
              onClick={onNextQuestion}
              disabled={nextDisabled}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonLabel ?? 'Next Question'}
            </button>
          )}

          {buttonVariant === 'continue' && (
            <button
              type="button"
              onClick={onNextQuestion}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
            >
              {buttonLabel ?? 'Continue'}
            </button>
          )}

          {buttonVariant !== 'next' && buttonVariant !== 'continue' && (
            <button
              type="button"
              onClick={activeMode === 'voice' ? onSubmitRecording : handleSubmit}
              disabled={!canSubmit}
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
              {buttonLabel ?? (activeMode === 'upload' ? 'Upload & Submit' : activeMode === 'voice' ? 'Submit' : 'Send Response')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
