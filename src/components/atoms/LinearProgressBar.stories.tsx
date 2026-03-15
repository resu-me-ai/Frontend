import type { Meta, StoryObj } from '@storybook/react';
import { LinearProgressBar } from './LinearProgressBar';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Atoms/LinearProgressBar',
  component: LinearProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
    },
  },
} satisfies Meta<typeof LinearProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const Animated: Story = {
  args: {} as never,
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Reset to 0 for continuous loop
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-[400px]">
        <LinearProgressBar progress={progress} />
        <p className="mt-2 text-sm text-gray-600 text-center">{Math.round(progress)}%</p>
      </div>
    );
  },
};

export const Zero: Story = {
  args: {
    progress: 0,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const Quarter: Story = {
  args: {
    progress: 25,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const Half: Story = {
  args: {
    progress: 50,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const ThreeQuarters: Story = {
  args: {
    progress: 75,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const Complete: Story = {
  args: {
    progress: 100,
  },
  render: (args) => (
    <div className="w-[400px]">
      <LinearProgressBar {...args} />
    </div>
  ),
};

export const AllStates: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">0%</span>
        <LinearProgressBar progress={0} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">25%</span>
        <LinearProgressBar progress={25} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">50%</span>
        <LinearProgressBar progress={50} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">75%</span>
        <LinearProgressBar progress={75} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">100%</span>
        <LinearProgressBar progress={100} />
      </div>
    </div>
  ),
};
