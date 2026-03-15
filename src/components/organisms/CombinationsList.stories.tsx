import type { Meta, StoryObj } from '@storybook/react';
import { CombinationsList } from './CombinationsList';
import { mockCombinations } from '@/mocks/dashboard.mock';

const meta = {
  title: 'Organisms/CombinationsList',
  component: CombinationsList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CombinationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { combinations: mockCombinations },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};

export const Empty: Story = {
  args: { combinations: [] },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};
