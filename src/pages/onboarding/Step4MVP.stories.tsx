import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Step4 } from './Step4';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const meta = {
  title: 'MVP Flow/0 - Onboarding/Step4',
  component: Step4,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/onboarding/step/4']}>
          <Routes>
            <Route path="/onboarding/step/3" element={<div>Step 3 - Preferences</div>} />
            <Route path="/onboarding/step/4" element={<Story />} />
            <Route path="/job-description" element={<div>Job Description Page</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof Step4>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
