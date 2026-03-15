import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from '@/components/molecules/FormInput';
import { Icon } from '@/components/atoms/Icon';

const meta = {
  title: 'Molecules/FormInput',
  component: FormInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
  },
};

export const Required: Story = {
  args: {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
    required: true,
  },
};

export const WithValue: Story = {
  args: {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
    defaultValue: 'John Doe',
  },
};

export const WithError: Story = {
  args: {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
    required: true,
    error: 'Full name is required',
  },
};

export const Disabled: Story = {
  args: {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
    disabled: true,
    defaultValue: 'John Doe',
  },
};

export const WithIcon: Story = {
  args: {
    id: 'jobTitle',
    label: 'Job Title',
    placeholder: 'Enter your job title',
    required: true,
    leadingIcon: <Icon name="briefcase" size={20} />,
  },
};

export const WithIconAndError: Story = {
  args: {
    id: 'jobTitle',
    label: 'Job Title',
    placeholder: 'Enter your job title',
    required: true,
    leadingIcon: <Icon name="briefcase" size={20} />,
    error: 'Please enter a valid job title',
  },
};

export const FormExample: Story = {
  args: {} as never,
  render: () => (
    <div className="w-full max-w-lg space-y-6">
      <FormInput
        id="fullName"
        label="Full Name"
        placeholder="Enter full name"
        required
      />
      <FormInput
        id="email"
        label="Email Address"
        placeholder="you@example.com"
        required
        type="email"
      />
      <FormInput
        id="jobTitle"
        label="Most Recent Job Title"
        placeholder="Senior Software Engineer"
        leadingIcon={<Icon name="briefcase" size={20} />}
      />
    </div>
  ),
};

