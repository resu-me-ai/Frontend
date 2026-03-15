/**
 * QuestionCard Component Tests - 4-field resumeQuote model
 *
 * Updated for the simplified Question interface:
 *   { id: string; bulletId: string; resumeQuote: string; mainQuestion: string }
 *
 * The component renders:
 * - A blockquote with data-testid="quote-box" showing resumeQuote
 * - A quote icon span with data-testid="quote-icon"
 * - An h2 with data-testid="main-question" showing mainQuestion
 *
 * @see Issue #199
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestionCard } from '@/components/organisms/QuestionCard';

// Mock question data — 4-field model
const mockQuestion = {
  id: 'q1',
  bulletId: 'role_0.bullet_0',
  resumeQuote: 'Led cross-functional team of 8 engineers',
  mainQuestion: 'Can you tell me more about this experience?',
};

const mockQuestion2 = {
  id: 'q2',
  bulletId: 'role_1.bullet_3',
  resumeQuote: 'Increased platform revenue by 35% through data-driven optimization',
  mainQuestion: 'What specific metrics did you use to measure success?',
};

describe('QuestionCard', () => {
  describe('Quote Box', () => {
    it('renders quote box with resumeQuote text', () => {
      render(<QuestionCard question={mockQuestion} />);

      const quoteBox = screen.getByTestId('quote-box');
      expect(quoteBox).toBeInTheDocument();
      expect(quoteBox).toHaveTextContent(mockQuestion.resumeQuote);
    });

    it('resumeQuote appears inside a blockquote element', () => {
      render(<QuestionCard question={mockQuestion} />);

      const quoteBox = screen.getByTestId('quote-box');
      expect(quoteBox.tagName).toBe('BLOCKQUOTE');
      expect(quoteBox).toHaveTextContent(mockQuestion.resumeQuote);
    });

    it('renders quote box with left border styling', () => {
      render(<QuestionCard question={mockQuestion} />);

      const quoteBox = screen.getByTestId('quote-box');
      expect(quoteBox).toHaveClass('border-l-4');
    });

    it('shows quote icon decorative element', () => {
      render(<QuestionCard question={mockQuestion} />);

      const quoteIcon = screen.getByTestId('quote-icon');
      expect(quoteIcon).toBeInTheDocument();
    });

    it('renders correctly with second mock question', () => {
      render(<QuestionCard question={mockQuestion2} />);

      const quoteBox = screen.getByTestId('quote-box');
      expect(quoteBox).toHaveTextContent(mockQuestion2.resumeQuote);
    });
  });

  describe('Main Question', () => {
    it('displays main question text', () => {
      render(<QuestionCard question={mockQuestion} />);

      const mainQuestion = screen.getByTestId('main-question');
      expect(mainQuestion).toBeInTheDocument();
      expect(mainQuestion).toHaveTextContent(mockQuestion.mainQuestion);
    });

    it('main question is rendered as a heading element', () => {
      render(<QuestionCard question={mockQuestion} />);

      const heading = screen.getByRole('heading', { name: mockQuestion.mainQuestion });
      expect(heading).toBeInTheDocument();
    });

    it('main question has font-semibold styling', () => {
      render(<QuestionCard question={mockQuestion} />);

      const mainQuestion = screen.getByTestId('main-question');
      expect(mainQuestion).toHaveClass('font-semibold');
    });

    it('renders correctly with second mock question', () => {
      render(<QuestionCard question={mockQuestion2} />);

      const mainQuestion = screen.getByTestId('main-question');
      expect(mainQuestion).toHaveTextContent(mockQuestion2.mainQuestion);
    });
  });

  describe('Card Styling', () => {
    it('has proper card container styling', () => {
      render(<QuestionCard question={mockQuestion} />);

      const card = screen.getByTestId('question-card');
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('rounded-xl');
      expect(card).toHaveClass('shadow-sm');
    });

    it('has proper spacing between sections', () => {
      render(<QuestionCard question={mockQuestion} />);

      const card = screen.getByTestId('question-card');
      expect(card).toHaveClass('space-y-4');
    });

    it('has proper padding', () => {
      render(<QuestionCard question={mockQuestion} />);

      const card = screen.getByTestId('question-card');
      expect(card).toHaveClass('p-6');
    });
  });

  describe('Accessibility', () => {
    it('quote box has proper aria label', () => {
      render(<QuestionCard question={mockQuestion} />);

      const quoteBox = screen.getByTestId('quote-box');
      expect(quoteBox).toHaveAttribute('aria-label', 'Resume excerpt');
    });

    it('main question heading has correct aria level', () => {
      render(<QuestionCard question={mockQuestion} />);

      const mainQuestion = screen.getByTestId('main-question');
      expect(mainQuestion).toHaveAttribute('aria-level', '2');
    });
  });

  describe('No old fields present', () => {
    it('does not render greeting, subQuestions, whyWeAsk, or highlightedText elements', () => {
      render(<QuestionCard question={mockQuestion} />);

      // Old test IDs from the 9-field model must not exist
      expect(screen.queryByTestId('question-greeting')).not.toBeInTheDocument();
      expect(screen.queryByTestId('sub-questions-list')).not.toBeInTheDocument();
      expect(screen.queryByTestId('why-we-ask-box')).not.toBeInTheDocument();
      expect(screen.queryByTestId('why-we-ask-toggle')).not.toBeInTheDocument();
      expect(screen.queryByTestId('highlighted-text')).not.toBeInTheDocument();
    });

    it('rendered output does not contain old field text values', () => {
      render(<QuestionCard question={mockQuestion} />);

      const card = screen.getByTestId('question-card');
      // These strings belonged to the old 9-field mock and should never appear
      expect(card).not.toHaveTextContent('Hi Test!');
      expect(card).not.toHaveTextContent('Why we ask');
      expect(card).not.toHaveTextContent('What was your specific role');
    });
  });
});
