import type { Meta, StoryObj } from '@storybook/react';
import { DashboardView } from '@/components/templates/DashboardView';
import { mockStats, mockCombinations, mockRecentActivity } from '@/mocks/dashboard.mock';

/**
 * Dashboard redesign story — uses DashboardView template directly
 * since the actual DashboardPage hasn't been rewired yet.
 */
const meta = {
  title: 'MVP Flow/9 - Dashboard/DashboardPage',
  component: DashboardView,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  args: {
    stats: mockStats,
    combinations: mockCombinations,
    activities: mockRecentActivity,
  },
  decorators: [(Story) => <div className="min-h-screen bg-bg-muted"><Story /></div>],
};

export const EmptyState: Story = {
  args: {
    stats: [
      { id: 'stat-1', label: 'Total Combos', value: 0, icon: 'file-text', iconBg: '#eff6ff', iconColor: '#2563eb' },
      { id: 'stat-2', label: 'Applied', value: 0, icon: 'building', iconBg: '#f0fdf4', iconColor: '#16a34a' },
      { id: 'stat-3', label: 'Interviews', value: 0, icon: 'calendar', iconBg: '#f5f3ff', iconColor: '#7c3aed' },
      { id: 'stat-4', label: 'Avg Match', value: '0%', icon: 'trending-up', iconBg: '#ecfdf5', iconColor: '#059669' },
    ],
    combinations: [],
    activities: [],
  },
  decorators: [(Story) => <div className="min-h-screen bg-bg-muted"><Story /></div>],
};
