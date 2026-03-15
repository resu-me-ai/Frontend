import type { Meta, StoryObj } from '@storybook/react';
import { ResumeOptionCard } from './ResumeOptionCard';
import { useState } from 'react';

const meta = {
  title: 'Molecules/ResumeOptionCard',
  component: ResumeOptionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'select',
      options: ['pdf', 'word', 'pencil'],
      description: 'The type of file icon to display',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio option is selected',
    },
    fileName: {
      control: 'text',
      description: 'The display name of the resume file',
    },
    lastUpdated: {
      control: 'text',
      description: 'Timestamp or description of when the file was last updated',
    },
    name: {
      control: 'text',
      description: 'The radio button group name attribute',
    },
    value: {
      control: 'text',
      description: 'The radio button value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the wrapper div',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResumeOptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default unselected state with a resume name */
export const Default: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-1',
    fileName: 'Senior_PM_Resume.pdf',
    lastUpdated: 'Updated 3 days ago',
    fileType: 'pdf',
    checked: false,
  },
};

/** Selected/active state with highlighted radio button */
export const Selected: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-1',
    fileName: 'Product_Designer_Resume_v3.pdf',
    lastUpdated: 'Updated 2 days ago',
    fileType: 'pdf',
    checked: true,
  },
};

/** PDF file type icon variant */
export const PDFType: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-pdf',
    fileName: 'Ralph_Bautista_Resume_2025.pdf',
    lastUpdated: 'Updated today',
    fileType: 'pdf',
    checked: false,
  },
};

/** DOCX file type icon variant (uses "word" fileType) */
export const DOCXType: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-docx',
    fileName: 'UX_Lead_Resume_Final.docx',
    lastUpdated: 'Updated 5 days ago',
    fileType: 'word',
    checked: false,
  },
};

/** Very long file name to test text truncation and overflow behavior */
export const LongFileName: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-long',
    fileName:
      'My_Super_Long_Resume_Name_Senior_Product_Manager_With_Experience_In_Multiple_Industries_And_Domains_v12_FINAL_FINAL.pdf',
    lastUpdated: 'Updated 1 week ago',
    fileType: 'pdf',
    checked: false,
  },
};

/** Shows upload date metadata in the lastUpdated field */
export const WithDate: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-dated',
    fileName: 'Product_Manager_Resume.pdf',
    lastUpdated: 'Uploaded Jan 15, 2025',
    fileType: 'pdf',
    checked: false,
  },
};

/** Disabled/greyed out state using pointer-events and opacity styling */
export const Disabled: Story = {
  args: {
    name: 'resume-options',
    value: 'resume-disabled',
    fileName: 'Old_Resume_Archived.pdf',
    lastUpdated: 'Archived - no longer available',
    fileType: 'pdf',
    checked: false,
    className: 'opacity-50 pointer-events-none',
  },
};

/** Interactive demo with multiple options showing radio group behavior */
export const Interactive: Story = {
  args: {} as never,
  render: () => {
    const [selected, setSelected] = useState('resume-1');

    return (
      <div className="flex flex-col gap-3 w-[400px]">
        <ResumeOptionCard
          name="resume-options"
          value="resume-1"
          checked={selected === 'resume-1'}
          onChange={setSelected}
          fileName="Product_Designer_Resume_v3.pdf"
          lastUpdated="Updated 2 days ago"
          fileType="pdf"
        />
        <ResumeOptionCard
          name="resume-options"
          value="resume-2"
          checked={selected === 'resume-2'}
          onChange={setSelected}
          fileName="UX_Lead_Resume_Final.docx"
          lastUpdated="Updated 5 days ago"
          fileType="word"
        />
        <ResumeOptionCard
          name="resume-options"
          value="scratch"
          checked={selected === 'scratch'}
          onChange={setSelected}
          fileName="Start From Scratch"
          lastUpdated=""
          fileType="pencil"
        />
      </div>
    );
  },
};
