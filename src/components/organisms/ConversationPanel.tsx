import React from 'react';
import type { ChatMessage } from '@/types';
import { ChatHeader } from '@/components/molecules/ChatHeader';
import type { ChatHeaderProps } from '@/components/molecules/ChatHeader';
import { ChatMessageList } from '@/components/organisms/ChatMessageList';
import { MultiModeInputPanel } from '@/components/organisms/MultiModeInputPanel';
import type { MultiModeInputPanelProps } from '@/components/organisms/MultiModeInputPanel';

export interface ConversationPanelProps
  extends ChatHeaderProps,
    MultiModeInputPanelProps {
  /** Messages to display in the chat area */
  messages: ChatMessage[];
  /** Avatar source for the user */
  userAvatarSrc?: string;
  /** Fallback text for user avatar */
  userAvatarFallback?: string;
  /** Additional CSS classes on the root element */
  className?: string;
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  // ChatHeader props
  title,
  autoSavedText,
  questionLabel,
  currentQuestion,
  totalQuestions,
  skippedCount,
  onSkippedClick,
  skippedSegments,

  // ChatMessageList props
  messages,
  userAvatarSrc,
  userAvatarFallback,

  // MultiModeInputPanel props
  onSubmitText,
  maxCharacters,
  placeholder,
  warningText,
  onHint,
  recordingState,
  elapsedSeconds,
  maxRecordingSeconds,
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
  selectedFile,
  isUploading,
  onSkip,
  isSubmitting,
  encryptedLabel,

  // Error display
  submitError,

  // Mode filtering
  enabledModes,

  // Next Question flow (#214)
  buttonLabel,
  buttonVariant,
  inputDisabled,
  nextDisabled,
  onNextQuestion,

  // Shared
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col h-full bg-white border-l border-border-default ${className}`}
    >
      {/* Header - pinned top */}
      <ChatHeader
        title={title}
        autoSavedText={autoSavedText}
        questionLabel={questionLabel}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        skippedCount={skippedCount}
        onSkippedClick={onSkippedClick}
        skippedSegments={skippedSegments}
      />

      {/* Message list - scrollable middle */}
      <ChatMessageList
        messages={messages}
        userAvatarSrc={userAvatarSrc}
        userAvatarFallback={userAvatarFallback}
        className="flex-1"
      />

      {/* Input panel - pinned bottom */}
      <MultiModeInputPanel
        onSubmitText={onSubmitText}
        maxCharacters={maxCharacters}
        placeholder={placeholder}
        warningText={warningText}
        onHint={onHint}
        recordingState={recordingState}
        elapsedSeconds={elapsedSeconds}
        maxRecordingSeconds={maxRecordingSeconds}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        onPauseRecording={onPauseRecording}
        onResumeRecording={onResumeRecording}
        onReviewRecording={onReviewRecording}
        onDiscardRecording={onDiscardRecording}
        onSubmitRecording={onSubmitRecording}
        onFilesSelected={onFilesSelected}
        supportedFormats={supportedFormats}
        maxFileSizeMB={maxFileSizeMB}
        selectedFile={selectedFile}
        isUploading={isUploading}
        onSkip={onSkip}
        isSubmitting={isSubmitting}
        encryptedLabel={encryptedLabel}
        submitError={submitError}
        enabledModes={enabledModes}
        buttonLabel={buttonLabel}
        buttonVariant={buttonVariant}
        inputDisabled={inputDisabled}
        nextDisabled={nextDisabled}
        onNextQuestion={onNextQuestion}
      />
    </div>
  );
};
