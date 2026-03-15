import type { Meta, StoryObj } from '@storybook/react';
import { FormDropdown } from '@/components/molecules/FormDropdown';
import { Icon } from '@/components/atoms/Icon';

const meta = {
  title: 'Molecules/FormDropdown',
  component: FormDropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
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
      description: 'Whether the dropdown is disabled',
    },
  },
} satisfies Meta<typeof FormDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const pronounOptions = [
  { value: '', label: 'Select your preferred pronouns' },
  { value: 'he/him', label: 'He/Him' },
  { value: 'she/her', label: 'She/Her' },
  { value: 'they/them', label: 'They/Them' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
];

const salaryOptions = [
  { value: '', label: 'Select range' },
  { value: '40-60k', label: '$40,000 - $60,000' },
  { value: '60-80k', label: '$60,000 - $80,000' },
  { value: '80-100k', label: '$80,000 - $100,000' },
  { value: '100-120k', label: '$100,000 - $120,000' },
  { value: '120-140k', label: '$120,000 - $140,000' },
  { value: '140-160k', label: '$140,000 - $160,000' },
  { value: '160k+', label: '$160,000+' },
];

export const Default: Story = {
  args: {
    id: 'pronouns',
    label: 'Pronouns',
    options: pronounOptions,
  },
};

export const Required: Story = {
  args: {
    id: 'pronouns',
    label: 'Pronouns',
    options: pronounOptions,
    required: true,
  },
};

export const PreSelected: Story = {
  args: {
    id: 'pronouns',
    label: 'Pronouns',
    options: pronounOptions,
    defaultValue: 'they/them',
  },
};

export const WithError: Story = {
  args: {
    id: 'pronouns',
    label: 'Pronouns',
    options: pronounOptions,
    required: true,
    error: 'Please select your pronouns',
  },
};

export const Disabled: Story = {
  args: {
    id: 'pronouns',
    label: 'Pronouns',
    options: pronounOptions,
    disabled: true,
    defaultValue: 'he/him',
  },
};

export const WithIcon: Story = {
  args: {
    id: 'location',
    label: 'Location',
    options: [
      { value: '', label: 'Select location...' },
      { value: 'ny', label: 'New York, NY' },
      { value: 'sf', label: 'San Francisco, CA' },
      { value: 'la', label: 'Los Angeles, CA' },
    ],
    leadingIcon: <Icon name="map-pin" size={20} />,
  },
};

export const FormExample: Story = {
  args: {} as never,
  render: () => (
    <div className="w-full max-w-lg space-y-6">
      <FormDropdown
        id="pronouns"
        label="Pronouns"
        options={pronounOptions}
      />
      <FormDropdown
        id="salary"
        label="Salary Expectations"
        options={salaryOptions}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormDropdown
          id="workLocation"
          label="Work Location"
          options={[
            { value: '', label: 'Select...' },
            { value: 'remote', label: 'Remote' },
            { value: 'hybrid', label: 'Hybrid' },
            { value: 'office', label: 'In Office' },
          ]}
        />
        <FormDropdown
          id="teamSize"
          label="Team Size"
          options={[
            { value: '', label: 'Select...' },
            { value: 'solo', label: 'Solo' },
            { value: 'small', label: 'Small (3-5)' },
            { value: 'medium', label: 'Medium (6-10)' },
            { value: 'large', label: 'Large (11+)' },
          ]}
        />
      </div>
    </div>
  ),
};

