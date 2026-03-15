import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnalysisScoreView } from '@/components/templates/AnalysisScoreView';
import { loadAnalysisResult } from '@/hooks/useAnalysis';
import { getReport, getStatus } from '@/api/pipeline';
import { mapReportToProps } from '@/utils/mapReportToProps';
import type { AnalysisReportProps } from '@/utils/mapReportToProps';

// Mock data - fallback if no API data available
const mockAnalysisData: AnalysisReportProps = {
  overallScore: 78,
  categories: {
    skills: { score: 85, description: 'Strong alignment with required skills' },
    experience: { score: 72, description: 'Good experience alignment' },
    qualifications: { score: 68, description: 'Meets most requirements' },
    keywords: { score: 80, description: 'Strong keyword presence' },
  },
  matchingSkills: [
    { name: 'User Research & Testing', strength: 'strong' as const },
    { name: 'Figma & Design Systems', strength: 'strong' as const },
    { name: 'Wireframing & Prototyping', strength: 'strong' as const },
    { name: 'Cross-functional Collaboration', strength: 'moderate' as const },
    { name: 'Agile Methodologies', strength: 'moderate' as const },
  ],
  missingSkills: [
    { name: 'Design System Documentation', priority: 'critical' as const },
    { name: 'Accessibility (WCAG) Standards', priority: 'important' as const },
    { name: 'Data-Driven Design Decisions', priority: 'important' as const },
    { name: 'Sketch Software', priority: 'nice-to-have' as const },
    { name: 'HTML/CSS Knowledge', priority: 'nice-to-have' as const },
  ],
  keywordsPresent: [
    'User Experience',
    'Figma',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Design Thinking',
    'Agile',
    'Collaboration',
    'Visual Design',
    'Mobile Design',
  ],
  keywordsMissing: ['WCAG', 'Accessibility', 'Design Systems', 'A/B Testing', 'Analytics', 'Stakeholder Management', 'Documentation'],
  actionItems: [
    {
      number: 1,
      title: 'Add Accessibility Experience',
      description: 'The job description emphasizes WCAG compliance. Add specific examples of accessible design work.',
      priority: 'high' as const,
    },
    {
      number: 2,
      title: 'Quantify Design System Impact',
      description: 'Add metrics showing how your design system improved team efficiency or product consistency.',
      priority: 'medium' as const,
    },
    {
      number: 3,
      title: 'Emphasize Data-Driven Decisions',
      description: 'Include examples of using analytics or user data to inform design decisions.',
      priority: 'medium' as const,
    },
    {
      number: 4,
      title: 'Highlight Stakeholder Collaboration',
      description: 'The role requires working with senior leadership. Showcase relevant experience.',
      priority: 'low' as const,
    },
  ],
};

export const AnalysisScorePage: React.FC = () => {
  const navigate = useNavigate();
  const { analysisId } = useParams<{ analysisId?: string }>();

  const isPipelineMode = import.meta.env.VITE_PIPELINE_MODE === 'true';

  const [reportProps, setReportProps] = useState<AnalysisReportProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questionOneReady, setQuestionOneReady] = useState(false);

  // Load from localStorage for legacy mode (flag off)
  const [legacyData, setLegacyData] = useState<AnalysisReportProps>(mockAnalysisData);

  const fetchReport = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const report = await getReport(id);
      console.log('[AnalysisScorePage] API report:', {
        overall: report?.scores?.overall_score,
        rubric: report?.rubric_analysis ? 'present' : 'absent',
        actionItems: report?.priority_action_items?.length ?? 0,
      });
      const mapped = mapReportToProps(report);
      setReportProps(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPipelineMode && analysisId) {
      fetchReport(analysisId);
    } else {
      // Legacy mode: load from localStorage
      const result = loadAnalysisResult();
      if (result && result.match_report) {
        setLegacyData({
          overallScore: result.match_report.overall_score,
          categories: result.match_report.categories,
          matchingSkills: mockAnalysisData.matchingSkills,
          missingSkills: mockAnalysisData.missingSkills,
          keywordsPresent: mockAnalysisData.keywordsPresent,
          keywordsMissing: mockAnalysisData.keywordsMissing,
          actionItems: mockAnalysisData.actionItems,
        });
      }
    }
  }, [analysisId, isPipelineMode, fetchReport]);

  // Poll for questionOneReady (company context Q1 - instant, no LLM wait)
  useEffect(() => {
    if (questionOneReady) return;
    const sessionId = localStorage.getItem('pipeline_session_id') || analysisId;
    if (!sessionId) return;

    const check = async () => {
      try {
        const status = await getStatus(sessionId);
        if (status.questionOneReady) {
          setQuestionOneReady(true);
        }
      } catch (err) {
        console.error('[AnalysisScorePage] questions status check failed:', err);
      }
    };

    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, [analysisId, questionOneReady]);

  const handleOptimizeClick = () => {
    const sessionId = localStorage.getItem('pipeline_session_id') || analysisId;
    console.log('[AnalysisScorePage] handleOptimizeClick → /context-collection/' + sessionId);
    if (sessionId) {
      navigate(`/context-collection/${sessionId}`);
    }
  };

  const handleDownloadClick = () => {
    console.log('Download report clicked');
  };

  const handleRetry = () => {
    if (analysisId) {
      fetchReport(analysisId);
    }
  };

  const analysisData = reportProps ?? legacyData;

  return (
    <AnalysisScoreView
      {...analysisData}
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
      onOptimizeClick={handleOptimizeClick}
      onDownloadClick={handleDownloadClick}
      optimizeDisabled={!questionOneReady}
    />
  );
};
