import type { Meta, StoryObj } from '@storybook/react';
import { JobDescriptionForm } from './JobDescriptionForm';
import { useState } from 'react';

const meta = {
  title: 'Molecules/JobDescriptionForm',
  component: JobDescriptionForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    showJobTitle: {
      control: 'boolean',
      description: 'Show the Job Title field',
    },
    showCompanyName: {
      control: 'boolean',
      description: 'Show the Company Name field',
    },
  },
} satisfies Meta<typeof JobDescriptionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValues: Story = {
  args: {
    jobTitle: 'Senior Product Designer',
    companyName: 'Google',
    jobDescription: 'We are looking for an experienced Product Designer to join our team...',
  },
};

export const WithError: Story = {
  args: {
    error: 'Job description is required',
  },
};

export const Interactive: Story = {
  render: () => {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    return (
      <div className="w-[600px]">
        <JobDescriptionForm
          jobTitle={jobTitle}
          companyName={companyName}
          jobDescription={jobDescription}
          onJobTitleChange={setJobTitle}
          onCompanyNameChange={setCompanyName}
          onJobDescriptionChange={setJobDescription}
        />
      </div>
    );
  },
};

/**
 * Job Description Only: Hide both Job Title and Company Name fields
 */
export const JobDescriptionOnly: Story = {
  args: {
    showJobTitle: false,
    showCompanyName: false,
  },
};

/**
 * No Company Name: Show Job Title but hide Company Name
 */
export const NoCompanyName: Story = {
  args: {
    showJobTitle: true,
    showCompanyName: false,
  },
};

/**
 * No Job Title: Show Company Name but hide Job Title
 */
export const NoJobTitle: Story = {
  args: {
    showJobTitle: false,
    showCompanyName: true,
  },
};
