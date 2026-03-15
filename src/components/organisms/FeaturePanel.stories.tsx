import type { Meta, StoryObj } from '@storybook/react';
import { FeaturePanel } from './FeaturePanel';
import type { Feature } from './FeaturePanel';

const meta = {
  title: 'Organisms/FeaturePanel',
  component: FeaturePanel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="#FFF" strokeWidth="2" />
    <path d="M12 20L18 26L28 14" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4L24.5 14.5L36 16L28 24L30 36L20 30L10 36L12 24L4 16L15.5 14.5L20 4Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="8" height="16" stroke="#FFF" strokeWidth="2" />
    <rect x="16" y="12" width="8" height="24" stroke="#FFF" strokeWidth="2" />
    <rect x="28" y="4" width="8" height="32" stroke="#FFF" strokeWidth="2" />
  </svg>
);

const defaultFeatures: Feature[] = [
  {
    icon: <CheckIcon />,
    title: 'ATS-Optimized Formatting',
    description: 'Your resume will pass through automated screening systems with flying colors.',
  },
  {
    icon: <StarIcon />,
    title: 'Keyword Matching',
    description: 'We identify and highlight the most important skills and experience for each role.',
  },
  {
    icon: <ChartIcon />,
    title: 'Performance Analytics',
    description: 'Track how your resume performs and get actionable insights for improvement.',
  },
];

export const Default: Story = {
  args: {
    features: defaultFeatures,
  },
};

export const SingleFeature: Story = {
  args: {
    features: [defaultFeatures[0]],
  },
};

export const TwoFeatures: Story = {
  args: {
    features: defaultFeatures.slice(0, 2),
  },
};

export const FiveFeatures: Story = {
  args: {
    features: [
      ...defaultFeatures,
      {
        icon: <CheckIcon />,
        title: 'Real-Time Feedback',
        description: 'Get instant suggestions as you refine your resume content.',
      },
      {
        icon: <StarIcon />,
        title: 'Industry Templates',
        description: 'Choose from professionally designed templates tailored to your field.',
      },
    ],
  },
};
