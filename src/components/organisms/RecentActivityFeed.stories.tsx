import type { Meta, StoryObj } from '@storybook/react';
import { RecentActivityFeed } from './RecentActivityFeed';
import { mockRecentActivity } from '@/mocks/dashboard.mock';

const meta = {
  title: 'Organisms/RecentActivityFeed',
  component: RecentActivityFeed,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof RecentActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { activities: mockRecentActivity },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
};
