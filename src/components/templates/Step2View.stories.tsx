import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { MemoryRouter } from 'react-router-dom';
import { Step2View } from './Step2View';

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

const meta = {
  title: 'Templates/OnboardingSteps/Step2View',
  component: Step2View,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'number', min: 1, max: 4 }, description: 'Current step in the onboarding flow' },
    totalSteps: { control: { type: 'number', min: 1, max: 10 }, description: 'Total number of steps' },
    title: { control: 'text', description: 'Heading text for the step' },
    subtitle: { control: 'text', description: 'Subheading text for the step' },
    roleOptions: { control: 'object', description: 'Available role chip options' },
    selectedRole: { control: 'text', description: 'Currently selected role chip (single selection)' },
    roleError: { control: 'text', description: 'Validation error for role selection' },
    jobTitle: { control: 'text', description: 'Current value of the job title input' },
    jobTitleError: { control: 'text', description: 'Validation error for job title field' },
    onRoleChange: { action: 'roleChanged', description: 'Fired when role selection changes' },
    onJobTitleChange: { action: 'jobTitleChanged', description: 'Fired when job title input changes' },
    onJobTitleBlur: { action: 'jobTitleBlurred', description: 'Fired when job title input loses focus' },
    onNext: { action: 'nextClicked', description: 'Fired when Next button is clicked' },
    onBack: { action: 'backClicked', description: 'Fired when Back button is clicked' },
  },
  args: {
    currentStep: 2,
    totalSteps: 4,
    title: 'Tell us about yourself',
    subtitle: 'Your professional story is ready to be built.',
    roleOptions,
    selectedRole: null,
    roleError: undefined,
    jobTitle: '',
    jobTitleError: undefined,
    onRoleChange: action('roleChanged'),
    onJobTitleChange: action('jobTitleChanged'),
    onJobTitleBlur: action('jobTitleBlurred'),
    onNext: action('nextClicked'),
    onBack: action('backClicked'),
  },
} satisfies Meta<typeof Step2View>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRoleAndTitle: Story = {
  args: {
    selectedRole: 'Product',
    jobTitle: 'Senior Product Manager',
  },
};

export const WithError: Story = {
  args: {
    selectedRole: 'Engineering',
    jobTitle: '',
    jobTitleError: 'Job title is required',
  },
};

export const NoSelectionError: Story = {
  args: {
    selectedRole: null,
    roleError: 'Please select a role',
    jobTitle: '',
    jobTitleError: 'Job title is required',
  },
};

export const EntryLevel: Story = {
  args: {
    selectedRole: 'Customer Service',
    jobTitle: 'Junior Associate',
  },
};
