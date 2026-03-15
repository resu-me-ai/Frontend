/**
 * ChatMessageList Component Tests - Message bubble max-width constraints
 *
 * Verifies AI and user message containers use correct max-width classes
 * per Figma design specs.
 *
 * @see Issue #159
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ChatMessageList } from '@/components/organisms/ChatMessageList';
import type { ChatMessage } from '@/components/organisms/ChatMessageList';

// Mock child components as simple divs
vi.mock('@/components/atoms/ChatAvatar', () => ({
  ChatAvatar: (props: Record<string, unknown>) => (
    <div data-testid={`avatar-${props.variant}`} />
  ),
}));

vi.mock('@/components/atoms/MessageTimestamp', () => ({
  MessageTimestamp: (props: Record<string, unknown>) => (
    <div data-testid="timestamp">{String(props.time)}</div>
  ),
}));

vi.mock('@/components/molecules/ChatBubble', () => ({
  ChatBubble: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chat-bubble">{children}</div>
  ),
}));

const aiMessage: ChatMessage = {
  id: 'ai-1',
  sender: 'ai',
  content: 'Hello, I am the AI assistant.',
  timestamp: '10:00 AM',
};

const userMessage: ChatMessage = {
  id: 'user-1',
  sender: 'user',
  content: 'Hi there!',
  timestamp: '10:01 AM',
};

describe('ChatMessageList bubble max-width', () => {
  it('AI message container has max-w-[70%]', () => {
    const { container } = render(
      <ChatMessageList messages={[aiMessage]} />
    );
    // AI message: the container div wrapping ChatBubble has max-w class
    const aiContainer = container.querySelector('.max-w-\\[70\\%\\]');
    expect(aiContainer).not.toBeNull();
  });

  it('User message container has max-w-[75%]', () => {
    const { container } = render(
      <ChatMessageList messages={[userMessage]} />
    );
    const userContainer = container.querySelector('.max-w-\\[75\\%\\]');
    expect(userContainer).not.toBeNull();
  });
});
