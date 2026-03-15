import React from 'react';

export interface Subquestion {
  id: string;
  text: string;
}

export type HighlightStyle = 'italic' | 'bold' | 'underline' | 'color';

export interface QuestionCardProps {
  question: {
    id: string;
    bulletId: string;
    resumeQuote: string;
    mainQuestion: string;
    /** Specific excerpt for the blockquote display (more targeted than resumeQuote) */
    quoteText?: string;
    /** Text within the quote to visually highlight */
    highlightedText?: string;
    /** Variable placeholder the answer will fill (e.g., [$dollar_context]) - metadata only */
    targetVariable?: string;
    /** Variation type (e.g., results_first) - metadata only */
    targetVariation?: string;
    /** List of specific sub-prompts displayed as bullet points under the main question */
    subquestions?: Subquestion[];
    /** Example showing expected answer format */
    answerFills?: string;
  };
  /** Style for highlighted text within the quote */
  highlightStyle?: HighlightStyle;
}

/**
 * Renders quote text with optional highlighting.
 * If highlightedText is provided and found within displayQuote,
 * that portion will be styled according to highlightStyle.
 */
function renderQuoteWithHighlight(
  displayQuote: string,
  highlightedText: string | undefined,
  highlightStyle: HighlightStyle
): React.ReactNode {
  if (!highlightedText || !displayQuote.includes(highlightedText)) {
    return displayQuote;
  }

  const parts = displayQuote.split(highlightedText);
  const styleClasses: Record<HighlightStyle, string> = {
    italic: 'italic',
    bold: 'font-semibold',
    underline: 'underline',
    color: 'text-primary font-medium',
  };

  return (
    <>
      {parts[0]}
      <span className={styleClasses[highlightStyle]} data-testid="highlighted-text">
        {highlightedText}
      </span>
      {parts.slice(1).join(highlightedText)}
    </>
  );
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  highlightStyle = 'italic',
}) => {
  // Prefer quoteText over resumeQuote for the blockquote display
  const displayQuote = question.quoteText || question.resumeQuote;

  return (
    <div
      data-testid="question-card"
      className="bg-white rounded-xl shadow-sm p-6 space-y-4"
    >
      {/* Blockquote — displays quoteText (or falls back to resumeQuote) */}
      {displayQuote && (
        <blockquote
          data-testid="quote-box"
          aria-label="Resume excerpt"
          className="border-l-4 border-primary bg-bg-gray p-4 rounded-r-lg"
        >
          <div className="flex items-start gap-2">
            <span data-testid="quote-icon" className="text-primary text-sm leading-none flex-shrink-0">
              &ldquo;
            </span>
            <p className="text-sm text-text-secondary flex-1">
              {renderQuoteWithHighlight(displayQuote, question.highlightedText, highlightStyle)}
            </p>
          </div>
        </blockquote>
      )}

      {/* Main Question */}
      <h2
        data-testid="main-question"
        className="text-sm font-semibold text-text-primary"
        role="heading"
        aria-level={2}
      >
        {question.mainQuestion}
      </h2>

      {/* Subquestions — bullet list of specific prompts */}
      {question.subquestions && question.subquestions.length > 0 && (
        <ul
          data-testid="subquestions-list"
          className="list-disc list-inside space-y-1 text-sm text-text-secondary pl-2"
        >
          {question.subquestions.map((sq) => (
            <li key={sq.id} data-testid={`subquestion-${sq.id}`}>
              {sq.text}
            </li>
          ))}
        </ul>
      )}

      {/* Expected format — shows example answer format */}
      {question.answerFills && (
        <div
          data-testid="answer-fills"
          className="bg-gray-50 border border-gray-200 rounded-lg p-3"
        >
          <p className="text-xs text-text-secondary">
            <span className="font-medium text-text-primary">Expected format:</span>{' '}
            {question.answerFills}
          </p>
        </div>
      )}
    </div>
  );
};
