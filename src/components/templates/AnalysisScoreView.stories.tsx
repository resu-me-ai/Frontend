import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AnalysisScoreView } from './AnalysisScoreView';

const mockAnalysisData = {
  overallScore: 78,
  categories: {
    skills: { score: 85, description: 'Strong alignment with required skills' },
    experience: { score: 72, description: 'Good experience alignment' },
    qualifications: { score: 68, description: 'Meets most requirements' },
    keywords: { score: 80, description: 'Strong keyword presence' },
  },
  matchingSkills: [
    { name: 'User Research & Testing', strength: 'strong' as const },
    { name: 'Figma & Design Systems', strength: 'strong' as const },
    { name: 'Wireframing & Prototyping', strength: 'strong' as const },
    { name: 'Cross-functional Collaboration', strength: 'moderate' as const },
    { name: 'Agile Methodologies', strength: 'moderate' as const },
  ],
  missingSkills: [
    { name: 'Design System Documentation', priority: 'critical' as const },
    { name: 'Accessibility (WCAG) Standards', priority: 'important' as const },
    { name: 'Data-Driven Design Decisions', priority: 'important' as const },
    { name: 'Sketch Software', priority: 'nice-to-have' as const },
    { name: 'HTML/CSS Knowledge', priority: 'nice-to-have' as const },
  ],
  keywordsPresent: [
    'User Experience',
    'Figma',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Design Thinking',
    'Agile',
    'Collaboration',
    'Visual Design',
    'Mobile Design',
  ],
  keywordsMissing: [
    'WCAG',
    'Accessibility',
    'Design Systems',
    'A/B Testing',
    'Analytics',
    'Stakeholder Management',
    'Documentation',
  ],
  actionItems: [
    {
      number: 1,
      title: 'Add Accessibility Experience',
      description: 'The job description emphasizes WCAG compliance. Add specific examples of accessible design work.',
      priority: 'high' as const,
    },
    {
      number: 2,
      title: 'Quantify Design System Impact',
      description: 'Add metrics showing how your design system improved team efficiency or product consistency.',
      priority: 'medium' as const,
    },
    {
      number: 3,
      title: 'Emphasize Data-Driven Decisions',
      description: 'Include examples of using analytics or user data to inform design decisions.',
      priority: 'medium' as const,
    },
    {
      number: 4,
      title: 'Highlight Stakeholder Collaboration',
      description: 'The role requires working with senior leadership. Showcase relevant experience.',
      priority: 'low' as const,
    },
  ],
};

const meta = {
  title: 'Templates/AnalysisScoreView',
  component: AnalysisScoreView,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  decorators: [(Story: React.ComponentType) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    showPaywall: { control: 'boolean' },
    error: { control: 'text' },
    overallScore: { control: { type: 'number', min: 0, max: 100 } },
    onRetry: { table: { disable: true } },
    onOptimizeClick: { table: { disable: true } },
    onDownloadClick: { table: { disable: true } },
    onUpgradeClick: { table: { disable: true } },
  },
} satisfies Meta<typeof AnalysisScoreView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...mockAnalysisData,
    onOptimizeClick: () => console.log('Optimize clicked'),
    onDownloadClick: () => console.log('Download clicked'),
  },
};

