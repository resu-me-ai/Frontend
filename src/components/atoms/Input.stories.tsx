import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text here...',
    defaultValue: 'Sample text',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text here...',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    placeholder: 'Search location...',
    leadingIcon: <Icon name="map-pin" size={20} />,
  },
};

export const WithLeadingIconAndError: Story = {
  args: {
    placeholder: 'Enter job title...',
    leadingIcon: <Icon name="briefcase" size={20} />,
    error: 'Please enter a valid job title',
    defaultValue: 'Invalid',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Default state" />
      <Input placeholder="With value" defaultValue="Sample text" />
      <Input placeholder="With error" error="This field is required" />
      <Input placeholder="Disabled" disabled />
      <Input
        placeholder="With icon"
        leadingIcon={<Icon name="briefcase" size={20} />}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

