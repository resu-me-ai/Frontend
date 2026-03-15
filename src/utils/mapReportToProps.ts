/**
 * Maps a JDMatchReport API response into props for the analysis page UI components.
 *
 * This function transforms the snake_case API response format into a
 * camelCase, UI-friendly structure suitable for React component props.
 */

import type { JDMatchReport } from '@/api/pipeline';

// Rubric analysis props for competency and pattern gap display
export interface RubricAnalysisProps {
  competencyGaps: Array<{
    skill: string;
    gapType: 'exceeds' | 'meets' | 'level_below' | 'missing';
    jdLevel: string;
    resumeLevel: string;
    action: string;
  }>;
  patternGaps: Array<{
    pattern: string;
    patternName: string;
    description: string;
    action: string;
  }>;
  competenciesMet: number;
  competenciesTotal: number;
  criticalGaps: string[];
  summary: string;
}

// Output type for the UI components
export interface AnalysisReportProps {
  overallScore: number;
  categories: {
    skills: { score: number; description: string };
    experience: { score: number; description: string };
    qualifications: { score: number; description: string };
    keywords: { score: number; description: string };
  };
  matchingSkills: Array<{ name: string; strength: 'strong' | 'moderate' }>;
  missingSkills: Array<{
    name: string;
    priority: 'critical' | 'important' | 'nice-to-have';
  }>;
  keywordsPresent: string[];
  keywordsMissing: string[];
  actionItems: Array<{
    number: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  rubricAnalysis?: RubricAnalysisProps;
}

/**
 * Generates a human-readable description for a category score.
 *
 * - score >= 80: "Strong alignment with required {category}"
 * - score >= 60: "Good {category} alignment"
 * - score < 60: "Needs improvement in {category}"
 */
function getCategoryDescription(
  score: number,
  category: string
): string {
  if (score >= 80) {
    return `Strong alignment with required ${category}`;
  }
  if (score >= 60) {
    return `Good ${category} alignment`;
  }
  return `Needs improvement in ${category}`;
}

/**
 * Maps JD importance level to UI strength indicator.
 * CRITICAL = strong, IMPORTANT/NICE_TO_HAVE = moderate.
 */
function mapImportanceToStrength(
  importance: 'CRITICAL' | 'IMPORTANT' | 'NICE_TO_HAVE'
): 'strong' | 'moderate' {
  return importance === 'CRITICAL' ? 'strong' : 'moderate';
}

/**
 * Maps JD importance level to UI priority label.
 */
function mapImportanceToPriority(
  importance: 'CRITICAL' | 'IMPORTANT' | 'NICE_TO_HAVE'
): 'critical' | 'important' | 'nice-to-have' {
  switch (importance) {
    case 'CRITICAL':
      return 'critical';
    case 'IMPORTANT':
      return 'important';
    case 'NICE_TO_HAVE':
      return 'nice-to-have';
  }
}

/**
 * Maps pipeline priority (P0-P3) to UI priority level.
 * P0 = high, P1/P2 = medium, P3 = low.
 */
function mapPriorityLevel(
  priority: 'P0' | 'P1' | 'P2' | 'P3'
): 'high' | 'medium' | 'low' {
  switch (priority) {
    case 'P0':
      return 'high';
    case 'P1':
    case 'P2':
      return 'medium';
    case 'P3':
      return 'low';
  }
}

/**
 * Transforms a JDMatchReport API response into props for the analysis page UI components.
 *
 * @param report - The raw API report from the analysis pipeline
 * @returns Props shaped for the AnalysisScorePage components
 */
export function mapReportToProps(report: JDMatchReport): AnalysisReportProps {
  const { scores, matched_skills, missing_skills, keyword_analysis, priority_action_items } = report;

  return {
    overallScore: scores.overall_score,

    categories: {
      skills: {
        score: scores.skills_score,
        description: getCategoryDescription(scores.skills_score, 'skills'),
      },
      experience: {
        score: scores.experience_score,
        description: getCategoryDescription(scores.experience_score, 'experience'),
      },
      qualifications: {
        score: scores.qualifications_score,
        description: getCategoryDescription(scores.qualifications_score, 'qualifications'),
      },
      keywords: {
        score: scores.keywords_score,
        description: getCategoryDescription(scores.keywords_score, 'keywords'),
      },
    },

    matchingSkills: matched_skills.map((skill) => ({
      name: skill.resume_skill,
      strength: mapImportanceToStrength(skill.jd_importance),
    })),

    missingSkills: missing_skills.map((skill) => ({
      name: skill.jd_skill,
      priority: mapImportanceToPriority(skill.importance),
    })),

    keywordsPresent: keyword_analysis.present,
    keywordsMissing: keyword_analysis.missing,

    actionItems: priority_action_items.map((item, index) => ({
      number: index + 1,
      title: item.action,
      description: item.reason,
      priority: mapPriorityLevel(item.priority),
    })),

    // Rubric analysis (optional — present when rubric scoring has run)
    ...(report.rubric_analysis ? {
      rubricAnalysis: {
        competencyGaps: report.rubric_analysis.competency_gaps.map((gap) => ({
          skill: gap.skill,
          gapType: gap.gap_type,
          jdLevel: gap.jd_level,
          resumeLevel: gap.resume_level,
          action: gap.action ?? '',
        })),
        patternGaps: report.rubric_analysis.pattern_gaps.map((gap) => ({
          pattern: gap.pattern,
          patternName: gap.pattern_name,
          description: gap.gap_description ?? '',
          action: gap.action ?? '',
        })),
        competenciesMet: report.rubric_analysis.competencies_met,
        competenciesTotal: report.rubric_analysis.competencies_total,
        criticalGaps: report.rubric_analysis.critical_gaps,
        summary: report.rubric_analysis.summary ?? '',
      },
    } : {}),
  };
}