export const Loading: Story = {
  args: {
    ...mockAnalysisData,
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    ...mockAnalysisData,
    error: 'Failed to fetch report',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const HighScore: Story = {
  args: {
    overallScore: 95,
    categories: {
      skills: { score: 96, description: 'Strong alignment with required skills' },
      experience: { score: 94, description: 'Strong alignment with required experience' },
      qualifications: { score: 92, description: 'Strong alignment with required qualifications' },
      keywords: { score: 98, description: 'Strong alignment with required keywords' },
    },
    matchingSkills: [
      { name: 'User Research & Testing', strength: 'strong' as const },
      { name: 'Figma & Design Systems', strength: 'strong' as const },
      { name: 'Wireframing & Prototyping', strength: 'strong' as const },
      { name: 'Cross-functional Collaboration', strength: 'strong' as const },
      { name: 'Agile Methodologies', strength: 'strong' as const },
      { name: 'Accessibility (WCAG)', strength: 'strong' as const },
      { name: 'Data-Driven Design', strength: 'strong' as const },
      { name: 'Design System Documentation', strength: 'moderate' as const },
    ],
    missingSkills: [
      { name: 'Sketch Software', priority: 'nice-to-have' as const },
    ],
    keywordsPresent: [
      'User Experience',
      'Figma',
      'Prototyping',
      'User Research',
      'Wireframing',
      'Design Thinking',
      'Agile',
      'Collaboration',
      'Visual Design',
      'Mobile Design',
      'WCAG',
      'Accessibility',
      'Design Systems',
      'A/B Testing',
      'Analytics',
    ],
    keywordsMissing: ['Stakeholder Management'],
    actionItems: [
      {
        number: 1,
        title: 'Highlight Stakeholder Collaboration',
        description: 'The role requires working with senior leadership. Showcase relevant experience.',
        priority: 'low' as const,
      },
    ],
    onOptimizeClick: () => console.log('Optimize clicked'),
    onDownloadClick: () => console.log('Download clicked'),
  },
};

export const LowScore: Story = {
  args: {
    overallScore: 35,
    categories: {
      skills: { score: 40, description: 'Needs improvement in skills' },
      experience: { score: 30, description: 'Needs improvement in experience' },
      qualifications: { score: 28, description: 'Needs improvement in qualifications' },
      keywords: { score: 42, description: 'Needs improvement in keywords' },
    },
    matchingSkills: [
      { name: 'Agile Methodologies', strength: 'moderate' as const },
      { name: 'Collaboration', strength: 'moderate' as const },
    ],
    missingSkills: [
      { name: 'User Research & Testing', priority: 'critical' as const },
      { name: 'Figma & Design Systems', priority: 'critical' as const },
      { name: 'Wireframing & Prototyping', priority: 'critical' as const },
      { name: 'Accessibility (WCAG) Standards', priority: 'critical' as const },
      { name: 'Design System Documentation', priority: 'important' as const },
      { name: 'Data-Driven Design Decisions', priority: 'important' as const },
      { name: 'Visual Design', priority: 'important' as const },
      { name: 'Mobile Design', priority: 'nice-to-have' as const },
    ],
    keywordsPresent: ['Agile', 'Collaboration'],
    keywordsMissing: [
      'User Experience',
      'Figma',
      'Prototyping',
      'User Research',
      'Wireframing',
      'Design Thinking',
      'Visual Design',
      'Mobile Design',
      'WCAG',
      'Accessibility',
      'Design Systems',
      'A/B Testing',
      'Analytics',
    ],
    actionItems: [
      {
        number: 1,
        title: 'Add User Research Experience',
        description: 'The role requires strong UX research skills. Add specific examples of user testing and research.',
        priority: 'high' as const,
      },
      {
        number: 2,
        title: 'Learn Figma & Design Tools',
        description: 'Figma proficiency is critical for this role. Demonstrate hands-on experience with design systems.',
        priority: 'high' as const,
      },
      {
        number: 3,
        title: 'Add Wireframing Portfolio',
        description: 'Include specific wireframing and prototyping projects in your resume or portfolio.',
        priority: 'high' as const,
      },
      {
        number: 4,
        title: 'Include Accessibility Knowledge',
        description: 'WCAG compliance is emphasized. Add any accessibility-related training or experience.',
        priority: 'high' as const,
      },
      {
        number: 5,
        title: 'Emphasize Data-Driven Approach',
        description: 'Include examples of using analytics or metrics to inform decisions.',
        priority: 'medium' as const,
      },
    ],
    onOptimizeClick: () => console.log('Optimize clicked'),
    onDownloadClick: () => console.log('Download clicked'),
  },
};

export const WithPaywall: Story = {
  args: {
    ...mockAnalysisData,
    showPaywall: true,
    onOptimizeClick: () => console.log('Optimize clicked'),
    onDownloadClick: () => console.log('Download clicked'),
    onUpgradeClick: () => console.log('Upgrade clicked'),
  },
};

/**
 * RetryLoading: Loading state triggered after the user clicks "Retry" on an error screen.
 * The isLoading=true prop takes precedence in the component rendering,
 * showing a centered spinner to indicate the retry request is in progress.
 */
export const RetryLoading: Story = {
  args: {
    ...mockAnalysisData,
    isLoading: true,
    onRetry: () => console.log('Retry clicked'),
  },
};

