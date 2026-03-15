import React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { SkillItem } from '@/components/molecules/SkillItem';
import { MissingSkillItem } from '@/components/molecules/MissingSkillItem';

export interface SkillsBreakdownSectionProps {
  matchingSkills: Array<{ name: string; strength: 'strong' | 'moderate' }>;
  missingSkills: Array<{ name: string; priority: 'critical' | 'important' | 'nice-to-have' }>;
  matchingTitle?: string;
  matchingSubtitle?: string;
  missingTitle?: string;
  missingSubtitle?: string;
  className?: string;
}

export const SkillsBreakdownSection: React.FC<SkillsBreakdownSectionProps> = ({
  matchingSkills,
  missingSkills,
  matchingTitle = 'Matching Skills',
  matchingSubtitle = 'Skills found in your resume',
  missingTitle = 'Missing Skills',
  missingSubtitle = 'Skills to add or emphasize',
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
      {/* Matching Skills */}
      <div className="bg-white border border-border-default rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-success-subtle flex items-center justify-center">
            <Icon name="check" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-heading">{matchingTitle}</h3>
            <p className="text-sm font-normal text-text-subtle">{matchingSubtitle}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {matchingSkills.map((skill, index) => (
            <SkillItem key={index} name={skill.name} strength={skill.strength} />
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-white border border-border-default rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-lg bg-error-subtle flex items-center justify-center">
            <Icon name="missing-skills" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-heading">{missingTitle}</h3>
            <p className="text-sm font-normal text-text-subtle">{missingSubtitle}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {missingSkills.map((skill, index) => (
            <MissingSkillItem key={index} name={skill.name} priority={skill.priority} />
          ))}
        </div>
      </div>
    </div>
  );
};
