import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatHeader } from '@/components/molecules/ChatHeader';

describe('ChatHeader — skipped badge', () => {
  it('renders SkippedBadge when skippedCount > 0', () => {
    render(
      <ChatHeader
        currentQuestion={1}
        totalQuestions={6}
        skippedCount={2}
        onSkippedClick={() => {}}
      />
    );
    expect(screen.getByText('2 Skipped')).toBeInTheDocument();
  });

  it('does not render badge when skippedCount is 0', () => {
    render(
      <ChatHeader
        currentQuestion={1}
        totalQuestions={6}
        skippedCount={0}
      />
    );
    expect(screen.queryByText(/Skipped/)).not.toBeInTheDocument();
  });

  it('does not render badge when skippedCount is undefined', () => {
    render(
      <ChatHeader currentQuestion={1} totalQuestions={6} />
    );
    expect(screen.queryByText(/Skipped/)).not.toBeInTheDocument();
  });

  it('passes onSkippedClick through to badge', async () => {
    const user = userEvent.setup();
    const onSkippedClick = vi.fn();
    render(
      <ChatHeader
        currentQuestion={1}
        totalQuestions={6}
        skippedCount={1}
        onSkippedClick={onSkippedClick}
      />
    );

    await user.click(screen.getByText('1 Skipped'));
    expect(onSkippedClick).toHaveBeenCalledOnce();
  });
});
