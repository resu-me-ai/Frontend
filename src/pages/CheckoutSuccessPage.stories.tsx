import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CheckoutSuccessPage } from './CheckoutSuccessPage';

const meta = {
  title: 'Pages/CheckoutSuccessPage',
  component: CheckoutSuccessPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/checkout/success?session_id=cs_test_abc123def456ghi789']}>
        <Routes>
          <Route path="/checkout/success" element={<Story />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/onboarding/1-profile" element={<div>Onboarding Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CheckoutSuccessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: successful checkout with a session ID displayed.
 */
export const Default: Story = {};

/**
 * Without a session ID in the URL query params.
 */
export const WithoutSessionId: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/checkout/success']}>
        <Routes>
          <Route path="/checkout/success" element={<Story />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/onboarding/1-profile" element={<div>Onboarding Page</div>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};
