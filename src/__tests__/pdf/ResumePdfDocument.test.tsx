import { describe, it, expect, vi } from 'vitest';
import type { ResumeDocumentData } from '@/types/resume';

// Mock @react-pdf/renderer with components that capture rendered children
vi.mock('@react-pdf/renderer', () => {
  const React = require('react');
  return {
    Document: ({ children }: { children: React.ReactNode }) =>
      React.createElement('document', null, children),
    Page: ({ children, ...props }: { children: React.ReactNode; size?: string }) =>
      React.createElement('page', props, children),
    View: ({ children, ...props }: { children: React.ReactNode }) =>
      React.createElement('view', props, children),
    Text: ({ children, ...props }: { children: React.ReactNode }) =>
      React.createElement('text', props, children),
    Link: ({ children, src, ...props }: { children: React.ReactNode; src?: string }) =>
      React.createElement('a', { ...props, href: src, 'data-pdf-link': true }, children),
    Font: { register: vi.fn(), registerHyphenationCallback: vi.fn() },
    StyleSheet: { create: (s: Record<string, unknown>) => s },
  };
});

vi.mock('@fontsource/inter/files/inter-latin-400-normal.woff2', () => ({
  default: '/fonts/inter-400.woff2',
}));
vi.mock('@fontsource/inter/files/inter-latin-600-normal.woff2', () => ({
  default: '/fonts/inter-600.woff2',
}));
vi.mock('@fontsource/inter/files/inter-latin-700-normal.woff2', () => ({
  default: '/fonts/inter-700.woff2',
}));
vi.mock('@fontsource/inter/files/inter-latin-400-italic.woff2', () => ({
  default: '/fonts/inter-400-italic.woff2',
}));

import { render } from '@testing-library/react';
import { ResumePdfDocument } from '@/components/pdf';

const mockData: ResumeDocumentData = {
  resume_overview: {
    full_name: 'John Smith',
    contact_line: 'NYC | john@test.com',
    parsed_contact: {
      location: 'New York, NY',
      email: 'john@test.com',
      linkedin_url: 'linkedin.com/in/johnsmith',
    },
  },
  resume_sections: [
    {
      header: 'Summary',
      section_type: 'summary',
      section_index: 0,
      content: [
        { bullet_index: 0, text: 'Education: BS Computer Science, MIT' },
        { bullet_index: 1, text: 'Achievements: Published 3 papers' },
      ],
    },
    {
      header: 'Experience',
      section_type: 'experience',
      section_index: 1,
      content: [
        {
          role_index: 0,
          title: 'Tech Lead',
          company: 'BigCo',
          date_range: '2021 – Present',
          achievements_line: 'Shipped v2 platform',
          bullets: [
            { bullet_index: 0, text: 'Led team of 12 engineers' },
          ],
        },
        {
          role_index: 1,
          title: 'Engineer',
          company: 'StartupCo',
          company_context: 'Seed-stage fintech',
          date_range: '2018 – 2021',
          bullets: [
            { bullet_index: 0, text: 'Built payments API processing $1M/day' },
          ],
        },
      ],
    },
  ],
};

describe('ResumePdfDocument', () => {
  it('renders without errors', () => {
    expect(() => render(<ResumePdfDocument data={mockData} />)).not.toThrow();
  });

  it('renders the full name', () => {
    const { getByText } = render(<ResumePdfDocument data={mockData} />);
    expect(getByText('John Smith')).toBeDefined();
  });

  it('renders all section headers', () => {
    const { getByText } = render(<ResumePdfDocument data={mockData} />);
    expect(getByText('Summary')).toBeDefined();
    expect(getByText('Experience')).toBeDefined();
  });

  it('renders experience roles with title and company', () => {
    const { getByText } = render(<ResumePdfDocument data={mockData} />);
    expect(getByText('Tech Lead')).toBeDefined();
    expect(getByText('BigCo')).toBeDefined();
    expect(getByText('Engineer')).toBeDefined();
    expect(getByText('StartupCo')).toBeDefined();
  });

  it('renders company context in parentheses', () => {
    const { getByText } = render(<ResumePdfDocument data={mockData} />);
    expect(getByText('(Seed-stage fintech)')).toBeDefined();
  });

  it('renders achievements line with orange prefix', () => {
    const { container } = render(<ResumePdfDocument data={mockData} />);
    const textContent = container.textContent ?? '';
    expect(textContent).toContain('Achievements:');
    expect(textContent).toContain('Shipped v2 platform');
  });

  it('renders bullet items', () => {
    const { container } = render(<ResumePdfDocument data={mockData} />);
    const textContent = container.textContent ?? '';
    expect(textContent).toContain('Led team of 12 engineers');
    expect(textContent).toContain('Built payments API processing $1M/day');
  });

  it('renders bold-prefix bullets (parseBoldPrefix integration)', () => {
    const { container } = render(<ResumePdfDocument data={mockData} />);
    const textContent = container.textContent ?? '';
    // "Education:" prefix should appear in summary section
    expect(textContent).toContain('Education:');
    expect(textContent).toContain('BS Computer Science, MIT');
    // "Achievements:" prefix in summary bullets
    expect(textContent).toContain('Published 3 papers');
  });

  it('renders contact links for email and linkedin', () => {
    const { container } = render(<ResumePdfDocument data={mockData} />);
    const links = container.querySelectorAll('a[data-pdf-link]');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('mailto:john@test.com');
    expect(hrefs).toContain('https://linkedin.com/in/johnsmith');
  });
});
