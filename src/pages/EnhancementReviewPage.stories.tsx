import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnhancementReviewPage } from './EnhancementReviewPage';
import { mockResumeDocument } from '@/mocks/resume-document.mock';

const mockEnhancedBulletsResponse = {
  bullets: [
    {
      location: 'role_0.bullet_0',
      before: 'Manage $25M portfolio of high-profile sports-stream products to serve 8M monthly users.',
      after: 'Directed $25M product portfolio spanning 3 sports-streaming verticals, driving 8M MAU and 200% revenue growth through strategic feature prioritization.',
      confidence: 0.92,
      frameworks_applied: ['quantification', 'results_first'],
      company: 'StreamTech Inc.',
      role_title: 'Senior Product Manager',
    },
    {
      location: 'role_0.bullet_1',
      before: 'Hired, developed, and mentored seven high-performing brand managers and built a collaborative team culture.',
      after: 'Built and mentored a 7-person PM team, establishing a cross-functional culture that elevated engineering velocity by 40% and became the organizational benchmark for high performance.',
      confidence: 0.88,
      frameworks_applied: ['high_pressure_circumstances', 'cpet_verbs'],
      company: 'StreamTech Inc.',
      role_title: 'Senior Product Manager',
    },
    {
      location: 'role_0.bullet_2',
      before: 'Increase product-portfolio revenue by 300%, decreased customer complaints by 8X and churn by 60% YoY.',
      after: 'Drove 300% revenue growth ($15M→$45M) while reducing customer complaints by 8× and annual churn by 60%, translating to $12M in retained revenue.',
      confidence: 0.95,
      frameworks_applied: ['quantification', 'strategic_business_activities'],
      company: 'StreamTech Inc.',
      role_title: 'Senior Product Manager',
    },
  ],
  overall_improvement: 28,
  summary: 'Enhanced 3 bullets with improved quantification and strategic impact.',
  gaps_by_pattern: {
    P1_quantification: { resolved: 3, remaining: 0 },
    P2_high_pressure: { resolved: 1, remaining: 1 },
    P3_cpet_verbs: { resolved: 2, remaining: 0 },
    P4_strategic_reframe: { resolved: 1, remaining: 1 },
  },
};

const mockRescoreResponse = {
  original: { overall: 62, competency: 58, pattern: 60, qualifications: 70, keywords: 65 },
  enhanced: { overall: 89, competency: 85, pattern: 88, qualifications: 90, keywords: 92 },
  deltas:   { overall: 27, competency: 27, pattern: 28, qualifications: 20, keywords: 27 },
  improved: true,
  gap_resolution: { total_gaps: 7, resolved_gaps: 5 },
};

const createMockFetch = (delay = 200) =>
  ((url: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (typeof url === 'string' && url.includes('enhanced-bullets')) {
          resolve({ ok: true, json: async () => mockEnhancedBulletsResponse } as Response);
        } else if (typeof url === 'string' && url.includes('rescore')) {
          resolve({ ok: true, json: async () => mockRescoreResponse } as Response);
        } else if (typeof url === 'string' && url.includes('resume-document')) {
          resolve({ ok: true, json: async () => mockResumeDocument } as Response);
        } else if (typeof url === 'string' && url.includes('download')) {
          resolve({ ok: true, blob: async () => new Blob(['mock'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }) } as Response);
        } else {
          resolve({ ok: true, json: async () => ({}) } as Response);
        }
      }, delay);
    })) as typeof fetch;

globalThis.fetch = createMockFetch();

const meta = {
  title: 'MVP Flow/7 - Enhanced Resume Review/EnhancementReviewPage',
  component: EnhancementReviewPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/enhancement-review/mock-session-123']}>
            <Routes>
              <Route path="/enhancement-review/:sessionId" element={<Story />} />
              <Route path="/customize/:sessionId" element={<div className="p-8 text-center text-lg text-gray-500">&rarr; Resume Customization Page</div>} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof EnhancementReviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch(200);
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch(999999);
      return <Story />;
    },
  ],
};
