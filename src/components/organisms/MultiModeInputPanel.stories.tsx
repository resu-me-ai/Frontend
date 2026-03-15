import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { composeStories } from '@storybook/react-vite';
import { MultiModeInputPanel } from './MultiModeInputPanel';
import type { RecordingState } from '@/types';
import * as VoiceRecorderStories from '@/components/molecules/VoiceRecorder.stories';

// Compose VoiceRecorder stories to inherit their args
const ComposedVoiceRecorder = composeStories(VoiceRecorderStories);

/**
 * Maps VoiceRecorder story args to MultiModeInputPanel voice props.
 * This enables designer changes in VoiceRecorder to cascade to parent stories.
 */
function toVoiceArgs(
  story: (typeof ComposedVoiceRecorder)[keyof typeof ComposedVoiceRecorder]
) {
  const args = story.args;
  return {
    recordingState: (args?.state ?? 'idle') as RecordingState,
    elapsedSeconds: args?.elapsedSeconds,
    maxRecordingSeconds: args?.maxSeconds,
  };
}

const meta = {
  title: 'Organisms/MultiModeInputPanel',
  component: MultiModeInputPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    // Default action handlers for all stories
    onSubmitText: fn(),
    onSkip: fn(),
    onHint: fn(),
    onStartRecording: fn(),
    onStopRecording: fn(),
    onPauseRecording: fn(),
    onResumeRecording: fn(),
    onReviewRecording: fn(),
    onDiscardRecording: fn(),
    onSubmitRecording: fn(),
    onFilesSelected: fn(),
    recordingState: 'idle',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }} className="bg-white rounded-lg shadow">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiModeInputPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    warningText: 'Be specific about your experience — vague answers reduce optimization quality.',
    placeholder: 'Type your response here...',
  },
};

/** Voice recording in progress — composed from VoiceRecorder.Recording args. */
export const VoiceRecording: Story = {
  args: {
    ...toVoiceArgs(ComposedVoiceRecorder.Recording),
  },
};

/** Voice recording paused — composed from VoiceRecorder.Paused args. */
export const VoicePaused: Story = {
  args: {
    ...toVoiceArgs(ComposedVoiceRecorder.Paused),
  },
};

/** Voice recording finished — composed from VoiceRecorder.Stopped args. */
export const VoiceStopped: Story = {
  args: {
    ...toVoiceArgs(ComposedVoiceRecorder.Stopped),
  },
};

export const FileSelected: Story = {
  args: {
    selectedFile: new File(['content'], 'project_brief.pdf', {
      type: 'application/pdf',
    }),
  },
};

export const Uploading: Story = {
  args: {
    isUploading: true,
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};

/** Text-only mode — voice/upload tabs hidden (#252) */
export const TextOnly: Story = {
  args: {
    enabledModes: ['text'],
    placeholder: 'Share your experience...',
    warningText: 'Be specific about your experience — vague answers reduce optimization quality.',
  },
};

/** Interactive story that wires up tab switching and text input */
const InteractiveRender = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <MultiModeInputPanel
      onSubmitText={(text) => alert(`Submitted: ${text}`)}
      onSkip={() => alert('Skipped')}
      onHint={() => alert('Hint requested')}
      warningText="Be specific about your experience — vague answers reduce optimization quality."
      placeholder="Type your response here..."
      recordingState={recordingState}
      elapsedSeconds={elapsed}
      maxRecordingSeconds={120}
      onStartRecording={() => {
        setRecordingState('recording');
        setElapsed(0);
      }}
      onStopRecording={() => {
        // Stop finalizes recording → goes to stopped state
        setRecordingState('stopped');
      }}
      onPauseRecording={() => setRecordingState('paused')}
      onResumeRecording={() => setRecordingState('recording')}
      onReviewRecording={() => alert('Playing back recording...')}
      onDiscardRecording={() => {
        setRecordingState('idle');
        setElapsed(0);
      }}
      onSubmitRecording={() => {
        alert('Voice recording submitted!');
        setRecordingState('idle');
        setElapsed(0);
      }}
      onFilesSelected={(files) => setSelectedFile(files[0] || null)}
      selectedFile={selectedFile}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveRender />,
};
