import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { OnboardingHeader } from './OnboardingHeader';

const meta = {
  title: 'Organisms/OnboardingHeader',
  component: OnboardingHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    showAuthButtons: {
      control: 'boolean',
      description: 'Whether to show the Sign Up and Log In buttons',
    },
  },
} satisfies Meta<typeof OnboardingHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showAuthButtons: true,
  },
};

export const WithoutAuthButtons: Story = {
  args: {
    showAuthButtons: false,
  },
};

export const InPageContext: Story = {
  args: {
    showAuthButtons: true,
  },
  render: (args) => (
    <div>
      <OnboardingHeader {...args} />
      <div className="p-8 bg-gray-50 min-h-[200px]">
        <p className="text-gray-500 text-center mt-8">Page content below the header</p>
      </div>
    </div>
  ),
};
