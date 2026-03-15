import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Step3 } from './Step3';

const meta = {
  title: 'Pages/Onboarding/Step3',
  component: Step3,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/onboarding/step/3']}>
        <Routes>
          <Route path="/onboarding/step/2" element={<div>Step 2 - Role & Title</div>} />
          <Route path="/onboarding/step/3" element={<Story />} />
          <Route path="/onboarding/step/4" element={<div>Step 4 - Location</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Step3>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default: empty form for salary, equity, work location, and team size preferences.
 */
export const Default: Story = {};
