import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { MemoryRouter } from 'react-router-dom';
import { Step1View } from './Step1View';

const pronounsOptions = [
  { value: '', label: 'Select your preferred pronouns' },
  { value: 'he/him', label: 'He/Him' },
  { value: 'she/her', label: 'She/Her' },
  { value: 'they/them', label: 'They/Them' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
];

const meta = {
  title: 'Templates/OnboardingSteps/Step1View',
  component: Step1View,
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
    fullName: { control: 'text', description: 'Current value of the full name input' },
    fullNameError: { control: 'text', description: 'Validation error for full name field' },
    pronouns: { control: 'select', options: ['', 'he/him', 'she/her', 'they/them', 'prefer-not-to-say', 'other'], description: 'Selected pronouns value' },
    pronounsError: { control: 'text', description: 'Validation error for pronouns field' },
    pronounsOptions: { control: 'object', description: 'Available pronouns dropdown options' },
    onFullNameChange: { action: 'fullNameChanged', description: 'Fired when full name input changes' },
    onFullNameBlur: { action: 'fullNameBlurred', description: 'Fired when full name input loses focus' },
    onPronounsChange: { action: 'pronounsChanged', description: 'Fired when pronouns selection changes' },
    onNext: { action: 'nextClicked', description: 'Fired when Next button is clicked' },
  },
  args: {
    currentStep: 1,
    totalSteps: 4,
    title: 'Tell us about yourself',
    subtitle: 'Your professional story is ready to be built.',
    fullName: '',
    fullNameError: undefined,
    pronouns: '',
    pronounsError: undefined,
    pronounsOptions,
    onFullNameChange: action('fullNameChanged'),
    onFullNameBlur: action('fullNameBlurred'),
    onPronounsChange: action('pronounsChanged'),
    onNext: action('nextClicked'),
  },
} satisfies Meta<typeof Step1View>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    fullName: 'Ralph Bautista',
    pronouns: 'he/him',
  },
};

export const WithError: Story = {
  args: {
    fullName: '',
    fullNameError: 'Full name is required',
  },
};

export const EmptyError: Story = {
  args: {
    fullName: '',
    fullNameError: 'Full name is required',
    pronouns: '',
    pronounsError: 'Please select your pronouns',
  },
};

export const PartialEntry: Story = {
  args: {
    fullName: 'Ralph Bautista',
    pronouns: '',
  },
};
