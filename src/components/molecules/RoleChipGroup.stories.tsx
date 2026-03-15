import type { Meta, StoryObj } from '@storybook/react';
import { RoleChipGroup } from '@/components/molecules/RoleChipGroup';
import { useState } from 'react';

const meta = {
  title: 'Molecules/RoleChipGroup',
  component: RoleChipGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoleChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const roleOptions = [
  'Marketing',
  'HR',
  'Legal',
  'Product',
  'Design',
  'Creative Production',
  'Engineering',
  'Customer Service',
  'Operations',
  'Finance',
  'IT',
  'Support',
  'Manufacturing',
  'Sales',
  'Account Management',
  'Other / Personal',
];

export const Default: Story = {
  args: {
    options: roleOptions,
    selectedRole: null,
    onChange: () => {},
  },
};

export const NoneSelected: Story = {
  args: {
    options: roleOptions,
    selectedRole: null,
    onChange: () => {},
  },
};

export const SingleSelected: Story = {
  args: {
    options: roleOptions,
    selectedRole: 'Engineering',
    onChange: () => {},
  },
};

export const ProductSelected: Story = {
  args: {
    options: roleOptions,
    selectedRole: 'Product',
    onChange: () => {},
  },
};

export const Interactive: Story = {
  args: {} as never,
  render: () => {
    const [selectedRole, setSelectedRole] = useState<string | null>('Engineering');

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Role:</h3>
          <p className="text-gray-600">
            {selectedRole || 'None selected'}
          </p>
        </div>
        <RoleChipGroup
          options={roleOptions}
          selectedRole={selectedRole}
          onChange={setSelectedRole}
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {} as never,
  render: () => {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    return (
      <div className="w-full max-w-2xl">
        <label className="block text-base font-semibold text-text-primary mb-4">
          What's your role? *
        </label>
        <RoleChipGroup
          options={roleOptions}
          selectedRole={selectedRole}
          onChange={setSelectedRole}
        />
      </div>
    );
  },
};

export const LimitedOptions: Story = {
  args: {} as never,
  render: () => {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const limitedRoles = ['Marketing', 'Engineering', 'Design', 'Sales', 'Support'];

    return (
      <div className="w-full max-w-lg">
        <RoleChipGroup
          options={limitedRoles}
          selectedRole={selectedRole}
          onChange={setSelectedRole}
        />
      </div>
    );
  },
};
