import type { Meta, StoryObj } from '@storybook/react';
import { FontFamilyCard } from './FontFamilyCard';

const meta = {
  title: 'Molecules/FontFamilyCard',
  component: FontFamilyCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FontFamilyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { label: 'Inter', description: 'Clean & versatile', previewFont: 'Inter, sans-serif', selected: true },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const Unselected: Story = {
  args: { label: 'Montserrat', description: 'Modern & geometric', previewFont: 'Montserrat, sans-serif' },
  decorators: [(Story) => <div className="w-[213px]"><Story /></div>],
};

export const AllFonts: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-4">
      <div className="w-[213px]"><FontFamilyCard label="Montserrat" description="Modern & geometric" previewFont="Montserrat, sans-serif" /></div>
      <div className="w-[213px]"><FontFamilyCard label="Garamond" description="Classic & elegant" previewFont="Garamond, serif" /></div>
      <div className="w-[213px]"><FontFamilyCard label="Inter" description="Clean & versatile" previewFont="Inter, sans-serif" selected /></div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
