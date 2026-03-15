import type { Meta, StoryObj } from '@storybook/react';
import { QuestionCard } from './QuestionCard';

const meta = {
  title: 'Organisms/QuestionCard',
  component: QuestionCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    question: {
      description:
        'The question object with id, bulletId, resumeQuote, mainQuestion, quoteText, highlightedText, subquestions, answerFills, and metadata fields',
    },
    highlightStyle: {
      control: 'select',
      options: ['italic', 'bold', 'underline', 'color'],
      description: 'Style for highlighted text within the quote',
    },
  },
} satisfies Meta<typeof QuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultQuestion = {
  id: 'q_000',
  bulletId: 'role_0.bullet_0',
  resumeQuote: '30% reduction on support call volumes',
  mainQuestion:
    'Your bullet mentions a 30% reduction in support calls. Can you tell me more about how you measured this and what the baseline was?',
};

export const Default: Story = {
  args: {
    question: defaultQuestion,
  },
};

export const LongQuote: Story = {
  args: {
    question: {
      id: 'q_002',
      bulletId: 'role_0.bullet_2',
      resumeQuote:
        'modernizing our front-end framework with REACT and introducing Atomic Design',
      mainQuestion:
        'What was the scale of this frontend modernization and what measurable improvements resulted?',
    },
  },
};

export const ShortQuote: Story = {
  args: {
    question: {
      id: 'q_005',
      bulletId: 'role_2.bullet_1',
      resumeQuote: '77,000 test prep questions',
      mainQuestion:
        'Can you describe a specific process improvement you made in managing this content at scale?',
    },
  },
};

export const MinimalContent: Story = {
  args: {
    question: {
      id: 'q_min',
      bulletId: 'role_1.bullet_0',
      resumeQuote: 'Improved team velocity.',
      mainQuestion: 'By how much did velocity improve?',
    },
  },
};

/**
 * Full Question Object: Complete structure with all fields including
 * subquestions, highlighted text, target variable metadata, and answer fills.
 * This demonstrates the Career Experience question generation schema.
 */
export const FullQuestionObject: Story = {
  args: {
    question: {
      id: 'q_results_001',
      bulletId: 'role_0.bullet_0',
      resumeQuote: 'Reduced support call volume by implementing IAM...',
      mainQuestion:
        'You reduced support calls by 30%. What was the dollar impact of this improvement?',
      quoteText: 'Reduced support call volume',
      highlightedText: 'Reduced support call volume',
      targetVariable: '[$dollar_context]',
      targetVariation: 'results_first',
      subquestions: [
        { id: 'sq_001', text: 'What was the cost per support call?' },
        { id: 'sq_002', text: 'How many calls were reduced annually?' },
        { id: 'sq_003', text: 'What was the total dollar savings?' },
      ],
      answerFills: "[$dollar_context] → e.g., 'saving $500K annually in support costs'",
    },
    highlightStyle: 'italic',
  },
};

/**
 * Highlight Style: Bold - Compare different highlight styles
 */
export const HighlightBold: Story = {
  args: {
    question: {
      id: 'q_efforts_001',
      bulletId: 'role_0.bullet_1',
      resumeQuote: 'Lead AI model integration focused on impactful user journeys...',
      mainQuestion:
        'For your AI integration work, what measurable outcome resulted from these activities?',
      quoteText: 'Lead AI model integration focused on impactful user journeys',
      highlightedText: 'Lead AI model integration',
      subquestions: [
        { id: 'sq_001', text: 'What user engagement or adoption metric improved?' },
        { id: 'sq_002', text: 'What business outcome resulted? (revenue, efficiency, satisfaction)' },
        { id: 'sq_003', text: 'What timeline did you achieve this in?' },
      ],
      answerFills: "[Y] → e.g., 'achieving 40% increase in user engagement'",
    },
    highlightStyle: 'bold',
  },
};

/**
 * Highlight Style: Color - Primary brand color for emphasis
 */
export const HighlightColor: Story = {
  args: {
    question: {
      id: 'q_outcome_001',
      bulletId: 'role_0.bullet_2',
      resumeQuote: 'Lead the organization in modernizing our front-end framework to React...',
      mainQuestion: 'You delivered the React migration. What measurable results did this achieve?',
      quoteText: 'Lead the organization in modernizing our front-end framework to React',
      highlightedText: 'Lead the organization in modernizing',
      subquestions: [
        { id: 'sq_001', text: 'How much faster is development now?' },
        { id: 'sq_002', text: 'What was the impact on developer productivity?' },
        { id: 'sq_003', text: 'How many teams/projects benefited?' },
      ],
      answerFills: "[Y] → e.g., 'achieving 50% faster feature delivery'",
    },
    highlightStyle: 'color',
  },
};

