import type { Meta, StoryObj } from '@storybook/react';
import { CustomizationPanel } from './CustomizationPanel';

const meta = {
  title: 'Organisms/CustomizationPanel',
  component: CustomizationPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomizationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => <div className="max-w-[720px]"><Story /></div>],
};
