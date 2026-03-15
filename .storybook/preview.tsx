import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../src/index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    options: {
      storySort: (a, b) => {
        const topOrder = ['MVP Flow', 'Pages', 'Templates', 'Organisms', 'Molecules', 'Atoms'];
        const onboardingOrder = ['Step1', 'Step2', 'Step3', 'Step4'];

        const aP = a.title.split('/');
        const bP = b.title.split('/');

        // Level 1: top-level sections
        const ai = topOrder.indexOf(aP[0]);
        const bi = topOrder.indexOf(bP[0]);
        const aPri = ai === -1 ? topOrder.length : ai;
        const bPri = bi === -1 ? topOrder.length : bi;
        if (aPri !== bPri) return aPri - bPri;

        // Level 2: MVP Flow subsections (0-6 numeric prefix sorts naturally)
        if (aP[1] !== bP[1]) {
          return (aP[1] ?? '').localeCompare(bP[1] ?? '', undefined, { numeric: true });
        }

        // Level 3: within 0 - Onboarding, use explicit order
        if (aP[1] === '0 - Onboarding' && aP[2] && bP[2]) {
          const aOi = onboardingOrder.indexOf(aP[2]);
          const bOi = onboardingOrder.indexOf(bP[2]);
          if (aOi !== -1 && bOi !== -1) return aOi - bOi;
        }

        // Default fallback: numeric-aware alphabetical
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F5F7FA',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#1F2937',
        },
      ],
    },
  },
};

export default preview;

