import type { Meta, StoryObj } from '@storybook/react';
import { SevenHats } from './SevenHats';

const DesignIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const CodeIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const GrowthIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const StrategyIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DataIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ContentIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const OpsIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const meta = {
  title: 'Organisms/SevenHats',
  component: SevenHats,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SevenHats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hats: [
      {
        title: 'Product Designer',
        subtitle: 'UX/UI & Design Systems',
        icon: DesignIcon,
        deliverables: ['Wireframes & prototypes', 'Design system components', 'User research synthesis'],
        marketRate: '$120-180/hr',
      },
      {
        title: 'Frontend Engineer',
        subtitle: 'React & TypeScript',
        icon: CodeIcon,
        deliverables: ['Component libraries', 'Responsive layouts', 'API integrations'],
        marketRate: '$150-220/hr',
      },
      {
        title: 'Growth Strategist',
        subtitle: 'Acquisition & Retention',
        icon: GrowthIcon,
        deliverables: ['Go-to-market strategy', 'Funnel optimization', 'A/B test frameworks'],
        marketRate: '$130-200/hr',
      },
      {
        title: 'Product Strategist',
        subtitle: 'Vision & Roadmap',
        icon: StrategyIcon,
        deliverables: ['Product roadmaps', 'Competitive analysis', 'Feature prioritization'],
        marketRate: '$140-210/hr',
      },
      {
        title: 'Data Analyst',
        subtitle: 'Metrics & Insights',
        icon: DataIcon,
        deliverables: ['Analytics dashboards', 'KPI frameworks', 'Data-driven decisions'],
        marketRate: '$110-170/hr',
      },
      {
        title: 'Content Strategist',
        subtitle: 'Copy & Messaging',
        icon: ContentIcon,
        deliverables: ['Landing page copy', 'Email sequences', 'Brand voice guidelines'],
        marketRate: '$100-160/hr',
      },
      {
        title: 'Ops & Automation',
        subtitle: 'Systems & Workflows',
        icon: OpsIcon,
        deliverables: ['Workflow automation', 'Tool integrations', 'Process documentation'],
        marketRate: '$120-180/hr',
      },
    ],
  },
};

export const AllHats: Story = {
  args: {
    hats: [
      {
        title: 'Product Designer',
        subtitle: 'UX/UI & Design Systems',
        icon: DesignIcon,
        deliverables: ['Wireframes & prototypes', 'Design system components', 'User research synthesis'],
        marketRate: '$120-180/hr',
      },
      {
        title: 'Frontend Engineer',
        subtitle: 'React & TypeScript',
        icon: CodeIcon,
        deliverables: ['Component libraries', 'Responsive layouts', 'API integrations'],
        marketRate: '$150-220/hr',
      },
      {
        title: 'Growth Strategist',
        subtitle: 'Acquisition & Retention',
        icon: GrowthIcon,
        deliverables: ['Go-to-market strategy', 'Funnel optimization', 'A/B test frameworks'],
        marketRate: '$130-200/hr',
      },
      {
        title: 'Product Strategist',
        subtitle: 'Vision & Roadmap',
        icon: StrategyIcon,
        deliverables: ['Product roadmaps', 'Competitive analysis', 'Feature prioritization'],
        marketRate: '$140-210/hr',
      },
      {
        title: 'Data Analyst',
        subtitle: 'Metrics & Insights',
        icon: DataIcon,
        deliverables: ['Analytics dashboards', 'KPI frameworks', 'Data-driven decisions'],
        marketRate: '$110-170/hr',
      },
      {
        title: 'Content Strategist',
        subtitle: 'Copy & Messaging',
        icon: ContentIcon,
        deliverables: ['Landing page copy', 'Email sequences', 'Brand voice guidelines'],
        marketRate: '$100-160/hr',
      },
      {
        title: 'Ops & Automation',
        subtitle: 'Systems & Workflows',
        icon: OpsIcon,
        deliverables: ['Workflow automation', 'Tool integrations', 'Process documentation'],
        marketRate: '$120-180/hr',
      },
    ],
  },
};

export const ThreeHats: Story = {
  args: {
    hats: [
      {
        title: 'Product Designer',
        subtitle: 'UX/UI & Design Systems',
        icon: DesignIcon,
        deliverables: ['Wireframes & prototypes', 'Design system components', 'Usability testing'],
        marketRate: '$120-180/hr',
      },
      {
        title: 'Frontend Engineer',
        subtitle: 'React & TypeScript',
        icon: CodeIcon,
        deliverables: ['Component libraries', 'State management', 'Performance optimization'],
        marketRate: '$150-220/hr',
      },
      {
        title: 'Growth Strategist',
        subtitle: 'Acquisition & Retention',
        icon: GrowthIcon,
        deliverables: ['Go-to-market strategy', 'Funnel optimization', 'Analytics dashboards'],
        marketRate: '$130-200/hr',
      },
    ],
  },
};
