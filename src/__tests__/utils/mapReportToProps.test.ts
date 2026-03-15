import { describe, it, expect } from 'vitest';
import type { JDMatchReport } from '@/api/pipeline';
import { mapReportToProps, type AnalysisReportProps } from '@/utils/mapReportToProps';

function createMockReport(overrides: Partial<JDMatchReport> = {}): JDMatchReport {
  return {
    scores: {
      overall_score: 75,
      skills_score: 80,
      experience_score: 70,
      qualifications_score: 65,
      keywords_score: 55,
    },
    matched_skills: [
      {
        resume_skill: 'Product Strategy',
        jd_skill: 'Product Strategy',
        match_type: 'exact',
        jd_importance: 'CRITICAL',
        confidence: 1.0,
      },
      {
        resume_skill: 'Agile',
        jd_skill: 'Scrum',
        match_type: 'synonym',
        jd_importance: 'IMPORTANT',
        confidence: 0.85,
      },
      {
        resume_skill: 'Data Analysis',
        jd_skill: 'Analytics',
        match_type: 'semantic',
        jd_importance: 'NICE_TO_HAVE',
        confidence: 0.72,
      },
    ],
    missing_skills: [
      {
        jd_skill: 'Machine Learning',
        importance: 'CRITICAL',
        source_section: 'Requirements',
        suggested_action: 'Add ML project experience',
      },
      {
        jd_skill: 'Cloud Architecture',
        importance: 'IMPORTANT',
        source_section: 'Preferred',
        suggested_action: 'Highlight cloud migration work',
      },
      {
        jd_skill: 'GraphQL',
        importance: 'NICE_TO_HAVE',
        source_section: 'Nice to Have',
        suggested_action: 'Consider adding side projects',
      },
    ],
    keyword_analysis: {
      present: ['product management', 'stakeholder alignment', 'roadmap'],
      missing: ['OKRs', 'A/B testing', 'user research'],
    },
    priority_action_items: [
      {
        priority: 'P0',
        action: 'Add ML experience',
        reason: 'Critical skill gap in machine learning',
        impact_estimate: '+10% match',
        bullets_affected: [1, 3],
      },
      {
        priority: 'P1',
        action: 'Quantify achievements',
        reason: 'Missing metrics in bullet points',
        bullets_affected: [2, 4, 5],
      },
      {
        priority: 'P2',
        action: 'Add cloud keywords',
        reason: 'Missing important keywords for ATS',
        bullets_affected: [3],
      },
      {
        priority: 'P3',
        action: 'Reformat education section',
        reason: 'Low-priority formatting improvement',
        bullets_affected: [],
      },
    ],
    experience_gaps: [],
    qualification_gaps: [],
    ...overrides,
  };
}

