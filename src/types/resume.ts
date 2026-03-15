// Resume document types — matches backend near-perfect-resume-template.json schema

export interface ParsedContact {
  location?: string;
  phone?: string;
  email?: string;
  linkedin_url?: string;
}

export interface ResumeOverview {
  full_name: string;
  contact_line: string;
  parsed_contact: ParsedContact;
}

export interface BulletItem {
  bullet_index: number;
  text: string;
  bold_prefix?: string;
}

export interface ExperienceRoleData {
  role_index: number;
  title: string;
  company: string;
  company_context?: string;
  date_range: string;
  achievements_line?: string;
  bullets: BulletItem[];
}

export interface ResumeSectionSummary {
  header: string;
  section_type: 'summary' | 'early_experience';
  section_index: number;
  content: BulletItem[];
}

export interface ResumeSectionExperience {
  header: string;
  section_type: 'experience';
  section_index: number;
  content: ExperienceRoleData[];
}

export type ResumeSection = ResumeSectionSummary | ResumeSectionExperience;

/**
 * Phase 1b enhancement map — keyed by bulletId.
 * Present on resumeData when the pipeline has run ResumeEnhancer (Story 10, #459).
 */
export interface EnhancementEntry {
  original: string;
  enhanced: string;
  score_before?: number;
  score_after?: number;
}

export type EnhancementMap = Record<string, EnhancementEntry>;

export interface ResumeDocumentData {
  resume_overview: ResumeOverview;
  resume_sections: ResumeSection[];
  /** Phase 1b: before/after bullet enhancement data keyed by bulletId */
  _enhancements?: EnhancementMap;
}

// Type guards

export function isExperienceSection(
  section: ResumeSection,
): section is ResumeSectionExperience {
  return section.section_type === 'experience';
}

export function isBulletSection(
  section: ResumeSection,
): section is ResumeSectionSummary {
  return section.section_type === 'summary' || section.section_type === 'early_experience';
}
