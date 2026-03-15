import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { JobDescriptionView } from './JobDescriptionView';

const meta = {
  title: 'Templates/JobDescriptionView',
  component: JobDescriptionView,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 300 },
  },
  decorators: [(Story: React.ComponentType) => <MemoryRouter><Story /></MemoryRouter>],
  tags: ['autodocs'],
  argTypes: {
    jobTitle: { control: 'text' },
    companyName: { control: 'text' },
    jobDescription: { control: 'text' },
    error: { control: 'text' },
    isAnalyzeDisabled: { control: 'boolean' },
    isSubmitting: { control: 'boolean' },
    showCheckmark: { control: 'boolean' },
    onJobTitleChange: { table: { disable: true } },
    onCompanyNameChange: { table: { disable: true } },
    onJobDescriptionChange: { table: { disable: true } },
    onAnalyze: { table: { disable: true } },
  },
} satisfies Meta<typeof JobDescriptionView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    isAnalyzeDisabled: true,
    showCheckmark: false,
    onJobTitleChange: (value: string) => console.log('Job title changed:', value),
    onCompanyNameChange: (value: string) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value: string) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithValues: Story = {
  args: {
    jobTitle: 'Senior Product Designer',
    companyName: 'Stripe',
    jobDescription: '<p>We are looking for a <strong>Senior Product Designer</strong> to join our team. You will be responsible for designing and shipping high-quality product experiences across our payments platform.</p><p><strong>Requirements:</strong></p><ul><li><strong>5+ years</strong> of experience in product design</li><li>A strong portfolio demonstrating <em>end-to-end design work</em></li><li>Experience collaborating with engineering and product teams</li><li>Proficiency in <strong>Figma</strong> and design systems</li></ul><p><strong>Nice to have:</strong></p><ul><li>Experience with <strong>accessibility (WCAG)</strong> standards</li><li>Data-driven design approach</li></ul>',
    isAnalyzeDisabled: false,
    showCheckmark: true,
    onJobTitleChange: (value: string) => console.log('Job title changed:', value),
    onCompanyNameChange: (value: string) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value: string) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithRichFormatting: Story = {
  args: {
    jobTitle: 'Product Manager, Growth',
    companyName: 'FanDuel',
    jobDescription: '<p><strong>About the Role</strong></p><p>We\'re looking for a Product Manager focused on <strong>improving new user conversion</strong>, increasing <strong>average order value (AOV)</strong>, and reducing <strong>user churn</strong>.</p><p><strong>Key Responsibilities:</strong></p><ul><li>Own the <strong>activation funnel</strong> from signup to first purchase</li><li>Drive experimentation across onboarding flows</li><li>Collaborate with <em>engineering, design, and data science</em> teams</li></ul><p><strong>Qualifications:</strong></p><ol><li><strong>5+ years</strong> product management experience</li><li>Experience with <strong>A/B testing</strong> at scale</li><li>Strong analytical skills — SQL, Amplitude, or similar</li><li>Background in <strong>marketplace or e-commerce</strong> products</li></ol>',
    isAnalyzeDisabled: false,
    showCheckmark: true,
    onJobTitleChange: (value: string) => console.log('Job title changed:', value),
    onCompanyNameChange: (value: string) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value: string) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithError: Story = {
  args: {
    jobTitle: 'Product Manager',
    companyName: '',
    jobDescription: '',
    error: 'Please enter a job description.',
    isAnalyzeDisabled: true,
    showCheckmark: false,
    onJobTitleChange: (value: string) => console.log('Job title changed:', value),
    onCompanyNameChange: (value: string) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value: string) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

/**
 * SubmissionPending: Form filled, API call in flight.
 * Button shows a loading spinner and "Submitting..." text, and is disabled.
 * The checkmark indicates validation passed before submission.
 */
export const SubmissionPending: Story = {
  args: {
    jobTitle: 'Senior Product Designer',
    companyName: 'Stripe',
    jobDescription: '<p>We are looking for a <strong>Senior Product Designer</strong> to join our team. You will be responsible for designing and shipping high-quality product experiences across our payments platform.</p><p><strong>Requirements:</strong></p><ul><li>5+ years of experience in product design</li><li>A strong portfolio demonstrating end-to-end design work</li></ul>',
    isAnalyzeDisabled: false,
    isSubmitting: true,
    showCheckmark: true,
    onJobTitleChange: (value) => console.log('Job title changed:', value),
    onCompanyNameChange: (value) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

/**
 * SubmissionError: After a failed API submission, error message displayed below the form.
 * Form remains filled so user can retry without re-entering data.
 * Button is enabled for immediate retry.
 */
export const SubmissionError: Story = {
  args: {
    jobTitle: 'Senior Product Designer',
    companyName: 'Stripe',
    jobDescription: '<p>We are looking for a <strong>Senior Product Designer</strong> to join our team. You will be responsible for designing and shipping high-quality product experiences across our payments platform.</p><p><strong>Requirements:</strong></p><ul><li>5+ years of experience in product design</li><li>A strong portfolio demonstrating end-to-end design work</li></ul>',
    error: 'Failed to submit job description. Please check your connection and try again.',
    isAnalyzeDisabled: false,
    isSubmitting: false,
    showCheckmark: true,
    onJobTitleChange: (value) => console.log('Job title changed:', value),
    onCompanyNameChange: (value) => console.log('Company name changed:', value),
    onJobDescriptionChange: (value) => console.log('Job description changed:', value),
    onAnalyze: () => console.log('Retry analyze clicked'),
  },
};

