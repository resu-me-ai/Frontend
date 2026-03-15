import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';
import { useState } from 'react';

const meta = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text below label',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'radio-group',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'radio-group',
    label: 'Option 1',
  },
};

export const WithDescription: Story = {
  args: {
    name: 'radio-group',
    label: 'Product_Designer_Resume_v3.pdf',
    description: 'Updated 2 days ago',
  },
};

export const Checked: Story = {
  args: {
    name: 'radio-group',
    label: 'Selected Option',
    description: 'This option is selected',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'radio-group',
    label: 'Disabled Option',
    description: 'This option is disabled',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div className="flex flex-col gap-3 w-[400px]">
        <RadioButton
          name="interactive-group"
          label="Option 1"
          description="First option"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <RadioButton
          name="interactive-group"
          label="Option 2"
          description="Second option"
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
        <RadioButton
          name="interactive-group"
          label="Option 3"
          description="Third option"
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[400px]">
      <RadioButton name="states-group" label="Unselected" />
      <RadioButton name="states-group" label="Selected" checked />
      <RadioButton name="states-group" label="Disabled" disabled />
      <RadioButton
        name="states-group"
        label="With Description"
        description="This has a description"
      />
      <RadioButton
        name="states-group"
        label="Selected with Description"
        description="This is selected and has a description"
        checked
      />
    </div>
  ),
};
