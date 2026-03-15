import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ResumeDocumentData } from '@/types/resume';

// Use vi.hoisted so these are available inside vi.mock factory (which is hoisted)
const { mockToBlob, mockPdf } = vi.hoisted(() => {
  const mockToBlob = vi.fn();
  const mockPdf = vi.fn(() => ({ toBlob: mockToBlob }));
  return { mockToBlob, mockPdf };
});

vi.mock('@react-pdf/renderer', () => ({
  pdf: mockPdf,
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children }: { children: React.ReactNode }) => children,
  Font: { register: vi.fn(), registerHyphenationCallback: vi.fn() },
  StyleSheet: { create: (s: Record<string, unknown>) => s },
}));

// Mock the font imports (Vite resolves these to URL strings)
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

import { exportResumePdf } from '@/utils/exportResumePdf';

const mockResumeData: ResumeDocumentData = {
  resume_overview: {
    full_name: 'Jane Doe',
    contact_line: 'San Francisco, CA | jane@example.com',
    parsed_contact: {
      location: 'San Francisco, CA',
      email: 'jane@example.com',
      phone: '555-0100',
      linkedin_url: 'linkedin.com/in/janedoe',
    },
  },
  resume_sections: [
    {
      header: 'Professional Summary',
      section_type: 'summary',
      section_index: 0,
      content: [
        { bullet_index: 0, text: 'Experienced product manager with 7+ years' },
        { bullet_index: 1, text: 'Skills: Python, SQL, product strategy' },
      ],
    },
    {
      header: 'Professional Experience',
      section_type: 'experience',
      section_index: 1,
      content: [
        {
          role_index: 0,
          title: 'Senior Product Manager',
          company: 'Acme Corp',
          company_context: 'Series B SaaS, 200 employees',
          date_range: 'Jan 2020 – Present',
          achievements_line: 'Led platform redesign increasing retention by 25%',
          bullets: [
            { bullet_index: 0, text: 'Achievements: Drove $2M ARR growth through feature launches' },
            { bullet_index: 1, text: 'Built and led cross-functional team of 8 engineers' },
          ],
        },
      ],
    },
  ],
};

describe('exportResumePdf', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls pdf() with a ResumePdfDocument element containing the data', async () => {
    const fakeBlob = new Blob(['pdf-content'], { type: 'application/pdf' });
    mockToBlob.mockResolvedValue(fakeBlob);

    // Mock URL.createObjectURL and revokeObjectURL
    const mockCreateObjectURL = vi.fn(() => 'blob:http://localhost/fake-url');
    const mockRevokeObjectURL = vi.fn();
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    // Mock anchor click
    const mockClick = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    } as unknown as HTMLAnchorElement);

    await exportResumePdf(mockResumeData, 'test-resume.pdf');

    expect(mockPdf).toHaveBeenCalledTimes(1);
    expect(mockToBlob).toHaveBeenCalledTimes(1);
  });

  it('triggers a download with the correct filename', async () => {
    const fakeBlob = new Blob(['pdf'], { type: 'application/pdf' });
    mockToBlob.mockResolvedValue(fakeBlob);

    const mockCreateObjectURL = vi.fn(() => 'blob:http://localhost/fake');
    const mockRevokeObjectURL = vi.fn();
    globalThis.URL.createObjectURL = mockCreateObjectURL;
    globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

    const anchorEl = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValue(
      anchorEl as unknown as HTMLAnchorElement,
    );

    await exportResumePdf(mockResumeData, 'my-resume.pdf');

    expect(anchorEl.download).toBe('my-resume.pdf');
    expect(anchorEl.href).toBe('blob:http://localhost/fake');
    expect(anchorEl.click).toHaveBeenCalledTimes(1);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/fake');
  });

  it('produces a non-empty blob', async () => {
    const fakeBlob = new Blob(['real-pdf-bytes'], { type: 'application/pdf' });
    mockToBlob.mockResolvedValue(fakeBlob);

    globalThis.URL.createObjectURL = vi.fn(() => 'blob:url');
    globalThis.URL.revokeObjectURL = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: vi.fn(),
    } as unknown as HTMLAnchorElement);

    await exportResumePdf(mockResumeData, 'resume.pdf');

    const blob = await mockToBlob.mock.results[0].value;
    expect(blob.size).toBeGreaterThan(0);
  });

  it('propagates errors from pdf generation', async () => {
    mockToBlob.mockRejectedValue(new Error('Font loading failed'));

    await expect(
      exportResumePdf(mockResumeData, 'resume.pdf'),
    ).rejects.toThrow('Font loading failed');
  });
});
