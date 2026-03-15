import type { Meta, StoryObj } from '@storybook/react';
import { SkillsBreakdownSection } from './SkillsBreakdownSection';

const meta = {
  title: 'Organisms/SkillsBreakdownSection',
  component: SkillsBreakdownSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SkillsBreakdownSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    matchingSkills: [
      { name: 'User Research & Testing', strength: 'strong' },
      { name: 'Figma & Design Systems', strength: 'strong' },
      { name: 'Wireframing & Prototyping', strength: 'strong' },
      { name: 'Cross-functional Collaboration', strength: 'moderate' },
      { name: 'Agile Methodologies', strength: 'moderate' },
    ],
    missingSkills: [
      { name: 'Design System Documentation', priority: 'critical' },
      { name: 'Accessibility (WCAG) Standards', priority: 'important' },
      { name: 'Data-Driven Design Decisions', priority: 'important' },
      { name: 'Sketch Software', priority: 'nice-to-have' },
      { name: 'HTML/CSS Knowledge', priority: 'nice-to-have' },
    ],
  },
};

export const AllStrong: Story = {
  args: {
    matchingSkills: [
      { name: 'Product Management', strength: 'strong' },
      { name: 'Agile/Scrum', strength: 'strong' },
      { name: 'Data Analysis', strength: 'strong' },
      { name: 'Stakeholder Management', strength: 'strong' },
    ],
    missingSkills: [
      { name: 'Machine Learning', priority: 'critical' },
    ],
  },
};

export const ManyMissing: Story = {
  args: {
    matchingSkills: [
      { name: 'JavaScript', strength: 'strong' },
      { name: 'React', strength: 'moderate' },
    ],
    missingSkills: [
      { name: 'TypeScript', priority: 'critical' },
      { name: 'GraphQL', priority: 'critical' },
      { name: 'Kubernetes', priority: 'important' },
      { name: 'AWS', priority: 'important' },
      { name: 'Docker', priority: 'important' },
      { name: 'Terraform', priority: 'nice-to-have' },
    ],
  },
};
