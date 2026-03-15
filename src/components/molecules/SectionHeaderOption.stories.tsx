import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeaderOption } from './SectionHeaderOption';

const meta = {
  title: 'Molecules/SectionHeaderOption',
  component: SectionHeaderOption,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeaderOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { label: 'No Background', description: 'Simple border style', selected: true },
  decorators: [(Story) => <div className="w-[328px]"><Story /></div>],
};

export const Unselected: Story = {
  args: { label: 'With Background', description: 'Colored background box' },
  decorators: [(Story) => <div className="w-[328px]"><Story /></div>],
};

export const BothOptions: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-4 w-[672px]">
      <SectionHeaderOption label="No Background" description="Simple border style" selected />
      <SectionHeaderOption label="With Background" description="Colored background box" />
    </div>
  ),
  parameters: { layout: 'padded' },
};
