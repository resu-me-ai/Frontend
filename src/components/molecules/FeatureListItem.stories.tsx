import type { Meta, StoryObj } from '@storybook/react';
import { FeatureListItem } from './FeatureListItem';

const meta = {
  title: 'Molecules/FeatureListItem',
  component: FeatureListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'ATS-Optimized',
  },
};

export const List: Story = {
  args: {} as never,
  render: () => (
    <div className="bg-gradient-to-r from-action-primary to-violet-900 p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <FeatureListItem text="ATS-Optimized" />
        <FeatureListItem text="Industry Templates" />
        <FeatureListItem text="One-Click Export" />
      </div>
    </div>
  ),
};
