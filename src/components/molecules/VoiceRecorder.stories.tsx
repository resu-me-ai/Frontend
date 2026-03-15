import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { VoiceRecorder } from './VoiceRecorder';

const meta = {
  title: 'Molecules/VoiceRecorder',
  component: VoiceRecorder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    // Default action handlers for all stories
    onStart: fn(),
    onStop: fn(),
    onPause: fn(),
    onResume: fn(),
    onReview: fn(),
    onDiscard: fn(),
  },
  argTypes: {
    state: {
      control: 'radio',
      options: ['idle', 'recording', 'paused', 'stopped'],
      description: 'Current recording state',
    },
    elapsedSeconds: {
      control: { type: 'number', min: 0, max: 300 },
      description: 'Elapsed recording time in seconds',
    },
    maxSeconds: {
      control: { type: 'number', min: 30, max: 300 },
      description: 'Maximum recording time in seconds',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }} className="bg-white rounded-lg shadow p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VoiceRecorder>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Idle state — ready to start recording. */
export const Idle: Story = {
  args: {
    state: 'idle',
  },
};

/** Alias for Idle for backwards compatibility */
export const Default: Story = {
  args: {
    state: 'idle',
  },
};

/** Actively recording audio. */
export const Recording: Story = {
  args: {
    state: 'recording',
    elapsedSeconds: 83,
    maxSeconds: 120,
  },
};

/** Recording paused — can resume or discard. */
export const Paused: Story = {
  args: {
    state: 'paused',
    elapsedSeconds: 45,
    maxSeconds: 120,
  },
};

/** Recording finished — ready to review or submit. */
export const Stopped: Story = {
  args: {
    state: 'stopped',
    elapsedSeconds: 67,
    maxSeconds: 120,
  },
};

/** Recording near time limit. */
export const NearLimit: Story = {
  args: {
    state: 'recording',
    elapsedSeconds: 115,
    maxSeconds: 120,
  },
};
