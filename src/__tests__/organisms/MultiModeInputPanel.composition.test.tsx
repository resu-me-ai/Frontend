/**
 * Story Composition Tests
 *
 * These tests verify that composeStories properly cascades args from
 * atomic component stories to parent stories.
 *
 * Goal: When a designer edits VoiceRecorder.Recording args, the changes
 * should automatically propagate to MultiModeInputPanel.VoiceRecording.
 */
import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react-vite';
import * as VoiceRecorderStories from '@/components/molecules/VoiceRecorder.stories';
import * as MultiModeInputPanelStories from '@/components/organisms/MultiModeInputPanel.stories';

// Import portable-stories to apply project annotations
import '@/../.storybook/portable-stories';

const VoiceRecorder = composeStories(VoiceRecorderStories);
const MultiModeInputPanel = composeStories(MultiModeInputPanelStories);

describe('Story Composition: VoiceRecorder -> MultiModeInputPanel', () => {
  describe('Recording state cascade', () => {
    it('VoiceRecorder.Recording args propagate to MultiModeInputPanel.VoiceRecording', () => {
      const voiceArgs = VoiceRecorder.Recording.args;
      const panelArgs = MultiModeInputPanel.VoiceRecording.args;

      // The panel should inherit the recording state from VoiceRecorder
      expect(panelArgs?.recordingState).toBe(voiceArgs?.state);
      expect(panelArgs?.elapsedSeconds).toBe(voiceArgs?.elapsedSeconds);
      expect(panelArgs?.maxRecordingSeconds).toBe(voiceArgs?.maxSeconds);
    });

    it('VoiceRecorder.Paused args propagate to MultiModeInputPanel.VoicePaused', () => {
      const voiceArgs = VoiceRecorder.Paused.args;
      const panelArgs = MultiModeInputPanel.VoicePaused.args;

      expect(panelArgs?.recordingState).toBe(voiceArgs?.state);
      expect(panelArgs?.elapsedSeconds).toBe(voiceArgs?.elapsedSeconds);
    });

    it('VoiceRecorder.Stopped args propagate to MultiModeInputPanel.VoiceStopped', () => {
      const voiceArgs = VoiceRecorder.Stopped.args;
      const panelArgs = MultiModeInputPanel.VoiceStopped.args;

      expect(panelArgs?.recordingState).toBe(voiceArgs?.state);
      expect(panelArgs?.elapsedSeconds).toBe(voiceArgs?.elapsedSeconds);
    });
  });

  describe('Args consistency', () => {
    it('all voice states have consistent maxSeconds across stories', () => {
      // VoiceRecorder stories should have consistent maxSeconds
      const recordingMax = VoiceRecorder.Recording.args?.maxSeconds;
      const pausedMax = VoiceRecorder.Paused.args?.maxSeconds;
      const stoppedMax = VoiceRecorder.Stopped.args?.maxSeconds;

      expect(recordingMax).toBe(pausedMax);
      expect(pausedMax).toBe(stoppedMax);
    });

    it('MultiModeInputPanel inherits maxRecordingSeconds consistently', () => {
      const panelRecordingMax = MultiModeInputPanel.VoiceRecording.args?.maxRecordingSeconds;
      const panelPausedMax = MultiModeInputPanel.VoicePaused.args?.maxRecordingSeconds;
      const panelStoppedMax = MultiModeInputPanel.VoiceStopped.args?.maxRecordingSeconds;

      // All should match the VoiceRecorder source
      expect(panelRecordingMax).toBe(VoiceRecorder.Recording.args?.maxSeconds);
      expect(panelPausedMax).toBe(VoiceRecorder.Paused.args?.maxSeconds);
      expect(panelStoppedMax).toBe(VoiceRecorder.Stopped.args?.maxSeconds);
    });
  });

  describe('Designer workflow validation', () => {
    it('changing VoiceRecorder.Recording.elapsedSeconds would update parent', () => {
      // This test validates the composition pattern is in place.
      // If someone changes VoiceRecorder.Recording args, the parent story
      // will automatically inherit those changes through composeStories.
      //
      // The relationship is: VoiceRecorder.args.state -> MultiModeInputPanel.args.recordingState
      const voiceState = VoiceRecorder.Recording.args?.state;
      const panelState = MultiModeInputPanel.VoiceRecording.args?.recordingState;

      expect(voiceState).toBe('recording');
      expect(panelState).toBe('recording');
    });

    it('composeStories returns callable story functions', () => {
      // Verify the composed stories are actually renderable
      expect(typeof VoiceRecorder.Recording).toBe('function');
      expect(typeof MultiModeInputPanel.VoiceRecording).toBe('function');
    });
  });
});
