import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@/components/atoms/Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'chevron-down',
        'map-pin',
        'briefcase',
        'arrow-right',
        'arrow-left',
        'check',
        'upload',
        'pdf',
        'word',
        'pencil',
        'luggage',
        'drop',
        'magic-wand',
        'skills-match',
        'experience',
        'qualifications',
        'keywords',
        'missing-skills',
        'ats',
        'priority',
        'ready-to-perfect',
        'info',
        'magic-wand-blue',
        'pdf-white',
      ],
      description: 'The icon to display',
    },
    size: {
      control: { type: 'range', min: 12, max: 48, step: 4 },
      description: 'The size of the icon in pixels',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 24,
  },
};

export const ChevronDown: Story = {
  args: {
    name: 'chevron-down',
    size: 16,
  },
};

export const MapPin: Story = {
  args: {
    name: 'map-pin',
    size: 16,
  },
};

export const Briefcase: Story = {
  args: {
    name: 'briefcase',
    size: 24,
  },
};

export const ArrowRight: Story = {
  args: {
    name: 'arrow-right',
    size: 16,
  },
};

export const ArrowLeft: Story = {
  args: {
    name: 'arrow-left',
    size: 16,
  },
};

export const Check: Story = {
  args: {
    name: 'check',
    size: 16,
  },
};

export const AllIcons: Story = {
  args: {} as never,
  render: () => {
    const icons: Array<
      | 'chevron-down'
      | 'map-pin'
      | 'briefcase'
      | 'arrow-right'
      | 'arrow-left'
      | 'check'
      | 'upload'
      | 'pdf'
      | 'word'
      | 'pencil'
      | 'luggage'
      | 'drop'
      | 'magic-wand'
    > = [
      'chevron-down',
      'map-pin',
      'briefcase',
      'arrow-right',
      'arrow-left',
      'check',
      'upload',
      'pdf',
      'word',
      'pencil',
      'luggage',
      'drop',
      'magic-wand',
    ];

    return (
      <div className="flex flex-wrap gap-8">
        {icons.map((icon) => (
          <div key={icon} className="flex flex-col items-center gap-2">
            <Icon name={icon} size={24} className="text-gray-700" />
            <span className="text-xs text-gray-500">{icon}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  args: {} as never,
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon name="briefcase" size={16} />
        <span className="text-xs text-gray-500">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="briefcase" size={20} />
        <span className="text-xs text-gray-500">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="briefcase" size={24} />
        <span className="text-xs text-gray-500">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="briefcase" size={32} />
        <span className="text-xs text-gray-500">32px</span>
      </div>
    </div>
  ),
};

export const ColoredIcons: Story = {
  args: {} as never,
  render: () => (
    <div className="flex gap-6">
      <Icon name="check" size={24} className="text-green-600" />
      <Icon name="briefcase" size={24} className="text-primary" />
      <Icon name="map-pin" size={24} className="text-red-600" />
      <Icon name="arrow-right" size={24} className="text-gray-400" />
    </div>
  ),
};

