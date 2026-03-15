import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '@/components/atoms/Dropdown';
import { Icon } from '@/components/atoms/Icon';

const meta = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'Error message to display below the dropdown',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
  },
} satisfies Meta<typeof Dropdown>;

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

export const Default: Story = {
  args: {
    options: pronounOptions,
  },
};

export const WithError: Story = {
  args: {
    options: pronounOptions,
    error: 'Please select an option',
  },
};

export const Disabled: Story = {
  args: {
    options: pronounOptions,
    disabled: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    options: [
      { value: '', label: 'Select location...' },
      { value: 'ny', label: 'New York, NY' },
      { value: 'sf', label: 'San Francisco, CA' },
      { value: 'la', label: 'Los Angeles, CA' },
    ],
    leadingIcon: <Icon name="map-pin" size={20} />,
  },
};

export const PreSelected: Story = {
  args: {
    options: pronounOptions,
    defaultValue: 'they/them',
  },
};

export const AllStates: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown options={pronounOptions} />
      <Dropdown options={pronounOptions} defaultValue="he/him" />
      <Dropdown
        options={pronounOptions}
        error="Please select an option"
      />
      <Dropdown options={pronounOptions} disabled />
      <Dropdown
        options={[
          { value: '', label: 'With icon...' },
          { value: '1', label: 'Option 1' },
        ]}
        leadingIcon={<Icon name="map-pin" size={20} />}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

