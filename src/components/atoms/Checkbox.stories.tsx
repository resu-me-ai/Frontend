import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import React from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Selected item',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox',
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['skills']);
    const toggle = (val: string) =>
      setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

    return (
      <div className="flex flex-col gap-3">
        <Checkbox label="Skills Match" checked={selected.includes('skills')} onChange={() => toggle('skills')} />
        <Checkbox label="Experience Match" checked={selected.includes('experience')} onChange={() => toggle('experience')} />
        <Checkbox label="Education Match" checked={selected.includes('education')} onChange={() => toggle('education')} />
        <Checkbox label="Keywords Match" checked={selected.includes('keywords')} onChange={() => toggle('keywords')} />
      </div>
    );
  },
};
