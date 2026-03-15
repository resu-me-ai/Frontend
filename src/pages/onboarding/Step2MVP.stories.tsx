import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Step2 } from './Step2';

const meta = {
  title: 'MVP Flow/0 - Onboarding/Step2',
  component: Step2,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/onboarding/step/2']}>
        <Routes>
          <Route path="/onboarding/step/1" element={<div>Step 1 - About You</div>} />
          <Route path="/onboarding/step/2" element={<Story />} />
          <Route path="/onboarding/step/3" element={<div>Step 3 - Preferences</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Step2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
