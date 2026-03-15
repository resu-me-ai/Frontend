import type { Meta, StoryObj } from '@storybook/react';
import { ColorSchemeCard } from './ColorSchemeCard';

const meta = {
  title: 'Molecules/ColorSchemeCard',
  component: ColorSchemeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSchemeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { label: 'Professional Blue', primaryColor: '#2563eb', secondaryColor: '#3b82f6', selected: true },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const Unselected: Story = {
  args: { label: 'Corporate Green', primaryColor: '#16a34a', secondaryColor: '#22c55e' },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const AllSchemes: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-4">
      <div className="w-[213px]"><ColorSchemeCard label="Professional Blue" primaryColor="#2563eb" secondaryColor="#3b82f6" selected /></div>
      <div className="w-[213px]"><ColorSchemeCard label="Corporate Green" primaryColor="#16a34a" secondaryColor="#22c55e" /></div>
      <div className="w-[213px]"><ColorSchemeCard label="Monochrome" primaryColor="#000000" secondaryColor="#374151" /></div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
