import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResumeCustomizationPage } from './ResumeCustomizationPage';
import { mockResumeDocument } from '@/mocks/resume-document.mock';

// Mock fetch: returns resume-document data, lets download calls succeed silently
globalThis.fetch = ((url: string, _init?: RequestInit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof url === 'string' && url.includes('/resume-document')) {
        resolve({ ok: true, json: async () => mockResumeDocument } as Response);
      } else if (typeof url === 'string' && url.includes('/download')) {
        resolve({
          ok: true,
          blob: async () => new Blob(['mock'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        } as Response);
      } else {
        resolve({ ok: true, json: async () => ({}) } as Response);
      }
    }, 150);
  });
}) as typeof fetch;

const meta = {
  title: 'MVP Flow/8 - Resume Customization/ResumeCustomizationPage',
  component: ResumeCustomizationPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/customize/mock-session-123']}>
            <Routes>
              <Route path="/customize/:sessionId" element={<Story />} />
              <Route path="/dashboard" element={<div className="p-8 text-center text-lg">Dashboard Page</div>} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ResumeCustomizationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
