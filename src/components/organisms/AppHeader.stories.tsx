import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

/**
 * AppHeader uses the useAuth hook internally.
 * In Storybook, the hook returns mock user data (since VITE_BYPASS_AUTH
 * defaults to true or Clerk key is not configured in this environment).
 * The mock user has firstName: 'Test', lastName: 'User'.
 */
const meta = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'shadow-md',
  },
};

export const InPageContext: Story = {
  args: {},
  render: (args) => (
    <div>
      <AppHeader {...args} />
      <div className="p-8 bg-gray-50 min-h-[300px]">
        <p className="text-gray-500 text-center mt-8">
          Application content below the header
        </p>
      </div>
    </div>
  ),
};
