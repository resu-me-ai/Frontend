import type { Meta, StoryObj } from '@storybook/react';
import { CompetencyGapsSection } from './CompetencyGapsSection';

const meta = {
  title: 'Organisms/CompetencyGapsSection',
  component: CompetencyGapsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    competenciesMet: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Number of competencies met or exceeded',
    },
    competenciesTotal: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Total number of competencies evaluated',
    },
    gaps: {
      control: 'object',
      description: 'Array of competency gap objects with skill, gapType, levels, importance, and action',
    },
  },
} satisfies Meta<typeof CompetencyGapsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    competenciesMet: 5,
    competenciesTotal: 9,
    gaps: [
      {
        skill: 'Product Strategy',
        gapType: 'missing',
        jdLevel: 'Expert',
        resumeLevel: 'Not found',
        importance: 'CRITICAL',
        action: 'Add examples of defining product vision and multi-year roadmaps',
      },
      {
        skill: 'A/B Testing & Experimentation',
        gapType: 'level_below',
        jdLevel: 'Advanced',
        resumeLevel: 'Intermediate',
        importance: 'IMPORTANT',
        action: 'Quantify experiment outcomes and statistical significance in bullet points',
      },
      {
        skill: 'Data Analysis',
        gapType: 'level_below',
        jdLevel: 'Advanced',
        resumeLevel: 'Basic',
        importance: 'CRITICAL',
        action: 'Highlight SQL, dashboarding, and data-driven decision examples',
      },
      {
        skill: 'Stakeholder Communication',
        gapType: 'missing',
        jdLevel: 'Expert',
        resumeLevel: 'Not found',
        importance: 'IMPORTANT',
        action: 'Include examples of presenting to C-suite or cross-functional leadership',
      },
      {
        skill: 'Agile / Scrum',
        gapType: 'meets',
        jdLevel: 'Advanced',
        resumeLevel: 'Advanced',
        importance: 'IMPORTANT',
        action: '',
      },
      {
        skill: 'User Research',
        gapType: 'exceeds',
        jdLevel: 'Intermediate',
        resumeLevel: 'Advanced',
        importance: 'NICE_TO_HAVE',
        action: '',
      },
      {
        skill: 'SQL',
        gapType: 'meets',
        jdLevel: 'Intermediate',
        resumeLevel: 'Intermediate',
        importance: 'IMPORTANT',
        action: '',
      },
      {
        skill: 'Roadmap Planning',
        gapType: 'exceeds',
        jdLevel: 'Advanced',
        resumeLevel: 'Expert',
        importance: 'CRITICAL',
        action: '',
      },
      {
        skill: 'Technical Documentation',
        gapType: 'meets',
        jdLevel: 'Intermediate',
        resumeLevel: 'Intermediate',
        importance: 'NICE_TO_HAVE',
        action: '',
      },
    ],
  },
};

export const FewGaps: Story = {
  args: {
    competenciesMet: 4,
    competenciesTotal: 5,
    gaps: [
      {
        skill: 'Machine Learning Ops',
        gapType: 'missing',
        jdLevel: 'Intermediate',
        resumeLevel: 'Not found',
        importance: 'NICE_TO_HAVE',
        action: 'Consider adding any ML model deployment or monitoring experience',
      },
      {
        skill: 'Product Analytics',
        gapType: 'meets',
        jdLevel: 'Advanced',
        resumeLevel: 'Advanced',
        importance: 'CRITICAL',
        action: '',
      },
      {
        skill: 'Cross-functional Leadership',
        gapType: 'exceeds',
        jdLevel: 'Intermediate',
        resumeLevel: 'Advanced',
        importance: 'IMPORTANT',
        action: '',
      },
      {
        skill: 'API Design',
        gapType: 'meets',
        jdLevel: 'Intermediate',
        resumeLevel: 'Intermediate',
        importance: 'IMPORTANT',
        action: '',
      },
      {
        skill: 'Competitive Analysis',
        gapType: 'exceeds',
        jdLevel: 'Basic',
        resumeLevel: 'Advanced',
        importance: 'NICE_TO_HAVE',
        action: '',
      },
    ],
  },
};

export const ManyGaps: Story = {
  args: {
    competenciesMet: 3,
    competenciesTotal: 12,
    gaps: [
      {
        skill: 'Product Strategy',
        gapType: 'missing',
        jdLevel: 'Expert',
        resumeLevel: 'Not found',
        importance: 'CRITICAL',
        action: 'Define product vision and multi-year roadmap examples',
      },
      {
        skill: 'Revenue Optimization',
        gapType: 'missing',
        jdLevel: 'Advanced',
        resumeLevel: 'Not found',
        importance: 'CRITICAL',
        action: 'Add pricing strategy or monetization experience',
      },
      {
        skill: 'Platform Architecture',
        gapType: 'missing',
        jdLevel: 'Advanced',
        resumeLevel: 'Not found',
        importance: 'IMPORTANT',
        action: 'Highlight any technical platform design decisions',
      },
      {
        skill: 'A/B Testing',
        gapType: 'level_below',
        jdLevel: 'Expert',
        resumeLevel: 'Basic',
        importance: 'CRITICAL',
        action: 'Include experiment design, sample sizing, and statistical significance examples',
      },
      {
        skill: 'Data Pipeline Management',
        gapType: 'level_below',
        jdLevel: 'Advanced',
        resumeLevel: 'Intermediate',
        importance: 'IMPORTANT',
        action: 'Mention ETL, data quality, or pipeline monitoring experience',
      },
      {
        skill: 'Machine Learning Integration',
        gapType: 'missing',
        jdLevel: 'Intermediate',
        resumeLevel: 'Not found',
        importance: 'IMPORTANT',
        action: 'Reference ML model integration or feature development',
      },
      {
        skill: 'Enterprise Sales Enablement',
        gapType: 'level_below',
        jdLevel: 'Advanced',
        resumeLevel: 'Basic',
        importance: 'NICE_TO_HAVE',
        action: 'Add examples of supporting sales with product demos or collateral',
      },
      {
        skill: 'Compliance & Governance',
        gapType: 'missing',
        jdLevel: 'Intermediate',
        resumeLevel: 'Not found',
        importance: 'NICE_TO_HAVE',
        action: 'Mention SOC 2, GDPR, or regulatory compliance involvement',
      },
      {
        skill: 'Go-to-Market Strategy',
        gapType: 'level_below',
        jdLevel: 'Expert',
        resumeLevel: 'Intermediate',
        importance: 'CRITICAL',
        action: 'Add launch planning, beta programs, and market positioning examples',
      },
      {
        skill: 'Agile / Scrum',
        gapType: 'meets',
        jdLevel: 'Advanced',
        resumeLevel: 'Advanced',
        importance: 'IMPORTANT',
        action: '',
      },
      {
        skill: 'User Research',
        gapType: 'exceeds',
        jdLevel: 'Intermediate',
        resumeLevel: 'Expert',
        importance: 'NICE_TO_HAVE',
        action: '',
      },
      {
        skill: 'Roadmap Planning',
        gapType: 'meets',
        jdLevel: 'Advanced',
        resumeLevel: 'Advanced',
        importance: 'CRITICAL',
        action: '',
      },
    ],
  },
};
