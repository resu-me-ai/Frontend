import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ChatBubble } from '@/components/molecules/ChatBubble';

describe('ChatBubble', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <ChatBubble>Hello, world!</ChatBubble>
    );
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });

  it('uses gray background styling', () => {
    const { container } = render(
      <ChatBubble>Default message</ChatBubble>
    );
    const bubble = container.firstChild as HTMLElement;
    expect(bubble.className).toContain('bg-bg-muted');
  });

  it('applies rounded corners for AI bubble shape', () => {
    const { container } = render(
      <ChatBubble>Message</ChatBubble>
    );
    const bubble = container.firstChild as HTMLElement;
    expect(bubble.className).toContain('rounded-tr-2xl');
    expect(bubble.className).toContain('rounded-br-2xl');
    expect(bubble.className).toContain('rounded-bl-2xl');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <ChatBubble className="custom-class">Message</ChatBubble>
    );
    const bubble = container.firstChild as HTMLElement;
    expect(bubble.className).toContain('custom-class');
  });
});
