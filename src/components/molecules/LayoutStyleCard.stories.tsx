import type { Meta, StoryObj } from '@storybook/react';
import { LayoutStyleCard } from './LayoutStyleCard';

const meta = {
  title: 'Molecules/LayoutStyleCard',
  component: LayoutStyleCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LayoutStyleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { emoji: '\uD83D\uDCC4', label: 'Modern', description: 'Clean layout with subtle accents', selected: true },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const Unselected: Story = {
  args: { emoji: '\uD83D\uDCCB', label: 'Classic', description: 'Traditional two-column design', selected: false },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const AllLayouts: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-4">
      <div className="w-[213px]"><LayoutStyleCard emoji={'\uD83D\uDCC4'} label="Modern" description="Clean layout with subtle accents" selected /></div>
      <div className="w-[213px]"><LayoutStyleCard emoji={'\uD83D\uDCCB'} label="Classic" description="Traditional two-column design" /></div>
      <div className="w-[213px]"><LayoutStyleCard emoji={'\uD83D\uDCC3'} label="Minimal" description="Simple and straightforward" /></div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
