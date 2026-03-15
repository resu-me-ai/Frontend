import type { Meta, StoryObj } from '@storybook/react';
import { ActivityItem } from './ActivityItem';

const meta = {
  title: 'Molecules/ActivityItem',
  component: ActivityItem,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnalysisCompleted: Story = {
  args: {
    icon: 'check-circle',
    title: 'Product Manager at TechCorp',
    description: 'Analysis completed',
    timestamp: '2 hours ago',
    iconBg: '#f5f3ff',
    iconColor: '#7c3aed',
  },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
};

export const ApplicationSubmitted: Story = {
  args: {
    icon: 'file-text',
    title: 'UX Designer at StartupXYZ',
    description: 'Application submitted',
    timestamp: '1 day ago',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
  },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
};

export const ActivityFeed: Story = {
  args: {} as never,
  render: () => (
    <div className="max-w-lg divide-y divide-border-default">
      <ActivityItem icon="check-circle" title="Product Manager at TechCorp" description="Analysis completed" timestamp="2 hours ago" iconBg="#f5f3ff" iconColor="#7c3aed" />
      <ActivityItem icon="file-text" title="UX Designer at StartupXYZ" description="Application submitted" timestamp="1 day ago" iconBg="#f0fdf4" iconColor="#16a34a" />
      <ActivityItem icon="message-circle" title="Product Manager at TechCorp" description="Resume updated" timestamp="2 days ago" iconBg="#eff6ff" iconColor="#2563eb" />
      <ActivityItem icon="plus-circle" title="Engineering Lead at InnovateTech" description="New combination created" timestamp="3 days ago" iconBg="#f0fdf4" iconColor="#16a34a" />
      <ActivityItem icon="upload" title="Engineering Lead at InnovateTech" description="Resume analyzed" timestamp="3 days ago" iconBg="#f3f4f6" iconColor="#6b7280" />
    </div>
  ),
};