describe('mapReportToProps', () => {
  describe('Score mapping', () => {
    it('maps overall_score to overallScore', () => {
      const report = createMockReport({
        scores: {
          overall_score: 82,
          skills_score: 80,
          experience_score: 70,
          qualifications_score: 65,
          keywords_score: 55,
        },
      });

      const result = mapReportToProps(report);

      expect(result.overallScore).toBe(82);
    });

    it('maps skills_score to categories.skills.score', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.categories.skills.score).toBe(80);
    });

    it('maps experience_score to categories.experience.score', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.categories.experience.score).toBe(70);
    });

    it('maps qualifications_score to categories.qualifications.score', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.categories.qualifications.score).toBe(65);
    });

    it('maps keywords_score to categories.keywords.score', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.categories.keywords.score).toBe(55);
    });

    it('generates "Strong alignment" description for scores >= 80', () => {
      const report = createMockReport({
        scores: {
          overall_score: 85,
          skills_score: 90,
          experience_score: 85,
          qualifications_score: 80,
          keywords_score: 95,
        },
      });

      const result = mapReportToProps(report);

      expect(result.categories.skills.description).toBe(
        'Strong alignment with required skills'
      );
      expect(result.categories.experience.description).toBe(
        'Strong alignment with required experience'
      );
      expect(result.categories.qualifications.description).toBe(
        'Strong alignment with required qualifications'
      );
      expect(result.categories.keywords.description).toBe(
        'Strong alignment with required keywords'
      );
    });

    it('generates "Good alignment" description for scores >= 60 and < 80', () => {
      const report = createMockReport({
        scores: {
          overall_score: 70,
          skills_score: 75,
          experience_score: 60,
          qualifications_score: 79,
          keywords_score: 65,
        },
      });

      const result = mapReportToProps(report);

      expect(result.categories.skills.description).toBe(
        'Good skills alignment'
      );
      expect(result.categories.experience.description).toBe(
        'Good experience alignment'
      );
      expect(result.categories.qualifications.description).toBe(
        'Good qualifications alignment'
      );
      expect(result.categories.keywords.description).toBe(
        'Good keywords alignment'
      );
    });

    it('generates "Needs improvement" description for scores < 60', () => {
      const report = createMockReport({
        scores: {
          overall_score: 40,
          skills_score: 50,
          experience_score: 30,
          qualifications_score: 59,
          keywords_score: 0,
        },
      });

      const result = mapReportToProps(report);

      expect(result.categories.skills.description).toBe(
        'Needs improvement in skills'
      );
      expect(result.categories.experience.description).toBe(
        'Needs improvement in experience'
      );
      expect(result.categories.qualifications.description).toBe(
        'Needs improvement in qualifications'
      );
      expect(result.categories.keywords.description).toBe(
        'Needs improvement in keywords'
      );
    });
  });

  describe('Matched skills badge mapping', () => {
    it('maps CRITICAL importance to strong strength', () => {
      const report = createMockReport({
        matched_skills: [
          {
            resume_skill: 'Product Strategy',
            jd_skill: 'Product Strategy',
            match_type: 'exact',
            jd_importance: 'CRITICAL',
            confidence: 1.0,
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.matchingSkills[0].strength).toBe('strong');
    });

    it('maps IMPORTANT importance to moderate strength', () => {
      const report = createMockReport({
        matched_skills: [
          {
            resume_skill: 'Agile',
            jd_skill: 'Scrum',
            match_type: 'synonym',
            jd_importance: 'IMPORTANT',
            confidence: 0.85,
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.matchingSkills[0].strength).toBe('moderate');
    });

    it('maps NICE_TO_HAVE importance to moderate strength', () => {
      const report = createMockReport({
        matched_skills: [
          {
            resume_skill: 'Data Analysis',
            jd_skill: 'Analytics',
            match_type: 'semantic',
            jd_importance: 'NICE_TO_HAVE',
            confidence: 0.72,
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.matchingSkills[0].strength).toBe('moderate');
    });

    it('uses resume_skill as the name field', () => {
      const report = createMockReport({
        matched_skills: [
          {
            resume_skill: 'Agile Methodology',
            jd_skill: 'Scrum Framework',
            match_type: 'synonym',
            jd_importance: 'CRITICAL',
            confidence: 0.9,
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.matchingSkills[0].name).toBe('Agile Methodology');
    });

    it('maps multiple matched skills correctly', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.matchingSkills).toHaveLength(3);
      expect(result.matchingSkills[0]).toEqual({
        name: 'Product Strategy',
        strength: 'strong',
      });
      expect(result.matchingSkills[1]).toEqual({
        name: 'Agile',
        strength: 'moderate',
      });
      expect(result.matchingSkills[2]).toEqual({
        name: 'Data Analysis',
        strength: 'moderate',
      });
    });
  });

  describe('Missing skills mapping', () => {
    it('maps CRITICAL importance to critical priority', () => {
      const report = createMockReport({
        missing_skills: [
          {
            jd_skill: 'Machine Learning',
            importance: 'CRITICAL',
            source_section: 'Requirements',
            suggested_action: 'Add ML experience',
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.missingSkills[0].priority).toBe('critical');
    });

    it('maps IMPORTANT importance to important priority', () => {
      const report = createMockReport({
        missing_skills: [
          {
            jd_skill: 'Cloud Architecture',
            importance: 'IMPORTANT',
            source_section: 'Preferred',
            suggested_action: 'Highlight cloud work',
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.missingSkills[0].priority).toBe('important');
    });

    it('maps NICE_TO_HAVE importance to nice-to-have priority', () => {
      const report = createMockReport({
        missing_skills: [
          {
            jd_skill: 'GraphQL',
            importance: 'NICE_TO_HAVE',
            source_section: 'Nice to Have',
            suggested_action: 'Consider adding',
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.missingSkills[0].priority).toBe('nice-to-have');
    });

    it('uses jd_skill as the name field', () => {
      const report = createMockReport({
        missing_skills: [
          {
            jd_skill: 'Kubernetes',
            importance: 'IMPORTANT',
            source_section: 'Requirements',
            suggested_action: 'Add container orchestration',
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.missingSkills[0].name).toBe('Kubernetes');
    });

    it('maps multiple missing skills correctly', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.missingSkills).toHaveLength(3);
      expect(result.missingSkills[0]).toEqual({
        name: 'Machine Learning',
        priority: 'critical',
      });
      expect(result.missingSkills[1]).toEqual({
        name: 'Cloud Architecture',
        priority: 'important',
      });
      expect(result.missingSkills[2]).toEqual({
        name: 'GraphQL',
        priority: 'nice-to-have',
      });
    });
  });

  describe('Priority action items mapping', () => {
    it('maps P0 priority to high', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P0',
            action: 'Critical fix',
            reason: 'Urgent gap',
            bullets_affected: [1],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].priority).toBe('high');
    });

    it('maps P1 priority to medium', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P1',
            action: 'Important update',
            reason: 'Key improvement',
            bullets_affected: [2],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].priority).toBe('medium');
    });

    it('maps P2 priority to medium', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P2',
            action: 'Moderate update',
            reason: 'Helpful improvement',
            bullets_affected: [3],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].priority).toBe('medium');
    });

    it('maps P3 priority to low', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P3',
            action: 'Minor tweak',
            reason: 'Nice to have',
            bullets_affected: [],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].priority).toBe('low');
    });

    it('maps action to title', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P0',
            action: 'Add ML experience to bullet 3',
            reason: 'Critical gap',
            bullets_affected: [3],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].title).toBe('Add ML experience to bullet 3');
    });

    it('maps reason to description', () => {
      const report = createMockReport({
        priority_action_items: [
          {
            priority: 'P1',
            action: 'Quantify achievements',
            reason: 'Missing metrics in bullet points',
            bullets_affected: [2, 4],
          },
        ],
      });

      const result = mapReportToProps(report);

      expect(result.actionItems[0].description).toBe(
        'Missing metrics in bullet points'
      );
    });

    it('adds sequential number starting at 1', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.actionItems[0].number).toBe(1);
      expect(result.actionItems[1].number).toBe(2);
      expect(result.actionItems[2].number).toBe(3);
      expect(result.actionItems[3].number).toBe(4);
    });

    it('maps multiple action items with correct structure', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.actionItems).toHaveLength(4);
      expect(result.actionItems[0]).toEqual({
        number: 1,
        title: 'Add ML experience',
        description: 'Critical skill gap in machine learning',
        priority: 'high',
      });
      expect(result.actionItems[1]).toEqual({
        number: 2,
        title: 'Quantify achievements',
        description: 'Missing metrics in bullet points',
        priority: 'medium',
      });
      expect(result.actionItems[2]).toEqual({
        number: 3,
        title: 'Add cloud keywords',
        description: 'Missing important keywords for ATS',
        priority: 'medium',
      });
      expect(result.actionItems[3]).toEqual({
        number: 4,
        title: 'Reformat education section',
        description: 'Low-priority formatting improvement',
        priority: 'low',
      });
    });
  });

  describe('Keywords mapping', () => {
    it('maps keyword_analysis.present to keywordsPresent', () => {
      const report = createMockReport({
        keyword_analysis: {
          present: ['product management', 'stakeholder alignment', 'roadmap'],
          missing: [],
        },
      });

      const result = mapReportToProps(report);

      expect(result.keywordsPresent).toEqual([
        'product management',
        'stakeholder alignment',
        'roadmap',
      ]);
    });

    it('maps keyword_analysis.missing to keywordsMissing', () => {
      const report = createMockReport({
        keyword_analysis: {
          present: [],
          missing: ['OKRs', 'A/B testing', 'user research'],
        },
      });

      const result = mapReportToProps(report);

      expect(result.keywordsMissing).toEqual([
        'OKRs',
        'A/B testing',
        'user research',
      ]);
    });

    it('maps both present and missing keywords from mock report', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.keywordsPresent).toEqual([
        'product management',
        'stakeholder alignment',
        'roadmap',
      ]);
      expect(result.keywordsMissing).toEqual([
        'OKRs',
        'A/B testing',
        'user research',
      ]);
    });
  });

  describe('Edge cases', () => {
    it('handles empty matched_skills array', () => {
      const report = createMockReport({ matched_skills: [] });

      const result = mapReportToProps(report);

      expect(result.matchingSkills).toEqual([]);
    });

    it('handles empty missing_skills array', () => {
      const report = createMockReport({ missing_skills: [] });

      const result = mapReportToProps(report);

      expect(result.missingSkills).toEqual([]);
    });

    it('handles empty priority_action_items array', () => {
      const report = createMockReport({ priority_action_items: [] });

      const result = mapReportToProps(report);

      expect(result.actionItems).toEqual([]);
    });

    it('handles empty keyword arrays', () => {
      const report = createMockReport({
        keyword_analysis: { present: [], missing: [] },
      });

      const result = mapReportToProps(report);

      expect(result.keywordsPresent).toEqual([]);
      expect(result.keywordsMissing).toEqual([]);
    });

    it('handles scores of 0 correctly', () => {
      const report = createMockReport({
        scores: {
          overall_score: 0,
          skills_score: 0,
          experience_score: 0,
          qualifications_score: 0,
          keywords_score: 0,
        },
      });

      const result = mapReportToProps(report);

      expect(result.overallScore).toBe(0);
      expect(result.categories.skills.score).toBe(0);
      expect(result.categories.experience.score).toBe(0);
      expect(result.categories.qualifications.score).toBe(0);
      expect(result.categories.keywords.score).toBe(0);
      // Scores of 0 should get "Needs improvement" description
      expect(result.categories.skills.description).toBe(
        'Needs improvement in skills'
      );
      expect(result.categories.experience.description).toBe(
        'Needs improvement in experience'
      );
      expect(result.categories.qualifications.description).toBe(
        'Needs improvement in qualifications'
      );
      expect(result.categories.keywords.description).toBe(
        'Needs improvement in keywords'
      );
    });

    it('handles score of exactly 60 as "Good alignment"', () => {
      const report = createMockReport({
        scores: {
          overall_score: 60,
          skills_score: 60,
          experience_score: 60,
          qualifications_score: 60,
          keywords_score: 60,
        },
      });

      const result = mapReportToProps(report);

      expect(result.categories.skills.description).toBe(
        'Good skills alignment'
      );
    });

    it('handles score of exactly 80 as "Strong alignment"', () => {
      const report = createMockReport({
        scores: {
          overall_score: 80,
          skills_score: 80,
          experience_score: 80,
          qualifications_score: 80,
          keywords_score: 80,
        },
      });

      const result = mapReportToProps(report);

      expect(result.categories.skills.description).toBe(
        'Strong alignment with required skills'
      );
    });
  });

  describe('Return type structure', () => {
    it('returns an object conforming to AnalysisReportProps', () => {
      const report = createMockReport();

      const result: AnalysisReportProps = mapReportToProps(report);

      expect(result).toHaveProperty('overallScore');
      expect(result).toHaveProperty('categories');
      expect(result).toHaveProperty('matchingSkills');
      expect(result).toHaveProperty('missingSkills');
      expect(result).toHaveProperty('keywordsPresent');
      expect(result).toHaveProperty('keywordsMissing');
      expect(result).toHaveProperty('actionItems');
    });

    it('categories has all four sub-categories', () => {
      const report = createMockReport();

      const result = mapReportToProps(report);

      expect(result.categories).toHaveProperty('skills');
      expect(result.categories).toHaveProperty('experience');
      expect(result.categories).toHaveProperty('qualifications');
      expect(result.categories).toHaveProperty('keywords');
    });
  });
});
