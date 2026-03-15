import type { Meta, StoryObj } from '@storybook/react';
import { CruciblePromoBanner } from './CruciblePromoBanner';

const meta = {
  title: 'Organisms/CruciblePromoBanner',
  component: CruciblePromoBanner,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CruciblePromoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => <div className="max-w-4xl"><Story /></div>],
};
