/**
 * Story Composition Tests: Full Cascade
 *
 * Tests the complete cascade chain:
 * VoiceRecorder -> MultiModeInputPanel -> ContextCollectionV3View
 *
 * Goal: Verify that atomic component changes propagate all the way
 * up to template-level stories.
 */
import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react-vite';
import * as VoiceRecorderStories from '@/components/molecules/VoiceRecorder.stories';
import * as MultiModeInputPanelStories from '@/components/organisms/MultiModeInputPanel.stories';
import * as ContextCollectionV3ViewStories from '@/components/templates/ContextCollectionV3View.stories';

// Import portable-stories to apply project annotations
import '@/../.storybook/portable-stories';

const VoiceRecorder = composeStories(VoiceRecorderStories);
const MultiModeInputPanel = composeStories(MultiModeInputPanelStories);
const ContextCollectionV3View = composeStories(ContextCollectionV3ViewStories);

describe('Story Composition: Full Cascade to Template', () => {
  describe('VoiceRecorder -> MultiModeInputPanel -> ContextCollectionV3View', () => {
    it('Recording state cascades from VoiceRecorder to template', () => {
      // Source: VoiceRecorder.Recording
      const voiceRecordingArgs = VoiceRecorder.Recording.args;

      // Middle: MultiModeInputPanel.VoiceRecording
      const panelRecordingArgs = MultiModeInputPanel.VoiceRecording.args;

      // Destination: ContextCollectionV3View.VoiceModeRecording
      const templateArgs = ContextCollectionV3View.VoiceModeRecording.args;
      const conversationProps = templateArgs?.conversationPanelProps;

      // Verify cascade: VoiceRecorder -> MultiModeInputPanel
      expect(panelRecordingArgs?.recordingState).toBe(voiceRecordingArgs?.state);

      // Verify cascade: MultiModeInputPanel -> ContextCollectionV3View
      expect(conversationProps?.recordingState).toBe(panelRecordingArgs?.recordingState);

      // Full cascade: VoiceRecorder -> ContextCollectionV3View
      expect(conversationProps?.recordingState).toBe(voiceRecordingArgs?.state);
      expect(conversationProps?.elapsedSeconds).toBe(voiceRecordingArgs?.elapsedSeconds);
      expect(conversationProps?.maxRecordingSeconds).toBe(voiceRecordingArgs?.maxSeconds);
    });

    it('Paused state cascades from VoiceRecorder to template', () => {
      const voicePausedArgs = VoiceRecorder.Paused.args;
      const templateArgs = ContextCollectionV3View.VoiceModePaused.args;
      const conversationProps = templateArgs?.conversationPanelProps;

      expect(conversationProps?.recordingState).toBe(voicePausedArgs?.state);
      expect(conversationProps?.elapsedSeconds).toBe(voicePausedArgs?.elapsedSeconds);
    });

    it('Stopped state cascades from VoiceRecorder to template', () => {
      const voiceStoppedArgs = VoiceRecorder.Stopped.args;
      const templateArgs = ContextCollectionV3View.VoiceModeStopped.args;
      const conversationProps = templateArgs?.conversationPanelProps;

      expect(conversationProps?.recordingState).toBe(voiceStoppedArgs?.state);
      expect(conversationProps?.elapsedSeconds).toBe(voiceStoppedArgs?.elapsedSeconds);
    });
  });

  describe('Single source of truth validation', () => {
    it('all elapsedSeconds values trace back to VoiceRecorder stories', () => {
      // Recording elapsed seconds should match across all layers
      const voiceRecordingElapsed = VoiceRecorder.Recording.args?.elapsedSeconds;
      const panelRecordingElapsed = MultiModeInputPanel.VoiceRecording.args?.elapsedSeconds;
      const templateRecordingElapsed = ContextCollectionV3View.VoiceModeRecording.args?.conversationPanelProps?.elapsedSeconds;

      expect(panelRecordingElapsed).toBe(voiceRecordingElapsed);
      expect(templateRecordingElapsed).toBe(voiceRecordingElapsed);
    });

    it('maxSeconds/maxRecordingSeconds match across all layers', () => {
      const voiceMax = VoiceRecorder.Recording.args?.maxSeconds;
      const panelMax = MultiModeInputPanel.VoiceRecording.args?.maxRecordingSeconds;
      const templateMax = ContextCollectionV3View.VoiceModeRecording.args?.conversationPanelProps?.maxRecordingSeconds;

      expect(panelMax).toBe(voiceMax);
      expect(templateMax).toBe(voiceMax);
    });
  });
});
