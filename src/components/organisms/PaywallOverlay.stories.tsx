import type { Meta, StoryObj } from '@storybook/react';
import { PaywallOverlay } from './PaywallOverlay';

const meta = {
  title: 'Organisms/PaywallOverlay',
  component: PaywallOverlay,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    price: { control: 'text' },
    ctaLabel: { control: 'text' },
    onUpgradeClick: { action: 'onUpgradeClick' },
  },
} satisfies Meta<typeof PaywallOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="relative w-full min-h-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {},
};

export const CustomCopy: Story = {
  decorators: [
    (Story) => (
      <div className="relative w-full min-h-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Unlock Your Full Report',
    description:
      'Get the complete breakdown of your resume score, personalized suggestions, and ATS optimization tips for just {{price}}.',
    price: '$19.99/month',
    ctaLabel: 'Get Full Access',
  },
};

export const InContext: Story = {
  decorators: [
    (Story) => (
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8">
        {/* Mock content behind the overlay */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-lg bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">!</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Priority Action Items
              </h3>
              <p className="text-sm text-gray-500">
                Complete these tasks to maximize your resume&apos;s effectiveness
              </p>
            </div>
          </div>

          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                {n}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  Action item title #{n}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Description of what needs to be done to improve your resume
                  score for this category.
                </p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-700 h-fit">
                High
              </span>
            </div>
          ))}
        </div>

        {/* The overlay on top */}
        <Story />
      </div>
    ),
  ],
  args: {},
};
