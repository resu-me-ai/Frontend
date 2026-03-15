import React from 'react';
import type { ResumeSection as ResumeSectionType } from '@/types/resume';
import { isExperienceSection } from '@/types/resume';
import { ResumeSectionHeader } from '@/components/atoms/ResumeSectionHeader';
import { BulletList } from '@/components/atoms/BulletList';
import { ExperienceRole } from './ExperienceRole';

export interface ResumeSectionProps {
  section: ResumeSectionType;
  className?: string;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  section,
  className = '',
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <ResumeSectionHeader title={section.header} />

      {isExperienceSection(section) ? (
        (section.content ?? []).map((role) => (
          <ExperienceRole key={role.role_index} role={role} />
        ))
      ) : (
        <BulletList bullets={section.content ?? []} />
      )}
    </div>
  );
};
