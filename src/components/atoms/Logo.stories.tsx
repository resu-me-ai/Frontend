import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@/components/atoms/Logo';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: 'The size of the logo in pixels',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 38,
  },
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 80,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 120,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Logo size={24} />
        <span className="text-xs text-gray-500">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size={38} />
        <span className="text-xs text-gray-500">38px (Default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size={60} />
        <span className="text-xs text-gray-500">60px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size={80} />
        <span className="text-xs text-gray-500">80px</span>
      </div>
    </div>
  ),
};

export const WithBrandName: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Logo size={38} />
      <span className="text-2xl font-semibold text-brand-subtitle font-epilogue">
        Resu-ME AI
      </span>
    </div>
  ),
};

