import type { Meta, StoryObj } from '@storybook/react';
import { DimensionScoreBars } from './DimensionScoreBars';
import { mockDimensionScores } from '@/mocks/enhancement-review.mock';

const meta = {
  title: 'Organisms/DimensionScoreBars',
  component: DimensionScoreBars,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px] bg-white p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DimensionScoreBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scores: mockDimensionScores,
  },
};
