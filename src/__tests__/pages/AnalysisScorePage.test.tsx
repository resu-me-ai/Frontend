/**
 * TDD Tests for AnalysisScorePage Pipeline Wiring
 *
 * Tests the feature flag (VITE_PIPELINE_MODE) integration:
 * - Flag OFF: renders with existing default/mock data
 * - Flag ON: calls getReport(analysisId), shows loading/error/success states
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import { AnalysisScorePage } from '@/pages/AnalysisScorePage';
import { getReport } from '@/api/pipeline';
import { mapReportToProps } from '@/utils/mapReportToProps';
import type { JDMatchReport } from '@/api/pipeline';
import type { AnalysisReportProps } from '@/utils/mapReportToProps';

// Re-import for typing the mock of loadAnalysisResult
import { loadAnalysisResult } from '@/hooks/useAnalysis';

// Mock the pipeline API module
vi.mock('@/api/pipeline', () => ({
  getReport: vi.fn(),
}));

// Mock the mapReportToProps utility
vi.mock('@/utils/mapReportToProps', () => ({
  mapReportToProps: vi.fn(),
}));

// Mock child components to simplify rendering and avoid deep dependency issues
vi.mock('@/components/templates/AnalysisScoreLayout', () => ({
  AnalysisScoreLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

vi.mock('@/components/organisms/AnalysisHeader', () => ({
  AnalysisHeader: ({ overallScore }: { overallScore: number }) => (
    <div data-testid="analysis-header">{overallScore}</div>
  ),
}));

vi.mock('@/components/organisms/MatchCategoriesSection', () => ({
  MatchCategoriesSection: () => <div data-testid="match-categories" />,
}));

vi.mock('@/components/organisms/SkillsBreakdownSection', () => ({
  SkillsBreakdownSection: () => <div data-testid="skills-breakdown" />,
}));

vi.mock('@/components/organisms/ATSOptimizationSection', () => ({
  ATSOptimizationSection: () => <div data-testid="ats-optimization" />,
}));

vi.mock('@/components/organisms/PriorityActionsSection', () => ({
  PriorityActionsSection: () => <div data-testid="priority-actions" />,
}));

vi.mock('@/components/organisms/ResumeOptimizationCTA', () => ({
  ResumeOptimizationCTA: ({ onOptimizeClick }: { onOptimizeClick?: () => void }) => (
    <div data-testid="resume-cta">
      <button data-testid="optimize-btn" onClick={onOptimizeClick}>Optimize My Resume</button>
    </div>
  ),
}));

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/hooks/useAnalysis', () => ({
  loadAnalysisResult: vi.fn(() => null),
}));

const mockedGetReport = vi.mocked(getReport);
const mockedMapReportToProps = vi.mocked(mapReportToProps);

// Helper to render the page with a route param
function renderWithRoute(analysisId?: string) {
  const path = analysisId ? `/analysis-score/${analysisId}` : '/analysis-score';

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/analysis-score/:analysisId" element={<AnalysisScorePage />} />
        <Route path="/analysis-score" element={<AnalysisScorePage />} />
      </Routes>
    </MemoryRouter>
  );
}

// Sample API response (matches the V0.3 pipeline JDMatchReport interface)
const mockApiReport: JDMatchReport = {
  scores: {
    overall_score: 82,
    skills_score: 90,
    experience_score: 78,
    qualifications_score: 75,
    keywords_score: 85,
  },
  matched_skills: [
    { resume_skill: 'React', jd_skill: 'React.js', match_type: 'synonym', jd_importance: 'CRITICAL', confidence: 0.95 },
    { resume_skill: 'TypeScript', jd_skill: 'TypeScript', match_type: 'exact', jd_importance: 'IMPORTANT', confidence: 1.0 },
  ],
  missing_skills: [
    { jd_skill: 'GraphQL', importance: 'IMPORTANT', source_section: 'requirements', suggested_action: 'Add GraphQL project experience' },
  ],
  keyword_analysis: {
    present: ['React', 'TypeScript', 'Node.js'],
    missing: ['GraphQL', 'Kubernetes'],
  },
  priority_action_items: [
    {
      priority: 'P0',
      action: 'Add GraphQL Experience',
      reason: 'Include GraphQL projects to improve match.',
      bullets_affected: [1, 3],
    },
  ],
  experience_gaps: [],
  qualification_gaps: [],
};

// Mapped props that mapReportToProps would return (matches AnalysisReportProps)
const mockMappedProps: AnalysisReportProps = {
  overallScore: 82,
  categories: {
    skills: { score: 90, description: 'Strong alignment with required skills' },
    experience: { score: 78, description: 'Good experience alignment' },
    qualifications: { score: 75, description: 'Good qualifications alignment' },
    keywords: { score: 85, description: 'Strong alignment with required keywords' },
  },
  matchingSkills: [
    { name: 'React', strength: 'strong' },
    { name: 'TypeScript', strength: 'moderate' },
  ],
  missingSkills: [
    { name: 'GraphQL', priority: 'important' },
  ],
  keywordsPresent: ['React', 'TypeScript', 'Node.js'],
  keywordsMissing: ['GraphQL', 'Kubernetes'],
  actionItems: [
    {
      number: 1,
      title: 'Add GraphQL Experience',
      description: 'Include GraphQL projects to improve match.',
      priority: 'high',
    },
  ],
};

describe('AnalysisScorePage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    mockNavigate.mockClear();
    // Reset module mocks to their default returns
    vi.mocked(loadAnalysisResult).mockReturnValue(null);
    // Default: pipeline mode OFF
    (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = '';
  });

  describe('when VITE_PIPELINE_MODE is NOT set (default/mock mode)', () => {
    it('renders with default mock data without calling getReport', async () => {
      renderWithRoute();

      // Should display the default overall score (78 from mock data in the page)
      await waitFor(() => {
        expect(screen.getByText('78')).toBeInTheDocument();
      });

      // Should NOT have called the pipeline API
      expect(mockedGetReport).not.toHaveBeenCalled();
    });

    it('uses localStorage analysis result when available and flag is off', async () => {
      vi.mocked(loadAnalysisResult).mockReturnValue({
        match_report: {
          overall_score: 65,
          categories: {
            skills: { score: 70, description: 'OK' },
            experience: { score: 60, description: 'Needs work' },
            qualifications: { score: 55, description: 'Below average' },
            keywords: { score: 75, description: 'Decent' },
          },
        },
        patterns: [],
        questions: [],
      });

      renderWithRoute();

      // Should show the localStorage value, not the hardcoded 78
      await waitFor(() => {
        expect(screen.getByText('65')).toBeInTheDocument();
      });
    });
  });

  describe('when VITE_PIPELINE_MODE=true (pipeline mode)', () => {
    beforeEach(() => {
      (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = 'true';
    });

    it('calls getReport with analysisId from URL params', async () => {
      mockedGetReport.mockResolvedValue(mockApiReport);
      mockedMapReportToProps.mockReturnValue(mockMappedProps);

      renderWithRoute('abc-123');

      await waitFor(() => {
        expect(mockedGetReport).toHaveBeenCalledWith('abc-123');
      });
    });

    it('shows a loading state while fetching report', async () => {
      // Create a promise that we control
      let resolveReport!: (value: JDMatchReport) => void;
      const pendingPromise = new Promise<JDMatchReport>((resolve) => {
        resolveReport = resolve;
      });

      mockedGetReport.mockReturnValue(pendingPromise);
      mockedMapReportToProps.mockReturnValue(mockMappedProps);

      renderWithRoute('abc-123');

      // Should show loading indicator
      await waitFor(() => {
        expect(screen.getByTestId('analysis-loading')).toBeInTheDocument();
      });

      // Resolve the promise to clean up
      resolveReport(mockApiReport);

      // Wait for loading to disappear
      await waitFor(() => {
        expect(screen.queryByTestId('analysis-loading')).not.toBeInTheDocument();
      });
    });

    it('renders mapped report data on success', async () => {
      mockedGetReport.mockResolvedValue(mockApiReport);
      mockedMapReportToProps.mockReturnValue(mockMappedProps);

      renderWithRoute('abc-123');

      // Wait for the mapped score to appear
      await waitFor(() => {
        expect(screen.getByText('82')).toBeInTheDocument();
      });

      // Verify mapReportToProps was called with the API response
      expect(mockedMapReportToProps).toHaveBeenCalledWith(mockApiReport);
    });

    it('shows an error state when getReport fails', async () => {
      mockedGetReport.mockRejectedValue(
        new Error('Network error: Failed to fetch report')
      );

      renderWithRoute('abc-123');

      // Should show error message
      await waitFor(() => {
        expect(screen.getByTestId('analysis-error')).toBeInTheDocument();
        expect(screen.getByText(/failed to fetch report/i)).toBeInTheDocument();
      });
    });

    it('shows a retry button on error that re-fetches the report', async () => {
      const user = userEvent.setup();

      // First call fails, second succeeds
      mockedGetReport
        .mockRejectedValueOnce(new Error('Temporary network error'))
        .mockResolvedValueOnce(mockApiReport);
      mockedMapReportToProps.mockReturnValue(mockMappedProps);

      renderWithRoute('abc-123');

      // Wait for error state
      await waitFor(() => {
        expect(screen.getByTestId('analysis-error')).toBeInTheDocument();
      });

      // Click retry
      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);

      // Should call getReport again
      await waitFor(() => {
        expect(mockedGetReport).toHaveBeenCalledTimes(2);
      });

      // Should now show success data
      await waitFor(() => {
        expect(screen.getByText('82')).toBeInTheDocument();
      });
    });

    it('falls back to default data when no analysisId in URL', async () => {
      renderWithRoute(); // No analysisId

      // Should not call API without an analysisId
      expect(mockedGetReport).not.toHaveBeenCalled();

      // Should show default mock data
      await waitFor(() => {
        expect(screen.getByText('78')).toBeInTheDocument();
      });
    });
  });

  // =========================================================================
  // #187: handleOptimizeClick navigates to /context-collection/:sessionId
  // =========================================================================

  describe('handleOptimizeClick navigation (#187)', () => {
    it('navigates to /context-collection/:sessionId using pipeline_session_id from localStorage', async () => {
      const user = userEvent.setup();
      localStorage.setItem('pipeline_session_id', 'sess-abc-123');

      renderWithRoute();

      const optimizeBtn = screen.getByTestId('optimize-btn');
      await user.click(optimizeBtn);

      expect(mockNavigate).toHaveBeenCalledWith('/context-collection/sess-abc-123');
    });

    it('navigates to /context-collection/:analysisId when pipeline_session_id is absent but analysisId exists', async () => {
      const user = userEvent.setup();
      (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = 'true';
      localStorage.setItem('pipeline_analysis_id', 'analysis-xyz-789');
      mockedGetReport.mockResolvedValue(mockApiReport);
      mockedMapReportToProps.mockReturnValue(mockMappedProps);

      renderWithRoute('analysis-xyz-789');

      await waitFor(() => {
        expect(screen.getByText('82')).toBeInTheDocument();
      });

      const optimizeBtn = screen.getByTestId('optimize-btn');
      await user.click(optimizeBtn);

      expect(mockNavigate).toHaveBeenCalledWith('/context-collection/analysis-xyz-789');
    });

    it('does NOT navigate to /demo/context-collection (dead route)', async () => {
      const user = userEvent.setup();

      renderWithRoute();

      const optimizeBtn = screen.getByTestId('optimize-btn');
      await user.click(optimizeBtn);

      expect(mockNavigate).not.toHaveBeenCalledWith('/demo/context-collection');
    });
  });
});
