/**
 * Mock data for Context Collection review state
 * Questions, answers, and review summary
 */

export type MockQuestionStatus = 'answered' | 'skipped';

export interface MockReviewQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  status: MockQuestionStatus;
  questionText: string;
  bulletReference?: string;
  answer?: string;
}

export const mockReviewQuestions: MockReviewQuestion[] = [
  {
    id: 'rq-1',
    questionNumber: 1,
    totalQuestions: 6,
    status: 'answered',
    questionText: 'Can you tell me more about the features you led development on?',
    answer: 'I led the development of 5 major features including the student dashboard redesign, assessment engine overhaul, and real-time collaboration tools. These features served 50K+ students and increased daily active usage by 25%.',
  },
  {
    id: 'rq-2',
    questionNumber: 2,
    totalQuestions: 6,
    status: 'answered',
    questionText: 'What specific improvements did you make to system performance?',
    answer: 'I implemented CDN caching, lazy loading for media assets, and optimized database queries. This reduced API latency from 800ms to 200ms and page load times by 60%.',
  },
  {
    id: 'rq-3',
    questionNumber: 3,
    totalQuestions: 6,
    status: 'skipped',
    questionText: 'What were the key challenges you faced during implementation and how did you drive adoption?',
    bulletReference: 'Established and maintained comprehensive design system used by 40+ designers across 8 product teams',
  },
  {
    id: 'rq-4',
    questionNumber: 4,
    totalQuestions: 6,
    status: 'skipped',
    questionText: 'What specific tools or processes did you introduce to reduce handoff time by 40%?',
    bulletReference: 'Optimized design-to-development workflow, reducing handoff time by 40% through improved documentation',
  },
  {
    id: 'rq-5',
    questionNumber: 5,
    totalQuestions: 6,
    status: 'answered',
    questionText: 'Tell me about your role in the migration project.',
    answer: 'I was the technical lead responsible for migrating our legacy monolith to a microservices architecture on AWS, managing a team of 4 engineers over 6 months.',
  },
  {
    id: 'rq-6',
    questionNumber: 6,
    totalQuestions: 6,
    status: 'answered',
    questionText: 'How did you measure the impact of accessibility improvements?',
    answer: 'We conducted WCAG 2.1 AA audits before and after, achieving 98% compliance. Customer support tickets related to accessibility dropped by 45%.',
  },
];

export const mockReviewSummary = {
  answered: 4,
  skipped: 2,
  total: 6,
};
