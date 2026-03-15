/**
 * State machine for voice recording component.
 * Transitions: idle -> recording <-> paused -> stopped -> idle
 */
export type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';
