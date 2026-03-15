import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@/components/atoms/Chip';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text label displayed on the chip',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is in selected state',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Engineering',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: 'Engineering',
    selected: true,
  },
};

export const Interactive: Story = {
  args: {} as never,
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        label="Click to toggle"
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    );
  },
};

export const RoleOptions: Story = {
  args: {} as never,
  render: () => {
    const [selectedRole, setSelectedRole] = useState<string | null>('Engineering');
    const roles = ['Marketing', 'HR', 'Product', 'Engineering', 'Customer Service'];

    return (
      <div className="flex flex-wrap gap-2 max-w-md">
        {roles.map((role) => (
          <Chip
            key={role}
            label={role}
            selected={selectedRole === role}
            onClick={() => {
              // Single-select: clicking the same role deselects it
              setSelectedRole((prev) => (prev === role ? null : role));
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllRoles: Story = {
  args: {} as never,
  render: () => {
    const roles = [
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

    return (
      <div className="flex flex-wrap gap-2 max-w-2xl">
        {roles.map((role, index) => (
          <Chip key={role} label={role} selected={index === 6} />
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

