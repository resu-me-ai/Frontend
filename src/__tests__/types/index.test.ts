import { describe, it, expect } from 'vitest';
import type { RecordingState, InputMode, ChatMessage } from '@/types';

describe('Shared Types', () => {
  describe('RecordingState', () => {
    it('exports RecordingState type with all valid values', () => {
      const states: RecordingState[] = ['idle', 'recording', 'paused', 'stopped'];
      expect(states).toHaveLength(4);
      expect(states).toContain('idle');
      expect(states).toContain('recording');
      expect(states).toContain('paused');
      expect(states).toContain('stopped');
    });

    it('allows assignment of valid recording states', () => {
      const idle: RecordingState = 'idle';
      const recording: RecordingState = 'recording';
      const paused: RecordingState = 'paused';
      const stopped: RecordingState = 'stopped';

      expect(idle).toBe('idle');
      expect(recording).toBe('recording');
      expect(paused).toBe('paused');
      expect(stopped).toBe('stopped');
    });
  });

  describe('InputMode', () => {
    it('exports InputMode type with all valid values', () => {
      const modes: InputMode[] = ['text', 'voice', 'upload'];
      expect(modes).toHaveLength(3);
      expect(modes).toContain('text');
      expect(modes).toContain('voice');
      expect(modes).toContain('upload');
    });

    it('allows assignment of valid input modes', () => {
      const text: InputMode = 'text';
      const voice: InputMode = 'voice';
      const upload: InputMode = 'upload';

      expect(text).toBe('text');
      expect(voice).toBe('voice');
      expect(upload).toBe('upload');
    });
  });

  describe('ChatMessage', () => {
    it('exports ChatMessage interface with required fields', () => {
      const aiMessage: ChatMessage = {
        id: 'msg-1',
        sender: 'ai',
        content: 'Hello, how can I help?',
        timestamp: '10:00 AM',
      };

      expect(aiMessage.id).toBe('msg-1');
      expect(aiMessage.sender).toBe('ai');
      expect(aiMessage.content).toBe('Hello, how can I help?');
      expect(aiMessage.timestamp).toBe('10:00 AM');
    });

    it('allows user sender type', () => {
      const userMessage: ChatMessage = {
        id: 'msg-2',
        sender: 'user',
        content: 'I need help with my resume.',
        timestamp: '10:01 AM',
      };

      expect(userMessage.sender).toBe('user');
    });

    it('allows ReactNode content (string is a valid ReactNode)', () => {
      const message: ChatMessage = {
        id: 'msg-3',
        sender: 'ai',
        content: 'This is a string, which is a valid ReactNode',
        timestamp: '10:02 AM',
      };

      expect(typeof message.content).toBe('string');
    });
  });
});
