import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { MemoryRouter } from 'react-router-dom';
import { Step4View } from './Step4View';

const locationOptions = [
  'New York, NY',
  'San Francisco, CA',
  'Los Angeles, CA',
  'Chicago, IL',
  'Boston, MA',
  'Seattle, WA',
  'Austin, TX',
  'Denver, CO',
  'Remote (US)',
  'Remote (International)',
];

const meta = {
  title: 'Templates/OnboardingSteps/Step4View',
  component: Step4View,
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
    locationOptions: { control: 'object', description: 'Available location chip options' },
    selectedLocations: { control: 'object', description: 'Currently selected location chips' },
    locationsError: { control: 'text', description: 'Validation error for locations selection' },
    isSubmitting: { control: 'boolean', description: 'Whether the form is currently submitting' },
    onLocationToggle: { action: 'locationToggled', description: 'Fired when a location chip is toggled' },
    onNext: { action: 'nextClicked', description: 'Fired when Next/Submit button is clicked' },
    onBack: { action: 'backClicked', description: 'Fired when Back button is clicked' },
  },
  args: {
    currentStep: 4,
    totalSteps: 4,
    title: 'Tell us about yourself',
    subtitle: 'Your professional story is ready to be built.',
    locationOptions,
    selectedLocations: [],
    locationsError: undefined,
    isSubmitting: false,
    onLocationToggle: action('locationToggled'),
    onNext: action('nextClicked'),
    onBack: action('backClicked'),
  },
} satisfies Meta<typeof Step4View>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedLocations: Story = {
  args: {
    selectedLocations: ['San Francisco, CA', 'Remote (US)', 'Austin, TX'],
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};

export const NoLocationsError: Story = {
  args: {
    selectedLocations: [],
    locationsError: 'Please select at least one location',
  },
};

export const ManyLocations: Story = {
  args: {
    locationOptions: [
      'New York, NY',
      'San Francisco, CA',
      'Los Angeles, CA',
      'Chicago, IL',
      'Boston, MA',
      'Seattle, WA',
      'Austin, TX',
      'Denver, CO',
      'Remote (US)',
      'Remote (International)',
      'Miami, FL',
      'Portland, OR',
      'Atlanta, GA',
      'Washington, DC',
      'Philadelphia, PA',
    ],
    selectedLocations: [
      'New York, NY',
      'San Francisco, CA',
      'Los Angeles, CA',
      'Chicago, IL',
      'Boston, MA',
      'Seattle, WA',
      'Austin, TX',
      'Denver, CO',
      'Remote (US)',
      'Remote (International)',
      'Miami, FL',
    ],
  },
};

export const AllLocationsSelected: Story = {
  args: {
    selectedLocations: [
      'New York, NY',
      'San Francisco, CA',
      'Los Angeles, CA',
      'Chicago, IL',
      'Boston, MA',
      'Seattle, WA',
      'Austin, TX',
      'Denver, CO',
      'Remote (US)',
      'Remote (International)',
    ],
  },
};
