import React from 'react';
import type { RecordingState } from '@/types';

export type { RecordingState } from '@/types';

export interface VoiceRecorderProps {
  state: RecordingState;
  elapsedSeconds?: number;
  maxSeconds?: number;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onReview?: () => void;
  onDiscard?: () => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const WaveformBar: React.FC<{ index: number; isAnimating: boolean }> = ({
  index,
  isAnimating,
}) => {
  const baseHeight = 8;
  const maxHeight = 32;
  // Deterministic "random" height per bar using index
  const seedHeight = ((index * 7 + 3) % 5) / 4;
  const staticHeight = baseHeight + seedHeight * (maxHeight - baseHeight);

  return (
    <div
      className={`w-1.5 rounded-full bg-action-primary ${
        isAnimating ? 'animate-waveform' : ''
      }`}
      style={{
        height: isAnimating ? undefined : `${staticHeight}px`,
        animationDelay: isAnimating ? `${index * 0.05}s` : undefined,
      }}
    />
  );
};

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  state,
  elapsedSeconds = 0,
  maxSeconds = 120,
  onStart,
  onStop,
  onPause,
  onResume,
  onReview,
  onDiscard,
  className = '',
}) => {
  const isRecording = state === 'recording';
  const isPaused = state === 'paused';
  const isStopped = state === 'stopped';
  const isIdle = state === 'idle';
  const hasStarted = !isIdle;

  return (
    <div className={`flex flex-col items-center py-6 space-y-4 ${className}`}>
      {/* CSS animation for waveform */}
      <style>{`
        @keyframes waveform {
          0%, 100% { height: 8px; }
          50% { height: 32px; }
        }
        .animate-waveform {
          animation: waveform 0.6s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Recording indicator */}
      {hasStarted && (
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording
                ? 'bg-error-strong animate-pulse'
                : isStopped
                  ? 'bg-success'
                  : 'bg-gray-500'
            }`}
          />
          <span
            className={`text-sm font-medium ${
              isRecording
                ? 'text-error-strong'
                : isStopped
                  ? 'text-success'
                  : 'text-text-muted'
            }`}
          >
            {isRecording ? 'Recording...' : isStopped ? 'Ready to submit' : 'Paused'}
          </span>
        </div>
      )}

      {/* Timer */}
      {hasStarted && (
        <div className="text-2xl font-medium text-text-heading tabular-nums">
          {formatTime(elapsedSeconds)} / {formatTime(maxSeconds)}
        </div>
      )}

      {/* Waveform visualization */}
      {hasStarted && (
        <div className="flex items-center justify-center gap-1 h-10 w-64">
          {Array.from({ length: 20 }, (_, i) => (
            <WaveformBar key={i} index={i} isAnimating={isRecording} />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        {isIdle && (
          <button
            type="button"
            onClick={onStart}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
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
            Start Recording
          </button>
        )}

        {isRecording && (
          <>
            <button
              type="button"
              onClick={onPause}
              className="flex items-center justify-center w-10 h-10 text-text-muted bg-bg-muted rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Pause recording"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onStop}
              className="flex items-center justify-center w-10 h-10 text-white bg-error-strong rounded-full hover:bg-red-700 transition-colors"
              aria-label="Stop recording"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button
              type="button"
              onClick={onResume}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Resume
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-strong bg-white border border-error-strong rounded-lg hover:bg-red-50 transition-colors"
            >
              Discard
            </button>
          </>
        )}

        {isStopped && (
          <>
            <button
              type="button"
              onClick={onReview}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Review
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-strong bg-white border border-error-strong rounded-lg hover:bg-red-50 transition-colors"
            >
              Discard
            </button>
          </>
        )}
      </div>

      {/* Idle state prompt */}
      {isIdle && (
        <p className="text-sm text-text-muted">
          Record your answer using your microphone
        </p>
      )}
    </div>
  );
};
