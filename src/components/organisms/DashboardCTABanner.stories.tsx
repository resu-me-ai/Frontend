import type { Meta, StoryObj } from '@storybook/react';
import { DashboardCTABanner } from './DashboardCTABanner';

const meta = {
  title: 'Organisms/DashboardCTABanner',
  component: DashboardCTABanner,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardCTABanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => <div className="max-w-4xl"><Story /></div>],
};
