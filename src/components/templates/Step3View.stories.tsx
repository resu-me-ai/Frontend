import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { MemoryRouter } from 'react-router-dom';
import { Step3View } from './Step3View';

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

const equityOptions = [
  { value: '', label: 'Select preference' },
  { value: 'salary-focused', label: 'Salary Focused' },
  { value: 'combined', label: 'Combined' },
  { value: 'equity-focused', label: 'Equity Focused' },
];

const workLocationOptions = [
  { value: '', label: 'Select preference' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid-2-3', label: 'Hybrid (2-3 days in office)' },
  { value: 'hybrid-4', label: 'Hybrid (4 days in office)' },
  { value: 'office', label: 'In Office' },
];

const teamSizeOptions = [
  { value: '', label: 'Select team size' },
  { value: 'solo', label: 'Solo (1-2 people)' },
  { value: 'small', label: 'Small team (3-5 people)' },
  { value: 'medium', label: 'Medium team (6-10 people)' },
  { value: 'large', label: 'Large team (11-20 people)' },
  { value: 'enterprise', label: 'Enterprise (20+ people)' },
];

const meta = {
  title: 'Templates/OnboardingSteps/Step3View',
  component: Step3View,
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
    salaryExpectations: { control: 'select', options: ['', '40-60k', '60-80k', '80-100k', '100-120k', '120-140k', '140-160k', '160k+'], description: 'Selected salary range' },
    salaryOptions: { control: 'object', description: 'Available salary dropdown options' },
    salaryError: { control: 'text', description: 'Validation error for salary field' },
    equityPreference: { control: 'select', options: ['', 'salary-focused', 'combined', 'equity-focused'], description: 'Selected equity preference' },
    equityOptions: { control: 'object', description: 'Available equity dropdown options' },
    workLocation: { control: 'select', options: ['', 'remote', 'hybrid-2-3', 'hybrid-4', 'office'], description: 'Selected work location preference' },
    workLocationOptions: { control: 'object', description: 'Available work location dropdown options' },
    teamSize: { control: 'select', options: ['', 'solo', 'small', 'medium', 'large', 'enterprise'], description: 'Selected team size preference' },
    teamSizeOptions: { control: 'object', description: 'Available team size dropdown options' },
    companyStage: { control: 'text', description: 'Free-text company stage preference' },
    companyStageError: { control: 'text', description: 'Validation error for company stage field' },
    onSalaryChange: { action: 'salaryChanged', description: 'Fired when salary selection changes' },
    onEquityChange: { action: 'equityChanged', description: 'Fired when equity preference changes' },
    onWorkLocationChange: { action: 'workLocationChanged', description: 'Fired when work location changes' },
    onTeamSizeChange: { action: 'teamSizeChanged', description: 'Fired when team size changes' },
    onCompanyStageChange: { action: 'companyStageChanged', description: 'Fired when company stage input changes' },
    onNext: { action: 'nextClicked', description: 'Fired when Next button is clicked' },
    onBack: { action: 'backClicked', description: 'Fired when Back button is clicked' },
  },
  args: {
    currentStep: 3,
    totalSteps: 4,
    title: 'Tell us about yourself',
    subtitle: 'Your professional story is ready to be built.',
    salaryExpectations: '',
    salaryOptions,
    salaryError: undefined,
    equityPreference: '',
    equityOptions,
    workLocation: '',
    workLocationOptions,
    teamSize: '',
    teamSizeOptions,
    companyStage: '',
    companyStageError: undefined,
    onSalaryChange: action('salaryChanged'),
    onEquityChange: action('equityChanged'),
    onWorkLocationChange: action('workLocationChanged'),
    onTeamSizeChange: action('teamSizeChanged'),
    onCompanyStageChange: action('companyStageChanged'),
    onNext: action('nextClicked'),
    onBack: action('backClicked'),
  },
} satisfies Meta<typeof Step3View>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    salaryExpectations: '120-140k',
    equityPreference: 'combined',
    workLocation: 'hybrid-2-3',
    teamSize: 'medium',
    companyStage: 'Growth stage',
  },
};

export const EmptyWithErrors: Story = {
  args: {
    salaryExpectations: '',
    equityPreference: '',
    workLocation: '',
    teamSize: '',
    companyStage: '',
    salaryError: 'Salary range is required',
    companyStageError: 'Company stage is required',
  },
};

export const LongCompanyStage: Story = {
  args: {
    salaryExpectations: '120-140k',
    equityPreference: 'combined',
    workLocation: 'hybrid-2-3',
    teamSize: 'medium',
    companyStage: 'Early-stage startup transitioning from pre-seed to Series A with a focus on enterprise B2B SaaS in the healthcare compliance and regulatory technology space',
  },
};

export const AllFieldsFilled: Story = {
  args: {
    salaryExpectations: '160k+',
    equityPreference: 'equity-focused',
    workLocation: 'remote',
    teamSize: 'enterprise',
    companyStage: 'Growth stage (Series B+)',
  },
};
