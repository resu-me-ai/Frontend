import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSkeleton } from './ResumeSkeleton';

const meta = {
  title: 'Atoms/ResumeSkeleton',
  component: ResumeSkeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => <div className="max-w-[820px]"><Story /></div>],
};

export const Narrow: Story = {
  args: {},
  decorators: [(Story) => <div className="max-w-[400px]"><Story /></div>],
};
