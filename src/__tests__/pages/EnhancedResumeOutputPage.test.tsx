/**
 * Tests for EnhancedResumeOutputPage (#259, #260, #261)
 *
 * Page at /enhanced-resume/:sessionId that:
 * 1. Calls POST /pipeline/:sessionId/finalize
 * 2. Calls GET /pipeline/:sessionId/rescore
 * 3. Shows score comparison + DOCX download button
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('@/lib/api', () => ({
  getApiBase: () => 'http://localhost:3000/api/v1',
}));

import { EnhancedResumeOutputPage } from '@/pages/EnhancedResumeOutputPage';

const mockFinalizeData = {
  status: 'complete',
  bulletCount: 8,
  enhancedCount: 3,
};

const mockRescoreData = {
  original: { overall: 63, skills: 70, experience: 55, qualifications: 60, keywords: 65 },
  enhanced: { overall: 72, skills: 75, experience: 65, qualifications: 70, keywords: 80 },
  deltas: { overall: 9, skills: 5, experience: 10, qualifications: 10, keywords: 15 },
  improved: true,
};

const mockRescoreDataWithRubric = {
  ...mockRescoreData,
  rubric_original: {
    overall: 58,
    competency: 62,
    pattern: 45,
    qualifications: 60,
    keywords: 65,
  },
};

function renderPage(sessionId = 'sess-123') {
  return render(
    <MemoryRouter initialEntries={[`/enhanced-resume/${sessionId}`]}>
      <Routes>
        <Route path="/enhanced-resume/:sessionId" element={<EnhancedResumeOutputPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('EnhancedResumeOutputPage (#259, #260, #261)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it('renders with a data-testid of enhanced-resume-page', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('enhanced-resume-page')).toBeInTheDocument();
    });
  });

  it('shows a loading state while finalizing', () => {
    mockFetch.mockReturnValueOnce(new Promise(() => {})); // never resolves

    renderPage();

    expect(screen.getByTestId('enhanced-resume-loading')).toBeInTheDocument();
  });

  it('calls finalize then rescore endpoints', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage('sess-abc-456');

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/sess-abc-456/finalize',
        { method: 'POST' },
      );
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/pipeline/sess-abc-456/rescore',
      );
    });
  });

  it('displays score comparison on success', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('63')).toBeInTheDocument(); // original overall
      expect(screen.getByText('72')).toBeInTheDocument(); // enhanced overall
      expect(screen.getByText('+9')).toBeInTheDocument(); // overall delta
    });
  });

  it('shows an error state when the API call fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve('Internal Server Error'),
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByTestId('enhanced-resume-error')).toBeInTheDocument();
    });
  });

  it('shows a title for the page', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/enhanced resume/i)).toBeInTheDocument();
    });
  });

  it('shows bullet count summary', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/3 of 8 bullets enhanced/i)).toBeInTheDocument();
    });
  });

  it('shows download button', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/download enhanced resume/i)).toBeInTheDocument();
    });
  });

  describe('Rubric rescoring (#385)', () => {
    it('renders rubric baseline section when rubric_original is present', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreDataWithRubric) });

      renderPage();

      await waitFor(() => {
        expect(screen.getByTestId('rubric-baseline-section')).toBeInTheDocument();
      });
    });

    it('displays rubric competency and pattern scores', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreDataWithRubric) });

      renderPage();

      await waitFor(() => {
        expect(screen.getByText('58')).toBeInTheDocument(); // rubric overall
        expect(screen.getByText(/competency/i)).toBeInTheDocument();
        expect(screen.getByText(/pattern/i)).toBeInTheDocument();
      });
    });

    it('does not render rubric section when rubric_original is absent', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockFinalizeData) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockRescoreData) });

      renderPage();

      await waitFor(() => {
        expect(screen.getByTestId('enhanced-resume-page')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('rubric-baseline-section')).not.toBeInTheDocument();
    });
  });
});
