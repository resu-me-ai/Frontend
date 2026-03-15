import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudies } from './CaseStudies';

const meta = {
  title: 'Organisms/CaseStudies',
  component: CaseStudies,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    studies: [
      {
        title: 'FinTech Dashboard Redesign',
        description: 'Redesigned the analytics dashboard for a Series B fintech startup, reducing time-to-insight by 60% and increasing daily active usage.',
        metrics: ['+42% user engagement', '-60% time-to-insight', '4.8/5 user satisfaction'],
        tags: ['Product Design', 'React', 'Data Viz'],
      },
      {
        title: 'E-Commerce Conversion Optimization',
        description: 'Led a full-funnel optimization project for a DTC brand, implementing A/B testing frameworks and personalized recommendations.',
        metrics: ['+28% conversion rate', '+$1.2M annual revenue', '-35% cart abandonment'],
        tags: ['Growth', 'A/B Testing', 'Analytics'],
      },
      {
        title: 'AI-Powered Resume Builder',
        description: 'Built and launched an AI resume builder from 0 to 1, handling product strategy, design, and frontend engineering.',
        metrics: ['50K+ users in 3 months', '4.9 App Store rating', '12% viral coefficient'],
        tags: ['Full Stack', 'AI/ML', 'Product'],
      },
    ],
  },
};

export const TwoStudies: Story = {
  args: {
    studies: [
      {
        title: 'Healthcare SaaS Platform',
        description: 'Designed and built a patient management platform for a healthcare startup, achieving HIPAA compliance while maintaining a modern user experience.',
        metrics: ['+85% provider adoption', '-40% admin overhead', 'SOC 2 certified'],
        tags: ['Healthcare', 'Compliance', 'UX'],
      },
      {
        title: 'Developer Tools CLI',
        description: 'Created a CLI tool suite that automated deployment workflows for engineering teams, reducing deployment time from hours to minutes.',
        metrics: ['500+ dev teams', '10x faster deploys', '99.9% uptime'],
        tags: ['DevOps', 'CLI', 'Node.js'],
      },
    ],
  },
};

export const SingleStudy: Story = {
  args: {
    studies: [
      {
        title: 'Marketplace Mobile App',
        description: 'Led the product design and frontend development of a peer-to-peer marketplace app, from concept to 100K downloads.',
        metrics: ['100K downloads', '$2M GMV in year 1', '68% monthly retention'],
        tags: ['Mobile', 'Marketplace', 'React Native'],
      },
    ],
  },
};
