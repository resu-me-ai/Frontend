import React from 'react';
import { ScoreCard } from '@/components/atoms/ScoreCard';

export interface MatchCategoryCardProps {
  icon: 'check' | 'skills-match' | 'experience' | 'qualifications' | 'keywords';
  iconBgColor: string;
  score: number;
  title: string;
  description: string;
  className?: string;
}

export const MatchCategoryCard: React.FC<MatchCategoryCardProps> = ({
  icon,
  iconBgColor,
  score,
  title,
  description,
  className = '',
}) => {
  return (
    <ScoreCard
      icon={icon}
      iconBgColor={iconBgColor}
      score={score}
      title={title}
      description={description}
      className={className}
    />
  );
};
