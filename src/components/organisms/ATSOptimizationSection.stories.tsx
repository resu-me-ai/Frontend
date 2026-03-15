import type { Meta, StoryObj } from '@storybook/react';
import { ATSOptimizationSection } from './ATSOptimizationSection';

const meta = {
  title: 'Organisms/ATSOptimizationSection',
  component: ATSOptimizationSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ATSOptimizationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keywordsPresent: [
      'User Experience', 'Figma', 'Prototyping', 'User Research',
      'Wireframing', 'Design Thinking', 'Agile', 'Collaboration',
      'Visual Design', 'Mobile Design',
    ],
    keywordsMissing: [
      'WCAG', 'Accessibility', 'Design Systems', 'A/B Testing',
      'Analytics', 'Stakeholder Management', 'Documentation',
    ],
    proTip: 'Consider adding these keywords naturally: WCAG, Accessibility, Design Systems',
  },
};

export const MostPresent: Story = {
  args: {
    keywordsPresent: [
      'React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS',
      'Docker', 'CI/CD', 'Agile', 'REST APIs', 'PostgreSQL',
      'Redis', 'Microservices',
    ],
    keywordsMissing: ['Kubernetes', 'Terraform'],
    proTip: 'Your keyword coverage looks solid. Focus on quantifying your achievements.',
  },
};

export const ManyMissing: Story = {
  args: {
    keywordsPresent: ['JavaScript', 'HTML', 'CSS'],
    keywordsMissing: [
      'React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS',
      'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'REST APIs',
    ],
    proTip: 'Consider adding these keywords naturally: React, TypeScript, Node.js',
  },
};
