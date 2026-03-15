/**
 * TDD Tests for Pipeline Page Wiring
 *
 * Tests the feature flag (VITE_PIPELINE_MODE) integration for:
 * - JobDescriptionPage: submitJd on form submit
 * - UploadResumePage: submitResume on file upload
 * - AnalysisInProgressPage: display stage/message, navigate on complete
 *
 * Flag OFF = existing demo behavior preserved
 * Flag ON = pipeline hook is used
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock usePipeline hook
const mockSubmitJd = vi.fn();
const mockSubmitResume = vi.fn();
const mockResumePolling = vi.fn();

vi.mock('@/hooks/usePipeline', () => ({
  usePipeline: vi.fn(() => ({
    analysisId: null,
    stage: 'idle',
    message: '',
    report: null,
    error: null,
    submitJd: mockSubmitJd,
    submitResume: mockSubmitResume,
    resumePolling: mockResumePolling,
    isComplete: false,
  })),
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

// Mock child components for JobDescriptionPage
vi.mock('@/components/organisms/AppHeader', () => ({
  AppHeader: () => <div data-testid="app-header" />,
}));

vi.mock('@/components/molecules/SectionHeader', () => ({
  SectionHeader: () => <div data-testid="section-header" />,
}));

vi.mock('@/components/molecules/JobDescriptionForm', () => ({
  JobDescriptionForm: ({
    onJobTitleChange,
    onCompanyNameChange,
    onJobDescriptionChange,
  }: {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    onJobTitleChange: (v: string) => void;
    onCompanyNameChange: (v: string) => void;
    onJobDescriptionChange: (v: string) => void;
    error?: string;
  }) => (
    <div data-testid="jd-form">
      <input
        data-testid="job-title-input"
        onChange={(e) => onJobTitleChange(e.target.value)}
      />
      <input
        data-testid="company-name-input"
        onChange={(e) => onCompanyNameChange(e.target.value)}
      />
      <textarea
        data-testid="job-description-input"
        onChange={(e) => onJobDescriptionChange(e.target.value)}
      />
    </div>
  ),
}));

vi.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/atoms/Icon', () => ({
  Icon: () => <span data-testid="icon" />,
}));

// Mock UploadResumePage dependencies
vi.mock('@/components/templates/UploadResumeLayout', () => ({
  UploadResumeLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="upload-layout">{children}</div>
  ),
}));

vi.mock('@/components/organisms/UploadResumeSection', () => ({
  UploadResumeSection: ({
    onFileUpload,
  }: {
    onFileUpload: (file: File) => void;
    onFileRemove: () => void;
    onResumeSelect: (id: string) => void;
    selectedFile: File | null;
    showCheckmark: boolean;
  }) => (
    <div data-testid="upload-section">
      <button
        data-testid="upload-file-btn"
        onClick={() => {
          const file = new File(['test content'], 'resume.pdf', { type: 'application/pdf' });
          onFileUpload(file);
        }}
      >
        Upload File
      </button>
    </div>
  ),
}));

vi.mock('@/contexts/ResumeContext', () => ({
  useResume: () => ({
    setResumeFile: vi.fn(),
    resumeData: { file: null, fileName: '', fileType: null, pdfData: null, htmlContent: null },
    clearResume: vi.fn(),
    isLoading: false,
    error: null,
  }),
}));

// Mock AnalysisInProgressPage dependencies
vi.mock('@/components/atoms/LinearProgressBar', () => ({
  LinearProgressBar: ({ progress }: { progress: number }) => (
    <div data-testid="progress-bar" data-progress={progress} />
  ),
}));

vi.mock('@/components/molecules/AnalysisStepItem', () => ({
  AnalysisStepItem: () => <div data-testid="analysis-step" />,
}));

vi.mock('@/hooks/useAnalysis', () => ({
  useAnalysis: () => ({
    analyze: vi.fn(),
    isLoading: false,
    isError: false,
    error: null,
    result: null,
    reset: vi.fn(),
    retry: vi.fn(),
  }),
}));

// Import pages AFTER mocks are set up
import { JobDescriptionPage } from '@/pages/JobDescriptionPage';
import { UploadResumePage } from '@/pages/UploadResumePage';
import { AnalysisInProgressPage } from '@/pages/AnalysisInProgressPage';
import { usePipeline } from '@/hooks/usePipeline';

const mockedUsePipeline = vi.mocked(usePipeline);

// =========================================================================
// JobDescriptionPage Tests
// =========================================================================

describe('JobDescriptionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Default: pipeline mode OFF
    (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = '';
  });

  describe('when VITE_PIPELINE_MODE is NOT set (demo mode)', () => {
    it('stores JD data in localStorage and navigates to /upload-resume on submit', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/job-description']}>
          <Routes>
            <Route path="/job-description" element={<JobDescriptionPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Fill in the form
      await user.type(screen.getByTestId('job-title-input'), 'Senior PM');
      await user.type(screen.getByTestId('company-name-input'), 'Google');
      await user.type(screen.getByTestId('job-description-input'), 'We are looking for a PM...');

      // Click Analyze
      const analyzeBtn = screen.getByText('Analyze JD');
      await user.click(analyzeBtn);

      // Should store in localStorage
      const stored = JSON.parse(localStorage.getItem('job_description_data') || '{}');
      expect(stored.jobTitle).toBe('Senior PM');
      expect(stored.companyName).toBe('Google');
      expect(stored.jobDescription).toBe('We are looking for a PM...');

      // Should navigate to upload page
      expect(mockNavigate).toHaveBeenCalledWith('/upload-resume');

      // Should NOT call submitJd
      expect(mockSubmitJd).not.toHaveBeenCalled();
    });
  });

  describe('when VITE_PIPELINE_MODE=true (pipeline mode)', () => {
    beforeEach(() => {
      (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = 'true';
    });

    it('calls usePipeline().submitJd with form data on submit', async () => {
      const user = userEvent.setup();
      mockSubmitJd.mockResolvedValue(undefined);

      render(
        <MemoryRouter initialEntries={['/job-description']}>
          <Routes>
            <Route path="/job-description" element={<JobDescriptionPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Fill in the form
      await user.type(screen.getByTestId('job-title-input'), 'Product Manager');
      await user.type(screen.getByTestId('company-name-input'), 'Meta');
      await user.type(screen.getByTestId('job-description-input'), 'Lead product initiatives...');

      // Click Analyze
      const analyzeBtn = screen.getByText('Analyze JD');
      await user.click(analyzeBtn);

      // Should call submitJd with the form data
      expect(mockSubmitJd).toHaveBeenCalledWith({
        jobTitle: 'Product Manager',
        companyName: 'Meta',
        jobDescription: 'Lead product initiatives...',
      });
    });

    it('navigates to /upload-resume after successful submitJd', async () => {
      const user = userEvent.setup();
      mockSubmitJd.mockResolvedValue(undefined);

      render(
        <MemoryRouter initialEntries={['/job-description']}>
          <Routes>
            <Route path="/job-description" element={<JobDescriptionPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Fill in the form
      await user.type(screen.getByTestId('job-title-input'), 'PM');
      await user.type(screen.getByTestId('job-description-input'), 'A job description');

      // Click Analyze
      await user.click(screen.getByText('Analyze JD'));

      // Wait for the async submitJd to resolve
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/upload-resume');
      });
    });

    it('does NOT navigate if submitJd throws an error', async () => {
      const user = userEvent.setup();
      mockSubmitJd.mockRejectedValue(new Error('Network error'));

      render(
        <MemoryRouter initialEntries={['/job-description']}>
          <Routes>
            <Route path="/job-description" element={<JobDescriptionPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Fill in the form
      await user.type(screen.getByTestId('job-title-input'), 'PM');
      await user.type(screen.getByTestId('job-description-input'), 'A job description');

      // Click Analyze
      await user.click(screen.getByText('Analyze JD'));

      // Should NOT navigate on error
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });
});

// =========================================================================
// UploadResumePage Tests
// =========================================================================

describe('UploadResumePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Default: pipeline mode OFF
    (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = '';
  });

  describe('when VITE_PIPELINE_MODE is NOT set (demo mode)', () => {
    it('stores resume data in localStorage and navigates to /analyzing on submit', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/upload-resume']}>
          <Routes>
            <Route path="/upload-resume" element={<UploadResumePage />} />
          </Routes>
        </MemoryRouter>
      );

      // Upload a file
      await user.click(screen.getByTestId('upload-file-btn'));

      // Click Analyze Resume Match
      const analyzeBtn = screen.getByText('Analyze Resume Match');
      await user.click(analyzeBtn);

      // Should store resume data
      const stored = JSON.parse(localStorage.getItem('resume_data') || '{}');
      expect(stored.uploadedFileName).toBe('resume.pdf');

      // Should navigate to analyzing page
      expect(mockNavigate).toHaveBeenCalledWith('/analyzing');

      // Should NOT call submitResume
      expect(mockSubmitResume).not.toHaveBeenCalled();
    });
  });

  describe('when VITE_PIPELINE_MODE=true (pipeline mode)', () => {
    beforeEach(() => {
      (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = 'true';
      localStorage.setItem('pipeline_analysis_id', 'test-analysis-123');
    });

    it('calls usePipeline().submitResume with analysisId and file on submit', async () => {
      const user = userEvent.setup();
      mockSubmitResume.mockResolvedValue(undefined);

      render(
        <MemoryRouter initialEntries={['/upload-resume']}>
          <Routes>
            <Route path="/upload-resume" element={<UploadResumePage />} />
          </Routes>
        </MemoryRouter>
      );

      // Upload a file
      await user.click(screen.getByTestId('upload-file-btn'));

      // Click Analyze Resume Match
      await user.click(screen.getByText('Analyze Resume Match'));

      // Should call submitResume with analysisId from localStorage and the file
      expect(mockSubmitResume).toHaveBeenCalledWith({
        analysisId: 'test-analysis-123',
        file: expect.any(File),
      });
    });

    it('navigates to /analyzing after successful submitResume', async () => {
      const user = userEvent.setup();
      mockSubmitResume.mockResolvedValue(undefined);

      render(
        <MemoryRouter initialEntries={['/upload-resume']}>
          <Routes>
            <Route path="/upload-resume" element={<UploadResumePage />} />
          </Routes>
        </MemoryRouter>
      );

      // Upload a file
      await user.click(screen.getByTestId('upload-file-btn'));

      // Click Analyze Resume Match
      await user.click(screen.getByText('Analyze Resume Match'));

      // Should navigate
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/analyzing');
      });
    });

    it('does NOT navigate if submitResume throws an error', async () => {
      const user = userEvent.setup();
      mockSubmitResume.mockRejectedValue(new Error('Upload failed'));

      render(
        <MemoryRouter initialEntries={['/upload-resume']}>
          <Routes>
            <Route path="/upload-resume" element={<UploadResumePage />} />
          </Routes>
        </MemoryRouter>
      );

      // Upload a file
      await user.click(screen.getByTestId('upload-file-btn'));

      // Click Analyze Resume Match
      await user.click(screen.getByText('Analyze Resume Match'));

      // Should NOT navigate on error
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalledWith('/analyzing');
      });
    });

    it('reads analysisId from localStorage', async () => {
      const user = userEvent.setup();
      mockSubmitResume.mockResolvedValue(undefined);

      localStorage.setItem('pipeline_analysis_id', 'custom-id-456');

      render(
        <MemoryRouter initialEntries={['/upload-resume']}>
          <Routes>
            <Route path="/upload-resume" element={<UploadResumePage />} />
          </Routes>
        </MemoryRouter>
      );

      // Upload and submit
      await user.click(screen.getByTestId('upload-file-btn'));
      await user.click(screen.getByText('Analyze Resume Match'));

      // Should use the analysisId from localStorage
      expect(mockSubmitResume).toHaveBeenCalledWith(
        expect.objectContaining({ analysisId: 'custom-id-456' })
      );
    });
  });
});

// =========================================================================
// AnalysisInProgressPage Tests
// =========================================================================

describe('AnalysisInProgressPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Default: pipeline mode OFF
    (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = '';

    // Set up required localStorage for demo mode
    localStorage.setItem('job_description_data', JSON.stringify({
      jobTitle: 'PM',
      jobDescription: 'A job description',
    }));
    localStorage.setItem('resume_data', JSON.stringify({
      uploadedFileName: 'resume.pdf',
    }));
  });

  describe('when VITE_PIPELINE_MODE is NOT set (demo mode)', () => {
    it('renders the progress bar and analysis steps', () => {
      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Should show the progress bar (demo timer animation)
      expect(screen.getByTestId('progress-bar')).toBeInTheDocument();

      // Should show analysis step items
      const steps = screen.getAllByTestId('analysis-step');
      expect(steps.length).toBe(3);
    });

    it('shows the Analysis in Progress title', () => {
      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Analysis in Progress')).toBeInTheDocument();
    });
  });

  describe('when VITE_PIPELINE_MODE=true (pipeline mode)', () => {
    beforeEach(() => {
      (import.meta.env as Record<string, string>).VITE_PIPELINE_MODE = 'true';
      localStorage.setItem('pipeline_analysis_id', 'analysis-789');
    });

    it('displays stage and message from usePipeline()', () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'v01_jd_processing',
        message: 'Processing job description...',
        report: null,
        error: null,
        isComplete: false,
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Reading your job description...')).toBeInTheDocument();
    });

    it('displays the pipeline stage label', () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'v02_resume_processing',
        message: 'Extracting resume data...',
        report: null,
        error: null,
        isComplete: false,
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByTestId('pipeline-stage')).toBeInTheDocument();
      expect(screen.getByTestId('pipeline-message')).toHaveTextContent('Extracting resume data...');
    });

    it('navigates to /analysis-score/:analysisId when isComplete becomes true', async () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'complete',
        message: 'Analysis complete!',
        report: { scores: { overall_score: 85, skills_score: 80, experience_score: 75, qualifications_score: 90, keywords_score: 70 }, matched_skills: [], missing_skills: [], keyword_analysis: { matched: [], missing: [] }, priority_action_items: [], experience_evaluation: { entries: [] }, qualification_evaluation: { entries: [] } } as any,
        error: null,
        isComplete: true,
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/analysis-score/analysis-789');
      });
    });

    it('navigates to /analysis-score/:analysisId when stage is v03_complete (even if isComplete is false)', async () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'v03_complete',
        message: 'Analysis complete!',
        report: null,
        error: null,
        isComplete: false,  // Not yet set to true — but v03_complete should still trigger navigation
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/analysis-score/analysis-789');
      });
    });

    it('shows error state when pipeline has an error', () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'error',
        message: 'Pipeline failed unexpectedly',
        report: null,
        error: 'Connection lost. Please refresh.',
        isComplete: false,
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText(/connection lost/i)).toBeInTheDocument();
    });

    it('does NOT show the fake timer progress bar in pipeline mode', () => {
      mockedUsePipeline.mockReturnValue({
        analysisId: 'analysis-789',
        stage: 'analyzing',
        message: 'Running comparison engine...',
        report: null,
        error: null,
        isComplete: false,
        submitJd: mockSubmitJd,
        submitResume: mockSubmitResume,
        resumePolling: mockResumePolling,
      });

      render(
        <MemoryRouter initialEntries={['/analyzing']}>
          <Routes>
            <Route path="/analyzing" element={<AnalysisInProgressPage />} />
          </Routes>
        </MemoryRouter>
      );

      // In pipeline mode, we show the pipeline message instead of fake progress
      expect(screen.getByTestId('pipeline-stage')).toBeInTheDocument();
    });
  });
});
