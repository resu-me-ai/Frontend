import type { Meta, StoryObj } from '@storybook/react';
import { StatsCardsRow } from './StatsCardsRow';
import { mockStats } from '@/mocks/dashboard.mock';

const meta = {
  title: 'Organisms/StatsCardsRow',
  component: StatsCardsRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCardsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { stats: mockStats },
  decorators: [(Story) => <div className="max-w-4xl"><Story /></div>],
};
