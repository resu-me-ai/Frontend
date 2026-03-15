import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Step1 } from './Step1';

const meta = {
  title: 'MVP Flow/0 - Onboarding/Step1',
  component: Step1,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/onboarding/step/1']}>
        <Routes>
          <Route path="/onboarding/step/1" element={<Story />} />
          <Route path="/onboarding/step/2" element={<div>Step 2 - Role &amp; Title</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Step1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