/**
 * Highlight Style: Underline
 */
export const HighlightUnderline: Story = {
  args: {
    question: {
      id: 'q_role_001',
      bulletId: 'role_0.bullet_4',
      resumeQuote: 'Manage 3 product managers and a product designer...',
      mainQuestion: "You're responsible for this team. What's the full scope and dollar scale?",
      quoteText: 'Manage 3 product managers and a product designer',
      highlightedText: 'Manage 3 product managers',
      subquestions: [
        { id: 'sq_001', text: "What's the total budget you manage?" },
        { id: 'sq_002', text: 'How many products/user reach falls under your scope?' },
        { id: 'sq_003', text: "What's the revenue impact of your product portfolio?" },
      ],
      answerFills:
        "[scope] → e.g., 'Responsible for $50M product portfolio across 3 product lines'",
    },
    highlightStyle: 'underline',
  },
};

/**
 * Achievement Line Question: For the Achievements line template
 */
export const AchievementLineQuestion: Story = {
  args: {
    question: {
      id: 'q_ach_001',
      bulletId: 'role_0.achievements_line',
      resumeQuote: 'Manage 3 product managers and a product designer...',
      mainQuestion:
        'For your Achievements line, what business impact resulted from your team leadership?',
      quoteText: 'Manage 3 product managers',
      highlightedText: 'Manage 3 product managers',
      targetVariable: '[phrase_1]',
      targetVariation: 'needs_impact',
      subquestions: [
        { id: 'sq_001', text: 'What revenue or cost savings did your team achieve?' },
        { id: 'sq_002', text: 'What measurable outcomes came from this team structure?' },
        { id: 'sq_003', text: 'How would you quantify the business value delivered?' },
      ],
      answerFills: "[phrase_1] → e.g., 'Built product org of 30 achieving $5M revenue growth'",
    },
  },
};

/**
 * OIRC Question: Outcome-Influence-Result-Context structure
 */
export const OIRCQuestion: Story = {
  args: {
    question: {
      id: 'q_oirc_001',
      bulletId: 'role_0.bullet_2',
      resumeQuote: 'Lead the organization in modernizing our front-end framework...',
      mainQuestion: 'Tell the full story of this org-wide initiative with special context.',
      quoteText: 'Lead the organization in modernizing',
      highlightedText: 'Lead the organization in modernizing',
      targetVariable: '[Context]',
      targetVariation: 'oirc',
      subquestions: [
        { id: 'sq_001', text: 'Were there constraints? (deadline, budget limits, resource scarcity)' },
        { id: 'sq_002', text: 'Who championed or approved this? (VP, CTO, CEO)' },
        { id: 'sq_003', text: 'Did you receive any recognition or awards?' },
        { id: 'sq_004', text: 'What complications did you navigate?' },
      ],
      answerFills: "[Context] → e.g., '(championed by CTO under 6-month deadline)'",
    },
  },
};

/**
 * LoadingSkeleton: Shimmer/pulse placeholder shown while question data is being fetched.
 * Uses a render function since the component does not have a built-in loading prop.
 */
export const LoadingSkeleton: Story = {
  args: {
    question: defaultQuestion,
  },
  render: () => (
    <div
      data-testid="question-card-skeleton"
      className="bg-white rounded-xl shadow-sm p-6 space-y-4 animate-pulse"
    >
      {/* Quote box skeleton */}
      <div className="border-l-4 border-gray-200 bg-gray-50 p-4 rounded-r-lg space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>

      {/* Main question skeleton */}
      <div className="h-5 bg-gray-200 rounded w-4/5" />
    </div>
  ),
};

/**
 * Error: Displays an error state when the question fails to load.
 * Uses a render function since the component does not have a built-in error prop.
 */
export const Error: Story = {
  args: {
    question: defaultQuestion,
  },
  render: () => (
    <div
      data-testid="question-card-error"
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">
          Unable to load question
        </p>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          We couldn&apos;t retrieve this question. This may be a temporary issue --
          please try again.
        </p>
        <button
          type="button"
          className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  ),
};
