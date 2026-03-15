/**
 * TDD Tests for MultiModeInputPanel — "Next Question" button flow (#214)
 *
 * Tests the new props: buttonLabel, buttonVariant, inputDisabled, onNextQuestion
 *
 * RED PHASE: These tests define the expected behavior.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiModeInputPanel } from '@/components/organisms/MultiModeInputPanel';

// Minimal required props for MultiModeInputPanel
const baseProps = {
  onSubmitText: vi.fn(),
  onSkip: vi.fn(),
  recordingState: 'idle' as const,
  onStartRecording: vi.fn(),
  onStopRecording: vi.fn(),
  onPauseRecording: vi.fn(),
  onResumeRecording: vi.fn(),
  onFilesSelected: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('MultiModeInputPanel — Next Question flow (#214)', () => {
  it('default button label is "Send Response"', () => {
    render(<MultiModeInputPanel {...baseProps} />);

    expect(screen.getByRole('button', { name: /send response/i })).toBeInTheDocument();
  });

  it('custom buttonLabel renders', () => {
    render(<MultiModeInputPanel {...baseProps} buttonLabel="Next Question" />);

    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send response/i })).not.toBeInTheDocument();
  });

  it('buttonVariant="next" applies amber styling, not blue', () => {
    render(
      <MultiModeInputPanel
        {...baseProps}
        buttonLabel="Next Question"
        buttonVariant="next"
      />,
    );

    const button = screen.getByRole('button', { name: /next question/i });
    expect(button.className).toContain('bg-amber-500');
    expect(button.className).not.toContain('bg-[#2563eb]');
  });

  it('inputDisabled=true disables textarea', () => {
    render(<MultiModeInputPanel {...baseProps} inputDisabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('onNextQuestion fires on click when buttonVariant="next"', async () => {
    const onNextQuestion = vi.fn();
    const user = userEvent.setup();

    render(
      <MultiModeInputPanel
        {...baseProps}
        buttonLabel="Next Question"
        buttonVariant="next"
        onNextQuestion={onNextQuestion}
      />,
    );

    const button = screen.getByRole('button', { name: /next question/i });
    await user.click(button);

    expect(onNextQuestion).toHaveBeenCalledOnce();
  });

  it('onNextQuestion fires even when textarea is empty', async () => {
    const onNextQuestion = vi.fn();
    const user = userEvent.setup();

    render(
      <MultiModeInputPanel
        {...baseProps}
        buttonLabel="Next Question"
        buttonVariant="next"
        inputDisabled
        onNextQuestion={onNextQuestion}
      />,
    );

    // Textarea is empty and disabled — button should still work
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
    expect(textarea).toBeDisabled();

    const button = screen.getByRole('button', { name: /next question/i });
    await user.click(button);

    expect(onNextQuestion).toHaveBeenCalledOnce();
    expect(baseProps.onSubmitText).not.toHaveBeenCalled();
  });
});
