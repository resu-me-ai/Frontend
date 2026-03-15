import type { Meta, StoryObj } from '@storybook/react';
import { HatCard } from './HatCard';

const meta = {
  title: 'Organisms/HatCard',
  component: HatCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    marketRate: { control: 'text' },
  },
} satisfies Meta<typeof HatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Product Designer',
    subtitle: 'UX/UI & Design Systems',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    deliverables: [
      'Wireframes & prototypes',
      'Design system components',
      'User research synthesis',
      'Usability testing',
    ],
    marketRate: '$120-180/hr',
  },
};

export const ProductDesigner: Story = {
  args: {
    title: 'Product Designer',
    subtitle: 'UX/UI & Design Systems',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    deliverables: [
      'Wireframes & prototypes',
      'Design system components',
      'User research synthesis',
      'Usability testing',
    ],
    marketRate: '$120-180/hr',
  },
};

export const FrontendEngineer: Story = {
  args: {
    title: 'Frontend Engineer',
    subtitle: 'React & TypeScript',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    deliverables: [
      'Component libraries',
      'Responsive layouts',
      'State management',
      'API integrations',
      'Performance optimization',
    ],
    marketRate: '$150-220/hr',
  },
};

export const GrowthStrategist: Story = {
  args: {
    title: 'Growth Strategist',
    subtitle: 'Acquisition & Retention',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    deliverables: [
      'Go-to-market strategy',
      'Funnel optimization',
      'A/B test frameworks',
      'Analytics dashboards',
    ],
    marketRate: '$130-200/hr',
  },
};
