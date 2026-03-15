import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSection } from './ResumeSection';
import type { ResumeSectionSummary, ResumeSectionExperience } from '@/types/resume';

/** Decorator simulating the resume document content area (816px - 80px padding) */
const docWidth = [(Story: React.FC) => <div style={{ width: 736 }}><Story /></div>] as const;

const meta = {
  title: 'Molecules/ResumeSection',
  component: ResumeSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResumeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const summarySection: ResumeSectionSummary = {
  header: 'PROFESSIONAL SUMMARY',
  section_type: 'summary',
  section_index: 0,
  content: [
    { bullet_index: 0, text: '15 years of XYZ functional experience in high profile B2B/B2C products with $XXM-$XB in yearly revenue' },
    { bullet_index: 1, text: 'Advanced skillset in converting university students into banking customers via Instagram advertisements.' },
    { bullet_index: 2, text: 'CEO Leadership Award winner at my company for developing brand leaders & managing cross-functional teams.' },
    { bullet_index: 3, text: 'Education: Bachelor of Commerce (University of X, 20XX, X.XX GPA)' },
  ],
};

const experienceSection: ResumeSectionExperience = {
  header: 'CAREER EXPERIENCE & ACHIEVEMENTS',
  section_type: 'experience',
  section_index: 1,
  content: [
    {
      role_index: 0,
      title: 'Director',
      company: 'XYZ Company',
      company_context: 'e-commerce Platform, Baseball Live, Disney Now',
      date_range: 'March 2019-Present',
      achievements_line: 'Built product/engineering organization of 30 personnel; increased revenue by 200%',
      bullets: [
        { bullet_index: 0, text: 'Manage $XXM portfolio of high-profile sports-stream products.' },
        { bullet_index: 1, text: 'Launched & manage e-commerce subscription platform with five cross-functional teams.' },
      ],
    },
    {
      role_index: 1,
      title: 'Senior Product Manager',
      company: 'ABC Company',
      company_context: 'e-commerce Platform',
      date_range: 'March 2016-March 2019',
      achievements_line: 'Launched Major world cup; improved engagement rate by 45%',
      bullets: [
        { bullet_index: 0, text: 'Manage Brand name partnership at SVP executive level.' },
      ],
    },
  ],
};

const earlyExperienceSection: ResumeSectionSummary = {
  header: 'EARLY WORK EXPERIENCES (2006-2012)',
  section_type: 'early_experience',
  section_index: 2,
  content: [
    { bullet_index: 0, text: '2008-2012: Served as a consultant to launched New York\'s first transit card for 5M users.' },
    { bullet_index: 1, text: '2006-2008: Launched helpline for teenagers in America. Grew to 500 calls/day.' },
  ],
};

export const Summary: Story = {
  args: { section: summarySection },
  decorators: [...docWidth],
};

export const Experience: Story = {
  args: { section: experienceSection },
  decorators: [...docWidth],
};

export const EarlyExperience: Story = {
  args: { section: earlyExperienceSection },
  decorators: [...docWidth],
};
