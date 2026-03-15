import type { Meta, StoryObj } from '@storybook/react';
import { NavigationButtons } from '@/components/molecules/NavigationButtons';

const meta = {
  title: 'Molecules/NavigationButtons',
  component: NavigationButtons,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    nextLabel: {
      control: 'text',
      description: 'Label for the next/continue button',
    },
    showBack: {
      control: 'boolean',
      description: 'Whether to show the back button',
    },
    nextDisabled: {
      control: 'boolean',
      description: 'Whether the next button is disabled',
    },
  },
} satisfies Meta<typeof NavigationButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nextLabel: 'Continue',
    showBack: true,
    onNext: () => alert('Next clicked'),
    onBack: () => alert('Back clicked'),
  },
};

export const WithoutBack: Story = {
  args: {
    nextLabel: 'Continue',
    showBack: false,
    onNext: () => alert('Next clicked'),
  },
};

export const NextDisabled: Story = {
  args: {
    nextLabel: 'Continue',
    showBack: true,
    nextDisabled: true,
    onNext: () => alert('Next clicked'),
    onBack: () => alert('Back clicked'),
  },
};

export const CustomLabel: Story = {
  args: {
    nextLabel: 'Submit',
    showBack: true,
    onNext: () => alert('Submit clicked'),
    onBack: () => alert('Back clicked'),
  },
};

export const GetStarted: Story = {
  args: {
    nextLabel: 'Get Started',
    showBack: false,
    onNext: () => alert('Get Started clicked'),
  },
};

export const AllVariations: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div>
        <p className="text-sm text-gray-600 mb-4">With Back Button:</p>
        <NavigationButtons
          onNext={() => {}}
          onBack={() => {}}
          showBack={true}
        />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-4">Without Back Button (First Step):</p>
        <NavigationButtons
          onNext={() => {}}
          showBack={false}
        />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-4">Disabled Next:</p>
        <NavigationButtons
          onNext={() => {}}
          onBack={() => {}}
          showBack={true}
          nextDisabled={true}
        />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-4">Custom Label:</p>
        <NavigationButtons
          onNext={() => {}}
          onBack={() => {}}
          showBack={true}
          nextLabel="Finish"
        />
      </div>
    </div>
  ),
};

