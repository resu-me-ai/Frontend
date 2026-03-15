import type { Meta, StoryObj } from '@storybook/react';
import { ProTipBanner } from './ProTipBanner';

const meta = {
  title: 'Molecules/ProTipBanner',
  component: ProTipBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProTipBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tip: 'Incorporate missing keywords naturally into your experience descriptions to improve ATS compatibility.',
  },
};

export const LongTip: Story = {
  args: {
    tip: 'When adding new skills to your resume, make sure to provide concrete examples of how you used them in your previous roles. This helps ATS systems and recruiters understand your experience better.',
  },
};
