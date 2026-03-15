import type { Meta, StoryObj } from '@storybook/react';
import { ResumeViewer } from './ResumeViewer';

const meta = {
  title: 'Organisms/ResumeViewer',
  component: ResumeViewer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'select',
      options: ['pdf', 'docx', 'doc', null],
      description: 'The type of file being displayed',
    },
    fileName: {
      control: 'text',
      description: 'The name of the uploaded file',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ResumeViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileType: null,
    pdfData: null,
    htmlContent: null,
  },
};

export const NoFile: Story = {
  args: {
    fileType: null,
    pdfData: null,
    htmlContent: null,
  },
};

export const DocxWithHtml: Story = {
  args: {
    fileType: 'docx',
    fileName: 'resume.docx',
    htmlContent: `
      <h1>Ralph Bautista</h1>
      <p>ralph@example.com | (555) 123-4567 | San Francisco, CA</p>
      <h2>Professional Summary</h2>
      <p>Senior Software Engineer with 8+ years of experience building scalable web applications and leading cross-functional teams.</p>
      <h2>Experience</h2>
      <h3>Senior Software Engineer - TechCorp Inc.</h3>
      <p><em>Jan 2021 - Present</em></p>
      <ul>
        <li>Led cross-functional team of 8 engineers to deliver microservices architecture</li>
        <li>Reduced deployment time by 40% through CI/CD pipeline optimization</li>
        <li>Mentored 3 junior developers, resulting in their promotion within 12 months</li>
      </ul>
      <h3>Software Engineer - StartupXYZ</h3>
      <p><em>Mar 2018 - Dec 2020</em></p>
      <ul>
        <li>Built real-time analytics dashboard processing 1M+ events/second</li>
        <li>Implemented OAuth 2.0 authentication serving 50,000+ users</li>
        <li>Reduced API response times by 60% through database query optimization</li>
      </ul>
      <h2>Education</h2>
      <p><strong>B.S. Computer Science</strong> - University of California, Berkeley (2017)</p>
      <h2>Skills</h2>
      <p>TypeScript, React, Node.js, Python, AWS, Docker, Kubernetes, PostgreSQL, MongoDB</p>
    `,
    pdfData: null,
  },
};

export const PdfPlaceholder: Story = {
  args: {
    fileType: 'pdf',
    fileName: 'resume.pdf',
    pdfData: null,
    htmlContent: null,
  },
};

export const WithCustomClass: Story = {
  args: {
    fileType: null,
    pdfData: null,
    htmlContent: null,
    className: 'max-w-2xl mx-auto',
  },
};
