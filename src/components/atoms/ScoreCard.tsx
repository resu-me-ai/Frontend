import React from 'react';
import { Icon } from './Icon';

export interface ScoreCardProps {
  icon: 'check' | 'skills-match' | 'experience' | 'qualifications' | 'keywords';
  iconBgColor: string;
  score: number;
  title: string;
  description: string;
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  icon,
  iconBgColor,
  score,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-border-default rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon name={icon} size={24} className="flex-shrink-0" />
        </div>
        <div className="text-3xl font-bold text-text-heading">{score}%</div>
      </div>
      <h3 className="text-base font-semibold text-text-heading mb-2">{title}</h3>
      <p className="text-sm font-normal text-text-subtle leading-5">{description}</p>
    </div>
  );
};
