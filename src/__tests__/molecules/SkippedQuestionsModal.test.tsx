import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkippedQuestionsModal } from '@/components/molecules/SkippedQuestionsModal';
import type { SkippedQuestion } from '@/components/molecules/SkippedQuestionsModal';

const singleSkipped: SkippedQuestion[] = [
  {
    id: 'q2',
    bulletId: 'role_0.bullet_1',
    questionNumber: 2,
    mainQuestion: 'Can you tell me more about leading the team?',
    resumeQuote: 'Led cross-functional team of 8 engineers',
  },
];

const multipleSkipped: SkippedQuestion[] = [
  {
    id: 'q2',
    bulletId: 'role_0.bullet_1',
    questionNumber: 2,
    mainQuestion: 'Can you tell me more about leading the team?',
    resumeQuote: 'Led cross-functional team of 8 engineers',
  },
  {
    id: 'q4',
    bulletId: 'role_1.bullet_0',
    questionNumber: 4,
    mainQuestion: 'What metrics did you track?',
    resumeQuote: 'Increased revenue by 40%',
  },
  {
    id: 'q5',
    bulletId: 'role_1.bullet_2',
    questionNumber: 5,
    mainQuestion: 'How did you implement the CI/CD pipeline?',
    resumeQuote: 'Built automated deployment pipeline',
  },
];

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  skippedQuestions: singleSkipped,
  totalQuestions: 6,
  onAnswerNow: vi.fn(),
};

describe('SkippedQuestionsModal', () => {
  it('renders nothing when open={false}', () => {
    const { container } = render(
      <SkippedQuestionsModal {...defaultProps} open={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders header with "Skipped Questions" title when open', () => {
    render(<SkippedQuestionsModal {...defaultProps} />);
    expect(screen.getByText('Skipped Questions')).toBeInTheDocument();
  });

  it('shows correct subtitle for single question: "1 question skipped"', () => {
    render(<SkippedQuestionsModal {...defaultProps} />);
    expect(screen.getByText('1 question skipped')).toBeInTheDocument();
  });

  it('shows correct subtitle for multiple questions: "3 questions skipped"', () => {
    render(
      <SkippedQuestionsModal
        {...defaultProps}
        skippedQuestions={multipleSkipped}
      />
    );
    expect(screen.getByText('3 questions skipped')).toBeInTheDocument();
  });

  it('renders a card for each skipped question with question number, text, and quote', () => {
    render(
      <SkippedQuestionsModal
        {...defaultProps}
        skippedQuestions={multipleSkipped}
      />
    );
    expect(screen.getByText('Question 2 of 6')).toBeInTheDocument();
    expect(screen.getByText('Question 4 of 6')).toBeInTheDocument();
    expect(screen.getByText('Question 5 of 6')).toBeInTheDocument();
    expect(screen.getByText('Can you tell me more about leading the team?')).toBeInTheDocument();
    expect(screen.getByText(/Led cross-functional team/)).toBeInTheDocument();
  });

  it('calls onAnswerNow with the correct SkippedQuestion when "Answer Now" is clicked', async () => {
    const user = userEvent.setup();
    const onAnswerNow = vi.fn();
    render(
      <SkippedQuestionsModal
        {...defaultProps}
        onAnswerNow={onAnswerNow}
      />
    );

    await user.click(screen.getByText('Answer Now'));
    expect(onAnswerNow).toHaveBeenCalledWith(singleSkipped[0]);
  });

  it('calls onClose when X button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SkippedQuestionsModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SkippedQuestionsModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('shows help text footer when single question skipped', () => {
    render(<SkippedQuestionsModal {...defaultProps} />);
    expect(
      screen.getByText(/Click.*Answer Now.*to revisit/i)
    ).toBeInTheDocument();
  });
});
