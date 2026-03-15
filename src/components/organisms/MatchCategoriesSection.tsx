import React from 'react';
import { MatchCategoryCard } from '@/components/molecules/MatchCategoryCard';

export interface MatchCategoriesSectionProps {
  categories: {
    skills: { score: number; description: string };
    experience: { score: number; description: string };
    qualifications: { score: number; description: string };
    keywords: { score: number; description: string };
  };
  className?: string;
}

export const MatchCategoriesSection: React.FC<MatchCategoriesSectionProps> = ({ categories, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 gap-6 ${className}`}>
      <MatchCategoryCard
        icon="skills-match"
        iconBgColor="#dcfce7"
        score={categories.skills.score}
        title="Skills Match"
        description={categories.skills.description}
      />
      <MatchCategoryCard
        icon="experience"
        iconBgColor="#dbeafe"
        score={categories.experience.score}
        title="Resume Quality"
        description={categories.experience.description}
      />
      <MatchCategoryCard
        icon="qualifications"
        iconBgColor="#fef9c3"
        score={categories.qualifications.score}
        title="Qualifications"
        description={categories.qualifications.description}
      />
      <MatchCategoryCard
        icon="keywords"
        iconBgColor="#f3e8ff"
        score={categories.keywords.score}
        title="Keywords"
        description={categories.keywords.description}
      />
    </div>
  );
};
