import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnhancedResumeOutputPage } from './EnhancedResumeOutputPage';
import { mockResumeDocument } from '@/mocks/resume-document.mock';

// Mock API responses for the pipeline endpoints
const mockFinalizeResponse = {
  status: 'complete',
  bulletCount: 7,
  enhancedCount: 5,
};

const mockRescoreResponse = {
  original: { overall: 68 },
  enhanced: { overall: 89 },
  deltas: { overall: 21 },
  improved: true,
  gap_resolution: {
    total_gaps: 7,
    resolved_gaps: 5,
  },
};

/**
 * Creates a mock fetch function that handles multiple endpoints
 */
const createMockFetch = (options?: { delay?: number; failAt?: 'finalize' | 'rescore'; resumeDocument404?: boolean }) => {
  const delay = options?.delay ?? 100;
  const failAt = options?.failAt;
  const resumeDocument404 = options?.resumeDocument404 ?? false;

  return ((url: string, _init?: RequestInit) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof url === 'string' && url.includes('/finalize')) {
          if (failAt === 'finalize') {
            resolve({
              ok: false,
              status: 500,
              text: async () => 'Finalize endpoint failed',
            } as Response);
          } else {
            resolve({
              ok: true,
              json: async () => mockFinalizeResponse,
            } as Response);
          }
        } else if (typeof url === 'string' && url.includes('/rescore')) {
          if (failAt === 'rescore') {
            resolve({
              ok: false,
              status: 500,
              text: async () => 'Rescore endpoint failed',
            } as Response);
          } else {
            resolve({
              ok: true,
              json: async () => mockRescoreResponse,
            } as Response);
          }
        } else if (typeof url === 'string' && url.includes('/resume-document')) {
          if (resumeDocument404) {
            resolve({
              ok: false,
              status: 404,
              json: async () => null,
            } as Response);
          } else {
            resolve({
              ok: true,
              json: async () => mockResumeDocument,
            } as Response);
          }
        } else if (typeof url === 'string' && url.includes('/download')) {
          resolve({
            ok: true,
            blob: async () => new Blob(['mock resume content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
          } as Response);
        } else {
          resolve({
            ok: true,
            json: async () => ({}),
          } as Response);
        }
      }, delay);
    });
  }) as typeof fetch;
};

// Set default working mock at module level so Docs view always has a baseline
globalThis.fetch = createMockFetch({ delay: 200 });

const meta = {
  title: 'Pages/EnhancedResumeOutputPage',
  component: EnhancedResumeOutputPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Fresh QueryClient per render prevents cache leaking between stories in Docs view
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/enhanced-resume/mock-session-001']}>
            <Routes>
              <Route path="/enhanced-resume/:sessionId" element={<Story />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof EnhancedResumeOutputPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full page with resume preview and score comparison.
 * Shows the complete enhanced resume output experience.
 */
export const Default: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch({ delay: 200 });
      return <Story />;
    },
  ],
};

/**
 * Loading state - shows skeleton placeholders while fetching data.
 */
export const Loading: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch({ delay: 999999 }); // Never resolves
      return <Story />;
    },
  ],
};

/**
 * Error state - API returned a failure during finalize.
 */
export const ErrorAtFinalize: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch({ failAt: 'finalize' });
      return <Story />;
    },
  ],
};

/**
 * Error state - API returned a failure during rescore.
 */
export const ErrorAtRescore: Story = {
  decorators: [
    (Story) => {
      globalThis.fetch = createMockFetch({ failAt: 'rescore' });
      return <Story />;
    },
  ],
};
