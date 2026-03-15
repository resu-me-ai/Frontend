import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalCombos: Story = {
  args: { icon: 'file-text', value: 3, label: 'Total Combos', iconBg: '#eff6ff', iconColor: '#2563eb' },
};

export const Applied: Story = {
  args: { icon: 'building', value: 1, label: 'Applied', iconBg: '#f0fdf4', iconColor: '#16a34a' },
};

export const AllStats: Story = {
  args: {} as never,
  render: () => (
    <div className="grid grid-cols-4 gap-4 w-[900px]">
      <StatCard icon="file-text" value={3} label="Total Combos" iconBg="#eff6ff" iconColor="#2563eb" />
      <StatCard icon="building" value={1} label="Applied" iconBg="#f0fdf4" iconColor="#16a34a" />
      <StatCard icon="calendar" value={1} label="Interviews" iconBg="#f5f3ff" iconColor="#7c3aed" />
      <StatCard icon="trending-up" value="85%" label="Avg Match" iconBg="#ecfdf5" iconColor="#059669" />
    </div>
  ),
  parameters: { layout: 'padded' },
};
