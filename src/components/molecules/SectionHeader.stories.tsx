import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Molecules/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['upload', 'luggage', 'magic-wand'],
      description: 'The icon to display',
    },
    iconBgColor: {
      control: 'color',
      description: 'Background color for the icon container',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    step: {
      control: 'text',
      description: 'Step indicator text',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'upload',
    iconBgColor: '#dbeafe',
    title: 'Upload Resume',
    step: 'Step 1 of 2',
  },
};

export const UploadResume: Story = {
  args: {
    icon: 'upload',
    iconBgColor: '#dbeafe',
    title: 'Upload Resume',
    step: 'Step 1 of 2',
  },
};

export const JobDescription: Story = {
  args: {
    icon: 'luggage',
    iconBgColor: '#dcfce7',
    title: 'Job Description',
    step: 'Step 2 of 2',
  },
};

export const WithCheckmark: Story = {
  args: {
    icon: 'luggage',
    iconBgColor: '#dcfce7',
    title: 'Job Description',
    step: 'Step 2 of 2',
    showCheckmark: true,
  },
};

export const AllVariants: Story = {
  args: {} as never,
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <SectionHeader
        icon="upload"
        iconBgColor="#dbeafe"
        title="Upload Resume"
        step="Step 1 of 2"
      />
      <SectionHeader
        icon="luggage"
        iconBgColor="#dcfce7"
        title="Job Description"
        step="Step 2 of 2"
      />
      <SectionHeader
        icon="magic-wand"
        iconBgColor="#fef3c7"
        title="AI Analysis"
        step="Step 3 of 3"
      />
    </div>
  ),
};
