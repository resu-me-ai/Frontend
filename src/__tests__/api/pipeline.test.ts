/**
 * TDD Tests for Pipeline API Client
 *
 * Tests the getReport function that fetches JDMatchReport data
 * from the pipeline API endpoint.
 *
 * RED PHASE: These tests define the expected behavior.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getReport } from '@/api/pipeline';
import type { JDMatchReport } from '@/api/pipeline';

// Mock fetch globally
const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Fixture: a valid JDMatchReport response
const mockReport: JDMatchReport = {
  scores: {
    overall_score: 78,
    skills_score: 85,
    experience_score: 72,
    qualifications_score: 68,
    keywords_score: 80,
  },
  matched_skills: [
    {
      resume_skill: 'Product Management',
      jd_skill: 'Product Management',
      match_type: 'exact',
      jd_importance: 'CRITICAL',
      confidence: 1.0,
    },
    {
      resume_skill: 'Agile Methodology',
      jd_skill: 'Scrum',
      match_type: 'synonym',
      jd_importance: 'IMPORTANT',
      confidence: 0.85,
    },
    {
      resume_skill: 'Data-driven decision making',
      jd_skill: 'Analytics mindset',
      match_type: 'semantic',
      jd_importance: 'NICE_TO_HAVE',
      confidence: 0.62,
    },
  ],
  missing_skills: [
    {
      jd_skill: 'Machine Learning',
      importance: 'CRITICAL',
      source_section: 'Requirements',
      suggested_action: 'Highlight any ML-adjacent experience such as data analysis or A/B testing',
    },
    {
      jd_skill: 'SQL',
      importance: 'IMPORTANT',
      source_section: 'Preferred Qualifications',
      suggested_action: 'Add SQL proficiency if you have database query experience',
    },
  ],
  keyword_analysis: {
    present: ['product strategy', 'roadmap', 'stakeholder management', 'KPIs'],
    missing: ['machine learning', 'neural networks', 'deep learning'],
  },
  priority_action_items: [
    {
      priority: 'P0',
      action: 'Add ML-related experience or coursework',
      reason: 'Machine Learning is marked as CRITICAL in the JD',
      impact_estimate: '+5-8% overall score',
      bullets_affected: [2, 5],
    },
    {
      priority: 'P1',
      action: 'Quantify product impact metrics',
      reason: 'JD emphasizes data-driven outcomes',
      bullets_affected: [1, 3, 4],
    },
  ],
  experience_gaps: [
    {
      gap_type: 'years',
      required: 7,
      actual: 5,
      mitigation: 'Emphasize scope and complexity of projects to offset years gap',
    },
    {
      gap_type: 'domain',
      required: 'AI/ML',
      actual: 'SaaS',
      mitigation: 'Highlight cross-functional AI team collaboration',
    },
  ],
  qualification_gaps: [
    {
      gap_type: 'certification',
      required: 'PMP',
      status: 'missing',
      importance: 'NICE_TO_HAVE',
    },
    {
      gap_type: 'education',
      required: "Master's in CS or related field",
      status: 'partial',
      importance: 'IMPORTANT',
    },
  ],
};

describe('Pipeline API - getReport', () => {
  describe('Successful requests', () => {
    it('makes a GET request to /api/pipeline/{analysisId}', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      await getReport('analysis-123');

      // Uses VITE_API_BASE_URL from env (defaults to http://localhost:8000/api/v1 for FastAPI)
      const expectedBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
      expect(mockFetch).toHaveBeenCalledWith(`${expectedBaseUrl}/pipeline/analysis-123`);
    });

    it('returns a typed JDMatchReport response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-456');

      // Verify the structure matches JDMatchReport interface
      expect(result.scores).toBeDefined();
      expect(result.scores.overall_score).toBe(78);
      expect(result.scores.skills_score).toBe(85);
      expect(result.scores.experience_score).toBe(72);
      expect(result.scores.qualifications_score).toBe(68);
      expect(result.scores.keywords_score).toBe(80);
    });

    it('returns matched_skills with correct shape', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.matched_skills).toHaveLength(3);
      expect(result.matched_skills[0]).toEqual({
        resume_skill: 'Product Management',
        jd_skill: 'Product Management',
        match_type: 'exact',
        jd_importance: 'CRITICAL',
        confidence: 1.0,
      });
    });

    it('returns missing_skills with correct shape', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.missing_skills).toHaveLength(2);
      expect(result.missing_skills[0].jd_skill).toBe('Machine Learning');
      expect(result.missing_skills[0].importance).toBe('CRITICAL');
      expect(result.missing_skills[0].suggested_action).toContain('ML-adjacent');
    });

    it('returns keyword_analysis with present and missing arrays', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.keyword_analysis.present).toContain('product strategy');
      expect(result.keyword_analysis.missing).toContain('machine learning');
    });

    it('returns priority_action_items with optional impact_estimate', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.priority_action_items).toHaveLength(2);
      expect(result.priority_action_items[0].priority).toBe('P0');
      expect(result.priority_action_items[0].impact_estimate).toBe('+5-8% overall score');
      // Second item has no impact_estimate (optional field)
      expect(result.priority_action_items[1].impact_estimate).toBeUndefined();
    });

    it('returns experience_gaps with mixed required types', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.experience_gaps).toHaveLength(2);
      // years gap: required is number
      expect(result.experience_gaps[0].gap_type).toBe('years');
      expect(result.experience_gaps[0].required).toBe(7);
      expect(result.experience_gaps[0].actual).toBe(5);
      // domain gap: required is string
      expect(result.experience_gaps[1].gap_type).toBe('domain');
      expect(result.experience_gaps[1].required).toBe('AI/ML');
    });

    it('returns qualification_gaps with correct statuses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockReport,
      });

      const result = await getReport('analysis-789');

      expect(result.qualification_gaps).toHaveLength(2);
      expect(result.qualification_gaps[0].status).toBe('missing');
      expect(result.qualification_gaps[1].status).toBe('partial');
    });
  });

  describe('Error handling', () => {
    it('throws an error for 404 response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getReport('nonexistent-id')).rejects.toThrow(
        'Failed to fetch report: 404'
      );
    });

    it('throws an error for 500 response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getReport('analysis-123')).rejects.toThrow(
        'Failed to fetch report: 500'
      );
    });

    it('throws an error for network failures', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(getReport('analysis-123')).rejects.toThrow('Failed to fetch');
    });
  });
});
